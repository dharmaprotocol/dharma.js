// External
import * as singleLineString from "single-line-string";
import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";

// APIs
import { AdaptersAPI, ContractsAPI } from ".";

// Adapters
import { Adapter } from "../adapters";

// Wrappers
import {
    DebtKernelContract,
    DebtOrderWrapper,
    DebtTokenContract,
    TokenTransferProxyContract,
} from "../wrappers";

// Types
import { DebtOrder, IssuanceCommitment, TransactionOptions, TxData } from "../types";

// Utils
import { NULL_ADDRESS, TERMS_CONTRACT_TYPES } from "../../utils/constants";
import { Assertions } from "../invariants";

const ORDER_FILL_GAS_MAXIMUM = 600000;

export const OrderAPIErrors = {
    EXPIRED: () =>
        singleLineString`Unable to fill debt order because
                        the order has expired`,

    INVALID_UNDERWRITER_FEE: () =>
        singleLineString`Debt order has an underwriter
                        fee but has no assigned underwriter `,

    INVALID_RELAYER_FEE: () =>
        singleLineString`Debt order has a relayer fee
                        but has no assigned relayer`,

    INVALID_DEBTOR_FEE: () =>
        singleLineString`Debt order cannot have a debtor fee
                        that is greater than the total principal`,

    INVALID_FEES: () =>
        singleLineString`Debt order creditor + debtor fee
                        does not equal underwriter + relayer fee`,

    ORDER_CANCELLED: () => singleLineString`Debt order was cancelled`,

    ORDER_ALREADY_CANCELLED: () => singleLineString`Debt order has already been cancelled`,

    UNAUTHORIZED_ORDER_CANCELLATION: () => singleLineString`Debt order can only be cancelled
                                                            by the specified order's debtor`,

    UNAUTHORIZED_ISSUANCE_CANCELLATION: () => singleLineString`Debt issuance can only be cancelled
                                                               by either the specified issuance's debtor,
                                                               or by the underwriter attesting to the
                                                               issuance's default risk`,

    CREDITOR_BALANCE_INSUFFICIENT: () => singleLineString`Creditor balance is insufficient`,

    CREDITOR_ALLOWANCE_INSUFFICIENT: () => singleLineString`Creditor allowance is insufficient`,

    ISSUANCE_CANCELLED: () => singleLineString`Issuance was cancelled`,

    ISSUANCE_ALREADY_CANCELLED: () => singleLineString`Issuance has already been cancelled`,

    DEBT_ORDER_ALREADY_FILLED: () => singleLineString`Debt order has already been filled`,

    INVALID_DEBTOR_SIGNATURE: () => singleLineString`Debtor signature is not valid for debt order`,

    INVALID_CREDITOR_SIGNATURE: () =>
        singleLineString`Creditor signature is not valid for debt order`,

    INVALID_UNDERWRITER_SIGNATURE: () =>
        singleLineString`Underwriter signature is not valid for debt order`,

    ADAPTER_DOES_NOT_CONFORM_TO_INTERFACE: () =>
        singleLineString`Supplied adapter does not conform to the
                         base adapter interface.`,

    INSUFFICIENT_COLLATERALIZER_ALLOWANCE: () =>
        singleLineString`Debtor has not granted sufficient allowance for collateral transfer.`,

    INSUFFICIENT_COLLATERALIZER_BALANCE: () =>
        singleLineString`Debtor does not have sufficient allowance required for collateral transfer.`,
};

export class OrderAPI {
    private web3: Web3;
    private assert: Assertions;
    private contracts: ContractsAPI;
    private adapters: AdaptersAPI;

    public constructor(web3: Web3, contracts: ContractsAPI, adapters: AdaptersAPI) {
        this.web3 = web3;
        this.contracts = contracts;
        this.adapters = adapters;

        this.assert = new Assertions(web3, this.contracts);
    }

