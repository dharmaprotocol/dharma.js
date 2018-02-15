import { BigNumber } from "bignumber.js";
import { ERC20Contract } from "../wrappers";

export class TokenAssertions {
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
