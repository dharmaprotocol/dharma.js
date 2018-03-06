import { BigNumber } from "../../utils/bignumber";
import { ECDSASignature, DebtOrder, IssuanceCommitment } from "../types";
import { Web3Utils } from "../../utils/web3_utils";
import { NULL_ADDRESS, NULL_BYTES32, NULL_ECDSA_SIGNATURE } from "../../utils/constants";
import { ContractsAPI } from "../apis";
import * as moment from "moment";
import * as assignDefaults from "lodash.defaults";

const DEFAULTS = {
    kernelVersion: NULL_ADDRESS,
    issuanceVersion: NULL_ADDRESS,
    principalAmount: new BigNumber(0),
    principalToken: NULL_ADDRESS,
    debtor: NULL_ADDRESS,
    debtorFee: new BigNumber(0),
    creditor: NULL_ADDRESS,
    creditorFee: new BigNumber(0),
    relayer: NULL_ADDRESS,
    relayerFee: new BigNumber(0),
    underwriter: NULL_ADDRESS,
    underwriterFee: new BigNumber(0),
    underwriterRiskRating: new BigNumber(0),
    termsContract: NULL_ADDRESS,
    termsContractParameters: NULL_BYTES32,
    expirationTimestampInSec: new BigNumber(
        moment()
            .add(30, "days")
            .unix(),
    ),
    issuanceBlockTimestamp: new BigNumber(moment().unix()),
    salt: new BigNumber(0),
    debtorSignature: NULL_ECDSA_SIGNATURE,
    creditorSignature: NULL_ECDSA_SIGNATURE,
    underWriterSignature: NULL_ECDSA_SIGNATURE,
};

export class DebtOrderWrapper {
    private debtOrder: DebtOrder;

    constructor(debtOrder: DebtOrder) {
        this.debtOrder = Object.assign({}, debtOrder);

        assignDefaults(this.debtOrder, DEFAULTS);
    }

    public static async applyNetworkDefaults(
        debtOrder: DebtOrder,
        contracts: ContractsAPI,
    ): Promise<DebtOrderWrapper> {
        const debtKernel = await contracts.loadDebtKernelAsync();
        const repaymentRouter = await contracts.loadRepaymentRouterAsync();

        return new DebtOrderWrapper({
            kernelVersion: debtOrder.kernelVersion || debtKernel.address,
            issuanceVersion: debtOrder.issuanceVersion || repaymentRouter.address,
            ...debtOrder,
        });
    }

    public getCreditor(): string {
        return this.debtOrder.creditor;
    }

    /**
     * Returns the subset of the debt order we refer to as the "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Issuance commitment associated with this debt order
     */
    public getIssuanceCommitment(): IssuanceCommitment {
        return IssuanceCommitment.fromDebtOrder(this.debtOrder);
    }

    /**
     * Returns the hash of this debt order's "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Hash of the issuance commitment associated with this debt order.
     */
    public getIssuanceCommitmentHash(): string {
        return this.getIssuanceCommitment().getHash();
    }

    /**
     * Returns the hash of the debt order in its entirety, in the order defined
     * in the Dharma whitepaper.
     * See https://whitepaper.dharma.io/#debtorcreditor-commitment-hash
     *
     * @return The debt order's hash
     */
    public getHash(): string {
        return Web3Utils.soliditySHA3(
            this.debtOrder.kernelVersion,
            this.getIssuanceCommitmentHash(),
            this.debtOrder.underwriterFee,
            this.debtOrder.principalAmount,
            this.debtOrder.principalToken,
            this.debtOrder.debtorFee,
            this.debtOrder.creditorFee,
            this.debtOrder.relayer,
            this.debtOrder.relayerFee,
            this.debtOrder.expirationTimestampInSec,
        );
    }

    /**
     * Returns the debt agreement's unique identifier --
     * an alias for the issuance commitment hash cast to a BigNumber
     *
     * @return Debt agreement id.
     */
    public getDebtAgreementId(): BigNumber {
        return new BigNumber(this.getHash());
    }

    /**
     * Returns the payload that a debtor must sign in order to
     * indicate her consent to the parameters of the debt order --
     * which is, currently, the debt order's hash.
     *
     * @return Debtor commitment hash
     */
    public getDebtorCommitmentHash(): string {
        return this.getHash();
    }

    /**
     * Returns the payload that a creditor must sign in order to
     * indicate her consent to the parameters of the debt order --
     * which is, currently, the debt order's hash.
     *
     * @return
     * creditor commitment hash
     */
    public getCreditorCommitmentHash(): string {
        return this.getHash();
    }

    /**
     * Returns the payload that an underwriter must sign in order to
     * indicate her consent to the parameters of the debt order, as
     * defined in the Dharma whitepaper.
     *
     * See https://whitepaper.dharma.io/#underwriter-commitment-hash
     *
     * @return Underwriter commitment hash
     */
    public getUnderwriterCommitmentHash(): string {
        return Web3Utils.soliditySHA3(
            this.debtOrder.kernelVersion,
            this.getIssuanceCommitmentHash(),
            this.debtOrder.underwriterFee,
            this.debtOrder.principalAmount,
            this.debtOrder.principalToken,
            this.debtOrder.expirationTimestampInSec,
        );
    }

    public getOrderAddresses(): string[] {
        return [
            this.debtOrder.issuanceVersion,
            this.debtOrder.debtor,
            this.debtOrder.underwriter,
            this.debtOrder.termsContract,
            this.debtOrder.principalToken,
            this.debtOrder.relayer,
        ];
    }

    public getOrderValues(): BigNumber[] {
        return [
            this.debtOrder.underwriterRiskRating,
            this.debtOrder.salt,
            this.debtOrder.principalAmount,
            this.debtOrder.underwriterFee,
            this.debtOrder.relayerFee,
            this.debtOrder.creditorFee,
            this.debtOrder.debtorFee,
            this.debtOrder.expirationTimestampInSec,
        ];
    }

    public getOrderBytes32(): string[] {
        return [this.debtOrder.termsContractParameters];
    }

    public getSignaturesR(): string[] {
        const [debtorSignature, creditorSignature, underwriterSignature] = this.getSignatures();

        return [debtorSignature.r, creditorSignature.r, underwriterSignature.r];
    }

    public getSignaturesS(): string[] {
        const [debtorSignature, creditorSignature, underwriterSignature] = this.getSignatures();

        return [debtorSignature.s, creditorSignature.s, underwriterSignature.s];
    }

    public getSignaturesV(): number[] {
        const [debtorSignature, creditorSignature, underwriterSignature] = this.getSignatures();

        return [debtorSignature.v, creditorSignature.v, underwriterSignature.v];
    }

    /*
     * Getters
     */

    public getDebtOrder(): DebtOrder {
        return this.debtOrder;
    }

    private getSignatures(): ECDSASignature[] {
        let { debtorSignature, creditorSignature, underwriterSignature } = this.debtOrder;

        debtorSignature = debtorSignature || NULL_ECDSA_SIGNATURE;
        creditorSignature = creditorSignature || NULL_ECDSA_SIGNATURE;
        underwriterSignature = underwriterSignature || NULL_ECDSA_SIGNATURE;

        return [debtorSignature, creditorSignature, underwriterSignature];
    }
}
