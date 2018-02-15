import * as promisify from "tiny-promisify";
import * as Web3 from "web3";

// Web3 1.0.0 and onwards is currently in beta, but has some
// useful utils builtin we like to leverage -- particularly
// a function for calculating hashes of tightly packed arguments
// in a manner that is identical to Solidity's methadology.
import * as Web3BetaUtils from "web3-utils";

export class Web3Utils {
    private web3: Web3;

    constructor(web3: Web3) {
        this.web3 = web3;
    }

    public static soliditySHA3(...payload: any[]): string {
        return Web3BetaUtils.soliditySha3(...payload);
    }

    public async getNetworkIdAsync(): Promise<number> {
        return promisify(this.web3.version.getNetwork)();
    }

    public async getAvailableAddressesAsync(): Promise<string[]> {
        return promisify(this.web3.eth.getAccounts)();
    }

    public async doesContractExistAtAddressAsync(address: string): Promise<boolean> {
        const code = await promisify(this.web3.eth.getCode)(address);

        // Regex matches 0x0, 0x00, 0x in order to accommodate poorly implemented clients
        const codeIsEmpty = /^0x0{0,40}$/i.test(code);
        return !codeIsEmpty;
    }

    public async getTransactionReceiptAsync(txHash: string): Promise<Web3.TransactionReceipt> {
        return promisify(this.web3.eth.getTransactionReceipt)(txHash);
    }

    public async saveTestSnapshot(): Promise<number> {
        const response = await this.sendJsonRpcRequestAsync("evm_snapshot", []);
        return parseInt(response.result, 16);
    }

    public async revertToSnapshot(snapshotId: number): Promise<boolean> {
        const response = await this.sendJsonRpcRequestAsync("evm_revert", [snapshotId]);
        return response.result;
    }

    private async sendJsonRpcRequestAsync(method: string, params: any[]): Promise<Web3.JSONRPCResponsePayload> {
        return promisify(this.web3.currentProvider.sendAsync, { context: this.web3.currentProvider })({
            jsonrpc: "2.0",
            method,
            params,
            id: new Date().getTime()
        });
    }
}
