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

    public async tokenBelongsToAccount(
        debtTokenContract: DebtTokenContract,
        tokenID: BigNumber,
        account: string,
        errorMessage: string,
    ): Promise<void> {
        // We include a try-catch here because the Zeppelin 721 implementation
        // reverts on `ownerOf` if the token's owner is NULL_ADDRESS
        try {
            const tokenOwner = await debtTokenContract.ownerOf.callAsync(tokenID);

            if (tokenOwner !== account) {
                throw new Error(errorMessage);
            }
        } catch (e) {
            throw new Error(errorMessage);
        }
    }
}
