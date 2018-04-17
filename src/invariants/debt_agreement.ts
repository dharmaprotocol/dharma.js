import { DebtTokenContract } from "../wrappers";
import { BigNumber } from "../../utils/bignumber";

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
