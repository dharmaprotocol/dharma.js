import { BigNumber } from "../../utils/bignumber";

import {
    DebtOrderData,
    ECDSASignature,
    EthereumAddress,
    InterestRate,
    TimeInterval,
    TokenAmount,
} from "../types";

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

export interface LoanData {
    kernelVersion: string;
    issuanceVersion: string;
    principalAmount: string;
    principalToken: string;
    debtor: string;
    debtorFee: string;
    creditor: string;
    creditorFee: string;
    relayer: string;
    relayerFee: string;
    underwriter: string;
    underwriterFee: string;
    underwriterRiskRating: string;
    termsContract: string;
    termsContractParameters: string;
    expirationTimestampInSec: string;
    salt: string;
    debtorSignature: ECDSASignature;
    creditorSignature: ECDSASignature;
    underwriterSignature: ECDSASignature;
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

    public toJSON(): LoanData {
        return {
            kernelVersion: this.data.kernelVersion!,
            issuanceVersion: this.data.issuanceVersion!,
            principalAmount: this.data.principalAmount.toString(),
            principalToken: this.data.principalToken!,
            debtor: this.data.debtor!,
            debtorFee: this.data.debtorFee.toString(),
            creditor: this.data.creditor!,
            creditorFee: this.data.creditorFee.toString(),
            relayer: this.data.relayer!,
            relayerFee: this.data.relayerFee.toString(),
            underwriter: this.data.underwriter!,
            underwriterFee: this.data.underwriterFee.toString(),
            underwriterRiskRating: this.data.underwriterRiskRating.toString(),
            termsContract: this.data.termsContract!,
            termsContractParameters: this.data.termsContractParameters!,
            expirationTimestampInSec: this.data.expirationTimestampInSec.toString(),
            salt: this.data.salt.toString(),
            debtorSignature: this.data.debtorSignature!,
            creditorSignature: this.data.creditorSignature!,
            underwriterSignature: this.data.underwriterSignature!,
        };
    }

    public async getCurrentBlocktime(): Promise<number> {
        return this.dharma.blockchain.getCurrentBlockTime();
    }

    public async getCurrentUser(): Promise<string> {
        const accounts = await this.dharma.blockchain.getAccounts();

        return accounts[0];
    }

    /**
     * Validates the user-specified address if present. Otherwise, retrieves the current user from
     * web3. This function will throw is the address specified is invalid.
     *
     * @param  address
     * @returns {Promise<string>} a validated user-specified address, or the current user.
     */
    public async validAddressOrCurrentUser(address?: string): Promise<string> {
        if (address) {
            const validAddress = new EthereumAddress(address);
            return validAddress.toString();
        } else {
            return this.getCurrentUser();
        }
    }
}
