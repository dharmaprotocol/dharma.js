// External
import * as singleLineString from "single-line-string";
import * as Web3 from "web3";

// APIs
import { ContractsAPI } from "./";

// Adapters
import {
    Adapter,
    CollateralizedSimpleInterestLoanAdapter,
    SimpleInterestLoanAdapter,
    ERC721CollateralizedSimpleInterestLoanAdapter,
} from "../adapters";

// Constants
import { TERMS_CONTRACT_TYPES } from "../../utils/constants";

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
    public erc721CollateralizedSimpleInterestLoan: ERC721CollateralizedSimpleInterestLoanAdapter;

    private readonly contracts: ContractsAPI;

    constructor(web3: Web3, contractsApi: ContractsAPI) {
        this.contracts = contractsApi;

        this.simpleInterestLoan = new SimpleInterestLoanAdapter(web3, this.contracts);
        this.collateralizedSimpleInterestLoan = new CollateralizedSimpleInterestLoanAdapter(
            web3,
            this.contracts,
        );
        this.erc721CollateralizedSimpleInterestLoan = new ERC721CollateralizedSimpleInterestLoanAdapter(
            web3,
            this.contracts,
        );
    }

    public async getAdapterByTermsContractAddress(termsContractAddress: string): Promise<Adapter> {
        const termsContractType = await this.contracts.getTermsContractType(termsContractAddress);

        switch (termsContractType) {
            case TERMS_CONTRACT_TYPES.SIMPLE_INTEREST_LOAN:
                return this.simpleInterestLoan;
            case TERMS_CONTRACT_TYPES.COLLATERALIZED_SIMPLE_INTEREST_LOAN:
                return this.collateralizedSimpleInterestLoan;
            default:
                throw new Error(AdaptersErrors.NO_ADAPTER_FOR_TERMS_CONTRACT(termsContractAddress));
        }
    }
}
