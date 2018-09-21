import { BigNumber } from "../../../utils/bignumber";

import { ECDSASignature } from "../ecdsa_signature";

/**
 * A price that has been signed by some price feed.
 */
export interface SignedPrice {
    // The address of the token being priced.
    tokenAddress: string;
    // The price given by the price feed operator.
    tokenPrice: BigNumber;
    // A Unix timestamp for the time at which this price was generated.
    timestamp: BigNumber;
    // The signature of the price feed operator attesting to this price.
    operatorSignature: ECDSASignature;
}
