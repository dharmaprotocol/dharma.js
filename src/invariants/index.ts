import { AccountAssertions } from "./account";
import { OrderAssertions } from "./order";
import { SchemaAssertions } from "./schema";
import Web3 from "web3";

export class Assertions {
    public account: AccountAssertions;
    public order: OrderAssertions;
    public schema: SchemaAssertions;

    private web3: Web3;

    public constructor(web3: Web3) {
        this.web3 = web3;

        this.account = new AccountAssertions(this.web3);
        this.order = new OrderAssertions(this.web3);
        this.schema = new SchemaAssertions();
    }
}
