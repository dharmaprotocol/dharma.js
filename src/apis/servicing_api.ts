import { ContractsAPI } from "./";
import { BigNumber } from "bignumber.js";
import * as Web3 from "web3";
import { Web3Utils } from "../../utils/web3_utils";
import { Assertions } from "../invariants";
import { DebtRegistryEntry, TxData } from "../types";
import * as singleLineString from "single-line-string";

const REPAYMENT_GAS_MAXIMUM = 100000;

export const ServicingAPIErrors = {
    DEBT_AGREEMENT_NONEXISTENT: (issuanceHash: string) =>
        singleLineString`Debt agreement with issuance hash ${issuanceHash} could not
                         be found in the deployed debt registry`,
    INSUFFICIENT_REPAYMENT_BALANCE: () =>
        singleLineString`Payer does not have sufficient balance in the specified token
                         to execute this repayment.`,
    INSUFFICIENT_REPAYMENT_ALLOWANCE: () =>
        singleLineString`Payer has not granted the token transfer proxy a sufficient
                         allowance in the specified token to execute this repayment.`,
};

export class ServicingAPI {
    private web3: Web3;
    private contracts: ContractsAPI;
    private assert: Assertions;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new Assertions(this.web3, this.contracts);
    }

    /**
     * Asynchronously issue a repayment towards a debt agreement.
     *
     * Note that the address of whoever is making the repayment must allot a
     * sufficient allowance (equal to or greater than the amount specified in
     * this call) to the `tokenTransferProxy` in order for this transaction to
     * succeed.
     *
     * @param  issuanceHash the hash of the issuance to which the repayment is being made.
     * @param  amount       the amount that is being repaid.
     * @param  tokenAddress the address of the token in which the repayment is being made.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    public async makeRepayment(
        issuanceHash: string,
        amount: BigNumber,
        tokenAddress: string,
        options?: TxData,
    ): Promise<string> {
        const transactionOptions = await this.getTxDefaultOptions();

        Object.assign(transactionOptions, options);

        let {
            debtToken,
            repaymentRouter,
            debtRegistry,
            tokenTransferProxy,
        } = await this.contracts.loadDharmaContractsAsync();

        this.assert.schema.bytes32("issuanceHash", issuanceHash);
        this.assert.schema.number("amount", amount);
        this.assert.schema.address("tokenAddress", tokenAddress);

        await this.assert.debtAgreement.exists(
            issuanceHash,
            debtToken,
            ServicingAPIErrors.DEBT_AGREEMENT_NONEXISTENT(issuanceHash),
        );

        const repaymentToken = await this.contracts.loadERC20TokenAsync(tokenAddress);

        await this.assert.token.hasSufficientBalance(
            repaymentToken,
            transactionOptions.from,
            amount,
            ServicingAPIErrors.INSUFFICIENT_REPAYMENT_BALANCE(),
        );
        await this.assert.token.hasSufficientAllowance(
            repaymentToken,
            transactionOptions.from,
            tokenTransferProxy.address,
            amount,
            ServicingAPIErrors.INSUFFICIENT_REPAYMENT_ALLOWANCE(),
        );

        const entry = await debtRegistry.get.callAsync(issuanceHash);

        if (entry.version !== repaymentRouter.address) {
            repaymentRouter = await this.contracts.loadRepaymentRouterAtAsync(entry.version);
        }

        return repaymentRouter.repay.sendTransactionAsync(
            issuanceHash,
            amount,
            tokenAddress,
            transactionOptions,
        );
    }

    /**
     * Asynchronously retrieve the amount that has been repaid to date towards a
     * debt agreement.
     *
     * @param  issuanceHash the hash of the debt agreement.
     * @return              the amount that has been repaid to date.
     */
    public async getValueRepaid(issuanceHash: string): Promise<BigNumber> {
        this.assert.schema.bytes32("issuanceHash", issuanceHash);

        const debtRegistry = await this.contracts.loadDebtRegistryAsync();

        const [termsContractAddress] = await debtRegistry.getTerms.callAsync(issuanceHash);

        const termsContract = await this.contracts.loadTermsContractAsync(termsContractAddress);

        return termsContract.getValueRepaidToDate.callAsync(issuanceHash);
    }

    /**
     * Asynchronously determine the expected value of repayments at a given
     * point in time for a given debt agreement.
     *
     * @param  issuanceHash the hash of a debt agreement.
     * @param  timestamp    the point in time at which the expected value is to be calculated.
     * @return              the expected value of repayments at the point in time specified.
     */
    public async getExpectedValueRepaid(
        issuanceHash: string,
        timestamp: number,
    ): Promise<BigNumber> {
        this.assert.schema.bytes32("issuanceHash", issuanceHash);

        const debtRegistry = await this.contracts.loadDebtRegistryAsync();

        const termsContractAddress = await debtRegistry.getTermsContract.callAsync(issuanceHash);

        const termsContract = await this.contracts.loadTermsContractAsync(termsContractAddress);

        return termsContract.getExpectedRepaymentValue.callAsync(
            issuanceHash,
            new BigNumber(timestamp),
        );
    }

    /**
     * Asynchronously retrieve the `DebtRegistryEntry` instance mapped to the
     * issuance hash specified.
     *
     * @param  issuanceHash the id of the issuance to retrieve.
     * @return              the relevant `DebtRegistryEntry` instance .
     */
    public async getDebtRegistryEntry(issuanceHash: string): Promise<DebtRegistryEntry> {
        this.assert.schema.bytes32("issuanceHash", issuanceHash);

        const debtToken = await this.contracts.loadDebtTokenAsync();

        await this.assert.debtAgreement.exists(
            issuanceHash,
            debtToken,
            ServicingAPIErrors.DEBT_AGREEMENT_NONEXISTENT(issuanceHash),
        );

        const debtRegistry = await this.contracts.loadDebtRegistryAsync();

        return debtRegistry.get.callAsync(issuanceHash);
    }

    private async getTxDefaultOptions(): Promise<TxData> {
        const web3Utils = new Web3Utils(this.web3);

        const accounts = await web3Utils.getAvailableAddressesAsync();

        // TODO: Add fault tolerance to scenario in which not addresses are available

        return {
            from: accounts[0],
            gas: REPAYMENT_GAS_MAXIMUM,
        };
    }
}
