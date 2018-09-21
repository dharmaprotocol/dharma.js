import { SignedPrice } from "./signed_price";
import { DebtOfferData } from "./debt_offer_data";
import { DebtOrderData } from "./debt_order_data";

export interface LoanOfferData {
    // Signed by debtor.
    debtOrderData: DebtOrderData;
    // Signed by price-feed operator.
    principalTokenPrice: SignedPrice;
    collateralTokenPrice: SignedPrice;
    // Signed by creditor.
    debtOfferData: DebtOfferData;
}
