import { BigNumber } from "utils/bignumber";

export interface CollateralizedTermsContractParameters {
    collateralTokenIndex: BigNumber;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}
