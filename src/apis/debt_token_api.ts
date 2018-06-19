// External
import * as singleLineString from "single-line-string";
import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";

// Types
import { TxData } from "../types";

// Utils
import { Assertions } from "../invariants";
import { generateTxOptions } from "../../utils/transaction_utils";

// APIs
import { ContractsAPI } from "./";

// Wrappers
import { DebtTokenContract } from "../wrappers";

export interface ERC721 {
    balanceOf(owner: string): Promise<BigNumber>;
    ownerOf(tokenID: BigNumber): Promise<string>;
    exists(tokenID: BigNumber): Promise<boolean>;

    approveAsync(to: string, tokenID: BigNumber, options?: TxData): Promise<string>;
    getApproved(tokenID: BigNumber): Promise<string>;

    setApprovalForAllAsync(operator: string, approved: boolean, options?: TxData): Promise<string>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;

    transferAsync(to: string, tokenID: BigNumber, options?: TxData): Promise<string>;
    transferFromAsync(
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
    OWNER_CANNOT_BE_OPERATOR: () => singleLineString`Owner cannot list themselves as operator.`,
};

export class DebtTokenAPI implements ERC721 {
    private web3: Web3;
    private contracts: ContractsAPI;
    private assert: Assertions;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new Assertions(web3, this.contracts);
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        // Assert owner is a valid address.
        this.assert.schema.address("owner", owner);

        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        return debtTokenContract.balanceOf.callAsync(owner);
    }

    public async ownerOf(tokenID: BigNumber): Promise<string> {
        // Assert token is valid.
        this.assert.schema.wholeNumber("tokenID", tokenID);

        const debtTokenContract = await this.contracts.loadDebtTokenAsync();

        // Assert token exists.
        await this.assert.debtToken.exists(
            debtTokenContract,
            tokenID,
            DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(),
        );

        return debtTokenContract.ownerOf.callAsync(tokenID);
    }

    public async exists(tokenID: BigNumber): Promise<boolean> {
        // Assert token is valid.
        this.assert.schema.wholeNumber("tokenID", tokenID);

        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        return debtTokenContract.exists.callAsync(tokenID);
    }

    public async approveAsync(to: string, tokenID: BigNumber, options?: TxData): Promise<string> {
        // Assert `to` is a valid address.
        this.assert.schema.address("to", to);

        // Assert token is valid.
        this.assert.schema.wholeNumber("tokenID", tokenID);

        const debtTokenContract = await this.contracts.loadDebtTokenAsync();

        const txOptions = await generateTxOptions(this.web3, ERC721_TRANSFER_GAS_MAXIMUM, options);

        const { from } = txOptions;

        // Ensure the token exists.
        await this.assert.debtToken.exists(
            debtTokenContract,
            tokenID,
            DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(),
        );

        // Ensure the owner of the token is the one invoking `approve`
        await this.assert.debtToken.onlyOwner(
            debtTokenContract,
            tokenID,
            from,
            DebtTokenAPIErrors.ONLY_OWNER(from),
        );

        // Ensure the approvee is not the owner.
        await this.assert.debtToken.notOwner(
            debtTokenContract,
            tokenID,
            to,
            DebtTokenAPIErrors.NOT_OWNER(),
        );

        return debtTokenContract.approve.sendTransactionAsync(to, tokenID, txOptions);
    }

    public async getApproved(tokenID: BigNumber): Promise<string> {
        // Assert token is valid.
        this.assert.schema.wholeNumber("tokenID", tokenID);

        const debtTokenContract = await this.contracts.loadDebtTokenAsync();

        // Assert token exists.
        await this.assert.debtToken.exists(
            debtTokenContract,
            tokenID,
            DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(),
        );

        return debtTokenContract.getApproved.callAsync(tokenID);
    }

    public async setApprovalForAllAsync(
        operator: string,
        approved: boolean,
        options?: TxData,
    ): Promise<string> {
        const debtTokenContract = await this.contracts.loadDebtTokenAsync();

        const txOptions = await generateTxOptions(this.web3, ERC721_TRANSFER_GAS_MAXIMUM, options);

        this.assert.schema.address("operator", operator);

        if (operator === txOptions.from) {
            throw new Error(DebtTokenAPIErrors.OWNER_CANNOT_BE_OPERATOR());
        }

        return debtTokenContract.setApprovalForAll.sendTransactionAsync(
            operator,
            approved,
            txOptions,
        );
    }

    public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        this.assert.schema.address("operator", operator);
        this.assert.schema.address("owner", owner);

        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        return debtTokenContract.isApprovedForAll.callAsync(owner, operator);
    }

    public async transferAsync(to: string, tokenID: BigNumber, options?: TxData): Promise<string> {
        this.validateTransferArguments(to, tokenID);

        const debtTokenContract = await this.contracts.loadDebtTokenAsync();
        const txOptions = await generateTxOptions(this.web3, ERC721_TRANSFER_GAS_MAXIMUM, options);

        await this.assertTransferValid(debtTokenContract, to, tokenID, txOptions);

        const owner = await this.ownerOf(tokenID);

        return debtTokenContract.safeTransferFrom.sendTransactionAsync(
            owner,
            to,
            tokenID,
            "",
            txOptions,
        );
    }

    public async transferFromAsync(
        from: string,
        to: string,
        tokenID: BigNumber,
        data?: string,
        options?: TxData,
    ): Promise<string> {
        this.validateTransferFromArguments(from, to, tokenID, data);

        const txOptions = await generateTxOptions(this.web3, ERC721_TRANSFER_GAS_MAXIMUM, options);

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

    private async assertTransferValid(
        debtTokenContract: DebtTokenContract,
        to: string,
        tokenID: BigNumber,
        txOptions: TxData,
    ): Promise<void> {
        // Assert token exists
        await this.assert.debtToken.exists(
            debtTokenContract,
            tokenID,
            DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(),
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
            txOptions.from,
            "",
            DebtTokenAPIErrors.RECIPIENT_WONT_RECOGNIZE_TOKEN(to),
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

    private validateTransferArguments(to: string, tokenID: BigNumber): void {
        this.assert.schema.address("to", to);
        this.assert.schema.wholeNumber("tokenID", tokenID);
    }

    private validateTransferFromArguments(
        from: string,
        to: string,
        tokenID: BigNumber,
        data?: string,
    ): void {
        this.validateTransferArguments(to, tokenID);

        this.assert.schema.address("from", from);

        if (data) {
            this.assert.schema.bytes("data", data);
        }
    }
}
