import * as Web3 from "web3";
import { ContractsAPI } from "src/apis";
import { Assertions } from "src/invariants";
import { BigNumber } from "utils/bignumber";

export interface CollateralizedTermsContractParameters {
    collateralTokenIndex: BigNumber;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}

export class CollateralizedLoanTerms {
    private assert: Assertions;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.assert = new Assertions(web3, contracts);
    }

    public packParameters(params: CollateralizedTermsContractParameters): string {
        const { collateralTokenIndex, collateralAmount, gracePeriodInDays } = params;

        const collateralTokenIndexShifted = this.bitShiftLeft(collateralTokenIndex, 100);
        const collateralAmountShifted = this.bitShiftLeft(collateralAmount, 8);
        const gracePeriodInDaysShifted = this.bitShiftLeft(gracePeriodInDays, 0);

        const baseTenParameters = collateralTokenIndexShifted
            .plus(collateralAmountShifted)
            .plus(gracePeriodInDaysShifted);

        return `0x${baseTenParameters.toString(16).padStart(64, "0")}`;
    }

    private bitShiftLeft(target: BigNumber, numPlaces: number): BigNumber {
        const binaryTargetString = target.toString(2);
        const binaryTargetStringShifted = binaryTargetString + "0".repeat(numPlaces);
        return new BigNumber(binaryTargetStringShifted, 2);
    }
}
