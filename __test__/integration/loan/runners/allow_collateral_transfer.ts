import * as Web3 from "web3";

// Types
import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Dharma.js
import { Dharma } from "../../../../src/dharma";

// Accounts
import { ACCOUNTS } from "../../../accounts";

// Utils
import { Web3Utils } from "../../../../utils/web3_utils";

// Constants
import { UNLIMITED_PROXY_TOKEN_TRANSFER_ALLOWANCE } from "../../../../utils/constants";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const DEBTOR = ACCOUNTS[2];

export async function testAllowCollateralTransfer(dharma: Dharma, params: LoanRequestParams) {
    let snapshotId: number;
    let loanRequest: LoanRequest;
    let collateralTokenAddress: string;

    beforeAll(async () => {
        loanRequest = await LoanRequest.create(dharma, params);
        collateralTokenAddress = await dharma.contracts.getTokenAddressBySymbolAsync(
            params.collateralToken,
        );
    });

    beforeEach(async () => {
        snapshotId = await web3Utils.saveTestSnapshot();
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(snapshotId);
    });

    describe("when the debtor address is specified", () => {
        test("eventually enables collateral token transfers for the given address", async () => {
            const transactionHash = await loanRequest.allowCollateralTransfer(DEBTOR.address);
            await dharma.blockchain.awaitTransactionMinedAsync(transactionHash);

            const allowance = await dharma.token.getProxyAllowanceAsync(
                collateralTokenAddress,
                DEBTOR.address,
            );

            expect(allowance).toEqual(UNLIMITED_PROXY_TOKEN_TRANSFER_ALLOWANCE);
        });
    });

    describe("when the debtor address is not specified", () => {
        test("eventually enables collateral token transfers for debtor specified in the loan request ", async () => {
            const transactionHash = await loanRequest.allowCollateralTransfer();
            await dharma.blockchain.awaitTransactionMinedAsync(transactionHash);

            const allowance = await dharma.token.getProxyAllowanceAsync(
                collateralTokenAddress,
                params.debtorAddress,
            );

            expect(allowance).toEqual(UNLIMITED_PROXY_TOKEN_TRANSFER_ALLOWANCE);
        });
    });
}
