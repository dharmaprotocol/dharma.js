import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { Web3Utils } from "../../utils/web3_utils";

export interface TxData {
    from?: string;
    gas?: number;
    gasPrice?: BigNumber;
    nonce?: number;
}

export interface TxDataPayable extends TxData {
    value?: BigNumber;
}

export namespace TransactionOptions {
    export async function generateTxOptions(
        web3: Web3,
        gas: number,
        options?: TxData,
    ): Promise<TxData> {
        const web3Utils = new Web3Utils(web3);
        const accounts = await web3Utils.getAvailableAddressesAsync();

        // TODO: Add fault tolerance to scenario in which not addresses are available

        return {
            from: accounts[0],
            gas: gas,
            ...options,
        };
    }
}
