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
