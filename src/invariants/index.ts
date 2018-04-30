// External
import * as Web3 from "web3";

// Assertions
import { AccountAssertions } from "./account";
import { AdapterAssertions } from "./adapter";
import { DebtAgreementAssertions } from "./debt_agreement";
import { DebtTokenAssertions } from "./debt_token";
import { OrderAssertions } from "./order";
import { SchemaAssertions } from "./schema";
import { TokenAssertions } from "./token";

// APIs
import { ContractsAPI } from "../apis/";

export class Assertions {
    public account: AccountAssertions;
    public adapter: AdapterAssertions;
    public order: OrderAssertions;
    public token: TokenAssertions;
    public schema: SchemaAssertions;
    public debtAgreement: DebtAgreementAssertions;
    public debtToken: DebtTokenAssertions;

    private contracts: ContractsAPI;

    public constructor(web3: Web3, contracts: ContractsAPI) {
        this.contracts = contracts;

        this.account = new AccountAssertions();
        this.adapter = new AdapterAssertions();
        this.order = new OrderAssertions(web3, this.contracts);
        this.token = new TokenAssertions();
        this.schema = new SchemaAssertions();
        this.debtToken = new DebtTokenAssertions();
        this.debtAgreement = new DebtAgreementAssertions();
    }
}
