// external
import { BigNumber } from "../../utils/bignumber";
import * as moment from "moment";
import * as assignDefaults from "lodash.defaults";

// apis
import { ContractsAPI } from "../apis/";

// utils
import { NULL_ADDRESS, NULL_BYTES32, NULL_ECDSA_SIGNATURE } from "../../utils/constants";
import { ECDSASignature } from "./ecdsa_signature";

export const DEBT_ORDER_DEFAULTS = {
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
    salt: new BigNumber(0),
    debtorSignature: NULL_ECDSA_SIGNATURE,
    creditorSignature: NULL_ECDSA_SIGNATURE,
    underwriterSignature: NULL_ECDSA_SIGNATURE,
};

export namespace DebtOrder {
    export interface DebtOrderInterface {
        kernelVersion?: string;
        issuanceVersion?: string;
        principalAmount?: BigNumber;
        principalToken?: string;
        debtor?: string;
        debtorFee?: BigNumber;
        creditor?: string;
        creditorFee?: BigNumber;
        relayer?: string;
        relayerFee?: BigNumber;
        underwriter?: string;
        underwriterFee?: BigNumber;
        underwriterRiskRating?: BigNumber;
        termsContract?: string;
        termsContractParameters?: string;
        expirationTimestampInSec?: BigNumber;
        salt?: BigNumber;

        // Signatures
        debtorSignature?: ECDSASignature;
        creditorSignature?: ECDSASignature;
        underwriterSignature?: ECDSASignature;
    }

    export async function applyNetworkDefaults(
        debtOrder: DebtOrderInterface,
        contracts: ContractsAPI,
    ): Promise<DebtOrderInterface> {
        const debtKernel = await contracts.loadDebtKernelAsync();
        const repaymentRouter = await contracts.loadRepaymentRouterAsync();

        const networkDefaults = {
            ...DEBT_ORDER_DEFAULTS,
            kernelVersion: debtKernel.address,
            issuanceVersion: repaymentRouter.address,
        };

        return assignDefaults(debtOrder, networkDefaults);
    }
}
