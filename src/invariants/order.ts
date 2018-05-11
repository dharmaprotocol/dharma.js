import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { NULL_ADDRESS } from "../../utils/constants";
import { SignatureUtils } from "../../utils/signature_utils";
import { Web3Utils } from "../../utils/web3_utils";
import { ContractsAPI } from "../apis";
import { DebtOrder, TxData } from "../types";
import {
    DebtKernelContract,
    DebtOrderWrapper,
    DebtTokenContract,
    ERC20Contract,
    TokenTransferProxyContract,
} from "../wrappers";

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
    public validDebtorFee(debtOrder: DebtOrder.DebtOrderInterface, errorMessage: string) {
        if (debtOrder.principalAmount.lt(debtOrder.debtorFee)) {
            throw new Error(errorMessage);
        }
    }

    // If no underwriter is specified, underwriter fees must be 0
    public validUnderwriterFee(debtOrder: DebtOrder.DebtOrderInterface, errorMessage: string) {
        if (
            (!debtOrder.underwriter || debtOrder.underwriter === NULL_ADDRESS) &&
            debtOrder.underwriterFee.gt(0)
        ) {
            throw new Error(errorMessage);
        }
    }

    // If no relayer is specified, relayer fees must be 0
    public validRelayerFee(debtOrder: DebtOrder.DebtOrderInterface, errorMessage: string) {
        if (
            (!debtOrder.relayer || debtOrder.relayer === NULL_ADDRESS) &&
            debtOrder.relayerFee.gt(0)
        ) {
            throw new Error(errorMessage);
        }
    }

    // creditorFee + debtorFee == relayerFee + underwriterFee
    public validFees(debtOrder: DebtOrder.DebtOrderInterface, errorMessage: string) {
        const feesContributed = debtOrder.creditorFee.plus(debtOrder.debtorFee);
        const feesDistributed = debtOrder.relayerFee.plus(debtOrder.underwriterFee);
        if (!feesContributed.eq(feesDistributed)) {
            throw new Error(errorMessage);
        }
    }

    // Debt order must not be expired
    public async notExpired(debtOrder: DebtOrder.DebtOrderInterface, errorMessage: string) {
        const latestBlockTime = await this.web3Utils.getCurrentBlockTime();
        const approximateNextBlockTime = latestBlockTime + BLOCK_TIME_ESTIMATE_SECONDS;

        if (debtOrder.expirationTimestampInSec.lt(approximateNextBlockTime)) {
            throw new Error(errorMessage);
        }
    }

    // Debt cannot already have been issued
    public async notAlreadyIssuedAsync(
        debtOrder: DebtOrder.DebtOrderInterface,
        debtToken: DebtTokenContract,
        errorMessage: string,
    ) {
        debtOrder = await DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        const orderIssued = await debtToken.exists.callAsync(
            new BigNumber(debtOrderWrapped.getIssuanceCommitmentHash()),
        );

        if (orderIssued) {
            throw new Error(errorMessage);
        }
    }

    // Debt order cannot have been cancelled
    public async debtOrderNotCancelledAsync(
        debtOrder: DebtOrder.DebtOrderInterface,
        debtKernel: DebtKernelContract,
        errorMessage: string,
    ) {
        debtOrder = await DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

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
        debtOrder: DebtOrder.DebtOrderInterface,
        debtKernel: DebtKernelContract,
        errorMessage: string,
    ) {
        debtOrder = await DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        if (
            await debtKernel.issuanceCancelled.callAsync(
                debtOrderWrapped.getIssuanceCommitmentHash(),
            )
        ) {
            throw new Error(errorMessage);
        }
    }

    public senderAuthorizedToCancelOrder(
        debtOrder: DebtOrder.DebtOrderInterface,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        if (debtOrder.debtor !== transactionOptions.from) {
            throw new Error(errorMessage);
        }
    }

    public senderAuthorizedToCancelIssuance(
        debtOrder: DebtOrder.DebtOrderInterface,
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
        debtOrder: DebtOrder.DebtOrderInterface,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        debtOrder = await DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        if (transactionOptions.from !== debtOrder.debtor) {
            if (
                !SignatureUtils.isValidSignature(
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
        debtOrder: DebtOrder.DebtOrderInterface,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        debtOrder = await DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        if (transactionOptions.from !== debtOrder.creditor) {
            if (
                !SignatureUtils.isValidSignature(
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
        debtOrder: DebtOrder.DebtOrderInterface,
        transactionOptions: TxData,
        errorMessage: string,
    ) {
        debtOrder = await DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

        if (transactionOptions.from !== debtOrder.underwriter) {
            if (
                !SignatureUtils.isValidSignature(
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
        debtOrder: DebtOrder.DebtOrderInterface,
        principalToken: ERC20Contract,
        errorMessage: string,
    ) {
        const creditorBalance = await principalToken.balanceOf.callAsync(debtOrder.creditor);
        if (creditorBalance.lt(debtOrder.principalAmount.plus(debtOrder.creditorFee))) {
            throw new Error(errorMessage);
        }
    }

    // Creditor Allowance to TokenTransferProxy >= principal + creditorFee
    public async sufficientCreditorAllowanceAsync(
        debtOrder: DebtOrder.DebtOrderInterface,
        principalToken: ERC20Contract,
        tokenTransferProxy: TokenTransferProxyContract,
        errorMessage: string,
    ) {
        const creditorAllowance = await principalToken.allowance.callAsync(
            debtOrder.creditor,
            tokenTransferProxy.address,
        );

        if (creditorAllowance.lt(debtOrder.principalAmount.plus(debtOrder.creditorFee))) {
            throw new Error(errorMessage);
        }
    }

    /*
        For collateralized debt orders.
     */

    public async sufficientCollateralizerAllowanceAsync(
        debtOrder: DebtOrder.DebtOrderInterface,
        collateralToken: ERC20Contract,
        collateralAmount: BigNumber,
        tokenTransferProxy: TokenTransferProxyContract,
        errorMessage: string,
    ) {
        const collateralizerAllowance = await collateralToken.allowance.callAsync(
            debtOrder.debtor,
            tokenTransferProxy.address,
        );

        if (collateralizerAllowance.lt(collateralAmount)) {
            throw new Error(errorMessage);
        }
    }

    public async sufficientCollateralizerBalanceAsync(
        debtOrder: DebtOrder.DebtOrderInterface,
        collateralToken: ERC20Contract,
        collateralAmount: BigNumber,
        errorMessage: string,
    ) {
        const collateralizerBalance = await collateralToken.balanceOf.callAsync(debtOrder.debtor);

        if (collateralizerBalance.lt(collateralAmount)) {
            throw new Error(errorMessage);
        }
    }
}
