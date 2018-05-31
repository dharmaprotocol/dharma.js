// External libraries
import * as ABIDecoder from "abi-decoder";
import * as _ from "lodash";
import * as Web3 from "web3";

// Utils
import { BigNumber } from "../../../../utils/bignumber";
import * as Units from "../../../../utils/units";
import { Web3Utils } from "../../../../utils/web3_utils";

// Adapters
import { SimpleInterestLoanAdapter } from "../../../../src/adapters";

// Apis
import { AdaptersAPI, ContractsAPI, LogsAPI, OrderAPI, SignerAPI } from "../../../../src/apis/";

// Types
import { DebtOrder } from "../../../../src/types";

// Scenarios
import { RepaymentRouterErrorScenario } from "../scenarios";

// Wrappers
import {
    DebtKernelContract,
    DummyTokenContract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
    TokenRegistryContract,
    TokenTransferProxyContract,
} from "../../../../src/wrappers";

import { ACCOUNTS } from "../../../accounts";

const CONTRACT_OWNER = ACCOUNTS[0].address;
const CREDITOR = ACCOUNTS[1].address;
const DEBTOR = ACCOUNTS[2].address;

const REPAYMENT_AMOUNT = Units.ether(10);
const PRINCIPAL_AMOUNT = REPAYMENT_AMOUNT.mul(3);

const TX_DEFAULTS = { from: CONTRACT_OWNER, gas: 400000 };

export class GetScenarioRunner {
    private web3Utils: Web3Utils;
    private web3: Web3;

    // Contracts
    private debtKernel: DebtKernelContract;
    private repaymentRouter: RepaymentRouterContract;
    private principalToken: DummyTokenContract;
    private termsContract: SimpleInterestTermsContractContract;
    private tokenTransferProxy: TokenTransferProxyContract;
    private tokenRegistry: TokenRegistryContract;

    // APIs
    private contractsAPI: ContractsAPI;
    private logsAPI: LogsAPI;
    private signerAPI: SignerAPI;
    private adaptersApi: AdaptersAPI;
    private orderAPI: OrderAPI;

    // Adapters
    private simpleInterestLoan: SimpleInterestLoanAdapter;

    private isConfigured: boolean = false;
    private currentSnapshotId: number;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.web3Utils = new Web3Utils(web3);

