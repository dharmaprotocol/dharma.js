import * as Web3 from "web3";
import { ContractsAPI } from "../apis";
import { CollateralizedTermsContractParameters } from "./collateralized_simple_interest_loan_adapter";
export declare class CollateralizedLoanTerms {
    private assert;
    constructor(web3: Web3, contractsAPI: ContractsAPI);
    packParameters(params: CollateralizedTermsContractParameters): string;
    unpackParameters(packedParams: string): CollateralizedTermsContractParameters;
    assertValidParams(params: CollateralizedTermsContractParameters): void;
    private assertCollateralTokenIndexWithinBounds(collateralTokenIndex);
    private assertCollateralAmountWithinBounds(collateralAmount);
    private assertGracePeriodInDaysWithinBounds(gracePeriodInDays);
}
