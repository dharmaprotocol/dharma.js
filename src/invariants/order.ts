// External libraries
import * as Web3 from "web3";

// Utils
import { BigNumber } from "../../utils/bignumber";
import { NULL_ADDRESS } from "../../utils/constants";
import { SignatureUtils } from "../../utils/signature_utils";
import { TransactionUtils } from "../../utils/transaction_utils";
import { Web3Utils } from "../../utils/web3_utils";

// APIs
import { ContractsAPI } from "../apis";

// Types
import { DebtOrderData, TxData } from "../types";

// Wrappers
import {
    DebtKernelContract,
    DebtOrderDataWrapper,
    DebtTokenContract,
    ERC20Contract,
    TokenTransferProxyContract,
} from "../wrappers";

import applyNetworkDefaults = TransactionUtils.applyNetworkDefaults;

const BLOCK_TIME_ESTIMATE_SECONDS = 14;

export class OrderAssertions {
    private web3Utils: Web3Utils;
    private contracts: ContractsAPI;

    public constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3Utils = new Web3Utils(web3);
        this.contracts = contracts;
    }

    /*
        Validity Invariants
    */

    // principal >= debtor fee
    public validDebtorFee(debtOrderData: DebtOrderData, errorMessage: string) {
        if (debtOrderData.principalAmount.lt(debtOrderData.debtorFee)) {
            throw new Error(errorMessage);
        }
    }

    // If no underwriter is specified, underwriter fees must be 0
    public validUnderwriterFee(debtOrderData: DebtOrderData, errorMessage: string) {
        if (
            (!debtOrderData.underwriter || debtOrderData.underwriter === NULL_ADDRESS) &&
            debtOrderData.underwriterFee.gt(0)
        ) {
            throw new Error(errorMessage);
        }
    }

    // If no relayer is specified, relayer fees must be 0
    public validRelayerFee(debtOrderData: DebtOrderData, errorMessage: string) {
        if (
            (!debtOrderData.relayer || debtOrderData.relayer === NULL_ADDRESS) &&
            debtOrderData.relayerFee.gt(0)
        ) {
            throw new Error(errorMessage);
        }
    }

    // creditorFee + debtorFee == relayerFee + underwriterFee
    public validFees(debtOrderData: DebtOrderData, errorMessage: string) {
        const feesContributed = debtOrderData.creditorFee.plus(debtOrderData.debtorFee);
        const feesDistributed = debtOrderData.relayerFee.plus(debtOrderData.underwriterFee);
        if (!feesContributed.eq(feesDistributed)) {
            throw new Error(errorMessage);
        }
    }

    // Debt order must not be expired
    public async notExpired(debtOrderData: DebtOrderData, errorMessage: string) {
        const latestBlockTime = await this.web3Utils.getCurrentBlockTime();
        const approximateNextBlockTime = latestBlockTime + BLOCK_TIME_ESTIMATE_SECONDS;

        if (debtOrderData.expirationTimestampInSec.lt(approximateNextBlockTime)) {
            throw new Error(errorMessage);
        }
    }

    // Debt cannot already have been issued
    public async notAlreadyIssuedAsync(
        debtOrderData: DebtOrderData,
        debtToken: DebtTokenContract,
        errorMessage: string,
    ) {
        debtOrderData = await applyNetworkDefaults(debtOrderData, this.contracts);
        const debtOrderDataWrapped = new DebtOrderDataWrapper(debtOrderData);

        const orderIssued = await debtToken.exists.callAsync(
            new BigNumber(debtOrderDataWrapped.getIssuanceCommitmentHash()),
        );

        if (orderIssued) {
            throw new Error(errorMessage);
        }
    }

    /**
     * If the given DebtOrder is cancelled, throws the given errorMessage.
     *
     * @param {debtOrderData} DebtOrderData
     * @param {DebtKernelContract} debtKernel
     * @param {string} errorMessage
     * @returns {Promise<void>}
     */
    public async debtOrderNotCancelledAsync(
        debtOrderData: DebtOrderData,
        debtKernel: DebtKernelContract,
        errorMessage: string,
    ): Promise<void> {
        const orderCancelled = await this.isCancelled(debtOrderData, debtKernel);

        if (orderCancelled) {
            throw new Error(errorMessage);
        }
    }

    // Issuance cannot have been cancelled
    public async issuanceNotCancelledAsync(
        debtOrderData: DebtOrderData,
        debtKernel: DebtKernelContract,
        errorMessage: string,
    ) {
        debtOrderData = await applyNetworkDefaults(debtOrderData, this.contracts);
        const debtOrderDataWrapped = new DebtOrderDataWrapper(debtOrderData);

        if (
            await debtKernel.issuanceCancelled.callAsync(
                debtOrderDataWrapped.getIssuanceCommitmentHash(),
            )
        ) {
            throw new Error(errorMessage);
        }
    }

    public senderAuthorizedToCancelOrder(
        debtOrderData: DebtOrderData,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        if (debtOrderData.debtor !== transactionOptions.from) {
            throw new Error(errorMessage);
        }
    }

    public senderAuthorizedToCancelIssuance(
        debtOrderData: DebtOrderData,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        if (
            debtOrderData.debtor !== transactionOptions.from &&
            debtOrderData.underwriter !== transactionOptions.from
        ) {
            throw new Error(errorMessage);
        }
    }

    /*
        Consensuality Invariants
    */

    // If message sender not debtor, debtor signature must be valid
    public async validDebtorSignature(
        debtOrderData: DebtOrderData,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        const debtOrderDataWrapped = new DebtOrderDataWrapper(debtOrderData);

        if (transactionOptions.from !== debtOrderData.debtor) {
            if (
                !SignatureUtils.isValidSignature(
                    debtOrderDataWrapped.getDebtorCommitmentHash(),
                    debtOrderData.debtorSignature,
                    debtOrderData.debtor,
                )
            ) {
                throw new Error(errorMessage);
            }
        }
    }

    // If message sender not creditor, creditor signature must be valid
    public async validCreditorSignature(
        debtOrderData: DebtOrderData,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        debtOrderData = await applyNetworkDefaults(debtOrderData, this.contracts);
        const debtOrderDataWrapped = new DebtOrderDataWrapper(debtOrderData);

        if (transactionOptions.from !== debtOrderData.creditor) {
            if (
                !SignatureUtils.isValidSignature(
                    debtOrderDataWrapped.getCreditorCommitmentHash(),
                    debtOrderData.creditorSignature,
                    debtOrderData.creditor,
                )
            ) {
                throw new Error(errorMessage);
            }
        }
    }

    // If message sender not underwriter AND underwriter exists, underwriter signature must be valid
    public async validUnderwriterSignature(
        debtOrderData: DebtOrderData,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        debtOrderData = await applyNetworkDefaults(debtOrderData, this.contracts);
        const debtOrderDataWrapped = new DebtOrderDataWrapper(debtOrderData);

        if (transactionOptions.from !== debtOrderData.underwriter) {
            if (
                !SignatureUtils.isValidSignature(
                    debtOrderDataWrapped.getUnderwriterCommitmentHash(),
                    debtOrderData.underwriterSignature,
                    debtOrderData.underwriter,
                )
            ) {
                throw new Error(errorMessage);
            }
        }
    }

    /*
        External invariants
    */

    // Creditor balance > principal + fee
    public async sufficientCreditorBalanceAsync(
        debtOrderData: DebtOrderData,
        principalToken: ERC20Contract,
        errorMessage: string,
    ) {
        const creditorBalance = await principalToken.balanceOf.callAsync(debtOrderData.creditor);
        if (creditorBalance.lt(debtOrderData.principalAmount.plus(debtOrderData.creditorFee))) {
            throw new Error(errorMessage);
        }
    }

    // Creditor Allowance to TokenTransferProxy >= principal + creditorFee
    public async sufficientCreditorAllowanceAsync(
        debtOrderData: DebtOrderData,
        principalToken: ERC20Contract,
        tokenTransferProxy: TokenTransferProxyContract,
        errorMessage: string,
    ) {
        const creditorAllowance = await principalToken.allowance.callAsync(
            debtOrderData.creditor,
            tokenTransferProxy.address,
        );

        if (creditorAllowance.lt(debtOrderData.principalAmount.plus(debtOrderData.creditorFee))) {
            throw new Error(errorMessage);
        }
    }

    /*
        For collateralized debt orders.
     */

    public async sufficientCollateralizerAllowanceAsync(
        debtOrderData: DebtOrderData,
        collateralToken: ERC20Contract,
        collateralAmount: BigNumber,
        tokenTransferProxy: TokenTransferProxyContract,
        errorMessage: string,
    ) {
        const collateralizerAllowance = await collateralToken.allowance.callAsync(
            debtOrderData.debtor,
            tokenTransferProxy.address,
        );

        if (collateralizerAllowance.lt(collateralAmount)) {
            throw new Error(errorMessage);
        }
    }

    public async sufficientCollateralizerBalanceAsync(
        debtOrderData: DebtOrderData,
        collateralToken: ERC20Contract,
        collateralAmount: BigNumber,
        errorMessage: string,
    ) {
        const collateralizerBalance = await collateralToken.balanceOf.callAsync(
            debtOrderData.debtor,
        );

        if (collateralizerBalance.lt(collateralAmount)) {
            throw new Error(errorMessage);
        }
    }

    /**
     * Given a DebtOrder instance, eventually returns true if that DebtOrder has
     * been cancelled. Returns false otherwise.
     *
     * @example
     * await dharma.order.isCancelled(debtOrder, debtKernel);
     * => false
     *
     * @param {DebtOrderData} debtOrderData
     * @param {DebtKernelContract} debtKernel
     * @returns {Promise<boolean>}
     */
    private async isCancelled(
        debtOrderData: DebtOrderData,
        debtKernel: DebtKernelContract,
    ): Promise<boolean> {
        debtOrderData = await applyNetworkDefaults(debtOrderData, this.contracts);
        const debtOrderWrapped = new DebtOrderDataWrapper(debtOrderData);

        return debtKernel.debtOrderCancelled.callAsync(
            debtOrderWrapped.getDebtorCommitmentHash(),
        );
    }
}
