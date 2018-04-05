import * as Web3 from "web3";
import { TxData, TransactionOptions } from "../types";
import { BigNumber } from "bignumber.js";
import { Web3Utils } from "../../utils/web3_utils";
import { ContractsAPI } from "./";
import { Assertions } from "../invariants";

export interface DebtTokenAPI {
    balanceOf(owner: string): Promise<BigNumber>;
    ownerOf(tokenID: BigNumber): Promise<string>;
    exists(tokenID: BigNumber): Promise<boolean>;

    approve(to: string, tokenID: BigNumber, options?: TxData): Promise<string>;
    getApproved(tokenID: BigNumber): Promise<string>;

    setApprovalForAll(operator: string, approved: boolean, options?: TxData): Promise<string>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;

    transfer(to: string, tokenID: BigNumber, options?: TxData): Promise<string>;
    transferFrom(
        from: string,
        to: string,
        tokenID: BigNumber,
        data?: string,
        options?: TxData
    ): Promise<string>;
}

const ERC721_TRANSFER_GAS_MAXIMUM = 70000;

export class DebtTokenAPI {
    private web3: Web3;
    private contracts: ContractsAPI;
    private assert: Assertions;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new Assertions(this.web3, this.contracts);
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        return debtTokenContract.balanceOf.callAsync(owner);
    }

    public async ownerOf(tokenID: BigNumber): Promise<string> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        return debtTokenContract.ownerOf.callAsync(tokenID);
    }

    public async exists(tokenID: BigNumber): Promise<boolean> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        return debtTokenContract.exists.callAsync(tokenID);
    }

    public async approve(to: string, tokenID: BigNumber, options?: TxData): Promise<string> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        const txOptions = await TransactionOptions.generateTxOptions(
            this.web3,
            ERC721_TRANSFER_GAS_MAXIMUM,
            options,
        );
        return debtTokenContract.approve.sendTransactionAsync(to, tokenID, txOptions);
    }

    public async getApproved(tokenID: BigNumber): Promise<string> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        return debtTokenContract.getApproved.callAsync(tokenID);
    }

    public async setApprovalForAll(
        operator: string,
        approved: boolean,
        options?: TxData,
    ): Promise<string> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        const txOptions = await TransactionOptions.generateTxOptions(
            this.web3,
            ERC721_TRANSFER_GAS_MAXIMUM,
            options,
        );
        return debtTokenContract.setApprovalForAll.sendTransactionAsync(
            operator,
            approved,
            txOptions,
        );
    }

}
