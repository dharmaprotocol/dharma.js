import * as _ from 'lodash';
import {BN} from 'bn.js';
import * as ethUtil from 'ethereumjs-util';
import * as ABI from 'ethereumjs-abi';
import * as BigNumber from 'bignumber.js';

/**
 * Deterministically hashes arbitrary arguments in a tightly-packed
 * format that matches the scheme used by Solidity to compute hashes.
 *
 * Code borrowed from the 0x Project contracts repo:
 * https://github.com/0xProject/contracts/blob/master/util/crypto.ts
 *
 * We convert types from JS to Solidity as follows:
 * BigNumber -> uint256
 * number -> uint8
 * string -> string
 * boolean -> bool
 * valid Ethereum address -> address
 *
 */

export function SHA3(args: any[]): string {
    const argTypes: string[] = [];
    _.each(args, (arg, i) => {
        const isNumber = _.isFinite(arg);
        if (isNumber) {
            argTypes.push('uint8');
        } else if (arg instanceof BigNumber.BigNumber) {
            argTypes.push('uint256');
            args[i] = new BN(arg.toString(10), 10);
        } else if (ethUtil.isValidAddress(arg)) {
            argTypes.push('address');
        } else if (_.isString(arg)) {
            if (arg.length >= 2 && arg.substr(0,2) == "0x") {
                argTypes.push('bytes32');
            } else {
                argTypes.push('string');
            }
        } else if  (_.isBoolean(arg)) {
            argTypes.push('bool');
        } else {
            console.log(arg);
            throw new Error(`Unable to guess arg type: ${arg}`);
        }
    });
    const hashBuffer = ABI.soliditySHA3(argTypes, args);
    const hash = ethUtil.bufferToHex(hashBuffer);
    return hash;
};
