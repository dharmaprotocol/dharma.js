import { Investment } from "./investment";

import { Dharma } from "../../dharma";

import {
    EthereumAddress,
    InterestRate,
    TimeInterval,
    TokenAmount,
} from "../../types";

import { Loan } from "../loan";

import { CollateralizedSimpleInterestLoanAdapter } from "../../adapters";

import { BaseLoanConstructorParams } from "../agreement";

/**
 * Describes a collection of loans and provides functionality for managing such a collection.
 */
export class Investments {
    private readonly owner: EthereumAddress;

    constructor(private readonly dharma: Dharma, owner: string) {
        this.owner = new EthereumAddress(owner);
    }

    /**
     * Gets a collection of investments that belong to the current owner.
     *
     * @returns {Promise<Loan[]>}
     */
    public async get(): Promise<Investment[]> {
        const agreementIds = await this.dharma.servicing.getDebtsAsync(this.owner.toString());

        return Promise.all(
            agreementIds.map(async (agreementId) => {
                const debtOrderData = await this.dharma.order.getDebtOrder(agreementId);
                const termsContract = debtOrderData.termsContract;

                const adapter = await this.dharma.servicing.adapterForTermsContract(
                    termsContract,
                ) as CollateralizedSimpleInterestLoanAdapter;

                const parameters = await adapter.unpackParameters(debtOrderData.termsContractParameters);

                const principalSymbol = await this.dharma.token.getTokenSymbolByIndexAsync(
                    parameters.principalTokenIndex,
                );
                const collateralSymbol = await this.dharma.token.getTokenSymbolByIndexAsync(
                    parameters.collateralTokenIndex,
                );

                const params: BaseLoanConstructorParams = {
                    principal: TokenAmount.fromRaw(parameters.principalAmount, principalSymbol),
                    collateral: TokenAmount.fromRaw(parameters.collateralAmount, collateralSymbol),
                    interestRate: new InterestRate(parameters.interestRate.toNumber()),
                    termLength: new TimeInterval(parameters.termLength.toNumber(), parameters.amortizationUnit),
                    debtorAddress: new EthereumAddress(debtOrderData.debtor),
                    expiresAt: debtOrderData.expirationTimestampInSec.toNumber(),
                };

                return new Investment(this.dharma, params, debtOrderData);
            }),
        );
    }
}
