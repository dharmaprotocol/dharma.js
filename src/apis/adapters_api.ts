// APIs
import { ContractsAPI } from "./";
import { SimpleInterestLoanAdapter, CollateralizedSimpleInterestLoanAdapter } from "../adapters";

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

    constructor(contractsApi: ContractsAPI) {
        this.contracts = contractsApi;

        this.simpleInterestLoan = new SimpleInterestLoanAdapter(this.contracts);
        this.collateralizedSimpleInterestLoan = new CollateralizedSimpleInterestLoanAdapter(
            this.contracts,
        );
    }
}
