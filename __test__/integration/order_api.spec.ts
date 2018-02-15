import { BigNumber } from "utils/bignumber";
import { OrderAPI, OrderAPIErrors } from "src/apis/order_api";
import { ContractsAPI } from "src/apis/contracts_api";
import { SignerAPI } from "src/apis/signer_api";
import { Web3Utils } from "utils/web3_utils";
import { VALID_ORDERS, INVALID_ORDERS, NONCONSENUAL_ORDERS, FillScenario } from "./scenarios";

import * as Web3 from "web3";
import * as ABIDecoder from "abi-decoder";
import { DebtOrder } from "../../src/types";
import * as compact from "lodash.compact";

import {
    DummyTokenContract,
    TokenRegistryContract,
    DebtKernelContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "src/wrappers";

import { ACCOUNTS } from "../accounts";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);
const contractsApi = new ContractsAPI(web3);
const orderApi = new OrderAPI(web3, contractsApi);
const orderSigner = new SignerAPI(web3, contractsApi);

let principalToken: DummyTokenContract;
let debtKernel: DebtKernelContract;
let repaymentRouter: RepaymentRouterContract;
let tokenTransferProxy: TokenTransferProxyContract;

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

function testFillScenario(scenario: FillScenario) {
    describe(scenario.description, () => {
        let debtOrder: DebtOrder;

        beforeEach(async () => {
            debtOrder = scenario.generateDebtOrder(debtKernel, repaymentRouter, principalToken);

            // We dynamically set the creditor's balance and
            // allowance of a given principal token to either
            // their assigned values in the fill scenario, or
            // to a default amount (i.e sufficient balance / allowance
            // necessary for order fill)
            const creditorBalance = scenario.creditorBalance || debtOrder.principalAmount.times(2);
            const creditorAllowance =
                scenario.creditorAllowance || debtOrder.principalAmount.times(2);

            await principalToken.setBalance.sendTransactionAsync(
                debtOrder.creditor,
                creditorBalance,
            );
            await principalToken.approve.sendTransactionAsync(
                tokenTransferProxy.address,
                creditorAllowance,
                { from: debtOrder.creditor },
            );

            // We dynamically attach signatures based on whether the
            // the scenario specifies that a signature from a signatory
            // ought to be attached.
            debtOrder.debtorSignature = scenario.signatories.debtor
                ? await orderSigner.asDebtor(debtOrder)
                : undefined;
            debtOrder.creditorSignature = scenario.signatories.creditor
                ? await orderSigner.asCreditor(debtOrder)
                : undefined;
            debtOrder.underwriterSignature = scenario.signatories.underwriter
                ? await orderSigner.asUnderwriter(debtOrder)
                : undefined;

            if (scenario.beforeBlock) {
                await scenario.beforeBlock(debtOrder, debtKernel);
            }
        });

        if (scenario.successfullyFills) {
            test("emits log indicating successful fill", async () => {
                const txHash = await orderApi.fillAsync(debtOrder, {
                    from: scenario.filler,
                });
                const receipt = await web3Utils.getTransactionReceiptAsync(txHash);

                const [debtOrderFilledLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                expect(debtOrderFilledLog.name).toBe("LogDebtOrderFilled");
            });
        } else {
            test(`throws ${scenario.errorType} error`, async () => {
                await expect(orderApi.fillAsync(debtOrder)).rejects.toThrow(scenario.errorMessage);
            });
        }
    });
}

describe("Order API (Integration Tests)", () => {
    let currentSnapshotId: number;

    // Example of how to initialize new tokens
    beforeAll(async () => {
        const dummyTokenRegistry = await TokenRegistryContract.deployed(web3, TX_DEFAULTS);
        const principalTokenAddress = await dummyTokenRegistry.getTokenAddress.callAsync("REP");
        principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS);

        debtKernel = await DebtKernelContract.deployed(web3, TX_DEFAULTS);
        repaymentRouter = await RepaymentRouterContract.deployed(web3, TX_DEFAULTS);
        tokenTransferProxy = await TokenTransferProxyContract.deployed(web3, TX_DEFAULTS);

        ABIDecoder.addABI(debtKernel.abi);
    });

    afterAll(() => {
        ABIDecoder.removeABI(debtKernel.abi);
    });

    beforeEach(async () => {
        currentSnapshotId = await web3Utils.saveTestSnapshot();
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(currentSnapshotId);
    });

    describe("#fillAsync", () => {
        describe("Valid, consensual order fills", () => {
            VALID_ORDERS.forEach(testFillScenario);
        });

        describe("Invalid, consensual order fills", () => {
            INVALID_ORDERS.forEach(testFillScenario);
        });

        describe("Valid, non-consensual order fills", () => {
            NONCONSENUAL_ORDERS.forEach(testFillScenario);
        });
    });
});
