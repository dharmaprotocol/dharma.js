import { TxData } from "../types";
export declare class AccountAssertions {
    notNull(account: string, errorMessage: string): void;
    notSender(account: string, txOptions: TxData, errorMessage: string): void;
}
