import { BigNumber } from "./bignumber";

const ether = (decimalAmount: number): BigNumber => {
    const decimalBigNumber = new BigNumber(decimalAmount);
    const weiInEther = new BigNumber(10 ** 18);

    return decimalBigNumber.times(weiInEther);
};

const gwei = (decimalAmount: number): BigNumber => {
    return new BigNumber(decimalAmount * 10 ** 9);
};

const percent = (decimalAmount: number): BigNumber => {
    return new BigNumber(decimalAmount / 100 * 10 ** 9);
};

const scaleDown = (baseAmount: BigNumber, exponent: BigNumber): BigNumber => {
    return baseAmount.div(new BigNumber(10).pow(exponent.toNumber()));
};

const scaleUp = (baseAmount: BigNumber, exponent: BigNumber): BigNumber => {
    return baseAmount.times(new BigNumber(10).pow(exponent.toNumber()));
};

export { ether, gwei, percent, scaleDown, scaleUp };
