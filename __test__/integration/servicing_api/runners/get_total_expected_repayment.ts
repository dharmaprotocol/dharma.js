// libraries
import * as Web3 from "web3";
import { BigNumber } from "../../../../utils/bignumber";

// utils
import * as Units from "../../../../utils/units";

import {
    AdaptersAPI,
    ContractsAPI,
    OrderAPI,
    ServicingAPI,
    SignerAPI,
    TokenAPI,
} from "../../../../src/apis";
import { DebtOrder } from "../../../../src/types";
import { DummyTokenContract } from "../../../../src/wrappers";

import { ACCOUNTS } from "../../../accounts";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractsApi = new ContractsAPI(web3);
const adaptersApi = new AdaptersAPI(web3, contractsApi);
const orderApi = new OrderAPI(web3, contractsApi, adaptersApi);
const signerApi = new SignerAPI(web3, contractsApi);
const servicingApi = new ServicingAPI(web3, contractsApi);
const tokenApi = new TokenAPI(web3, contractsApi);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

import { GetTotalExpectedRepaymentScenario } from "../scenarios";

export class GetTotalExpectedRepaymentRunner {
    public static testScenario(scenario: GetTotalExpectedRepaymentScenario) {
        let principalToken: DummyTokenContract;
        let debtOrder: DebtOrder;
        let issuanceHash: string;

        const CONTRACT_OWNER = ACCOUNTS[0].address;

        const CREDITOR = ACCOUNTS[1].address;

        const DEBTOR = ACCOUNTS[2].address;

        beforeAll(async () => {
            const tokenRegistry = await contractsApi.loadTokenRegistry();
            const principalTokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(
                "REP",
            );

            principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS);

            // Grant creditor a balance of tokens
            await principalToken.setBalance.sendTransactionAsync(CREDITOR, Units.ether(10), {
                from: CONTRACT_OWNER,
            });

            // Grant debtor a balance of tokens
            await principalToken.setBalance.sendTransactionAsync(DEBTOR, Units.ether(10), {
                from: CONTRACT_OWNER,
            });

            await tokenApi.setUnlimitedProxyAllowanceAsync(principalToken.address, {
                from: CREDITOR,
            });

            debtOrder = await adaptersApi.simpleInterestLoan.toDebtOrder({
                debtor: DEBTOR,
                creditor: CREDITOR,
                principalAmount: scenario.principalAmount,
                principalTokenSymbol: "REP",
                interestRate: scenario.interestRate,
                amortizationUnit: scenario.amortizationUnit,
                termLength: new BigNumber(scenario.termLength),
            });

            debtOrder.debtorSignature = await signerApi.asDebtor(debtOrder, false);

            issuanceHash = await orderApi.getIssuanceHash(debtOrder);
        });

        describe(scenario.description, () => {
            if (scenario.agreementExists) {
                beforeEach(async () => {
                    // NOTE: We fill debt orders in the `beforeEach` block to ensure
                    // that the blockchain is snapshotted *before* order filling
                    // in the parent scope's `beforeEach` block.  For more information,
                    // read about Jest's order of execution in scoped tests:
                    // https://facebook.github.io/jest/docs/en/setup-teardown.html#scoping
                    await orderApi.fillAsync(debtOrder, { from: CREDITOR });
                });
            }

            if (scenario.error) {
                test(`throws an error with message: ${scenario.error}`, async () => {
                    await expect(
                        servicingApi.getTotalExpectedRepayment(issuanceHash),
                    ).rejects.toThrow(scenario.error);
                });
            } else {
                test(`returns a value of ${scenario.expected}`, async () => {
                    await expect(
                        servicingApi.getTotalExpectedRepayment(issuanceHash),
                    ).resolves.toEqual(scenario.expected);
                });
            }
        });
    }
}
