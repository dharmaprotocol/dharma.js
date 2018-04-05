import { TxData } from "../types";
import { BigNumber } from "bignumber.js";

export interface DebtTokenAPI {
    balanceOf(owner: string): Promise<BigNumber>;
    ownerOf(tokenID: BigNumber): Promise<string>;
    exists(tokenID: BigNumber): Promise<boolean>;

    approve(to: string, tokenID: BigNumber): Promise<string>;
    getApproved(tokenID: BigNumber): Promise<string>;

    setApprovalForAll(operator: string, approved: boolean): Promise<string>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;

    transfer(to: string, tokenID: BigNumber, options?: TxData): Promise<string>;
    transferFrom(
        from: string,
        to: string,
        tokenID: BigNumber,
        data?: string,
        options?: TxData,
    ): Promise<string>;
}
