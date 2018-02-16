import * as Web3 from "web3";
export declare const BlockchainAPIErrors: {
    AWAIT_MINE_TX_TIMED_OUT: (txHash: string) => any;
};
export declare class BlockchainAPI {
    private web3Utils;
    private intervalManager;
    constructor(web3: Web3);
    awaitTransactionMinedAsync(txHash: string, pollingIntervalMs?: number, timeoutMs?: number): Promise<Web3.TransactionReceipt>;
}
