import {BigNumber} from "./bignumber";

const ether = (decimalAmount: number): BigNumber => {
    return new BigNumber(decimalAmount * (10 ** 18));
}

const gwei = (decimalAmount: number): BigNumber => {
    return new BigNumber(decimalAmount * (10 ** 9));
}

const percent = (decimalAmount: number): BigNumber => {
    return new BigNumber((decimalAmount / 100) * (10 ** 9));
}


export { ether, gwei, percent };
