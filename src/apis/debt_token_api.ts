import * as Web3 from "web3";
import * as singleLineString from "single-line-string";

import { TxData, TransactionOptions } from "../types";
import { BigNumber } from "bignumber.js";
import { ContractsAPI } from "./";
import { Assertions } from "../invariants";

export interface ERC721 {
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
        options?: TxData,
    ): Promise<string>;
}

const ERC721_TRANSFER_GAS_MAXIMUM = 200000;

export const DebtTokenAPIErrors = {
    ONLY_OWNER: (account: string) => singleLineString`
        Specified debt token does not belong to account ${account}`,
    NOT_OWNER: () => singleLineString`The recipient cannot be the owner of the debt token.`,
    TOKEN_WITH_ID_DOES_NOT_EXIST: () => singleLineString`The debt token specified does not exist.`,
};

export class DebtTokenAPI implements ERC721 {
    private web3: Web3;
    private contracts: ContractsAPI;
    private assert: Assertions;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new Assertions(this.contracts);
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

        const { from } = txOptions;

        await this.assert.debtToken.exists(
            debtTokenContract,
            tokenID,
            DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(tokenID),
        );

        await this.assert.debtToken.onlyOwner(
            debtTokenContract,
            tokenID,
            from,
            DebtTokenAPIErrors.ONLY_OWNER(from),
        );

        await this.assert.debtToken.notOwner(
            debtTokenContract,
            tokenID,
            to,
            DebtTokenAPIErrors.NOT_OWNER(),
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

    public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        return debtTokenContract.isApprovedForAll.callAsync(owner, operator);
    }

    public async transfer(to: string, tokenID: BigNumber, options?: TxData): Promise<string> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        const txOptions = await TransactionOptions.generateTxOptions(
            this.web3,
            ERC721_TRANSFER_GAS_MAXIMUM,
            options,
        );
        return debtTokenContract.transfer.sendTransactionAsync(to, tokenID, txOptions);
    }

    public async transferFrom(
        from: string,
        to: string,
        tokenID: BigNumber,
        data?: string,
        options?: TxData,
    ): Promise<string> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        const txOptions = await TransactionOptions.generateTxOptions(
            this.web3,
            ERC721_TRANSFER_GAS_MAXIMUM,
            options,
        );
        return debtTokenContract.safeTransferFrom.sendTransactionAsync(
            from,
            to,
            tokenID,
            data,
            txOptions,
        );
    }
}
