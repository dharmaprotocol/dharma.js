import { BigNumber } from "utils/bignumber";

export namespace TermsContractParameters {
    export function generateHexValueOfLength(length: number): string {
        return "0x" + "f".repeat(length);
    }

    export function bitShiftLeft(target: BigNumber, numPlaces: number): BigNumber {
        const binaryTargetString = target.toString(2);
        const binaryTargetStringShifted = binaryTargetString + "0".repeat(numPlaces);
        return new BigNumber(binaryTargetStringShifted, 2);
    }
}
