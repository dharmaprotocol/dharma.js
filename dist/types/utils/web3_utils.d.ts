import * as Web3 from "web3";
export declare class Web3Utils {
    private web3;
    constructor(web3: Web3);
    static soliditySHA3(...payload: any[]): string;
    getNetworkIdAsync(): Promise<number>;
    getAvailableAddressesAsync(): Promise<string[]>;
    doesContractExistAtAddressAsync(address: string): Promise<boolean>;
    getTransactionReceiptAsync(txHash: string): Promise<Web3.TransactionReceipt>;
}
