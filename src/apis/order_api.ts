import Web3 from "web3";
import { Web3Wrapper } from "@0xproject/web3-wrapper";
import { DebtOrder, DharmaConfig, TxData } from "../types";
import {
    DebtKernelContract,
    DebtOrderWrapper,
    DebtTokenContract,
    ERC20Contract,
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
    private config: DharmaConfig;
    private assert: Assertions;

    public constructor(web3: Web3, config?: DharmaConfig) {
        this.web3 = web3;
        this.assert = new Assertions(this.web3);
        this.config = config || {};
    }

    public async fillAsync(debtOrder: DebtOrder, options?: TxData): Promise<string> {
        const transactionOptions = await this.getTxDefaultOptions();

        Object.assign(transactionOptions, options);

        const [debtKernel, debtToken, tokenTransferProxy] = await this.loadDharmaContractsAsync(
            transactionOptions,
        );

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
        const principalToken = await this.loadERC20TokenAsync(
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

    private async loadDharmaContractsAsync(
        transactionOptions: object,
    ): Promise<[DebtKernelContract, DebtTokenContract, TokenTransferProxyContract]> {
        const debtKernel = await this.loadDebtKernelAsync(transactionOptions);
        const debtToken = await this.loadDebtTokenAsync(transactionOptions);
        const tokenTransferProxy = await this.loadTokenTransferProxyAsync(transactionOptions);

        return [debtKernel, debtToken, tokenTransferProxy];
    }

    // TODO: Provide mechanism for user to specify what debt kernel contract they want to interact
    //  with, probably best done in the initialization of dharma.js
    private async loadDebtKernelAsync(transactionOptions: object): Promise<DebtKernelContract> {
        if (this.config.kernelAddress) {
            return DebtKernelContract.at(this.config.kernelAddress, this.web3, transactionOptions);
        }

        return DebtKernelContract.deployed(this.web3, transactionOptions);
    }

    // TODO: Provide mechanism for user to specify what debt token contract they want to interact
    //  with, probably best done in the initialization of dharma.js
    private async loadDebtTokenAsync(transactionOptions: object): Promise<DebtTokenContract> {
        if (this.config.tokenAddress) {
            return DebtTokenContract.at(this.config.tokenAddress, this.web3, transactionOptions);
        }

        return DebtTokenContract.deployed(this.web3, transactionOptions);
    }

    // TODO: Provide mechanism for user to specify what token transfer proxy contract they want to interact
    //  with, probably best done in the initialization of dharma.js
    private async loadTokenTransferProxyAsync(
        transactionOptions: object,
    ): Promise<TokenTransferProxyContract> {
        if (this.config.tokenTransferProxyAddress) {
            return TokenTransferProxyContract.at(
                this.config.tokenTransferProxyAddress,
                this.web3,
                transactionOptions,
            );
        }

        return TokenTransferProxyContract.deployed(this.web3, transactionOptions);
    }

    private async loadERC20TokenAsync(
        tokenAddress: string,
        transactionOptions: object,
    ): Promise<ERC20Contract> {
        return ERC20Contract.at(tokenAddress, this.web3, transactionOptions);
    }

    private async getTxDefaultOptions(): Promise<object> {
        const web3Wrapper = new Web3Wrapper(this.web3.currentProvider);

        const accounts = await web3Wrapper.getAvailableAddressesAsync();

        // TODO: Add fault tolerance to scenario in which not addresses are available

        return {
            from: accounts[0],
            gas: ORDER_FILL_GAS_MAXIMUM,
        };
    }
}
