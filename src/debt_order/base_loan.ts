import { BigNumber } from "../../utils/bignumber";

import { DebtOrderData, EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../types";

import { DebtOrderDataWrapper } from "../wrappers";

import { Dharma } from "../dharma";

const SALT_DECIMALS = 20;

interface DebtOrderConstructorParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    debtorAddress: EthereumAddress;
    expiresAt: number;
}

export class BaseLoan {
    private static generateSalt(): BigNumber {
        return BigNumber.random(SALT_DECIMALS).times(new BigNumber(10).pow(SALT_DECIMALS));
    }

    private constructor(
        private dharma: Dharma,
        private params: DebtOrderConstructorParams,
        private data: DebtOrderData,
    ) {}

    private async enableTokenTransfers(
        address: EthereumAddress,
        tokenSymbol: string,
    ): Promise<string> {
        const tokenAddress = await this.dharma.contracts.getTokenAddressBySymbolAsync(tokenSymbol);

        return this.dharma.token.setUnlimitedProxyAllowanceAsync(tokenAddress, {
            from: address.toString(),
        });
    }

    private getAgreementId(): string {
        return new DebtOrderDataWrapper(this.data).getIssuanceCommitmentHash();
    }

    private serialize(): DebtOrderData {
        return this.data;
    }

    private async getCurrentBlocktime(): Promise<number> {
        return this.dharma.blockchain.getCurrentBlockTime();
    }

    private async getCurrentUser(): Promise<string> {
        const accounts = await this.dharma.blockchain.getAccounts();

        return accounts[0];
    }
}
