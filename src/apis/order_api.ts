import Web3 from "web3";
import { DebtOrder, TxData } from "../types";
import { Web3Utils } from "../../utils/web3_utils";
import { ContractsAPI } from ".";
import {
    DebtKernelContract,
    DebtOrderWrapper,
    DebtTokenContract,
    TokenTransferProxyContract,
} from "../wrappers";
import { Assertions } from "../invariants";
import singleLineString from "single-line-string";

const ORDER_FILL_GAS_MAXIMUM = 500000;

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

    CREDITOR_BALANCE_INSUFFICIENT: () => singleLineString`Creditor balance is insufficient`,

    CREDITOR_ALLOWANCE_INSUFFICIENT: () => singleLineString`Creditor allowance is insufficient`,

    ISSUANCE_CANCELLED: () => singleLineString`Issuance was cancelled`,

    DEBT_ORDER_ALREADY_ISSUED: () => singleLineString`Debt order has already been filled`,

    INVALID_DEBTOR_SIGNATURE: () => singleLineString`Debtor signature is not valid for debt order`,

    INVALID_CREDITOR_SIGNATURE: () =>
        singleLineString`Creditor signature is not valid for debt order`,

    INVALID_UNDERWRITER_SIGNATURE: () =>
        singleLineString`Underwriter signature is not valid for debt order`,
};

export class OrderAPI {
    private web3: Web3;
    private assert: Assertions;
    private contracts: ContractsAPI;

    public constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3 = web3;
        this.contracts = contracts;

        this.assert = new Assertions(this.web3);
    }

    public async fillAsync(debtOrder: DebtOrder, options?: TxData): Promise<string> {
        const transactionOptions = await this.getTxDefaultOptions();

        Object.assign(transactionOptions, options);

        const {
            debtKernel,
            debtToken,
            tokenTransferProxy,
        } = await this.contracts.loadDharmaContractsAsync(transactionOptions);

        await this.assertValidityInvariantsAsync(debtOrder, debtKernel, debtToken);
        this.assertConsensualityInvariants(debtOrder, transactionOptions);
        await this.assertExternalBalanceAndAllowanceInvariantsAsync(
            debtOrder,
            tokenTransferProxy,
            transactionOptions,
        );

        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        return debtKernel.fillDebtOrder.sendTransactionAsync(
            debtOrderWrapped.getCreditor(),
            debtOrderWrapped.getOrderAddresses(),
            debtOrderWrapped.getOrderValues(),
            debtOrderWrapped.getOrderBytes32(),
            debtOrderWrapped.getSignaturesV(),
            debtOrderWrapped.getSignaturesR(),
            debtOrderWrapped.getSignaturesS(),
            transactionOptions,
        );
    }

    private async assertValidityInvariantsAsync(
        debtOrder: DebtOrder,
        debtKernel: DebtKernelContract,
        debtToken: DebtTokenContract,
    ): Promise<void> {
        this.assert.order.validDebtorFee(debtOrder, OrderAPIErrors.INVALID_DEBTOR_FEE());
        this.assert.order.validUnderwriterFee(debtOrder, OrderAPIErrors.INVALID_UNDERWRITER_FEE());
        this.assert.order.validRelayerFee(debtOrder, OrderAPIErrors.INVALID_RELAYER_FEE());
        this.assert.order.validFees(debtOrder, OrderAPIErrors.INVALID_FEES());
        this.assert.order.notExpired(debtOrder, OrderAPIErrors.EXPIRED());

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
            OrderAPIErrors.DEBT_ORDER_ALREADY_ISSUED(),
        );
    }

    private assertConsensualityInvariants(debtOrder: DebtOrder, transactionOptions: object) {
        this.assert.order.validDebtorSignature(
            debtOrder,
            transactionOptions,
            OrderAPIErrors.INVALID_DEBTOR_SIGNATURE(),
        );

        this.assert.order.validCreditorSignature(
            debtOrder,
            transactionOptions,
            OrderAPIErrors.INVALID_CREDITOR_SIGNATURE(),
        );

        this.assert.order.validUnderwriterSignature(
            debtOrder,
            transactionOptions,
            OrderAPIErrors.INVALID_UNDERWRITER_SIGNATURE(),
        );
    }

    private async assertExternalBalanceAndAllowanceInvariantsAsync(
        debtOrder: DebtOrder,
        tokenTransferProxy: TokenTransferProxyContract,
        transactionOptions: object,
    ): Promise<void> {
        const principalToken = await this.contracts.loadERC20TokenAsync(
            debtOrder.principalToken,
            transactionOptions,
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

    private async getTxDefaultOptions(): Promise<object> {
        const web3Utils = new Web3Utils(this.web3);

        const accounts = await web3Utils.getAvailableAddressesAsync();

        // TODO: Add fault tolerance to scenario in which not addresses are available

        return {
            from: accounts[0],
            gas: ORDER_FILL_GAS_MAXIMUM,
        };
    }
}
