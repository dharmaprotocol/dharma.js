import { AccountAssertions } from "./account";
import { OrderAssertions } from "./order";
import { SchemaAssertions } from "./schema";
import * as Web3 from "web3";
export declare class Assertions {
    account: AccountAssertions;
    order: OrderAssertions;
    schema: SchemaAssertions;
    private web3;
    constructor(web3: Web3);
}
