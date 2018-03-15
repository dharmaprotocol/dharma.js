import * as _ from "lodash";

import { Logging } from "./logging";
import { DebtKernelError } from "./debt_kernel_error";
import { RepaymentRouterError } from "./repayment_router_error";

export interface ContractAddressBook {
    debtKernel: string;
    repaymentRouter: string;
}

enum Origin {
    DebtKernel,
    RepaymentRouter,
}

export class ErrorParser {
    constructor(private contractAddressBook: ContractAddressBook) {
        this.contractAddressBook = contractAddressBook;
    }

    public parseDecodedLogs = (logs: any[]): string[] => {
        return _.chain(logs)
            .compact() // filter out any undefined values
            .filter(this.isParseableEntry) // filter out any non-parseable entries
            .flatMap(this.parseEntry) // parse out errors
            .value();
    };

    private isParseableEntry = (log: any): boolean => {
        return log.hasOwnProperty("name");
    };

    private parseEntry = (entry: Logging.Entry): string[] => {
        if (entry.name === Logging.LOG_ERROR_NAME) {
            const origin = this.parseOrigin(entry);
            return _.chain(entry.events)
                .map(this.parseErrorID)
                .compact()
                .map(n => this.messageForErrorWithID(n, origin))
                .value();
        } else {
            return [];
        }
    };

    private parseOrigin = (entry: Logging.Entry): Origin => {
        if (entry.address === this.contractAddressBook.debtKernel) {
            return Origin.DebtKernel;
        } else if (entry.address === this.contractAddressBook.repaymentRouter) {
            return Origin.RepaymentRouter;
        }
    };

    private messageForErrorWithID = (id: number, origin: Origin): string => {
        switch (origin) {
            case Origin.DebtKernel:
                return DebtKernelError.messageForError(id);
            case Origin.RepaymentRouter:
                return RepaymentRouterError.messageForError(id);
        }
    };

    private parseErrorID = (event: Logging.Event): number | undefined => {
        return event.name === Logging.ERROR_ID ? Number(event.value) : undefined;
    };
}
