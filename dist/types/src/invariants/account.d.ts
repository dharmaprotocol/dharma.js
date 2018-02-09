import Web3 from "web3";
export declare class AccountAssertions {
    private web3;
    constructor(web3: Web3);
    notNull(account: string, errorMessage: string): void;
}
