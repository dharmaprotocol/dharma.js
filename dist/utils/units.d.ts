import { BigNumber } from "./bignumber";
declare const ether: (decimalAmount: number) => BigNumber;
declare const gwei: (decimalAmount: number) => BigNumber;
declare const percent: (decimalAmount: number) => BigNumber;
export { ether, gwei, percent };
