// External
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";
import * as singleLineString from "single-line-string";

// Types
import { TxData, TransactionOptions } from "../types";

// Utils
import { Assertions } from "../invariants";

// APIs
import { ContractsAPI } from "./";

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
    TOKEN_DOES_NOT_EXIST: (tokenID: BigNumber) => singleLineString`
        Token with ID ${tokenID.toNumber()} does not exist.
    `,
    TOKEN_DOES_NOT_BELONG_TO_ACCOUNT: (account: string) => singleLineString`
        Specified token does not belong to account ${account}
    `,
    ACCOUNT_UNAUTHORIZED_TO_TRANSFER: (account: string) => singleLineString`
        Transaction sender ${account} neither owns the specified token nor is approved to transfer it.
    `,
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
        this.validateTransferFromArguments(from, to, tokenID, data);

        const txOptions = await TransactionOptions.generateTxOptions(
            this.web3,
            ERC721_TRANSFER_GAS_MAXIMUM,
            options,
        );

        const debtTokenContract = await this.contracts.loadDebtTokenAsync();

        // Assert token exists
        await this.assert.debtToken.exists(
            debtTokenContract,
            tokenID,
            DebtTokenAPIErrors.TOKEN_DOES_NOT_EXIST(tokenID),
        );

        // Assert token belongs to `from`
        await this.assert.debtToken.belongsToAccount(
            debtTokenContract,
            tokenID,
            from,
            DebtTokenAPIErrors.TOKEN_DOES_NOT_BELONG_TO_ACCOUNT(from),
        );

        // Assert that message sender can transfer said token
        await this.assert.debtToken.canBeTransferredByAccount(
            debtTokenContract,
            tokenID,
            options.from,
            DebtTokenAPIErrors.ACCOUNT_UNAUTHORIZED_TO_TRANSFER(options.from),
        );

        return debtTokenContract.safeTransferFrom.sendTransactionAsync(
            from,
            to,
            tokenID,
            data,
            txOptions,
        );
    }

    private validateTransferFromArguments(
        from: string,
        to: string,
        tokenID: BigNumber,
        data?: string,
    ): void {
        this.assert.schema.address("from", from);
        this.assert.schema.address("to", to);
        this.assert.schema.wholeNumber("tokenID", tokenID);

        if (data) {
            this.assert.schema.bytes("data", data);
        }
    }
}
