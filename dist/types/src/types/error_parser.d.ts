export interface ContractAddressBook {
    debtKernel: string;
    repaymentRouter: string;
}
export declare class ErrorParser {
    private contractAddressBook;
    constructor(contractAddressBook: ContractAddressBook);
    parseDecodedLogs: (logs: any[]) => string[];
    private isParseableEntry;
    private parseEntry;
    private parseOrigin;
    private messageForErrorWithID;
    private parseErrorID;
}
