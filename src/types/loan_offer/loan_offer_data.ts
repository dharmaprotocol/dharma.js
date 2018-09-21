import { DebtOfferData} from "./debt_offer_data";

import { SignedPrice} from "./signed_price";

import { DebtOrderData } from "../";

export interface LoanOfferData {
    // Signed by debtor.
    debtOrderData: DebtOrderData;
    // Signed by price-feed operator.
    principalTokenPrice: SignedPrice;
    collateralTokenPrice: SignedPrice;
    // Signed by creditor.
    debtOfferData: DebtOfferData;
}
