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

    public async onlyOwner(
        debtTokenContract: DebtTokenContract,
        tokenID: BigNumber,
        account: string,
        errorMessage: string,
    ): Promise<void> {
        const tokenOwner = await debtTokenContract.ownerOf.callAsync(tokenID);

        if (tokenOwner !== account) {
            throw new Error(errorMessage);
        }
    }

    public async notOwner(
        debtTokenContract: DebtTokenContract,
        tokenID: BigNumber,
        account: string,
        errorMessage: string,
    ): Promise<void> {
        const tokenOwner = await debtTokenContract.ownerOf.callAsync(tokenID);

        if (tokenOwner === account) {
            throw new Error(errorMessage);
        }
    }
}
