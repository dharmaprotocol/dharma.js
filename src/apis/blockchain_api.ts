import { Web3Utils } from "../../utils/web3_utils";
import { IntervalManager } from "../../utils/interval_utils";
import * as Web3 from "web3";
import singleLineString from "single-line-string";

export const BlockchainAPIErrors = {
    AWAIT_MINE_TX_TIMED_OUT: (txHash: string) =>
        singleLineString`Timeout has been exceeded in
                         awaiting mining of transaction
                         with hash ${txHash}.`,
};

export class BlockchainAPI {
    private web3Utils: Web3Utils;
    private intervalManager: IntervalManager;

    constructor(web3: Web3) {
        this.web3Utils = new Web3Utils(web3);
        this.intervalManager = new IntervalManager();
    }

    public async awaitTransactionMinedAsync(
        txHash: string,
        pollingIntervalMs = 1000,
        timeoutMs?: number,
    ): Promise<Web3.TransactionReceipt> {
        const intervalManager = this.intervalManager;
        const web3Utils = this.web3Utils;

        return new Promise<Web3.TransactionReceipt>((resolve, reject) => {
            intervalManager.setInterval(
                txHash,
                async () => {
                    try {
                        const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                        if (receipt) {
                            resolve(receipt);
                            return false;
                        } else {
                            return true;
                        }
                    } catch (e) {
                        reject(e);
                    }
                },
                async () => {
                    reject(BlockchainAPIErrors.AWAIT_MINE_TX_TIMED_OUT(txHash));
                },
                pollingIntervalMs,
                timeoutMs,
            );
        });
    }
}
