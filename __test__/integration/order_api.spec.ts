jest.unmock("fs-extra");

import { BigNumber } from "utils/bignumber";
import { OrderAPI, OrderAPIErrors } from "src/apis/order_api";
import { ContractsAPI } from "src/apis/contracts_api";
import { SignerAPI } from "src/apis/signer_api";
import moment from "moment";
import * as Units from "utils/units";
import Web3 from "web3";
import { Web3Wrapper } from "@0xproject/web3-wrapper";
import ABIDecoder from "abi-decoder";
import { ECDSASignature, DebtOrder } from "../../src/types";
import * as _ from "lodash";
import * as crypto from "crypto";
import ethUtil from "ethereumjs-util";

import {
    DummyTokenContract,
    TokenRegistryContract,
    DebtKernelContract,
    DebtOrderWrapper,
    TokenTransferProxyContract,
} from "src/wrappers";

import { ACCOUNTS, NULL_ADDRESS } from "../accounts";

const generateSalt = () => {
    const saltBuffer = crypto.randomBytes(32);
    const saltBufferHex = ethUtil.bufferToHex(saltBuffer);
    return new BigNumber(saltBufferHex);
};

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Wrapper = new Web3Wrapper(provider);
const contractsApi = new ContractsAPI(web3);
const orderApi = new OrderAPI(web3, contractsApi);
const orderSigner = new SignerAPI(web3);

