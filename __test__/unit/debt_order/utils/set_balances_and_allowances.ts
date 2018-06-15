import * as Web3 from "web3";

// Accounts
import { ACCOUNTS } from "../../../accounts";

// Debt Order
import { DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

// Wrappers
import { DummyTokenContract } from "../../../../src/wrappers";

// APIs
import { ContractsAPI, TokenAPI } from "../../../../src/apis";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

export const setBalancesAndAllowances = async (
    dharma: Dharma,
    web3: Web3,
    params: DebtOrderParams,
    creditorAddress: string,
) => {
    const debtorAddress = params.debtorAddress.toString();
    const contractOwner = ACCOUNTS[0];

    const contractsApi = new ContractsAPI(web3);
    const tokenApi = new TokenAPI(web3, contractsApi);

    const tokenRegistry = await dharma.contracts.loadTokenRegistry();
    const principalTokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync("REP");

    const collateralTokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync("MKR");

    const principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS);
    const collateralToken = await DummyTokenContract.at(collateralTokenAddress, web3, TX_DEFAULTS);

    // Grant creditor a balance of tokens
    await principalToken.setBalance.sendTransactionAsync(
        creditorAddress,
        params.principal.rawAmount,
        {
            from: contractOwner.address,
        },
    );

    await collateralToken.setBalance.sendTransactionAsync(
        debtorAddress,
        params.collateral.rawAmount,
        {
            from: contractOwner.address,
        },
    );

    await tokenApi.setUnlimitedProxyAllowanceAsync(principalToken.address, {
        from: creditorAddress,
    });

    await tokenApi.setUnlimitedProxyAllowanceAsync(collateralToken.address, {
        from: debtorAddress,
    });
};
