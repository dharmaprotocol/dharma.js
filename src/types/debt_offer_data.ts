import { BigNumber } from "../../utils/bignumber";

import { ECDSASignature } from "./ecdsa_signature";

/**
 * Contains the terms, using types compatible for sending to a blockchain contract, for which a
 * creditor would be willing to enter into a debt agreement.
 */
export interface DebtOfferData {
    // The amount that the creditor is willing to lend.
    principalAmount: BigNumber;
    // The symbol of acceptance collateral, e.g. "REP".
    collateralTokenSymbol: string;
    // The maximum loan-to-value ratio acceptable to this creditor, e.g. 50%.
    maxLoanToValuePercent: BigNumber;
    // The maximum time at which the offer will still be valid, as a Unix timestamp.
    expirationTimestamp: number;
    // The address of the decision engine that will validate the terms of the offer.
    decisionEngineAddress: string;
    // The creditor signs this offer data.
    creditorSignature: ECDSASignature;
}
