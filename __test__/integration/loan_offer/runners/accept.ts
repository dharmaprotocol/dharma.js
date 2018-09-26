import * as Web3 from "web3";

import { BigNumber, Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { ContractsAPI } from "../../../../src/apis/";

import { DummyTokenContract } from "../../../../src/wrappers";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

// Accounts
import { ACCOUNTS } from "../../../accounts";

const { Token } = Dharma.Types;

const CREDITOR = ACCOUNTS[0];
const DEBTOR = ACCOUNTS[1];

const TX_DEFAULTS = { from: CREDITOR.address, gas: 4712388 };

export async function testAccept(
    dharma: Dharma,
    params: DebtOrderParams,
    signAndAccept: (loanOffer: LoanOffer, address: string) => void,
) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;

        let web3: Web3;

        let contractsApi: ContractsAPI;

        let principalToken: DummyTokenContract;
        let collateralToken: DummyTokenContract;

        beforeAll(async () => {
            loanOffer = await LoanOffer.createAndSignAsCreditor(dharma, params);

            const provider = new Web3.providers.HttpProvider("http://localhost:8545");
            web3 = new Web3(provider);

            contractsApi = new ContractsAPI(web3);

            principalToken = await DummyTokenContract.at(
                (await contractsApi.loadTokenBySymbolAsync(params.principalToken)).address,
                web3,
                TX_DEFAULTS,
            );

            collateralToken = await DummyTokenContract.at(
                (await contractsApi.loadTokenBySymbolAsync(params.collateralToken)).address,
                web3,
                TX_DEFAULTS,
            );
        });

        beforeEach(async () => {
            // set balances
            await principalToken.setBalance.sendTransactionAsync(
                CREDITOR.address,
                new BigNumber(10000000000).times(new BigNumber(10).pow(18)),
                TX_DEFAULTS,
            );

            await collateralToken.setBalance.sendTransactionAsync(
                DEBTOR.address,
                new BigNumber(10000000000).times(new BigNumber(10).pow(18)),
                TX_DEFAULTS,
            );

            // set allowances
            await Token.setCreditorProxyAllowanceToUnlimited(
                dharma,
                params.principalToken,
                CREDITOR.address,
            );

            await Token.makeAllowanceUnlimitedIfNecessary(
                dharma,
                params.collateralToken,
                DEBTOR.address,
            );
        });

        test("is accepted by debtor", async () => {
            const isAcceptedBefore = await loanOffer.isAccepted();
            expect(isAcceptedBefore).toEqual(false);

            await signAndAccept(loanOffer, DEBTOR.address);

            const isAcceptedAfter = await loanOffer.isAccepted();
            expect(isAcceptedAfter).toEqual(true);
        });
    });
}
