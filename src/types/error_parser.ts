import { _, chain, value, curry, map, flatMap, compact, filter } from "lodash/fp";

import { Logging } from "./logging";
import { DebtKernelError } from "./debt_kernel_error";
import { RepaymentRouterError } from "./repayment_router_error";
import { ContractsAPI } from "src/apis";

export namespace ErrorParser {
    export async function parseDecodedLogs(
        logs: any[],
        contractsAPI: ContractsAPI,
    ): Promise<string[]> {
        const curriedParseEntry = curry(parseEntry)(_, contractsAPI);

        return chain(logs)
            .compact() // filter out any undefined values
            .filter(isParseableEntry) // filter out any non-parseable entries
            .flatMap(curriedParseEntry) // parse out errors
            .value();
    }

    function isParseableEntry(log: any): boolean {
        return log.hasOwnProperty("name");
    }

    enum Origin {
        DebtKernel,
        RepaymentRouter,
    }

    async function parseEntry(entry: Logging.Entry, contractsAPI: ContractsAPI): Promise<string[]> {
        if (entry.name === Logging.LOG_ERROR_NAME) {
            const origin = await parseOrigin(entry, contractsAPI);
            const curriedMessageForErrorWithID = curry(messageForErrorWithID)(_, origin);
            return chain(entry.events)
                .map(parseErrorID)
                .compact()
                .map(curriedMessageForErrorWithID)
                .value();
        } else {
            return [];
        }
    }

    async function parseOrigin(entry: Logging.Entry, contractsAPI: ContractsAPI): Promise<Origin> {
        const { debtKernel, repaymentRouter } = await contractsAPI.loadDharmaContractsAsync();

        if (entry.address === debtKernel.address) {
            return Origin.DebtKernel;
        } else if (entry.address === repaymentRouter.address) {
            return Origin.RepaymentRouter;
        } else {
            Promise.reject(new Error("Invalid address"));
        }
    }

    function messageForErrorWithID(id: number, origin: Origin): string {
        switch (origin) {
            case Origin.DebtKernel:
                return DebtKernelError.messageForError(id);
            case Origin.RepaymentRouter:
                return RepaymentRouterError.messageForError(id);
        }
    }

    function parseErrorID(event: Logging.Event): number | undefined {
        return event.name === Logging.ERROR_ID ? Number(event.value) : undefined;
    }
}
