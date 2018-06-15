import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { TxData } from "../types";
import { ContractsAPI } from "./";
export interface ERC721 {
    balanceOf(owner: string): Promise<BigNumber>;
    ownerOf(tokenID: BigNumber): Promise<string>;
    exists(tokenID: BigNumber): Promise<boolean>;
    approveAsync(to: string, tokenID: BigNumber, options?: TxData): Promise<string>;
    getApproved(tokenID: BigNumber): Promise<string>;
    setApprovalForAllAsync(operator: string, approved: boolean, options?: TxData): Promise<string>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
    transferAsync(to: string, tokenID: BigNumber, options?: TxData): Promise<string>;
    transferFromAsync(from: string, to: string, tokenID: BigNumber, data?: string, options?: TxData): Promise<string>;
}
export declare const DebtTokenAPIErrors: {
    ONLY_OWNER: (account: string) => any;
    NOT_OWNER: () => any;
    TOKEN_WITH_ID_DOES_NOT_EXIST: () => any;
    ACCOUNT_UNAUTHORIZED_TO_TRANSFER: (account: string) => any;
    RECIPIENT_WONT_RECOGNIZE_TOKEN: (recipient: string) => any;
    OWNER_CANNOT_BE_OPERATOR: () => any;
};
export declare class DebtTokenAPI implements ERC721 {
    private web3;
    private contracts;
    private assert;
    constructor(web3: Web3, contracts: ContractsAPI);
    balanceOf(owner: string): Promise<BigNumber>;
    ownerOf(tokenID: BigNumber): Promise<string>;
    exists(tokenID: BigNumber): Promise<boolean>;
    approveAsync(to: string, tokenID: BigNumber, options?: TxData): Promise<string>;
    getApproved(tokenID: BigNumber): Promise<string>;
    setApprovalForAllAsync(operator: string, approved: boolean, options?: TxData): Promise<string>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
    transferAsync(to: string, tokenID: BigNumber, options?: TxData): Promise<string>;
    transferFromAsync(from: string, to: string, tokenID: BigNumber, data?: string, options?: TxData): Promise<string>;
    private assertTransferValid(debtTokenContract, to, tokenID, txOptions);
    private assertTransferFromValid(debtTokenContract, from, to, tokenID, data, txOptions);
    private validateTransferArguments(to, tokenID);
    private validateTransferFromArguments(from, to, tokenID, data?);
}
