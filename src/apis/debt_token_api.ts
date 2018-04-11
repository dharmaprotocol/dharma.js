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

// Wrappers
import { DebtTokenContract } from "../wrappers";

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
        Specified debt token does not belong to account ${account}
    `,
    NOT_OWNER: () => singleLineString`The recipient cannot be the owner of the debt token.`,
    TOKEN_WITH_ID_DOES_NOT_EXIST: () => singleLineString`The debt token specified does not exist.`,
    ACCOUNT_UNAUTHORIZED_TO_TRANSFER: (account: string) => singleLineString`
        Transaction sender ${account} neither owns the specified token nor is approved to transfer it.
    `,
    RECIPIENT_WONT_RECOGNIZE_TOKEN: (recipient: string) => singleLineString`
        Recipient ${recipient} is a contract that does not implement the
        ERC721Receiver interface, and therefore cannot have ERC721 tokens
        transferred to it.
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

        const { from } = txOptions;

        await this.assert.debtToken.exists(
            debtTokenContract,
            tokenID,
            DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(),
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
        this.validateTransferFromArguments(from, to, tokenID, data);

        const txOptions = await TransactionOptions.generateTxOptions(
            this.web3,
            ERC721_TRANSFER_GAS_MAXIMUM,
            options,
        );

        const debtTokenContract = await this.contracts.loadDebtTokenAsync();

        await this.assertTransferFromValid(debtTokenContract, from, to, tokenID, data, txOptions);

        return debtTokenContract.safeTransferFrom.sendTransactionAsync(
            from,
            to,
            tokenID,
            data,
            txOptions,
        );
    }

    private async assertTransferFromValid(
        debtTokenContract: DebtTokenContract,
        from: string,
        to: string,
        tokenID: BigNumber,
        data: string,
        txOptions: TxData,
    ): Promise<void> {
        // Assert token exists
        await this.assert.debtToken.exists(
            debtTokenContract,
            tokenID,
            DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(),
        );

        // Assert token belongs to `from`
        await this.assert.debtToken.onlyOwner(
            debtTokenContract,
            tokenID,
            from,
            DebtTokenAPIErrors.ONLY_OWNER(from),
        );

        // Assert that message sender can transfer said token
        await this.assert.debtToken.canBeTransferredByAccount(
            debtTokenContract,
            tokenID,
            txOptions.from,
            DebtTokenAPIErrors.ACCOUNT_UNAUTHORIZED_TO_TRANSFER(txOptions.from),
        );

        // Assert that `to` can be the recipient of an ERC721 token
        await this.assert.debtToken.canBeReceivedByAccountWithData(
            this.web3,
            tokenID,
            to,
            from,
            data,
            DebtTokenAPIErrors.RECIPIENT_WONT_RECOGNIZE_TOKEN(to),
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
