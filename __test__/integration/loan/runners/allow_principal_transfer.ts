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

const CREDITOR = ACCOUNTS[3];

export async function testAllowPrincipalTransfer(dharma: Dharma, params: LoanRequestParams) {
    let snapshotId: number;
    let loanRequest: LoanRequest;
    let principalTokenAddress: string;

    beforeAll(async () => {
        loanRequest = await LoanRequest.create(dharma, params);
        principalTokenAddress = await dharma.contracts.getTokenAddressBySymbolAsync(
            params.principalToken,
        );
    });

    beforeEach(async () => {
        snapshotId = await web3Utils.saveTestSnapshot();
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(snapshotId);
    });

    describe("when the creditor address is specified", () => {
        test("eventually enables principal token transfers for the given address", async () => {
            const transactionHash = await loanRequest.allowPrincipalTransfer(CREDITOR.address);
            await dharma.blockchain.awaitTransactionMinedAsync(transactionHash);

            const allowance = await dharma.token.getProxyAllowanceAsync(
                principalTokenAddress,
                CREDITOR.address,
            );

            expect(allowance).toEqual(UNLIMITED_PROXY_TOKEN_TRANSFER_ALLOWANCE);
        });
    });

    describe("when the creditor address is not specified", () => {
        test("eventually enables principal token transfers for the current user", async () => {
            const transactionHash = await loanRequest.allowPrincipalTransfer();
            await dharma.blockchain.awaitTransactionMinedAsync(transactionHash);

            const allowance = await dharma.token.getProxyAllowanceAsync(
                principalTokenAddress,
                ACCOUNTS[0].address,
            );

            expect(allowance).toEqual(UNLIMITED_PROXY_TOKEN_TRANSFER_ALLOWANCE);
        });
    });

    describe("when the creditor address is the same as the debtor address", () => {
        test("eventually throws an error", async () => {
            const getNetworkId = dharma.blockchain.getNetworkId;
            dharma.blockchain.getNetworkId = async () => 1;

            expect(loanRequest.allowPrincipalTransfer(params.debtorAddress)).rejects.toBeInstanceOf(
                Error,
            );

            dharma.blockchain.getNetworkId = getNetworkId;
        });
    });
}