let debtOrder: DebtOrder;

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Order API (Integration Tests)", () => {
    let principalToken: DummyTokenContract;
    let debtKernel: DebtKernelContract;
    let tokenTransferProxy: TokenTransferProxyContract;

    // Example of how to initialize new tokens
    beforeAll(async () => {
        const dummyTokenRegistry = await TokenRegistryContract.deployed(web3, TX_DEFAULTS);
        const principalTokenAddress = await dummyTokenRegistry.getTokenAddress.callAsync("REP");
        principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS);

        debtKernel = await DebtKernelContract.deployed(web3, TX_DEFAULTS);
        tokenTransferProxy = await TokenTransferProxyContract.deployed(web3, TX_DEFAULTS);

        // TODO: Add Repayment Router's address to `issuanceVersion`
        debtOrder = {
            kernelVersion: debtKernel.address,
            issuanceVersion: ACCOUNTS[0].address,
            principalAmount: Units.ether(1),
            principalToken: principalToken.address,
            debtor: ACCOUNTS[1].address,
            debtorFee: Units.ether(0.001),
            creditor: ACCOUNTS[2].address,
            creditorFee: Units.ether(0.001),
            relayer: ACCOUNTS[3].address,
            relayerFee: Units.ether(0.001),
            underwriter: ACCOUNTS[4].address,
            underwriterFee: Units.ether(0.001),
            underwriterRiskRating: Units.percent(0.001),
            termsContract: ACCOUNTS[5].address,
            termsContractParameters: web3.sha3("bytes32proxy"),
            expirationTimestampInSec: new BigNumber(
                moment()
                    .add(7, "days")
                    .unix(),
            ),
            salt: new BigNumber(0),
        } as DebtOrder;

        ABIDecoder.addABI(debtKernel.abi);
    });

    afterAll(() => {
        ABIDecoder.removeABI(debtKernel.abi);
    });

    describe("#fillAsync", () => {
        describe("...with valid, consensual order and sufficient principal token balance / allowance", () => {
            beforeAll(async () => {
                debtOrder.salt = generateSalt();
                debtOrder.principalToken = principalToken.address;
                debtOrder.kernelVersion = debtKernel.address;

                const debtorSignature = await orderSigner.asDebtor(debtOrder);
                debtOrder.debtorSignature = debtorSignature;
                const creditorSignature = await orderSigner.asCreditor(debtOrder);
                debtOrder.creditorSignature = creditorSignature;
                const underWriterSignature = await orderSigner.asUnderwriter(debtOrder);
                debtOrder.underwriterSignature = underWriterSignature;

                await principalToken.setBalance.sendTransactionAsync(
                    debtOrder.creditor,
                    debtOrder.principalAmount.times(2),
                );
                await principalToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    debtOrder.principalAmount.times(2),
                    { from: debtOrder.creditor },
                );
            });

            test("emits log indicating successful fill", async () => {
                const txHash = await orderApi.fillAsync(debtOrder);
                const receipt = await web3Wrapper.getTransactionReceiptAsync(txHash);

                const [debtOrderFilledLog] = _.compact(ABIDecoder.decodeLogs(receipt.logs));

                expect(debtOrderFilledLog.name).toBe("LogDebtOrderFilled");
            });
        });

        /*
            Validity Invariants
        */

        describe("...with principal < debtor fee", () => {
            let debtOrderWithInvalidDebtorFee: DebtOrder;

            beforeAll(() => {
                debtOrderWithInvalidDebtorFee = Object.assign({}, debtOrder);
                debtOrderWithInvalidDebtorFee.principalAmount = Units.ether(0.49);
                debtOrderWithInvalidDebtorFee.debtorFee = Units.ether(0.51);
            });

            test("throws INVALID_DEBTOR_FEE error", async () => {
                await expect(orderApi.fillAsync(debtOrderWithInvalidDebtorFee)).rejects.toThrow(
                    OrderAPIErrors.INVALID_DEBTOR_FEE(),
                );
            });
        });

        describe("...with no underwriter but with underwriter fee", () => {
            let debtOrderWithNullUnderwriter: DebtOrder;

            beforeAll(() => {
                debtOrderWithNullUnderwriter = Object.assign({}, debtOrder);
                debtOrderWithNullUnderwriter.underwriter = NULL_ADDRESS;
            });

            test("throws INVALID_UNDERWRITER_FEE error", async () => {
                await expect(orderApi.fillAsync(debtOrderWithNullUnderwriter)).rejects.toThrow(
                    OrderAPIErrors.INVALID_UNDERWRITER_FEE(),
                );
            });
        });

        describe("...with a relayer fee but without an assigned relayer", () => {
            let debtOrderWithNullRelayer: DebtOrder;

            beforeAll(() => {
                debtOrderWithNullRelayer = Object.assign({}, debtOrder);
                debtOrderWithNullRelayer.relayer = NULL_ADDRESS;
            });

            test("throws INVALID_RELAYER_FEE error", async () => {
                await expect(orderApi.fillAsync(debtOrderWithNullRelayer)).rejects.toThrow(
                    OrderAPIErrors.INVALID_RELAYER_FEE(),
                );
            });
        });

        describe("...creditor + debtor fee does not equal underwriter + relayer fee", () => {
            let debtOrderWithInvalidFees: DebtOrder;

            beforeAll(() => {
                debtOrderWithInvalidFees = Object.assign({}, debtOrder);
                debtOrderWithInvalidFees.relayerFee = Units.ether(0.004);
            });

            test("throws INVALID_FEES error", async () => {
                await expect(orderApi.fillAsync(debtOrderWithInvalidFees)).rejects.toThrow(
                    OrderAPIErrors.INVALID_FEES(),
                );
            });
        });

        describe("...debt order cannot have already expired", () => {
            let expiredDebtOrder: DebtOrder;

            beforeAll(() => {
                expiredDebtOrder = Object.assign({}, debtOrder);
                expiredDebtOrder.expirationTimestampInSec = new BigNumber(
                    moment()
                        .subtract(7, "days")
                        .unix(),
                );
            });

            test("throws EXPIRED error", async () => {
                await expect(orderApi.fillAsync(expiredDebtOrder)).rejects.toThrow(
                    OrderAPIErrors.EXPIRED(),
                );
            });
        });

        describe("...order cannot have been cancelled", async () => {
            let toCancelDebtOrder;

            beforeAll(async () => {
                toCancelDebtOrder = Object.assign({}, debtOrder);
                const debtOrderWrapped = new DebtOrderWrapper(toCancelDebtOrder);

                await debtKernel.cancelDebtOrder.sendTransactionAsync(
                    debtOrderWrapped.getOrderAddresses(),
                    debtOrderWrapped.getOrderValues(),
                    debtOrderWrapped.getOrderBytes32(),
                    { from: debtOrder.debtor },
                );
            });

            test("throws DEBT_ORDER_CANCELLED", async () => {
                await expect(orderApi.fillAsync(toCancelDebtOrder, TX_DEFAULTS)).rejects.toThrow(
                    OrderAPIErrors.ORDER_CANCELLED(),
                );
            });
        });

        describe("...order cannot have already been filled", async () => {
            let filledDebtOrder: DebtOrder;

            beforeAll(async () => {
                filledDebtOrder = Object.assign({}, debtOrder);
                filledDebtOrder.salt = generateSalt();

                const debtorSignature = await orderSigner.asDebtor(filledDebtOrder);
                filledDebtOrder.debtorSignature = debtorSignature;
                const creditorSignature = await orderSigner.asCreditor(filledDebtOrder);
                filledDebtOrder.creditorSignature = creditorSignature;
                const underWriterSignature = await orderSigner.asUnderwriter(filledDebtOrder);
                filledDebtOrder.underwriterSignature = underWriterSignature;

                await principalToken.setBalance.sendTransactionAsync(
                    filledDebtOrder.creditor,
                    Units.ether(5),
                    { from: ACCOUNTS[0].address },
                );

                await principalToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    Units.ether(2),
                    {
                        from: filledDebtOrder.creditor,
                    },
                );

                await orderApi.fillAsync(filledDebtOrder);
            });

            test("throws DEBT_ORDER_ALREADY_ISSUED", async () => {
                await expect(orderApi.fillAsync(filledDebtOrder)).rejects.toThrow(
                    OrderAPIErrors.DEBT_ORDER_ALREADY_ISSUED(),
                );
            });
        });

        describe("...issuance cannot have already been cancelled", async () => {
            let toCancelIssuance: DebtOrder;

            beforeAll(async () => {
                toCancelIssuance = Object.assign({}, debtOrder);
                toCancelIssuance.salt = generateSalt();

                const debtOrderWrapped = new DebtOrderWrapper(toCancelIssuance);

                await debtKernel.cancelIssuance.sendTransactionAsync(
                    debtOrderWrapped.getIssuanceCommitment().issuanceVersion,
                    debtOrderWrapped.getIssuanceCommitment().debtor,
                    debtOrderWrapped.getIssuanceCommitment().termsContract,
                    debtOrderWrapped.getIssuanceCommitment().termsContractParameters,
                    debtOrderWrapped.getIssuanceCommitment().underwriter,
                    debtOrderWrapped.getIssuanceCommitment().underwriterRiskRating,
                    debtOrderWrapped.getIssuanceCommitment().salt,
                    { from: debtOrderWrapped.getIssuanceCommitment().underwriter },
                );
            });

            test("throws ISSUANCE_CANCELLED", async () => {
                await expect(orderApi.fillAsync(toCancelIssuance)).rejects.toThrow(
                    OrderAPIErrors.ISSUANCE_CANCELLED(),
                );
            });
        });

        /*
            CONSENSUALITY INVARIANTS
        */

        describe("...if message sender not debtor, debtor signature must be valid", async () => {
            let debtOrderSansDebtorSignature: DebtOrder;

            beforeAll(async () => {
                debtOrderSansDebtorSignature = Object.assign({}, debtOrder);

                debtOrderSansDebtorSignature.salt = generateSalt();

                debtOrderSansDebtorSignature.creditorSignature = await orderSigner.asCreditor(
                    debtOrderSansDebtorSignature,
                );
                debtOrderSansDebtorSignature.underwriterSignature = await orderSigner.asUnderwriter(
                    debtOrderSansDebtorSignature,
                );
            });

            test("throws INVALID_DEBTOR_SIGNATURE error", async () => {
                await expect(
                    orderApi.fillAsync(debtOrderSansDebtorSignature, {
                        from: debtOrderSansDebtorSignature.creditor,
                    }),
                ).rejects.toThrow(OrderAPIErrors.INVALID_DEBTOR_SIGNATURE());
            });
        });

        describe("...if message sender not creditor, creditor signature must be valid", async () => {
            let debtOrderSansCreditorSignature: DebtOrder;

            beforeAll(async () => {
                debtOrderSansCreditorSignature = Object.assign({}, debtOrder);

                debtOrderSansCreditorSignature.salt = generateSalt();

                debtOrderSansCreditorSignature.debtorSignature = await orderSigner.asDebtor(
                    debtOrderSansCreditorSignature,
                );
                debtOrderSansCreditorSignature.underwriterSignature = await orderSigner.asUnderwriter(
                    debtOrderSansCreditorSignature,
                );
            });

            test("throws INVALID_CREDITOR_SIGNATURE error", async () => {
                await expect(
                    orderApi.fillAsync(debtOrderSansCreditorSignature, {
                        from: debtOrderSansCreditorSignature.debtor,
                    }),
                ).rejects.toThrow(OrderAPIErrors.INVALID_CREDITOR_SIGNATURE());
            });
        });

        describe("...if message sender not underwriter, underwriter signature must be valid", async () => {
            let debtOrderSansUnderwriterSignature: DebtOrder;

            beforeAll(async () => {
                debtOrderSansUnderwriterSignature = Object.assign({}, debtOrder);

                debtOrderSansUnderwriterSignature.salt = generateSalt();

                debtOrderSansUnderwriterSignature.debtorSignature = await orderSigner.asDebtor(
                    debtOrderSansUnderwriterSignature,
                );
                debtOrderSansUnderwriterSignature.creditorSignature = await orderSigner.asCreditor(
                    debtOrderSansUnderwriterSignature,
                );
            });

            test("throws INVALID_UNDERWRITER_SIGNATURE error", async () => {
                await expect(
                    orderApi.fillAsync(debtOrderSansUnderwriterSignature, {
                        from: debtOrderSansUnderwriterSignature.creditor,
                    }),
                ).rejects.toThrow(OrderAPIErrors.INVALID_UNDERWRITER_SIGNATURE());
            });
        });

        // TODO: Add much more robust test cases for when payload is invalid / valid / etc.

        /*
            EXTERNAL INVARIANTS
        */

        describe("...creditor has insufficient balance", async () => {
            let debtOrderInsufficientCreditorBalance: DebtOrder;

            beforeAll(async () => {
                debtOrderInsufficientCreditorBalance = Object.assign({}, debtOrder);

                debtOrderInsufficientCreditorBalance.salt = generateSalt();

                await principalToken.setBalance.sendTransactionAsync(
                    debtOrderInsufficientCreditorBalance.creditor,
                    Units.ether(0.5),
                );

                debtOrderInsufficientCreditorBalance.creditorSignature = await orderSigner.asCreditor(
                    debtOrderInsufficientCreditorBalance,
                );
                debtOrderInsufficientCreditorBalance.debtorSignature = await orderSigner.asDebtor(
                    debtOrderInsufficientCreditorBalance,
                );
                debtOrderInsufficientCreditorBalance.underwriterSignature = await orderSigner.asUnderwriter(
                    debtOrderInsufficientCreditorBalance,
                );
            });

            test("throws CREDITOR_BALANCE_INSUFFICIENT error", async () => {
                await expect(
                    orderApi.fillAsync(debtOrderInsufficientCreditorBalance),
                ).rejects.toThrow(OrderAPIErrors.CREDITOR_BALANCE_INSUFFICIENT());
            });
        });

        describe("...creditor allowance to TokenTransferProxy is insufficient", () => {
            let debtOrderInsufficientCreditorAllowance: DebtOrder;

            beforeAll(async () => {
                debtOrderInsufficientCreditorAllowance = Object.assign({}, debtOrder);

                debtOrderInsufficientCreditorAllowance.salt = generateSalt();

                await principalToken.setBalance.sendTransactionAsync(
                    debtOrderInsufficientCreditorAllowance.creditor,
                    Units.ether(2),
                );

                await principalToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    Units.ether(1),
                    { from: debtOrderInsufficientCreditorAllowance.creditor },
                );

                debtOrderInsufficientCreditorAllowance.creditorSignature = await orderSigner.asCreditor(
                    debtOrderInsufficientCreditorAllowance,
                );
                debtOrderInsufficientCreditorAllowance.debtorSignature = await orderSigner.asDebtor(
                    debtOrderInsufficientCreditorAllowance,
                );
                debtOrderInsufficientCreditorAllowance.underwriterSignature = await orderSigner.asUnderwriter(
                    debtOrderInsufficientCreditorAllowance,
                );
            });

            test("throws CREDITOR_ALLOWANCE_INSUFFICIENT error", async () => {
                await expect(
                    orderApi.fillAsync(debtOrderInsufficientCreditorAllowance),
                ).rejects.toThrow(OrderAPIErrors.CREDITOR_ALLOWANCE_INSUFFICIENT());
            });
        });
    });
});
