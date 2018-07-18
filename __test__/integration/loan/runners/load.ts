// External libraries
import * as Web3 from "web3";

// Debt Order
import { LoanRequest } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

// Wrappers
import { TokenRegistryContract } from "../../../../src/wrappers";

// APIs
import { ContractsAPI } from "../../../../src/apis";

// Types
import { DebtOrderData } from "../../../../src/types";

import { ACCOUNTS } from "../../../accounts";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const contracts = new ContractsAPI(web3);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

export async function testLoad(
    dharma: Dharma,
    generateDebtOrderData: (principalToken: string, termsContract: string) => DebtOrderData,
) {
    describe("when given valid data for a LoanRequest", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            const dummyTokenRegistry = await TokenRegistryContract.deployed(web3, TX_DEFAULTS);

            const wethAddress = await dummyTokenRegistry.getTokenAddressBySymbol.callAsync("WETH");

            const collateralizedTerms = await contracts.loadCollateralizedSimpleInterestTermsContract();
            const collateralizedTermsAddress = collateralizedTerms.address;

            const orderData = generateDebtOrderData(wethAddress, collateralizedTermsAddress);

            loanRequest = await LoanRequest.load(dharma, orderData);
        });

        it("eventually returns a LoadRequest", () => {
            expect(loanRequest instanceof LoanRequest).toEqual(true);
        });
    });
}
