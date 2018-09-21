import { DebtOfferData, DebtOrderData, SignedPrice } from "./index";

export interface LoanOfferData {
    // Signed by debtor.
    debtOrderData: DebtOrderData;
    // Signed by price-feed operator.
    principalTokenPrice: SignedPrice;
    collateralTokenPrice: SignedPrice;
    // Signed by creditor.
    debtOfferData: DebtOfferData;
}
