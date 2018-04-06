// External
import * as Web3 from "web3";
import * as singleLineString from "single-line-string";

// APIs
import { ContractsAPI } from "./";

// Adapters
import {
    Adapter,
    SimpleInterestLoanAdapter,
    CollateralizedSimpleInterestLoanAdapter,
} from "../adapters";

// Wrappers
import {
    SimpleInterestTermsContractContract,
    CollateralizedSimpleInterestTermsContractContract,
} from "src/wrappers";

export const AdaptersErrors = {
    NO_ADAPTER_FOR_TERMS_CONTRACT: (termsContractAddress: string) =>
        singleLineString`Could not find adapter suitable for terms contract at
                         address ${termsContractAddress}.`,
};

export class AdaptersAPI {
    /**
     * An instance of the simple interest loan adapter, which encapsulates the
     * logic governing a simple interest loan.
     *
     * Simple interest can be calculated as follows:
     *
     * Simple Interest = Principal x Interest Rate x Term of the loan
     *
     * To make this more concrete, a creditor could issue a loan of 10 ether
     * (the principal) over a period of 2 years (the term) at a rate of 10%
     * (the interest rate).
     *
     * By plugging these values into the above equation we're able to calculate
     * the simple interest on this loan as follows:
     *
     * 10 ether * 2 years * 10% = 2 ether
     */
    public simpleInterestLoan: SimpleInterestLoanAdapter;
    public collateralizedSimpleInterestLoan: CollateralizedSimpleInterestLoanAdapter;

    private contracts: ContractsAPI;
    private web3: Web3;

    constructor(web3: Web3, contractsApi: ContractsAPI) {
        this.web3 = web3;
        this.contracts = contractsApi;

        this.simpleInterestLoan = new SimpleInterestLoanAdapter(this.web3, this.contracts);
        this.collateralizedSimpleInterestLoan = new CollateralizedSimpleInterestLoanAdapter(
            this.web3,
            this.contracts,
        );
    }

    public async getAdapterByTermsContractAddress(
        termsContractAddress: string,
    ): Promise<Adapter.Interface> {
        const termsContractType = await this.contracts.getTermsContractType(termsContractAddress);

        switch (termsContractType) {
            case SimpleInterestTermsContractContract.name:
                return this.simpleInterestLoan;
            case CollateralizedSimpleInterestTermsContractContract.name:
                return this.collateralizedSimpleInterestLoan;
            default:
                throw new Error(AdaptersErrors.NO_ADAPTER_FOR_TERMS_CONTRACT(termsContractAddress));
        }
    }
}
