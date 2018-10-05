// External libraries
import * as Web3 from "web3";

import { BigNumber } from "../../../../utils/bignumber";

import { LoanRequest } from "../../../../src/loan";

import { OrderData } from "../../../../src/loan/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/types/dharma";

// Wrappers
import { TokenRegistryContract } from "../../../../src/wrappers";

// APIs
import { ContractsAPI } from "../../../../src/apis";

import { ACCOUNTS } from "../../../accounts";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const contracts = new ContractsAPI(web3);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

export async function testLoad(
    dharma: Dharma,
    generateOrderData: (principalToken: string, termsContract: string) => OrderData,
) {
    describe("when given valid data for a LoanRequest", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            const dummyTokenRegistry = await TokenRegistryContract.deployed(web3, TX_DEFAULTS);

            const wethAddress = await dummyTokenRegistry.getTokenAddressByIndex.callAsync(
                new BigNumber(4),
            );

            const collateralizedTerms = await contracts.loadCollateralizedSimpleInterestTermsContract();
            const collateralizedTermsAddress = collateralizedTerms.address;

            const loanData = generateOrderData(wethAddress, collateralizedTermsAddress);

            loanRequest = await LoanRequest.load<LoanRequest>(dharma, loanData);
        });

        it("eventually returns a LoanRequest", () => {
            expect(loanRequest instanceof LoanRequest).toEqual(true);
        });
    });
}
