import { NULL_ADDRESS } from "../../utils/constants";
import { TxData } from "../types";

export class AccountAssertions {
    public notNull(account: string, errorMessage: string) {
        if (account === NULL_ADDRESS) {
            throw new Error(errorMessage);
        }
    }

    public notSender(account: string, txOptions: TxData, errorMessage: string) {
        if (account === txOptions.from) {
            throw new Error(errorMessage);
        }
    }
}
