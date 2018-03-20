import { DebtOrder, TxData } from "../types";
import { BigNumber } from "../../utils/bignumber";
import { NULL_ADDRESS } from "../../utils/constants";
import {
    DebtTokenContract,
    DebtOrderWrapper,
    DebtKernelContract,
    TokenTransferProxyContract,
    ERC20Contract,
} from "../wrappers";
import { signatureUtils } from "../../utils/signature_utils";
import * as moment from "moment";
import { ContractsAPI } from "../apis";

export class OrderAssertions {
    private contracts: ContractsAPI;

    public constructor(contracts: ContractsAPI) {
        this.contracts = contracts;
    }

    /*
        Validity Invariants
    */

    // principal >= debtor fee
    public validDebtorFee(debtOrder: DebtOrder, errorMessage: string) {
        if (debtOrder.principalAmount.lt(debtOrder.debtorFee)) {
            throw new Error(errorMessage);
        }
    }

    // If no underwriter is specified, underwriter fees must be 0
    public validUnderwriterFee(debtOrder: DebtOrder, errorMessage: string) {
        if (
            (!debtOrder.underwriter || debtOrder.underwriter === NULL_ADDRESS) &&
            debtOrder.underwriterFee.gt(0)
        ) {
            throw new Error(errorMessage);
        }
    }

    // If no relayer is specified, relayer fees must be 0
    public validRelayerFee(debtOrder: DebtOrder, errorMessage: string) {
        if (
            (!debtOrder.relayer || debtOrder.relayer === NULL_ADDRESS) &&
            debtOrder.relayerFee.gt(0)
        ) {
            throw new Error(errorMessage);
        }
    }

    // creditorFee + debtorFee == relayerFee + underwriterFee
    public validFees(debtOrder: DebtOrder, errorMessage: string) {
        const feesContributed = debtOrder.creditorFee.add(debtOrder.debtorFee);
        const feesDistributed = debtOrder.relayerFee.add(debtOrder.underwriterFee);
        if (!feesContributed.eq(feesDistributed)) {
            throw new Error(errorMessage);
        }
    }

    // Debt order must not be expired
    public notExpired(debtOrder: DebtOrder, errorMessage: string) {
        if (debtOrder.expirationTimestampInSec.lt(moment().unix())) {
            throw new Error(errorMessage);
        }
    }

    // Debt cannot already have been issued
    public async notAlreadyIssuedAsync(
        debtOrder: DebtOrder,
        debtToken: DebtTokenContract,
        errorMessage: string,
    ) {
        const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
            debtOrder,
            this.contracts,
        );

        const getOwnerAddress = await debtToken.ownerOf.callAsync(
            new BigNumber(debtOrderWrapped.getIssuanceCommitmentHash()),
        );
        if (getOwnerAddress !== NULL_ADDRESS) {
            throw new Error(errorMessage);
        }
    }

    // Debt order cannot have been cancelled
    public async debtOrderNotCancelledAsync(
        debtOrder: DebtOrder,
        debtKernel: DebtKernelContract,
        errorMessage: string,
    ) {
        const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
            debtOrder,
            this.contracts,
        );
        if (
            await debtKernel.debtOrderCancelled.callAsync(
                debtOrderWrapped.getDebtorCommitmentHash(),
            )
        ) {
            throw new Error(errorMessage);
        }
    }

    // Issuance cannot have been cancelled
    public async issuanceNotCancelledAsync(
        debtOrder: DebtOrder,
        debtKernel: DebtKernelContract,
        errorMessage: string,
    ) {
        const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
            debtOrder,
            this.contracts,
        );
        if (
            await debtKernel.issuanceCancelled.callAsync(
                debtOrderWrapped.getIssuanceCommitmentHash(),
            )
        ) {
            throw new Error(errorMessage);
        }
    }

    public senderAuthorizedToCancelOrder(
        debtOrder: DebtOrder,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        if (debtOrder.debtor !== transactionOptions.from) {
            throw new Error(errorMessage);
        }
    }

    public senderAuthorizedToCancelIssuance(
        debtOrder: DebtOrder,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        if (
            debtOrder.debtor !== transactionOptions.from &&
            debtOrder.underwriter !== transactionOptions.from
        ) {
            throw new Error(errorMessage);
        }
    }

    /*
        Consensuality Invariants
    */

    // If message sender not debtor, debtor signature must be valid
    public async validDebtorSignature(
        debtOrder: DebtOrder,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
            debtOrder,
            this.contracts,
        );
        if (transactionOptions.from !== debtOrder.debtor) {
            if (
                !signatureUtils.isValidSignature(
                    debtOrderWrapped.getDebtorCommitmentHash(),
                    debtOrder.debtorSignature,
                    debtOrder.debtor,
                )
            ) {
                throw new Error(errorMessage);
            }
        }
    }

    // If message sender not creditor, creditor signature must be valid
    public async validCreditorSignature(
        debtOrder: DebtOrder,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
            debtOrder,
            this.contracts,
        );
        if (transactionOptions.from !== debtOrder.creditor) {
            if (
                !signatureUtils.isValidSignature(
                    debtOrderWrapped.getCreditorCommitmentHash(),
                    debtOrder.creditorSignature,
                    debtOrder.creditor,
                )
            ) {
                throw new Error(errorMessage);
            }
        }
    }

    // If message sender not underwriter AND underwriter exists, underwriter signature must be valid
    public async validUnderwriterSignature(
        debtOrder: DebtOrder,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
            debtOrder,
            this.contracts,
        );
        if (transactionOptions.from !== debtOrder.underwriter) {
            if (
                !signatureUtils.isValidSignature(
                    debtOrderWrapped.getUnderwriterCommitmentHash(),
                    debtOrder.underwriterSignature,
                    debtOrder.underwriter,
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
        debtOrder: DebtOrder,
        principalToken: ERC20Contract,
        errorMessage: string,
    ) {
        const creditorBalance = await principalToken.balanceOf.callAsync(debtOrder.creditor);
        if (creditorBalance.lt(debtOrder.principalAmount.add(debtOrder.creditorFee))) {
            throw new Error(errorMessage);
        }
    }

    // Creditor Allowance to TokenTransferProxy >= principal + creditorFee
    public async sufficientCreditorAllowanceAsync(
        debtOrder: DebtOrder,
        principalToken: ERC20Contract,
        tokenTransferProxy: TokenTransferProxyContract,
        errorMessage: string,
    ) {
        const creditorAllowance = await principalToken.allowance.callAsync(
            debtOrder.creditor,
            tokenTransferProxy.address,
        );

        if (creditorAllowance.lt(debtOrder.principalAmount.add(debtOrder.creditorFee))) {
            throw new Error(errorMessage);
        }
    }
}
