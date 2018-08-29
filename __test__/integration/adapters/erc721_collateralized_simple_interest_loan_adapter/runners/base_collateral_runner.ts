// External libraries
import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import * as Web3 from "web3";
// Utils
import * as Units from "../../../../../utils/units";
import { Web3Utils } from "../../../../../utils/web3_utils";
// Scenarios
import { ReturnCollateralScenario, SeizeCollateralScenario } from "../scenarios";
// Adapters
import {
    ERC721CollateralizedSimpleInterestLoanAdapter,
    ERC721CollateralizedTermsContractParameters
} from "../../../../../src/adapters/erc721_collateralized_simple_interest/loan_adapter";
// Wrappers
import {
    DebtKernelContract,
    DummyTokenContract,
    ERC721CollateralizedSimpleInterestTermsContractContract,
    ERC721TokenContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "../../../../../src/wrappers";
// APIs
import { ContractsAPI, OrderAPI, ServicingAPI, SignerAPI, TokenAPI } from "../../../../../src/apis";
// Types
import { DebtOrderData } from "../../../../../src/types";
// Accounts
import { ACCOUNTS } from "../../../../accounts";
import { MintableERC721TokenContract } from "../../../../../src/wrappers/contract_wrappers/mintable_e_r_c721_token_wrapper";

const CONTRACT_OWNER = ACCOUNTS[0];
const DEBTOR = ACCOUNTS[1];
const CREDITOR = ACCOUNTS[2];
const UNDERWRITER = ACCOUNTS[3];

const RELAYER = ACCOUNTS[4];

const TX_DEFAULTS = { from: CONTRACT_OWNER.address, gas: 4712388 };

export interface APIs {
    orderApi: OrderAPI;
    signerApi: SignerAPI;
    servicingApi: ServicingAPI;
    contractsApi: ContractsAPI;
    tokenApi: TokenAPI;
}

export abstract class BaseCollateralRunner {
    protected adapter: ERC721CollateralizedSimpleInterestLoanAdapter;
    protected debtKernel: DebtKernelContract;
    protected repaymentRouter: RepaymentRouterContract;
    protected principalToken: DummyTokenContract;
    protected collateralToken: ERC721TokenContract;
    protected termsContract: ERC721CollateralizedSimpleInterestTermsContractContract;
    protected orderApi: OrderAPI;
    protected signerApi: SignerAPI;
    protected tokenTransferProxy: TokenTransferProxyContract;
    protected web3: Web3;
    protected web3Utils: Web3Utils;
    protected servicingApi: ServicingAPI;
    protected contractsApi: ContractsAPI;
    protected tokenApi: TokenAPI;
    protected snapshotId: number;
    protected debtOrderData: DebtOrderData;

    constructor(web3: Web3, adapter: ERC721CollateralizedSimpleInterestLoanAdapter, apis: APIs) {
        this.web3 = web3;

        this.orderApi = apis.orderApi;
        this.signerApi = apis.signerApi;
        this.servicingApi = apis.servicingApi;
        this.contractsApi = apis.contractsApi;
        this.tokenApi = apis.tokenApi;

        this.adapter = adapter;

        this.web3Utils = new Web3Utils(web3);

        this.testScenario = this.testScenario.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public async saveSnapshotAsync() {
        this.snapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.snapshotId);
    }

    public abstract testScenario(scenario: ReturnCollateralScenario | SeizeCollateralScenario);

    // Increases EVM time to a given new time in seconds since unix epoch.
    protected async increaseTime(newTime: number): Promise<void> {
        const secondsUntilNewTime = newTime - (await this.web3Utils.getCurrentBlockTime());

        await this.web3Utils.increaseTime(secondsUntilNewTime + 1);
    }

    protected async setBalances(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
    ): Promise<void> {
        // TODO: Mint a new ERC721 token for the Debtor.

        // The debtor has more than enough of the principal token to repay debts.
        await this.principalToken.setBalance.sendTransactionAsync(
            DEBTOR.address,
            scenario.simpleTerms.principalAmount.mul(2),
            {
                from: CONTRACT_OWNER.address,
            },
        );

        // 2. Set up creditor balances.

        // The creditor has exactly the amount necessary to loan to the debtor,
        // as well as to pay for the creditor fee.
        await this.principalToken.setBalance.sendTransactionAsync(
            CREDITOR.address,
            scenario.simpleTerms.principalAmount.add(this.debtOrderData.creditorFee),
            {
                from: CONTRACT_OWNER.address,
            },
        );

        // 3. Set up underwriter balances.

        // The underwriter has enough balance to pay the underwriter fee.
        await this.principalToken.setBalance.sendTransactionAsync(
            UNDERWRITER.address,
            this.debtOrderData.underwriterFee,
            {
                from: CONTRACT_OWNER.address,
            },
        );
    }

    protected async setApprovals(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
    ): Promise<void> {
        const { debtor, creditor, principalAmount } = this.debtOrderData;

        // TODO: Grant the collateralizer approval for moving the asset.

        // The debtor grants the transfer proxy some sufficient allowance for making repayments.
        await this.tokenApi.setProxyAllowanceAsync(
            this.principalToken.address,
            principalAmount.mul(2),
            { from: debtor },
        );

        // The creditor grants allowance of the principal token being loaned,
        // as well as the creditor fee.
        await this.tokenApi.setProxyAllowanceAsync(
            this.principalToken.address,
            principalAmount.add(this.debtOrderData.creditorFee),
            { from: creditor },
        );
    }

    protected async signOrder(): Promise<void> {
        this.debtOrderData.debtorSignature = await this.signerApi.asDebtor(
            this.debtOrderData,
            false,
        );
        this.debtOrderData.creditorSignature = await this.signerApi.asCreditor(
            this.debtOrderData,
            false,
        );
        this.debtOrderData.underwriterSignature = await this.signerApi.asUnderwriter(
            this.debtOrderData,
            false,
        );
    }

    protected async repayDebt(agreementId, termEnd): Promise<void> {
        const amount = await this.termsContract.getExpectedRepaymentValue.callAsync(
            agreementId,
            termEnd,
        );

        await this.servicingApi.makeRepayment(agreementId, amount, this.principalToken.address, {
            from: this.debtOrderData.debtor,
        });
    }

    protected generateDebtOrderData(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
    ): DebtOrderData {
        const termsParams = this.adapter.packParameters(
            scenario.simpleTerms,
            scenario.collateralTerms,
        );

        return {
            kernelVersion: this.debtKernel.address,
            issuanceVersion: this.repaymentRouter.address,
            principalAmount: scenario.simpleTerms.principalAmount,
            principalToken: this.principalToken.address,
            debtor: DEBTOR.address,
            debtorFee: Units.ether(0.001),
            creditor: CREDITOR.address,
            creditorFee: Units.ether(0.002),
            relayer: RELAYER.address,
            relayerFee: Units.ether(0.0015),
            termsContract: this.termsContract.address,
            termsContractParameters: termsParams,
            expirationTimestampInSec: new BigNumber(
                moment()
                    .add(7, "days")
                    .unix(),
            ),
            underwriter: UNDERWRITER.address,
            underwriterFee: Units.ether(0.0015),
            underwriterRiskRating: new BigNumber(1350),
            salt: new BigNumber(0),
        };
    }

    protected async generateAndFillOrder(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
        collateralTerms: ERC721CollateralizedTermsContractParameters,
    ): Promise<void> {
        scenario.collateralTerms = collateralTerms;

        console.log("collateral terms", scenario.collateralTerms);

        this.debtOrderData = this.generateDebtOrderData(scenario);

        await this.signOrder();

        await this.setBalances(scenario);

        await this.setApprovals(scenario);

        console.log("debt order data", this.debtOrderData);
        const unpackedParams = await this.adapter.unpackParameters(this.debtOrderData.termsContractParameters);
        console.log(
            "parameters unpacked",
            unpackedParams,
        );



        const registry = await this.contractsApi.loadERC721TokenRegistryContract();
        const collateralizer = await this.contractsApi.loadERC721CollateralizerAsync();
        const tokenSymbol = await registry.getTokenSymbolByIndex.callAsync(unpackedParams.erc721ContractIndex);
        const tokenAddress = await registry.getTokenAddressBySymbol.callAsync(tokenSymbol);
        console.log("token address", tokenAddress);
        console.log("token symbol right before", tokenSymbol);
        const tokenId = unpackedParams.tokenReference;
        console.log("token id", tokenId.toString());
        const token = await this.contractsApi.loadERC721ContractAsync(tokenAddress);
        const permissions = await token.getApproved.callAsync(tokenId);
        console.log("permissions", permissions);
        console.log("collateralizer", collateralizer.address);

        await this.orderApi.fillAsync(this.debtOrderData, {
            from: CREDITOR.address,
            // NOTE: Using the maximum gas here, to prevent potentially confusing
            // reverts due to insufficient gas. This wouldn't be applied in practice.
            gas: 4712388,
        });
    }

    protected async initializeWrappers(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
    ): Promise<ERC721CollateralizedTermsContractParameters> {
        this.debtKernel = await DebtKernelContract.deployed(this.web3);

        this.repaymentRouter = await RepaymentRouterContract.deployed(this.web3);

        this.termsContract = await this.contractsApi.loadERC721CollateralizedSimpleInterestTermsContract(
            TX_DEFAULTS,
        );

        console.log("terms contract", this.termsContract.address);

        const principalTokenSymbol = await this.contractsApi.getTokenSymbolByIndexAsync(
            scenario.simpleTerms.principalTokenIndex,
        );

        const erc721Symbol = "MET";

        const erc721TokenIndex = await this.contractsApi.getERC721IndexBySymbolAsync(
            erc721Symbol,
        );

        const erc721Address = await this.contractsApi.getERC721AddressBySymbolAsync(
            erc721Symbol,
        );

        console.log("ERC721 SYMBOL!", erc721Symbol);

        this.principalToken = await DummyTokenContract.at(
            (await this.contractsApi.loadTokenBySymbolAsync(principalTokenSymbol)).address,
            this.web3,
            TX_DEFAULTS,
        );

        this.collateralToken = await this.contractsApi.loadERC721BySymbolAsync(erc721Symbol);

        const contractRegistry = await this.contractsApi.loadERC721TokenRegistryContract();
        const expectedIndex = await contractRegistry.getTokenIndexBySymbol.callAsync(erc721Symbol);
        console.log("collateral token index", expectedIndex.toString());

        console.log("SYMBOL FROM LOADED CONTRACT!", await this.collateralToken.symbol.callAsync());

        // Mint a collateral token for the debtor. We can do this because we assume that the
        // collateral token is a Mintable ER721 Token.
        const mintableERC721Contract = await MintableERC721TokenContract.deployed(this.web3, TX_DEFAULTS);
        console.log("collateral token ADDRESS", this.collateralToken.address);
        console.log("mintable token ADDRESS", mintableERC721Contract.address);
        console.log("debtor address", DEBTOR.address);

        const tokenId = await mintableERC721Contract.totalSupply.callAsync();

        console.log("total supply before", tokenId.toString());

        await mintableERC721Contract.mint.sendTransactionAsync(DEBTOR.address, tokenId);

        console.log(
            "total supply after",
            (await mintableERC721Contract.totalSupply.callAsync()).toString(),
        );

        const collateralizerContract = await this.contractsApi.loadERC721CollateralizerAsync();
        console.log("collateralizer", collateralizerContract.address);
        console.log("approved", await mintableERC721Contract.getApproved.callAsync(tokenId));

        // Grant permission to the collateralizer.
        await mintableERC721Contract.approve.sendTransactionAsync(
            collateralizerContract.address,
            tokenId,
            { ...TX_DEFAULTS, from: DEBTOR.address },
        );

        console.log("collateralizer", collateralizerContract.address);
        console.log("approved", await mintableERC721Contract.getApproved.callAsync(tokenId));

        this.tokenTransferProxy = await this.contractsApi.loadTokenTransferProxyAsync();

        return {
            tokenReference: tokenId,
            erc721ContractIndex: erc721TokenIndex,
            isEnumerable: new BigNumber(1)
        };
    }
}
