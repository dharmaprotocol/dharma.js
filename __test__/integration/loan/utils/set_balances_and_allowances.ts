import { setBalanceForSymbol, setUnlimitedAllowanceForSymbol } from "../../../utils/utils";

import { Dharma } from "../../../../src/dharma";
import { LoanRequestParams } from "../../../../src/loan";

export async function setBalancesAndAllowances(
    dharma: Dharma,
    params: LoanRequestParams,
    creditorAddress: string,
): Promise<void> {
    await setBalanceForSymbol(
        dharma,
        params.collateralAmount,
        params.collateralToken,
        params.debtorAddress,
    );

    await setBalanceForSymbol(
        dharma,
        params.principalAmount,
        params.principalToken,
        creditorAddress,
    );

    await setUnlimitedAllowanceForSymbol(dharma, params.principalToken, creditorAddress);
    await setUnlimitedAllowanceForSymbol(dharma, params.collateralToken, params.debtorAddress);
}
