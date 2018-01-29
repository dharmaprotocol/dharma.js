import {BigNumber} from "bignumber.js";

const ether = (decimalAmount: number): BigNumber => {
    return new BigNumber(decimalAmount * (10 ** 18));
}

const percent = (decimalAmount: number): BigNumber => {
    return new BigNumber((decimalAmount / 100) * (10 ** 9));
}


export { ether, percent };
