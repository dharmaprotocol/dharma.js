import { BigNumber } from "../../utils/bignumber";
import { ERC20Contract, TokenRegistryContract } from "../wrappers";
export declare const TokenAssertionErrors: {
    MISSING_ERC20_METHOD: (address: string) => any;
};
export declare class TokenAssertions {
    exists(tokenSymbol: string, tokenRegistry: TokenRegistryContract, errorMessage: string): Promise<void>;
    implementsERC20(candidate: any): Promise<void>;
    hasSufficientBalance(principalToken: ERC20Contract, payer: string, balanceRequired: BigNumber, errorMessage: string): Promise<void>;
    hasSufficientAllowance(principalToken: ERC20Contract, payer: string, target: string, allowanceRequired: BigNumber, errorMessage: string): Promise<void>;
}
