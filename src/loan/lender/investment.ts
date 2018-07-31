import { Dharma } from "../../dharma";

import { EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../../types";

export interface InvestmentParams {
    id: string;
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    creditor: EthereumAddress;
    debtor: EthereumAddress;
}

/**
 * Describes a loan from a lender's perspective, includes functionality for seizing
 * collateral.
 */
export class Investment {
    public static async fetch(dharma: Dharma, id: string): Promise<Investment> {
        const entry = await dharma.servicing.getDebtRegistryEntry(id);

        // HACK(kayvon): we don't include the debtor in the debt registry entry so we need to pull
        // it from the collateralizer.
        const collateralizer = await dharma.contracts.loadCollateralizerAsync();
        const debtor = await collateralizer.agreementToCollateralizer.callAsync(id);

        const parameters = dharma.adapters.collateralizedSimpleInterestLoan.unpackParameters(
            entry.termsContractParameters,
        );

        const principalSymbol = await dharma.token.getTokenSymbolByIndexAsync(
            parameters.principalTokenIndex,
        );

        const collateralSymbol = await dharma.token.getTokenSymbolByIndexAsync(
            parameters.collateralTokenIndex,
        );

        const data = {
            id,
            principal: TokenAmount.fromRaw(parameters.principalAmount, principalSymbol),
            collateral: TokenAmount.fromRaw(parameters.collateralAmount, collateralSymbol),
            interestRate: new InterestRate(parameters.interestRate.toNumber()),
            termLength: new TimeInterval(
                parameters.termLength.toNumber(),
                parameters.amortizationUnit,
            ),
            debtor: new EthereumAddress(debtor),
            creditor: new EthereumAddress(entry.beneficiary),
        };

        return new Investment(dharma, data);
    }

    constructor(private readonly dharma: Dharma, private readonly data: InvestmentParams) {}

    /**
     * Eventually seizes the collateral and sends it to the creditor.
     *
     * This will fail if the collateral is not seizable.
     *
     * @example
     * investment.seizeCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to seize the collateral
     */
    public async seizeCollateral(): Promise<string> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.seizeCollateralAsync(
            this.data.id,
        );
    }
}
