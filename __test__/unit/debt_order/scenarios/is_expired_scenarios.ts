// Debt Order
import { DebtOrderParams } from "../../../../src/debt_order";

// Types
import { EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../../../../src/types";

// Test utils
import { ACCOUNTS } from "../../../accounts";

const debtor = ACCOUNTS[1];

export interface IsExpiredScenario {
    description: string;
    params: DebtOrderParams;
    isExpired: boolean;
}

export const IS_EXPIRED_SCENARIOS: IsExpiredScenario[] = [
    {
        description: "when given valid params and the expiration is 5 days in the future",
        params: {
            principal: new TokenAmount(5, "REP"),
            collateral: new TokenAmount(10, "WETH"),
            interestRate: new InterestRate(12.3),
            termLength: new TimeInterval(6, "months"),
            debtorAddress: new EthereumAddress(debtor.address),
            expiresIn: new TimeInterval(5, "days"),
        },
        isExpired: false,
    },
    {
        description: "when given valid params and the expiration is 5 days in the past",
        params: {
            principal: new TokenAmount(5, "REP"),
            collateral: new TokenAmount(10, "WETH"),
            interestRate: new InterestRate(12.3),
            termLength: new TimeInterval(6, "months"),
            debtorAddress: new EthereumAddress(debtor.address),
            expiresIn: new TimeInterval(-5, "days"),
        },
        isExpired: true,
    },
    {
        description: "when given valid params and the expiration is 1 day in the past",
        params: {
            principal: new TokenAmount(5, "REP"),
            collateral: new TokenAmount(10, "WETH"),
            interestRate: new InterestRate(12.3),
            termLength: new TimeInterval(6, "months"),
            debtorAddress: new EthereumAddress(debtor.address),
            expiresIn: new TimeInterval(-1, "day"),
        },
        isExpired: true,
    },
];