        this.testGetLogsAfterRepaymentScenario = this.testGetLogsAfterRepaymentScenario.bind(this);
        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
        this.testEventCount = this.testEventCount.bind(this);
        this.testIncludesExpectedFields = this.testIncludesExpectedFields.bind(this);
    }

    public async configure() {
        // Prevent unnecessary configuration.
        if (this.isConfigured) {
            return;
        }

        // Construct all necessary dependencies.
        this.contractsAPI = new ContractsAPI(this.web3);
        this.logsAPI = new LogsAPI(this.web3, this.contractsAPI);
        this.signerAPI = new SignerAPI(this.web3, this.contractsAPI);
        this.adaptersApi = new AdaptersAPI(this.web3, this.contractsAPI);
        this.orderAPI = new OrderAPI(this.web3, this.contractsAPI, this.adaptersApi);

        const {
            debtKernel,
            repaymentRouter,
            tokenTransferProxy,
        } = await this.contractsAPI.loadDharmaContractsAsync();
        const tokenRegistry = await this.contractsAPI.loadTokenRegistry();
        const dummyREPAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync("REP");
        const principalToken = await DummyTokenContract.at(dummyREPAddress, this.web3, TX_DEFAULTS);
        const termsContract = await this.contractsAPI.loadSimpleInterestTermsContract();

        this.debtKernel = debtKernel;
        this.repaymentRouter = repaymentRouter;
        this.principalToken = principalToken;
        this.termsContract = termsContract;
        this.tokenTransferProxy = tokenTransferProxy;
        this.tokenRegistry = tokenRegistry;

        this.simpleInterestLoan = new SimpleInterestLoanAdapter(this.web3, this.contractsAPI);

        // Mark instance as configured.
        this.isConfigured = true;
    }

    public testGetLogsAfterRepaymentScenario(scenario: RepaymentRouterErrorScenario) {
        let txHash: string;

        describe(scenario.description, () => {
            beforeEach(async () => {
                // Set up a valid repayment scenario.
                const principalToken = await this.generateTokenForSymbol("REP");

                const debtOrder = await this.generateSignedDebtOrderWithToken("REP");

                const issuanceHash = await this.orderAPI.getIssuanceHash(debtOrder);

                await this.orderAPI.fillAsync(debtOrder, { from: CREDITOR });

                txHash = await this.repaymentRouter.repay.sendTransactionAsync(
                    issuanceHash,
                    REPAYMENT_AMOUNT,
                    principalToken.address,
                    { from: DEBTOR },
                );
            });

            describe("and the arguments include \"LogRepayment\" as a string", async () => {
                it("includes a single log matching the repayment", async () => {
                    await this.testEventCount("LogRepayment", txHash, 1);
                });

                it("the log includes all of the expected log fields", async () => {
                    await this.testIncludesExpectedFields("LogRepayment", txHash);
                });
            });

            describe("and the arguments include \"LogRepayment\" as an array", async () => {
                it("includes a single log matching the repayment", async () => {
                    await this.testEventCount(["LogRepayment"], txHash, 1);
                });

                it("the log includes all of the expected log fields", async () => {
                    await this.testIncludesExpectedFields(["LogRepayment"], txHash);
                });

                describe("and the arguments include limit of 0", async () => {
                    it("returns 0 events", async () => {
                        await this.testEventCount(["LogRepayment"], txHash, 0, { limit: 0 });
                    });
                });
            });

            describe("and the arguments include an array of different event types", async () => {
                it("includes a single log matching the repayment", async () => {
                    await this.testEventCount(["LogRepayment", "Transfer"], txHash, 1);
                });

                it("the log includes all of the expected log fields", async () => {
                    await this.testIncludesExpectedFields(["LogRepayment", "Transfer"], txHash);
                });

                describe("and the arguments include limit of 0", async () => {
                    it("returns 0 events", async () => {
                        await this.testEventCount(["LogRepayment", "Transfer"], txHash, 0, { limit: 0 });
                    });
                });
            });
        });
    }

    public async saveSnapshotAsync() {
        this.currentSnapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.currentSnapshotId);
    }

    private async testIncludesExpectedFields(eventName: string | string[], txHash: string) {
        const matchingLogs = await this.filterLogs(eventName, txHash);

        const logKeys = Object.keys(matchingLogs[0]);

        expect(logKeys).toEqual(
            [
                "logIndex",
                "transactionIndex",
                "transactionHash",
                "blockHash",
                "blockNumber",
                "address",
                "type",
                "event",
                "args",
            ],
        );
    }

    private async testEventCount(eventName: string | string[], txHash: string, count: number, args?: object) {
        const matchingLogs = await this.filterLogs(eventName, txHash, args);

        expect(matchingLogs.length).toEqual(count);
    }

    private async filterLogs(eventName, txHash, args?: object): Promise<ABIDecoder.DecodedLogEntry[]> {
        const logs: ABIDecoder.DecodedLogEntry[] = await this.logsAPI.get(eventName, args);

        return _.filter(logs, (log) => log.transactionHash === txHash);
    }

    private async generateTokenForSymbol(symbol: string): Promise<DummyTokenContract> {
        const tokenAddress = await this.tokenRegistry.getTokenAddressBySymbol.callAsync(symbol);

        const token = await DummyTokenContract.at(tokenAddress, this.web3, TX_DEFAULTS);

        // Grant creditor a balance of tokens
        await token.setBalance.sendTransactionAsync(CREDITOR, PRINCIPAL_AMOUNT, {
            from: CONTRACT_OWNER,
        });

        // Grant debtor a balance of tokens
        await token.setBalance.sendTransactionAsync(DEBTOR, REPAYMENT_AMOUNT, {
            from: CONTRACT_OWNER,
        });

        // Approve the token transfer proxy for a sufficient
        // amount of tokens for an order fill.
        await token.approve.sendTransactionAsync(
            this.tokenTransferProxy.address,
            PRINCIPAL_AMOUNT,
            {
                from: CREDITOR,
            },
        );

        await token.approve.sendTransactionAsync(
            this.tokenTransferProxy.address,
            REPAYMENT_AMOUNT.plus(1),
            {
                from: DEBTOR,
            },
        );

        return token;
    }

    private async generateSignedDebtOrderWithToken(token: string): Promise<DebtOrder> {
        const debtOrder = await this.simpleInterestLoan.toDebtOrder({
            debtor: DEBTOR,
            creditor: CREDITOR,
            principalAmount: PRINCIPAL_AMOUNT,
            principalTokenSymbol: token,
            interestRate: new BigNumber(0.1),
            amortizationUnit: "months",
            termLength: new BigNumber(2),
            salt: new BigNumber(0),
        });

        debtOrder.debtorSignature = await this.signerAPI.asDebtor(debtOrder, false);

        return debtOrder;
    }
}
