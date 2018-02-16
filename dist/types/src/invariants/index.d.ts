import { AccountAssertions } from "./account";
import { TokenAssertions } from "./token";
import { OrderAssertions } from "./order";
import { SchemaAssertions } from "./schema";
import { DebtAgreementAssertions } from "./debt_agreement";
import * as Web3 from "web3";
export declare class Assertions {
    account: AccountAssertions;
    order: OrderAssertions;
    token: TokenAssertions;
    schema: SchemaAssertions;
    debtAgreement: DebtAgreementAssertions;
    private web3;
    constructor(web3: Web3);
}
