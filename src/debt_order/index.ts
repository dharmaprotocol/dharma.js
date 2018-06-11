import * as _ from "lodash";
import { BigNumber } from "../../utils/bignumber";

import { Dharma } from "../";
import { CollateralizedSimpleInterestLoanOrder } from "../adapters/collateralized_simple_interest_loan_adapter";
import { DebtOrderData, ECDSASignature, InterestRate, Term, TokenAmount } from "../types";

export interface DebtOrderParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    term: Term;
    debtorAddress: string;
}

export class DebtOrder {
    private debtOrderData: DebtOrderData = {};
    private debtOrderParams?: DebtOrderParams;

    constructor(private dharma: Dharma) {}

    public async open(params: DebtOrderParams) {
        const { principal, collateral, interestRate, term, debtorAddress } = params;

        const loanOrder: CollateralizedSimpleInterestLoanOrder = {
            principalAmount: principal.rawAmount,
            principalTokenSymbol: principal.tokenSymbol,

            interestRate: interestRate.raw,
            amortizationUnit: term.unit,
            termLength: term.length(),

            collateralTokenSymbol: principal.tokenSymbol,
            collateralAmount: collateral.rawAmount,
            gracePeriodInDays: new BigNumber(0),
        };

        this.debtOrderData = await this.dharma.adapters.collateralizedSimpleInterestLoan.toDebtOrder(
            loanOrder,
        );

        this.debtOrderData.debtor = debtorAddress;

        await this.signAsDebtor();
    }

    public isSignedByUnderwriter(): boolean {
        return !_.isEmpty(this.debtOrderData.underwriterSignature);
    }

    public isSignedByDebtor(): boolean {
        return !_.isEmpty(this.debtOrderData.debtorSignature);
    }

    public isSignedByCreditor(): boolean {
        return !_.isEmpty(this.debtOrderData.creditorSignature);
    }

    public async signAsCreditor() {
        if (this.isSignedByCreditor()) {
            return;
        }

        this.debtOrderData.creditorSignature = await this.dharma.sign.asCreditor(
            this.debtOrderData,
            true,
        );
    }

    public async signAsUnderwriter() {
        if (this.isSignedByUnderwriter()) {
            return;
        }

        this.debtOrderData.underwriterSignature = await this.dharma.sign.asUnderwriter(
            this.debtOrderData,
            true,
        );
    }

    public async signAsDebtor() {
        if (this.isSignedByDebtor()) {
            return;
        }

        this.debtOrderData.debtorSignature = await this.dharma.sign.asDebtor(
            this.debtOrderData,
            true,
        );
    }

    public async isCancelled(): Promise<boolean> {
        return this.dharma.order.isCancelled(this.debtOrderData);
    }

    public async cancel(): Promise<string> {
        return this.dharma.order.cancelOrderAsync(this.debtOrderData);
    }

    public async isFilled(): Promise<boolean> {
        return this.dharma.order.checkOrderFilledAsync(this.debtOrderData);
    }

    public async fill(): Promise<string> {
        return this.dharma.order.fillAsync(this.debtOrderData);
    }

    private serialize(): DebtOrderData {
        return this.debtOrderData;
    }
}
