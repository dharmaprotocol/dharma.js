import * as Web3 from "web3";
import { ContractsAPI } from "./";
import { BigNumber } from "bignumber.js";
import { TxData } from "../types";
export declare class TokenAPI {
    private web3;
    private contracts;
    constructor(web3: Web3, contracts: ContractsAPI);
    transferAsync(tokenAddress: string, to: string, value: BigNumber, options?: TxData): Promise<string>;
    transferFromAsync(tokenAddress: string, from: string, to: string, value: BigNumber, options?: TxData): Promise<string>;
    getBalanceAsync(tokenAddress: string, ownerAddress: string): Promise<BigNumber>;
    setProxyAllowanceAsync(tokenAddress: string, allowance: BigNumber, options?: TxData): Promise<string>;
    setUnlimitedProxyAllowanceAsync(tokenAddress: string, options?: TxData): Promise<string>;
    getProxyAllowanceAsync(tokenAddress: string, ownerAddress: string): Promise<BigNumber>;
    private getTxDefaultOptions();
}
