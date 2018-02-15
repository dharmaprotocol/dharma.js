import { AccountAssertions } from "./account";
import { TokenAssertions } from "./token";
import { OrderAssertions } from "./order";
import { SchemaAssertions } from "./schema";
import { DebtAgreementAssertions } from "./debt_agreement";
import * as Web3 from "web3";

export class Assertions {
    public account: AccountAssertions;
    public order: OrderAssertions;
    public token: TokenAssertions;
    public schema: SchemaAssertions;
    public debtAgreement: DebtAgreementAssertions;

    private web3: Web3;

    public constructor(web3: Web3) {
        this.web3 = web3;

        this.account = new AccountAssertions(this.web3);
        this.order = new OrderAssertions(this.web3);
        this.token = new TokenAssertions();
        this.schema = new SchemaAssertions();
        this.debtAgreement = new DebtAgreementAssertions(this.web3);
    }
}
