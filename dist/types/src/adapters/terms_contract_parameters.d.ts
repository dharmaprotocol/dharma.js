import { BigNumber } from "../../utils/bignumber";
export declare namespace TermsContractParameters {
    function generateHexValueOfLength(length: number): string;
    function bitShiftLeft(target: BigNumber, numPlaces: number): BigNumber;
    function isDecimalValue(value: BigNumber): boolean;
}
