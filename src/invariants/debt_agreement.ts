import { DebtTokenContract } from "../wrappers";
import { BigNumber } from "bignumber.js";

export class DebtAgreementAssertions {
    public async exists(
        issuanceHash: string,
        debtToken: DebtTokenContract,
        errorMessage: string,
    ): Promise<void> {
        const debtAgreementExists = await debtToken.exists.callAsync(new BigNumber(issuanceHash));

        if (!debtAgreementExists) {
            throw new Error(errorMessage);
        }
    }
}
