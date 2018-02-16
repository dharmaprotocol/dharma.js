import { BigNumber } from "bignumber.js";
import { ERC20Contract } from "../wrappers";
export declare class TokenAssertions {
    hasSufficientBalance(principalToken: ERC20Contract, payer: string, balanceRequired: BigNumber, errorMessage: string): Promise<void>;
    hasSufficientAllowance(principalToken: ERC20Contract, payer: string, target: string, allowanceRequired: BigNumber, errorMessage: string): Promise<void>;
}
