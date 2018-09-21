import { BigNumber } from "../../utils/bignumber";

import { ECDSASignature } from "./ecdsa_signature";

/**
 * A price that has been signed by some price feed.
 */
interface SignedPrice {
    // The symbol of the token being priced, e.g. "REP".
    tokenSymbol: string;
    // The price given by the price feed operator.
    tokenPrice: BigNumber;
    // A Unix timestamp for the time at which this price was generated.
    timestamp: BigNumber;
    // The signature of the price feed operator attesting to this price.
    operatorSignature: ECDSASignature;
}
