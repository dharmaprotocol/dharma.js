// libraries
import * as ABIDecoder from "abi-decoder";
import * as Web3 from "web3";
import { BigNumber } from "../../../../utils/bignumber";

// utils
import * as Units from "../../../../utils/units";

import { AdaptersAPI, ContractsAPI, OrderAPI, ServicingAPI, SignerAPI } from "../../../../src/apis";
import { DebtOrderData } from "../../../../src/types";
import {
    DummyTokenContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "../../../../src/wrappers";

import { ACCOUNTS } from "../../../accounts";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractsApi = new ContractsAPI(web3);
const adaptersApi = new AdaptersAPI(web3, contractsApi);
const orderApi = new OrderAPI(web3, contractsApi, adaptersApi);
const signerApi = new SignerAPI(web3, contractsApi);
const servicingApi = new ServicingAPI(web3, contractsApi);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

import { GetRepaymentScheduleScenario } from "../scenarios/index";

export class GetRepaymentScheduleRunner {
    public static testGetRepaymentScheduleScenario(scenario: GetRepaymentScheduleScenario) {
        let principalToken: DummyTokenContract;
        let tokenTransferProxy: TokenTransferProxyContract;
        let repaymentRouter: RepaymentRouterContract;
        let debtOrderData: DebtOrderData;
        let issuanceHash: string;
        let issuanceBlockTimestamp: BigNumber;

        const CONTRACT_OWNER = ACCOUNTS[0].address;

        const CREDITOR = ACCOUNTS[1].address;

        const DEBTOR = ACCOUNTS[2].address;

        beforeAll(async () => {
            const tokenRegistry = await contractsApi.loadTokenRegistry();
            const principalTokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(
                "REP",
            );
            repaymentRouter = await contractsApi.loadRepaymentRouterAsync();

            tokenTransferProxy = await contractsApi.loadTokenTransferProxyAsync();
            principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS);

            // Grant creditor a balance of tokens
            await principalToken.setBalance.sendTransactionAsync(CREDITOR, Units.ether(10), {
                from: CONTRACT_OWNER,
            });

            // Grant debtor a balance of tokens
            await principalToken.setBalance.sendTransactionAsync(DEBTOR, Units.ether(10), {
                from: CONTRACT_OWNER,
            });

            // Approve the token transfer proxy for a sufficient
            // amount of tokens for an order fill.
            await principalToken.approve.sendTransactionAsync(
                tokenTransferProxy.address,
                Units.ether(10),
                { from: CREDITOR },
            );

            debtOrderData = await adaptersApi.simpleInterestLoan.toDebtOrder({
                debtor: DEBTOR,
                creditor: CREDITOR,
                principalAmount: Units.ether(1),
                principalTokenSymbol: "REP",
                interestRate: new BigNumber(0.14),
                amortizationUnit: scenario.amortizationUnit,
                termLength: scenario.termLength,
            });

            debtOrderData.debtorSignature = await signerApi.asDebtor(debtOrderData, false);

            issuanceHash = await orderApi.getIssuanceHash(debtOrderData);

            ABIDecoder.addABI(repaymentRouter.abi);
        });

        afterAll(() => {
            ABIDecoder.removeABI(repaymentRouter.abi);
        });

        describe(scenario.description, () => {
            beforeEach(async () => {
                // NOTE: We fill debt orders in the `beforeEach` block to ensure
                // that the blockchain is snapshotted *before* order filling
                // in the parent scope's `beforeEach` block.  For more information,
                // read about Jest's order of execution in scoped tests:
                // https://facebook.github.io/jest/docs/en/setup-teardown.html#scoping
                await orderApi.fillAsync(debtOrderData, { from: CREDITOR });

                const debtRegistryEntry = await servicingApi.getDebtRegistryEntry(issuanceHash);
                issuanceBlockTimestamp = debtRegistryEntry.issuanceBlockTimestamp;
            });

            test(`returns the list: ${JSON.stringify(scenario.expected)}`, async () => {
                const schedule = await servicingApi.getRepaymentScheduleAsync(issuanceHash);
                const expected = scenario.expected(issuanceBlockTimestamp.toNumber());

                expect(schedule).toEqual(expected);
            });
        });
    }
}
