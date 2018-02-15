import * as Web3 from "web3";
import { NULL_ADDRESS } from "../../utils/constants";

export class AccountAssertions {
    private web3: Web3;

    public constructor(web3: Web3) {
        this.web3 = web3;
    }

    public notNull(account: string, errorMessage: string) {
        if (account === NULL_ADDRESS) {
            throw new Error(errorMessage);
        }
    }
}