    /**
     * Asynchronously fills a signed debt order.
     *
     * If the order fills successfully, the creditor will be debited the
     * principal amount, the debtor will receive the principal, and the
     * underwriter and the relayer will receive their transaction fees
     * (if applicable).
     *
     * The debt order must be signed by all relevant parties and the associated
     * data must be valid in order for the order to be fulfilled.
     *
     * @param  debtOrder a valid, signed debt order.
     * @param  options   any params needed to modify the Ethereum transaction.
     * @return           the hash of the ethereum transaction that fulfilled the debt order.
     */
    public async fillAsync(debtOrder: DebtOrder.Instance, options?: TxData): Promise<string> {
        const txOptions = await TransactionOptions.generateTxOptions(
            this.web3,
            ORDER_FILL_GAS_MAXIMUM,
            options,
        );

        debtOrder = await DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);

        await this.assertFillableAsync(debtOrder, options);

        const { debtKernel } = await this.contracts.loadDharmaContractsAsync(txOptions);

        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        return debtKernel.fillDebtOrder.sendTransactionAsync(
            debtOrderWrapped.getCreditor(),
            debtOrderWrapped.getOrderAddresses(),
            debtOrderWrapped.getOrderValues(),
            debtOrderWrapped.getOrderBytes32(),
            debtOrderWrapped.getSignaturesV(),
            debtOrderWrapped.getSignaturesR(),
            debtOrderWrapped.getSignaturesS(),
            txOptions,
        );
    }

    /**
     * Throws with error message if a given order is not able to be filled.
     *
     * @param {DebtOrder.Instance} debtOrder
     * @param {TxData} txOptions
     * @returns {Promise<void>}
     */
    public async assertFillableAsync(
        debtOrder: DebtOrder.Instance,
        txOptions?: TxData,
    ): Promise<void> {
        const {
            debtKernel,
            debtToken,
            tokenTransferProxy,
        } = await this.contracts.loadDharmaContractsAsync(txOptions);

        await this.assertValidityInvariantsAsync(debtOrder, debtKernel, debtToken);
        await this.assertConsensualityInvariants(debtOrder, txOptions);
        await this.assertCreditorBalanceAndAllowanceInvariantsAsync(
            debtOrder,
            tokenTransferProxy,
            txOptions,
        );

        await this.assertValidLoanTerms(debtOrder);
    }

    /**
     * Asynchronously cancel a debt order if it has yet to be fulfilled.
     *
     * @param  debtOrder the debt order to be canceled.
     * @param  options   any params needed to modify the Ethereum transaction.
     * @return           the hash of the resulting Ethereum transaction.
     */
    public async cancelOrderAsync(
        debtOrder: DebtOrder.Instance,
        options?: TxData,
    ): Promise<string> {
        const txOptions = await TransactionOptions.generateTxOptions(
            this.web3,
            ORDER_FILL_GAS_MAXIMUM,
            options,
        );

        const { debtKernel } = await this.contracts.loadDharmaContractsAsync(txOptions);

        debtOrder = await DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);

        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        await this.assert.order.debtOrderNotCancelledAsync(
            debtOrder,
            debtKernel,
            OrderAPIErrors.ORDER_ALREADY_CANCELLED(),
        );

        await this.assert.order.issuanceNotCancelledAsync(
            debtOrderWrapped.getIssuanceCommitment(),
            debtKernel,
            OrderAPIErrors.ISSUANCE_ALREADY_CANCELLED(),
        );

        this.assert.order.senderAuthorizedToCancelOrder(
            debtOrder,
            txOptions,
            OrderAPIErrors.UNAUTHORIZED_ORDER_CANCELLATION(),
        );

        return debtKernel.cancelDebtOrder.sendTransactionAsync(
            debtOrderWrapped.getOrderAddresses(),
            debtOrderWrapped.getOrderValues(),
            debtOrderWrapped.getOrderBytes32(),
            txOptions,
        );
    }

    /**
     * Asynchronously checks whether the order is filled.
     *
     * @param  debtOrder a debt order.
     * @param  options   any params needed to modify the Ethereum transaction.
     * @return           boolean representing whether the debt order is filled or not.
     */
    public async checkOrderFilledAsync(
        debtOrder: DebtOrder.Instance,
        options?: TxData,
    ): Promise<boolean> {
        const txOptions = await TransactionOptions.generateTxOptions(
            this.web3,
            ORDER_FILL_GAS_MAXIMUM,
            options,
        );
        const { debtToken } = await this.contracts.loadDharmaContractsAsync(txOptions);

        const issuanceHash = await this.getIssuanceHash(debtOrder);

        return debtToken.exists.callAsync(new BigNumber(issuanceHash));
    }

    /**
     * Given a complete debt order, asynchronously computes the issuanceHash
     * (alias of debtAgreementId) of the debt order.
     *
     * Note: If the kernelVersion or issuanceVersion are not specified, the
     * current DebtKernel and RepaymentRouter's addresses will be used
     * respectively.
     *
     * @param debtOrder Debt order for which we'd like to compute the issuance hash
     * @return The debt order's issuanceHash (alias of debtAgreementId).
     */
    public async getIssuanceHash(debtOrder: DebtOrder.Instance): Promise<string> {
        debtOrder = await DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);

        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        return debtOrderWrapped.getIssuanceCommitmentHash();
    }

    /**
     * Given an issuanceHash, returns a DebtOrder instance.
     *
     * @param {string} issuanceHash
     * @returns {Promise<DebtOrder.Instance>}
     */
    public async getDebtOrder(issuanceHash: string): Promise<DebtOrder.Instance> {
        const debtRegistry = await this.contracts.loadDebtRegistryAsync();

        return debtRegistry.get.callAsync(issuanceHash);
    }

    /**
     * Generate a Dharma debt order, given the specified adapter and its associated
     * parameters object.
     *
     * @param adapter The adapter to be leveraged in generating this particular debt
     *                order.
     * @param params  The parameters that will be used by the aforementioned adapter
     *                to generate the debt order.
     * @return Newly generated debt order.
     */
    public async generate(adapter: Adapter.Interface, params: object): Promise<DebtOrder.Instance> {
        this.assert.adapter.conformsToInterface(
            adapter,
            OrderAPIErrors.ADAPTER_DOES_NOT_CONFORM_TO_INTERFACE(),
        );

        return adapter.toDebtOrder(params);
    }

    /**
     * Decode tightly-packed representation of debt agreement's terms in a
     * given debt order into an object with human-interpretable keys and values.
     *
     * NOTE: If the terms contract in the given debt order does not correspond
     *       to any of the built-in adapters bundled into dharma.js, this method
     *       will throw.
     *
     * @param debtOrder A Dharma debt order
     * @return An object containing human-interpretable terms for the loan
     */
    public async unpackTerms(debtOrder: DebtOrder.Instance): Promise<object> {
        const { termsContract, termsContractParameters } = debtOrder;

        // Will throw if adapter cannot be found for given terms contract
        const adapter = await this.adapters.getAdapterByTermsContractAddress(termsContract);

        return adapter.unpackParameters(termsContractParameters);
    }

    public async cancelIssuanceAsync(
        issuanceCommitment: IssuanceCommitment,
        txOptions: TxData,
    ): Promise<string> {
        const { debtKernel } = await this.contracts.loadDharmaContractsAsync(txOptions);

        await this.assert.order.issuanceNotCancelledAsync(
            issuanceCommitment,
            debtKernel,
            OrderAPIErrors.ISSUANCE_ALREADY_CANCELLED(),
        );

        this.assert.order.senderAuthorizedToCancelIssuance(
            issuanceCommitment,
            txOptions,
            OrderAPIErrors.UNAUTHORIZED_ISSUANCE_CANCELLATION(),
        );

        return debtKernel.cancelIssuance.sendTransactionAsync(
            issuanceCommitment.issuanceVersion,
            issuanceCommitment.debtor,
            issuanceCommitment.termsContract,
            issuanceCommitment.termsContractParameters,
            issuanceCommitment.underwriter,
            issuanceCommitment.underwriterRiskRating,
            issuanceCommitment.salt,
            txOptions,
        );
    }

    /**
     * Validates a given debt order's terms against the appropriate loan order adapter.
     *
     * @param {DebtOrder.Instance} debtOrder
     * @returns {Promise<void>}
     */
    private async assertValidLoanTerms(debtOrder: DebtOrder.Instance) {
        const adapter = await this.adapters.getAdapterByTermsContractAddress(
            debtOrder.termsContract,
        );

        const loanOrder = await adapter.fromDebtOrder(debtOrder);

        await adapter.validateAsync(loanOrder);
    }

    private async assertValidityInvariantsAsync(
        debtOrder: DebtOrder.Instance,
        debtKernel: DebtKernelContract,
        debtToken: DebtTokenContract,
    ): Promise<void> {
        this.assert.order.validDebtorFee(debtOrder, OrderAPIErrors.INVALID_DEBTOR_FEE());
        this.assert.order.validUnderwriterFee(debtOrder, OrderAPIErrors.INVALID_UNDERWRITER_FEE());
        this.assert.order.validRelayerFee(debtOrder, OrderAPIErrors.INVALID_RELAYER_FEE());
        this.assert.order.validFees(debtOrder, OrderAPIErrors.INVALID_FEES());

        await this.assert.order.notExpired(debtOrder, OrderAPIErrors.EXPIRED());

        await this.assert.order.debtOrderNotCancelledAsync(
            debtOrder,
            debtKernel,
            OrderAPIErrors.ORDER_CANCELLED(),
        );

        await this.assert.order.issuanceNotCancelledAsync(
            debtOrder,
            debtKernel,
            OrderAPIErrors.ISSUANCE_CANCELLED(),
        );

        await this.assert.order.notAlreadyIssuedAsync(
            debtOrder,
            debtToken,
            OrderAPIErrors.DEBT_ORDER_ALREADY_FILLED(),
        );
    }

    private async assertConsensualityInvariants(debtOrder: DebtOrder.Instance, txOptions: object) {
        await this.assert.order.validDebtorSignature(
            debtOrder,
            txOptions,
            OrderAPIErrors.INVALID_DEBTOR_SIGNATURE(),
        );

        await this.assert.order.validCreditorSignature(
            debtOrder,
            txOptions,
            OrderAPIErrors.INVALID_CREDITOR_SIGNATURE(),
        );

        if (debtOrder.underwriter && debtOrder.underwriter !== NULL_ADDRESS) {
            await this.assert.order.validUnderwriterSignature(
                debtOrder,
                txOptions,
                OrderAPIErrors.INVALID_UNDERWRITER_SIGNATURE(),
            );
        }
    }

    private async assertCreditorBalanceAndAllowanceInvariantsAsync(
        debtOrder: DebtOrder.Instance,
        tokenTransferProxy: TokenTransferProxyContract,
        txOptions: object,
    ): Promise<void> {
        const principalToken = await this.contracts.loadERC20TokenAsync(
            debtOrder.principalToken,
            txOptions,
        );

        await this.assert.order.sufficientCreditorBalanceAsync(
            debtOrder,
            principalToken,
            OrderAPIErrors.CREDITOR_BALANCE_INSUFFICIENT(),
        );

        await this.assert.order.sufficientCreditorAllowanceAsync(
            debtOrder,
            principalToken,
            tokenTransferProxy,
            OrderAPIErrors.CREDITOR_ALLOWANCE_INSUFFICIENT(),
        );
    }
}
