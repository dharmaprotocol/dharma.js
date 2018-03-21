// libraries
import * as Web3 from "web3";
import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// utils
import * as Units from "utils/units";

import { OrderAPI, ServicingAPI, SignerAPI, ContractsAPI, AdaptersAPI } from "src/apis";
import { DebtOrder } from "src/types";
import {
    DebtOrderWrapper,
    DummyTokenContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "src/wrappers";

import { ACCOUNTS } from "../../../accounts";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractsApi = new ContractsAPI(web3);
const orderApi = new OrderAPI(web3, contractsApi);
const adaptersApi = new AdaptersAPI(web3, contractsApi);
const signerApi = new SignerAPI(web3, contractsApi);
const servicingApi = new ServicingAPI(web3, contractsApi);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

import { GetRepaymentScheduleScenario } from "../scenarios/index";

export class GetRepaymentScheduleRunner {
    static testGetRepaymentScheduleScenario(scenario: GetRepaymentScheduleScenario) {
        let principalToken: DummyTokenContract;
        let tokenTransferProxy: TokenTransferProxyContract;
        let repaymentRouter: RepaymentRouterContract;
        let debtOrder: DebtOrder;
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
            const repaymentRouter = await contractsApi.loadRepaymentRouterAsync();

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

            debtOrder = await adaptersApi.simpleInterestLoan.toDebtOrder({
                debtor: DEBTOR,
                creditor: CREDITOR,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                interestRate: new BigNumber(0.14),
                amortizationUnit: scenario.amortizationUnit,
                termLength: scenario.termLength,
                // TODO: use snapshotting instead of rotating salts,
                // this is a silly way of preventing clashes
                salt: new BigNumber(Math.trunc(Math.random() * 10000)),
            });

            debtOrder.debtorSignature = await signerApi.asDebtor(debtOrder);

            issuanceHash = await orderApi.getIssuanceHash(debtOrder);

            await orderApi.fillAsync(debtOrder, { from: CREDITOR });

            const debtRegistryEntry = await servicingApi.getDebtRegistryEntry(issuanceHash);
            issuanceBlockTimestamp = debtRegistryEntry.issuanceBlockTimestamp;

            ABIDecoder.addABI(repaymentRouter.abi);
        });

        afterAll(() => {
            ABIDecoder.removeABI(repaymentRouter.abi);
        });

        describe(scenario.description, () => {
            test(`returns the list: ${JSON.stringify(scenario.expected)}`, async () => {
                const schedule = await servicingApi.getRepaymentScheduleAsync(issuanceHash);
                const expected = scenario.expected(issuanceBlockTimestamp.toNumber());

                expect(schedule).toEqual(expected);
            });
        });
    }
}
