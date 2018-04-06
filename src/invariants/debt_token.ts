import { DebtTokenContract } from "../wrappers";
import { BigNumber } from "bignumber.js";

export class DebtTokenAssertions {
    public async exists(
        debtTokenContract: DebtTokenContract,
        tokenID: BigNumber,
        errorMessage: string,
    ): Promise<void> {
        const exists = await debtTokenContract.exists.callAsync(tokenID);

        if (!exists) {
            throw new Error(errorMessage);
        }
    }
}
