import Web3 from "web3";
import { Web3Wrapper } from "@0xproject/web3-wrapper";
import { DebtOrder, DharmaConfig, TxData } from "../types";
import { ACCOUNTS } from "__test__/accounts";
import {
    DebtKernelContract,
    DebtOrderWrapper,
    DebtTokenContract,
    DummyTokenContract,
    DummyTokenRegistryContract,
    ERC20Contract,
    TokenTransferProxyContract,
} from "../wrappers";
import { Assertions } from "../invariants";
import promisify from "tiny-promisify";
import singleLineString from "single-line-string";
import * as Units from "utils/units";

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

    DEBT_ORDER_ALREADY_ISSUED: () => singleLineString`Debt order has already been issued`,

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

    public async fill(debtOrder: DebtOrder, options?: TxData): Promise<string> {
        const transactionDefaults = await this.getTxDefaultOptions();

        Object.assign(transactionDefaults, options);

        const debtKernel = await this.loadDebtKernel(transactionDefaults);
        const debtToken = await this.loadDebtToken(transactionDefaults);
        const tokenTransferProxy = await this.loadTokenTransferProxy(transactionDefaults);
        const principalToken = await this.loadERC20Token(
            debtOrder.principalToken,
            transactionDefaults,
        );

        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        this.assert.order.validDebtorFee(debtOrder, OrderAPIErrors.INVALID_DEBTOR_FEE());
        this.assert.order.validUnderwriterFee(debtOrder, OrderAPIErrors.INVALID_UNDERWRITER_FEE());
        this.assert.order.validRelayerFee(debtOrder, OrderAPIErrors.INVALID_RELAYER_FEE());
        this.assert.order.validFees(debtOrder, OrderAPIErrors.INVALID_FEES());
        this.assert.order.notExpired(debtOrder, OrderAPIErrors.EXPIRED());

        await this.assert.order.debtOrderNotCancelled(
            debtOrder,
            debtKernel,
            OrderAPIErrors.ORDER_CANCELLED(),
        );

        await this.assert.order.issuanceNotCancelled(
            debtOrder,
            debtKernel,
            OrderAPIErrors.ISSUANCE_CANCELLED(),
        );

        await this.assert.order.notAlreadyIssued(
            debtOrder,
            debtToken,
            OrderAPIErrors.DEBT_ORDER_ALREADY_ISSUED(),
        );

        this.assert.order.validDebtorSignature(
            debtOrder,
            transactionDefaults,
            OrderAPIErrors.INVALID_DEBTOR_SIGNATURE(),
        );

        this.assert.order.validCreditorSignature(
            debtOrder,
            transactionDefaults,
            OrderAPIErrors.INVALID_CREDITOR_SIGNATURE(),
        );

        this.assert.order.validUnderwriterSignature(
            debtOrder,
            transactionDefaults,
            OrderAPIErrors.INVALID_UNDERWRITER_SIGNATURE(),
        );

        await this.assert.order.sufficientCreditorBalance(
            debtOrder,
            principalToken,
            OrderAPIErrors.CREDITOR_BALANCE_INSUFFICIENT(),
        );

        await this.assert.order.sufficientCreditorAllowance(
            debtOrder,
            principalToken,
            tokenTransferProxy,
            OrderAPIErrors.CREDITOR_ALLOWANCE_INSUFFICIENT(),
        );

        return debtKernel.fillDebtOrder.sendTransactionAsync(
            debtOrderWrapped.getCreditor(),
            debtOrderWrapped.getOrderAddresses(),
            debtOrderWrapped.getOrderValues(),
            debtOrderWrapped.getOrderBytes32(),
            debtOrderWrapped.getSignaturesV(),
            debtOrderWrapped.getSignaturesR(),
            debtOrderWrapped.getSignaturesS(),
            options,
        );
    }

    // TODO: Provide mechanism for user to specify what debt kernel contract they want to interact
    //  with, probably best done in the initialization of dharma.js
    private async loadDebtKernel(transactionDefaults: object): Promise<DebtKernelContract> {
        if (this.config.kernelAddress) {
            return DebtKernelContract.at(this.config.kernelAddress, this.web3, transactionDefaults);
        }

        return DebtKernelContract.deployed(this.web3, transactionDefaults);
    }

    // TODO: Provide mechanism for user to specify what debt token contract they want to interact
    //  with, probably best done in the initialization of dharma.js
    private async loadDebtToken(transactionDefaults: object): Promise<DebtTokenContract> {
        if (this.config.tokenAddress) {
            return DebtTokenContract.at(this.config.tokenAddress, this.web3, transactionDefaults);
        }

        return DebtTokenContract.deployed(this.web3, transactionDefaults);
    }

    // TODO: Provide mechanism for user to specify what token transfer proxy contract they want to interact
    //  with, probably best done in the initialization of dharma.js
    private async loadTokenTransferProxy(
        transactionDefaults: object,
    ): Promise<TokenTransferProxyContract> {
        if (this.config.tokenTransferProxyAddress) {
            return TokenTransferProxyContract.at(
                this.config.tokenTransferProxyAddress,
                this.web3,
                transactionDefaults,
            );
        }

        return TokenTransferProxyContract.deployed(this.web3, transactionDefaults);
    }

    private async loadERC20Token(
        tokenAddress: string,
        transactionDefaults: object,
    ): Promise<ERC20Contract> {
        return ERC20Contract.at(tokenAddress, this.web3, transactionDefaults);
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
