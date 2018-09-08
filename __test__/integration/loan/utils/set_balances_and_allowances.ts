import { setBalanceForSymbol, setUnlimitedAllowanceForSymbol } from "../../../utils/utils";

import { Dharma } from "../../../../src/types/dharma";
import { LoanRequestParams } from "../../../../src/loan";

export async function setBalancesAndAllowances(
    dharma: Dharma,
    params: LoanRequestParams,
    debtor: string,
    creditor: string,
): Promise<void> {
    // Configure balances and allowances for debtor.
    await setBalanceForSymbol(dharma, params.collateralAmount, params.collateralToken, debtor);
    await setUnlimitedAllowanceForSymbol(dharma, params.collateralToken, debtor);

    // Configure balances and allowances for creditor.
    await setBalanceForSymbol(dharma, params.principalAmount, params.principalToken, creditor);
    await setUnlimitedAllowanceForSymbol(dharma, params.principalToken, creditor);
}
