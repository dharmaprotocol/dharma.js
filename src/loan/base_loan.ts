import { BigNumber } from "../../utils/bignumber";

import { DebtOrderData, EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../types";

import { DebtOrderDataWrapper } from "../wrappers";

import { Dharma } from "../dharma";

const SALT_DECIMALS = 20;

export interface BaseLoanConstructorParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    debtorAddress: EthereumAddress;
    expiresAt: number;
}

export abstract class BaseLoan {
    public static generateSalt(): BigNumber {
        return BigNumber.random(SALT_DECIMALS).times(new BigNumber(10).pow(SALT_DECIMALS));
    }

    constructor(
        public dharma: Dharma,
        public params: BaseLoanConstructorParams,
        public data: DebtOrderData,
    ) {}

    public async enableTokenTransfers(
        address: EthereumAddress,
        tokenSymbol: string,
    ): Promise<string> {
        const tokenAddress = await this.dharma.contracts.getTokenAddressBySymbolAsync(tokenSymbol);

        return this.dharma.token.setUnlimitedProxyAllowanceAsync(tokenAddress, {
            from: address.toString(),
        });
    }

    public getAgreementId(): string {
        return new DebtOrderDataWrapper(this.data).getIssuanceCommitmentHash();
    }

    public serialize(): DebtOrderData {
        return this.data;
    }

    public async getCurrentBlocktime(): Promise<number> {
        return this.dharma.blockchain.getCurrentBlockTime();
    }

    public async getCurrentUser(): Promise<string> {
        const accounts = await this.dharma.blockchain.getAccounts();

        return accounts[0];
    }
}
