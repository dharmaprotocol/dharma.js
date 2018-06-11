import * as _ from "lodash";
import { Dharma } from "../";
import { DebtOrderData, ECDSASignature, InterestRate, Term, TokenAmount } from "../types";
export interface DebtOrderParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    term: Term;
    debtor: string;
}

export class DebtOrder {
    private debtOrderData: DebtOrderData = {};

    constructor(
        private dharma: Dharma,
        private principal: TokenAmount,
        private collateral: TokenAmount,
        private interestRate: InterestRate,
        private term: Term,
    ) {
        this.debtOrderData.principalAmount = principal.rawAmount;
        this.debtOrderData.principalToken = principal.tokenSymbol;
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
