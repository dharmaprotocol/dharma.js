import { Dharma } from "../../../../src";

import { BigNumber } from "../../../../utils/bignumber";

import { SignedPrice } from "../../../../src/types/loan_offer/signed_price";

import { SignatureUtils } from "../../../../utils/signature_utils";

import { Web3Utils } from "../../../../utils/web3_utils";

export async function generateSignedPrice(
    dharma: Dharma,
    priceProvider: string,
    tokenAddress: string,
    tokenPriceAsNumber: number,
    timestampAsNumber: number,
): Promise<SignedPrice> {
    const tokenPrice = new BigNumber(tokenPriceAsNumber);
    const timestamp = new BigNumber(timestampAsNumber);

    const priceHash = Web3Utils.soliditySHA3(tokenAddress, tokenPrice, timestamp);

    const operatorSignature = await dharma.sign.signPayloadWithAddress(
        priceHash,
        priceProvider,
        false,
    );

    return { tokenAddress, tokenPrice, timestamp, operatorSignature };
}
