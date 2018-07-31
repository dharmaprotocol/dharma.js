import { Investment } from "./investment";

import { Dharma } from "../../dharma";

import { EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../../types";

import { BaseLoanConstructorParams } from "../agreement";

/**
 * Describes a collection of investments and provides functionality for managing such a collection.
 */
export class Investments {
    /**
     * Retrieves a collection of investments that belong to the specified owner.
     *
     * @returns {Promise<Investment[]>}
     */
    public static async get(dharma: Dharma, owner: string): Promise<Investment[]> {
        const agreementIds = await dharma.servicing.getInvestmentsAsync(owner);

        return Promise.all(
            agreementIds.map(async (agreementId) => {
                const debtOrderData = await dharma.order.getDebtOrder(agreementId);

                const parameters = dharma.adapters.collateralizedSimpleInterestLoan.unpackParameters(
                    debtOrderData.termsContractParameters,
                );

                const principalSymbol = await dharma.token.getTokenSymbolByIndexAsync(
                    parameters.principalTokenIndex,
                );

                const collateralSymbol = await dharma.token.getTokenSymbolByIndexAsync(
                    parameters.collateralTokenIndex,
                );

                const params: BaseLoanConstructorParams = {
                    principal: TokenAmount.fromRaw(parameters.principalAmount, principalSymbol),
                    collateral: TokenAmount.fromRaw(parameters.collateralAmount, collateralSymbol),
                    interestRate: new InterestRate(parameters.interestRate.toNumber()),
                    termLength: new TimeInterval(
                        parameters.termLength.toNumber(),
                        parameters.amortizationUnit,
                    ),
                    debtorAddress: new EthereumAddress(debtOrderData.debtor),
                    expiresAt: debtOrderData.expirationTimestampInSec.toNumber(),
                };

                return new Investment(dharma, params, debtOrderData);
            }),
        );
    }
}
