import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
export interface TxData {
    from?: string;
    to?: string;
    gas?: number;
    gasPrice?: BigNumber;
    nonce?: number;
}
export interface TxDataPayable extends TxData {
    value?: BigNumber;
}
export declare namespace TransactionOptions {
    function generateTxOptions(web3: Web3, gas: number, options?: TxData): Promise<TxData>;
}
