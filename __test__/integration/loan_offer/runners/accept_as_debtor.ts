import * as Web3 from "web3";

import { Dharma, BigNumber } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import {
    OrderAPI,
    ContractsAPI,
    AdaptersAPI,
    TokenAPI,
    BlockchainAPI,
} from "../../../../src/apis/";

import * as compact from "lodash.compact";
import * as ABIDecoder from "abi-decoder";
import {
    CreditorProxyContract,
    DummyTokenContract,
    TokenTransferProxyContract,
    DebtKernelContract,
} from "src/wrappers";

import { Web3Utils } from "../../../../utils/web3_utils";

// Accounts
import { ACCOUNTS } from "../../../accounts";

const CREDITOR = ACCOUNTS[0];
const DEBTOR = ACCOUNTS[1];

const TX_DEFAULTS = { from: CREDITOR.address, gas: 4712388 };

export async function testAcceptAsDebtor(dharma: Dharma, params: any) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;
        let web3: Web3;
        let web3Utils: Web3Utils;
        let orderApi: OrderAPI;
        let tokenApi: TokenAPI;
        let blockchainApi: BlockchainAPI;
        let creditorProxy: CreditorProxyContract;
        let contractsApi: ContractsAPI;
        let tokenTransferProxy: TokenTransferProxyContract;
        let debtKernel: DebtKernelContract;

        let principalToken: DummyTokenContract;
        let collateralToken: DummyTokenContract;

        beforeAll(async () => {
            loanOffer = await LoanOffer.createAndSignAsCreditor(dharma, params);
            const provider = new Web3.providers.HttpProvider("http://localhost:8545");
            web3 = new Web3(provider);
            web3Utils = new Web3Utils(web3);
            contractsApi = new ContractsAPI(web3);
            creditorProxy = await contractsApi.loadCreditorProxyContract();
            tokenTransferProxy = await contractsApi.loadTokenTransferProxyAsync();
            debtKernel = await contractsApi.loadDebtKernelAsync();

            ABIDecoder.addABI(creditorProxy.abi);
            ABIDecoder.addABI(debtKernel.abi);

            const adaptersApi = new AdaptersAPI(web3, contractsApi);
            orderApi = new OrderAPI(web3, contractsApi, adaptersApi);
            tokenApi = new TokenAPI(web3, contractsApi);
            blockchainApi = new BlockchainAPI(web3, contractsApi);
        });

        beforeEach(async () => {
            const principalTokenSymbol = params.principalToken;
            const collateralTokenSymbol = params.collateralToken;

            principalToken = await DummyTokenContract.at(
                (await contractsApi.loadTokenBySymbolAsync(principalTokenSymbol)).address,
                web3,
                TX_DEFAULTS,
            );

            collateralToken = await DummyTokenContract.at(
                (await contractsApi.loadTokenBySymbolAsync(collateralTokenSymbol)).address,
                web3,
                TX_DEFAULTS,
            );

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
            await tokenApi.setProxyAllowanceAsync(
                principalToken.address,
                new BigNumber(100000000000).times(new BigNumber(10).pow(18)),
                { from: CREDITOR.address },
            );

            await tokenApi.setProxyAllowanceAsync(
                collateralToken.address,
                new BigNumber(100000000000).times(new BigNumber(10).pow(18)),
                { from: DEBTOR.address },
            );

            console.log("beforeEach done");
        });

        afterAll(() => {
            ABIDecoder.removeABI(creditorProxy.abi);
            ABIDecoder.removeABI(debtKernel.abi);
        });

        test("is accepted by debtor", async () => {
            // // get TokenTransferProxy's authorized agents
            // const authorizedAgents = await tokenTransferProxy.getAuthorizedTransferAgents.callAsync();

            // console.log(authorizedAgents);

            // // get CreditorProxy's address
            // console.log(creditorProxy.address);

            const creditorPrincipalAllowance = await tokenApi.getProxyAllowanceAsync(
                principalToken.address,
                CREDITOR.address,
            );
            const debtorCollateralAllowance = await tokenApi.getProxyAllowanceAsync(
                collateralToken.address,
                DEBTOR.address,
            );

            console.log(creditorPrincipalAllowance);
            console.log(debtorCollateralAllowance);

            let isFilled = await loanOffer.isFilled();
            expect(isFilled).toEqual(false);

            // const tokenAddress = loanOffer.data.principalToken;
            const accounts = await blockchainApi.getAccounts();
            const debtorAddress = accounts[1];

            // const debtorBalanceBefore = await tokenApi.getBalanceAsync(tokenAddress, debtorAddress);
            // console.log("BEFORE", debtorBalanceBefore.toString());

            await loanOffer.signAsDebtor(debtorAddress);

            console.log(loanOffer.data);

            const txHash = await loanOffer.acceptAsDebtor(debtorAddress);
            const receipt = await web3Utils.getTransactionReceiptAsync(txHash);

            const [one, two, three, four] = compact(ABIDecoder.decodeLogs(receipt.logs));
            console.log(one, two, three, four);

            // const debtorBalanceAfter = await tokenApi.getBalanceAsync(tokenAddress, debtorAddress);
            // console.log("AFTER", debtorBalanceAfter.toString());

            isFilled = await loanOffer.isFilled();
            expect(isFilled).toEqual(true);
        });
    });
}
