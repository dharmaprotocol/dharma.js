import * as Web3 from "web3";
import { AccountAssertions } from "./account";
import { AdapterAssertions } from "./adapter";
import { DebtAgreementAssertions } from "./debt_agreement";
import { DebtTokenAssertions } from "./debt_token";
import { OrderAssertions } from "./order";
import { SchemaAssertions } from "./schema";
import { TokenAssertions } from "./token";
import { ContractsAPI } from "../apis/";
export declare class Assertions {
    account: AccountAssertions;
    adapter: AdapterAssertions;
    order: OrderAssertions;
    token: TokenAssertions;
    schema: SchemaAssertions;
    debtAgreement: DebtAgreementAssertions;
    debtToken: DebtTokenAssertions;
    private contracts;
    constructor(web3: Web3, contracts: ContractsAPI);
}
