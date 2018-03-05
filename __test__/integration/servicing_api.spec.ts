import { OrderAPI, ServicingAPI, SignerAPI, ContractsAPI, AdaptersAPI } from "../../src/apis";
import { ServicingAPIErrors } from "../../src/apis/servicing_api";
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";
import { Web3Utils } from "../../utils/web3_utils";
import { DebtOrder } from "../../src/types";
import {
    DebtOrderWrapper,
    DummyTokenContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "../../src/wrappers";
import { ACCOUNTS } from "../accounts";
import * as Units from "../../utils/units";
import * as compact from "lodash.compact";
import { NULL_BYTES32 } from "../../utils/constants";
import * as ABIDecoder from "abi-decoder";
import * as moment from "moment";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const web3Utils = new Web3Utils(web3);

const contractsApi = new ContractsAPI(web3);
const orderApi = new OrderAPI(web3, contractsApi);
const adaptersApi = new AdaptersAPI(web3, contractsApi);
const signerApi = new SignerAPI(web3, contractsApi);
const servicingApi = new ServicingAPI(web3, contractsApi);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

describe("Debt Servicing API (Integration Tests)", () => {
    let principalToken: DummyTokenContract;
    let nonPrincipalToken: DummyTokenContract;
    let tokenTransferProxy: TokenTransferProxyContract;
    let repaymentRouter: RepaymentRouterContract;
    let debtOrder: DebtOrder;
    let issuanceHash: string;

    const CONTRACT_OWNER = ACCOUNTS[0].address;

    // The creditor is initially the beneficiary of repayments
    const BENEFICIARY = ACCOUNTS[1].address;
    const CREDITOR = ACCOUNTS[1].address;

    const DEBTOR = ACCOUNTS[2].address;

    beforeAll(async () => {
        const tokenRegistry = await contractsApi.loadTokenRegistry();
        const principalTokenAddress = await tokenRegistry.getTokenAddress.callAsync("REP");
        const nonPrincipalTokenAddress = await tokenRegistry.getTokenAddress.callAsync("ZRX");
        const repaymentRouter = await contractsApi.loadRepaymentRouterAsync();

        tokenTransferProxy = await contractsApi.loadTokenTransferProxyAsync();
        principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS);
        nonPrincipalToken = await DummyTokenContract.at(
            nonPrincipalTokenAddress,
            web3,
            TX_DEFAULTS,
        );

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
            interestRate: new BigNumber(0.1),
            amortizationUnit: "months",
            termLength: new BigNumber(2),
            salt: new BigNumber(Math.trunc(Math.random() * 10000)), // TODO: use snapshotting instead of rotating salts,
            //  this is a silly way of preventing clashes
        });

        debtOrder.debtorSignature = await signerApi.asDebtor(debtOrder);

        const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
            debtOrder,
            contractsApi,
        );
        issuanceHash = debtOrderWrapped.getIssuanceCommitmentHash();

        await orderApi.fillAsync(debtOrder, { from: CREDITOR });

        ABIDecoder.addABI(repaymentRouter.abi);
    });

    afterAll(() => {
        ABIDecoder.removeABI(repaymentRouter.abi);
    });

    describe("#makeRepayment", () => {
        describe("debtAgreementId is malformed", () => {
            test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                await expect(
                    servicingApi.makeRepayment(
                        issuanceHash.substr(8),
                        Units.ether(0.5),
                        principalToken.address,
                    ),
                ).rejects.toThrow(/instance does not match pattern/);
            });
        });

        describe("amount is malformed", () => {
            test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                await expect(
                    servicingApi.makeRepayment(
                        issuanceHash,
                        new BigNumber(-100),
                        principalToken.address,
                    ),
                ).rejects.toThrow(/instance does not conform to the "BigNumber" format/);
            });
        });

        describe("tokenAddress is malformed", () => {
            test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                await expect(
                    servicingApi.makeRepayment(
                        issuanceHash,
                        Units.ether(0.5),
                        principalToken.address.substr(5),
                    ),
                ).rejects.toThrow(/instance does not match pattern/);
            });
        });

        describe("no debt agreement with given id exists", () => {
            test("throws DEBT_AGREEMENT_NONEXISTENT error", async () => {
                await expect(
                    servicingApi.makeRepayment(
                        NULL_BYTES32,
                        Units.ether(0.5),
                        principalToken.address,
                    ),
                ).rejects.toThrow(ServicingAPIErrors.DEBT_AGREEMENT_NONEXISTENT(NULL_BYTES32));
            });
        });

        describe("payer's balance in given token is insufficient", () => {
            test("throws INSUFFICIENT_REPAYMENT_BALANCE error", async () => {
                await principalToken.setBalance.sendTransactionAsync(DEBTOR, Units.ether(0.4), {
                    from: CONTRACT_OWNER,
                });

                await expect(
                    servicingApi.makeRepayment(
                        issuanceHash,
                        Units.ether(0.5),
                        principalToken.address,
                        { from: DEBTOR },
                    ),
                ).rejects.toThrow(ServicingAPIErrors.INSUFFICIENT_REPAYMENT_BALANCE());
            });
        });

        describe("payer's allowance granted to transfer proxy is insufficient", () => {
            test("throws INSUFFICIENT_REPAYMENT_ALLOWANCE error", async () => {
                await principalToken.setBalance.sendTransactionAsync(DEBTOR, Units.ether(2), {
                    from: CONTRACT_OWNER,
                });

                await principalToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    Units.ether(0.4),
                    { from: DEBTOR },
                );

                await expect(
                    servicingApi.makeRepayment(
                        issuanceHash,
                        Units.ether(0.5),
                        principalToken.address,
                        { from: DEBTOR },
                    ),
                ).rejects.toThrow(ServicingAPIErrors.INSUFFICIENT_REPAYMENT_ALLOWANCE());
            });
        });

        describe("arguments well-formed and payer's balance / allowance sufficient", () => {
            beforeAll(async () => {
                // First, we grant the payer sufficient balance
                // and approve the token transfer proxy a sufficient
                // repayment allowance
                await principalToken.setBalance.sendTransactionAsync(DEBTOR, Units.ether(2), {
                    from: CONTRACT_OWNER,
                });

                await principalToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    Units.ether(2),
                    { from: DEBTOR },
                );
            });

            describe("payer repays in expected principal token", () => {
                let txHash: string;
                let debtorBalanceBefore: BigNumber;
                let beneficiaryBalanceBefore: BigNumber;

                beforeAll(async () => {
                    debtorBalanceBefore = await principalToken.balanceOf.callAsync(DEBTOR);
                    beneficiaryBalanceBefore = await principalToken.balanceOf.callAsync(
                        BENEFICIARY,
                    );

                    txHash = await servicingApi.makeRepayment(
                        issuanceHash,
                        Units.ether(0.5),
                        principalToken.address,
                        { from: DEBTOR },
                    );
                });

                test("should emit log indicating successful repayment", async () => {
                    const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                    const [repaymentSuccessLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(repaymentSuccessLog.name).toBe("LogRepayment");
                });

                test("should debit payer amount repaid", async () => {
                    await expect(principalToken.balanceOf.callAsync(DEBTOR)).resolves.toEqual(
                        debtorBalanceBefore.minus(Units.ether(0.5)),
                    );
                });

                test("should credit beneficiary amount repaid", async () => {
                    await expect(principalToken.balanceOf.callAsync(BENEFICIARY)).resolves.toEqual(
                        beneficiaryBalanceBefore.plus(Units.ether(0.5)),
                    );
                });
            });

            describe("payer repays again in expected principal token", () => {
                let txHash: string;
                let debtorBalanceBefore: BigNumber;
                let beneficiaryBalanceBefore: BigNumber;

                beforeAll(async () => {
                    debtorBalanceBefore = await principalToken.balanceOf.callAsync(DEBTOR);
                    beneficiaryBalanceBefore = await principalToken.balanceOf.callAsync(
                        BENEFICIARY,
                    );

                    txHash = await servicingApi.makeRepayment(
                        issuanceHash,
                        Units.ether(0.3),
                        principalToken.address,
                        { from: DEBTOR },
                    );
                });

                test("should emit log indicating successful repayment", async () => {
                    const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                    const [repaymentSuccessLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(repaymentSuccessLog.name).toBe("LogRepayment");
                });

                test("should debit payer amount repaid", async () => {
                    await expect(principalToken.balanceOf.callAsync(DEBTOR)).resolves.toEqual(
                        debtorBalanceBefore.minus(Units.ether(0.3)),
                    );
                });

                test("should credit beneficiary amount repaid", async () => {
                    await expect(principalToken.balanceOf.callAsync(BENEFICIARY)).resolves.toEqual(
                        beneficiaryBalanceBefore.plus(Units.ether(0.3)),
                    );
                });
            });

            describe("terms contract rejects repayment due to unexpected token", () => {
                let txHash: string;
                let debtorBalanceBefore: BigNumber;
                let beneficiaryBalanceBefore: BigNumber;

                beforeAll(async () => {
                    // Grant payer balance in ZRX and grant an allowance
                    // to the tokenTransferProxy.
                    await nonPrincipalToken.setBalance.sendTransactionAsync(
                        DEBTOR,
                        Units.ether(2),
                        { from: CONTRACT_OWNER },
                    );
                    await nonPrincipalToken.approve.sendTransactionAsync(
                        tokenTransferProxy.address,
                        Units.ether(2),
                        { from: DEBTOR },
                    );

                    debtorBalanceBefore = Units.ether(2);
                    beneficiaryBalanceBefore = await nonPrincipalToken.balanceOf.callAsync(
                        BENEFICIARY,
                    );

                    txHash = await servicingApi.makeRepayment(
                        issuanceHash,
                        Units.ether(0.3),
                        nonPrincipalToken.address,
                        { from: DEBTOR },
                    );
                });

                test("should emit log indicating terms contract rejection", async () => {
                    const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                    const [repaymentErrorLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(repaymentErrorLog.name).toBe("LogError");
                });

                test("should not debit payer amount repaid", async () => {
                    await expect(nonPrincipalToken.balanceOf.callAsync(DEBTOR)).resolves.toEqual(
                        debtorBalanceBefore,
                    );
                });

                test("should not credit beneficiary amount repaid", async () => {
                    await expect(
                        nonPrincipalToken.balanceOf.callAsync(BENEFICIARY),
                    ).resolves.toEqual(beneficiaryBalanceBefore);
                });
            });
        });
    });

    // TODO: These tests should not be sequentially order-dependant.  Have been trying to implement
    //  snapshotting / reverting on ganache-cli, but running into mysterious errors.
    describe("#getValueRepaid()", () => {
        test("returns cumulative value repaid in debt agreement so far", async () => {
            await expect(servicingApi.getValueRepaid(issuanceHash)).resolves.toEqual(
                Units.ether(0.8),
            );
        });
    });

    describe("#getExpectedValueRepaid()", () => {
        describe("at present time", () => {
            test("returns 0", async () => {
                await expect(
                    servicingApi.getExpectedValueRepaid(issuanceHash, moment().unix()),
                ).resolves.toEqual(new BigNumber(0));
            });
        });

        describe("in 31 days", () => {
            test("returns 0.55", async () => {
                await expect(
                    servicingApi.getExpectedValueRepaid(
                        issuanceHash,
                        moment()
                            .add(31, "days")
                            .unix(),
                    ),
                ).resolves.toEqual(Units.ether(0.55));
            });
        });

        describe("in 61 days", () => {
            test("returns 1.10", async () => {
                await expect(
                    servicingApi.getExpectedValueRepaid(
                        issuanceHash,
                        moment()
                            .add(61, "days")
                            .unix(),
                    ),
                ).resolves.toEqual(Units.ether(1.1));
            });
        });
    });

    // TODO: Add tests for malformed TCP
    // TODO: Add tests for different types of terms contracts
    // TODO: Add tests for different variations of loan terms
});
