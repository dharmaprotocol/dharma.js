import { BigNumber } from "bignumber.js";
import { ERC20Contract } from "../wrappers";

import * as singleLineString from "single-line-string";

export const TokenAssertionErrors = {
    MISSING_ERC20_METHOD: () =>
        singleLineString`Contract does not implement ERC20 interface.`,
};

export class TokenAssertions {
    // Throws an error if the given candidateContract does not implement the ERC20 interface.
    public async implementsERC20(candidate: any): Promise<void> {
        try {
            await candidate.balanceOf.callAsync(candidate.address);
            await candidate.totalSupply.callAsync();
        } catch (error) {
            throw new Error(TokenAssertionErrors.MISSING_ERC20_METHOD());
        }

        /*
            Alternative, something like this could work"

            // An ERC20 contract must at least implement the following methods:
            const specMethods = [
                'name',
                'symbol',
                'decimals',
                'totalSupply',
                'balanceOf',
                'transfer',
                'transferFrom',
                'approve',
                'allowance'
            ];

            specMethods.map((method: string) => {
                if (!candidate.hasOwnProperty(method)) {
                    throw new Error(TokenAssertionErrors.MISSING_ERC20_METHOD(method));
                }
            });
        */
    }

    public async hasSufficientBalance(
        principalToken: ERC20Contract,
        payer: string,
        balanceRequired: BigNumber,
        errorMessage: string,
    ): Promise<void> {
        const payerBalance = await principalToken.balanceOf.callAsync(payer);

        if (payerBalance.lt(balanceRequired)) {
            throw new Error(errorMessage);
        }
    }

    public async hasSufficientAllowance(
        principalToken: ERC20Contract,
        payer: string,
        target: string,
        allowanceRequired: BigNumber,
        errorMessage: string,
    ): Promise<void> {
        const payerAllowance = await principalToken.allowance.callAsync(payer, target);

        if (payerAllowance.lt(allowanceRequired)) {
            throw new Error(errorMessage);
        }
    }
}
