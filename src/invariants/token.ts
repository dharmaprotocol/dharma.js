import { BigNumber } from "utils/bignumber";
import { ERC20Contract } from "../wrappers";

import * as singleLineString from "single-line-string";

export const TokenAssertionErrors = {
    MISSING_ERC20_METHOD: (address: string) =>
        singleLineString`Contract at ${address} does not implement ERC20 interface.`,
};

export class TokenAssertions {
    // Throws if the given candidateContract does not respond to some methods from the ERC20 interface.
    // TODO: This could be made more complete by comparing the ERC20 interface to the candidate's properties.
    public async implementsERC20(candidate: any): Promise<void> {
        const address = candidate.address;

        try {
            // NOTE: Needs to check more methods to validate complete ERC20 interface.
            await candidate.balanceOf.callAsync(address);
            await candidate.totalSupply.callAsync();
        } catch (error) {
            throw new Error(TokenAssertionErrors.MISSING_ERC20_METHOD(address));
        }
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
