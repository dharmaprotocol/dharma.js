import * as Web3 from "web3";
import * as ABIDecoder from "abi-decoder";

import { DebtKernelErrorScenario } from "./scenarios";
import { DebtOrder, DebtKernelError } from "src/types";
import { Web3Utils } from "utils/web3_utils";
import { ContractsAPI, BlockchainAPI, SignerAPI } from "src/apis/";

import {
    DebtKernelContract,
    DebtOrderWrapper,
    RepaymentRouterContract,
    DummyTokenContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";

export class ErrorScenarioRunner {
    private web3Utils: Web3Utils;
    private web3: Web3;

    private debtKernel: DebtKernelContract;
    private repaymentRouter: RepaymentRouterContract;
    private principalToken: DummyTokenContract;
    private termsContract: SimpleInterestTermsContractContract;

    private contractsAPI: ContractsAPI;
    private blockchainAPI: BlockchainAPI;
    private signerAPI: SignerAPI;

    private isConfigured: boolean = false;
    private currentSnapshotId: number;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.web3Utils = new Web3Utils(web3);
        this.testDebtKernelErrorScenario = this.testDebtKernelErrorScenario.bind(this);
        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public async configure() {
        // Prevent unnecessary configuration.
        if (this.isConfigured) {
            return;
        }

        // Construct all necessary dependencies.
        const contractsAPI = new ContractsAPI(this.web3);
        const blockchainAPI = new BlockchainAPI(this.web3, contractsAPI);
        const signerAPI = new SignerAPI(this.web3, contractsAPI);
        const {
            debtKernel,
            debtRegistry,
            debtToken,
            repaymentRouter,
        } = await contractsAPI.loadDharmaContractsAsync();
        const dummyTokenRegistry = await contractsAPI.loadTokenRegistry();
        const dummyREPAddress = await dummyTokenRegistry.getTokenAddress.callAsync("REP");
        const principalToken = await DummyTokenContract.at(dummyREPAddress, this.web3, {});
        const termsContract = await contractsAPI.loadSimpleInterestTermsContract(
            principalToken.address,
        );

        // Assign dependencies to instance variables.
        this.contractsAPI = contractsAPI;
        this.blockchainAPI = blockchainAPI;
        this.signerAPI = signerAPI;

        this.debtKernel = debtKernel;
        this.repaymentRouter = repaymentRouter;
        this.principalToken = principalToken;
        this.termsContract = termsContract;

        // Mark instance as configured.
        this.isConfigured = true;
    }

    public testDebtKernelErrorScenario(scenario: DebtKernelErrorScenario) {
        describe(scenario.description, () => {
            let txHash: string;

            beforeEach(async () => {
                const debtOrder = scenario.generateDebtOrder(
                    this.debtKernel,
                    this.repaymentRouter,
                    this.principalToken,
                    this.termsContract,
                );

                const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
                    debtOrder,
                    this.contractsAPI,
                );

                // We dynamically attach signatures based on whether the
                // the scenario specifies that a signature from a signatory
                // ought to be attached.
                debtOrder.debtorSignature = scenario.signatories.debtor
                    ? await this.signerAPI.asDebtor(debtOrder)
                    : undefined;
                debtOrder.creditorSignature = scenario.signatories.creditor
                    ? await this.signerAPI.asCreditor(debtOrder)
                    : undefined;
                debtOrder.underwriterSignature = scenario.signatories.underwriter
                    ? await this.signerAPI.asUnderwriter(debtOrder)
                    : undefined;

                if (scenario.beforeBlock) {
                    await scenario.beforeBlock(debtOrder, this.debtKernel);
                }

                txHash = await this.debtKernel.fillDebtOrder.sendTransactionAsync(
                    debtOrderWrapped.getCreditor(),
                    debtOrderWrapped.getOrderAddresses(),
                    debtOrderWrapped.getOrderValues(),
                    debtOrderWrapped.getOrderBytes32(),
                    debtOrderWrapped.getSignaturesV(),
                    debtOrderWrapped.getSignaturesR(),
                    debtOrderWrapped.getSignaturesS(),
                    { from: debtOrderWrapped.getCreditor() },
                );
            });

            test("it returns the correct human-readable error message", async () => {
                const errors = await this.blockchainAPI.getErrorLogs(txHash);
                expect(errors.length).toEqual(1);
                expect(errors[0]).toEqual(DebtKernelError.messageForError(scenario.error));
            });
        });
    }

    public async saveSnapshotAsync() {
        this.currentSnapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.currentSnapshotId);
    }
}
