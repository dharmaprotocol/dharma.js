import { DebtOrderParams } from "../../loan/debt_order";

import { Dharma } from "../dharma";

import {
    DebtOrderData,
    ECDSASignature,
    EthereumAddress,
    InterestRate,
    TimeInterval,
    TokenAmount,
} from "../";

import { BigNumber } from "../../../utils/bignumber";

export interface LTVData {
    principal: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    expiresIn: TimeInterval;
    ltv: BigNumber;
    collateralTokenSymbol: string;
    priceProvider: string;
    relayer: EthereumAddress;
    relayerFee: TokenAmount;
}

export interface LTVParams extends DebtOrderParams {
    ltv: number;
    collateralTokenSymbol: string;
    priceProvider: string;
}

export interface CreditorCommmitmentTerms {
    decisionEngineAddress: string;
    decisionEngineParams: DecisionEngineParams;
}

export interface DecisionEngineParams {
    ltv: BigNumber;
}

export class LTVLoanOffer {
    private readonly data: LTVData;

    private creditorSignature?: ECDSASignature;
    private debtorSignature?: ECDSASignature;

    constructor(private readonly dharma: Dharma, params: LTVParams) {
        const {
            ltv,
            priceProvider,
            collateralTokenSymbol,
            principalAmount,
            principalToken,
            relayerAddress,
            relayerFeeAmount,
            interestRate,
            termDuration,
            termUnit,
            expiresInDuration,
            expiresInUnit,
        } = params;

        this.data = {
            principal: new TokenAmount(principalAmount, principalToken),
            interestRate: new InterestRate(interestRate),
            termLength: new TimeInterval(termDuration, termUnit),
            expiresIn: new TimeInterval(expiresInDuration, expiresInUnit),
            ltv: new BigNumber(ltv),
            relayer: new EthereumAddress(relayerAddress),
            relayerFee: new TokenAmount(relayerFeeAmount, principalToken),
            collateralTokenSymbol,
            priceProvider,
        };
    }

    // private async toDebtOrderData: Promise<DebtOrderData> {
    //
    // }
    //
    // public async acceptAsDebtor(): Promise<string> {
    //
    // }
    //
    // public async signAsDebtor(): Promise<void> {
    //
    // }
    //
    // public getLoanOfferHash(): string {
    //
    // }
}
