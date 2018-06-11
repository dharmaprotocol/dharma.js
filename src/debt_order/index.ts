import * as _ from "lodash";
import { Dharma } from "../";
import { DebtOrderData, ECDSASignature, InterestRate, Term, TokenAmount } from "../types";

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

    public async fill(creditorAddress: string): Promise<string> {
        this.debtOrderData.creditor = creditorAddress;

        this.debtOrderData.creditorSignature = await this.signAsCreditor();

        return this.dharma.order.fillAsync(this.debtOrderData);
    }

    private isSignedByCreditor(): boolean {
        return !_.isEmpty(this.debtOrderData.creditorSignature);
    }

    private async signAsCreditor(): Promise<ECDSASignature> {
        if (this.isSignedByCreditor()) {
            return Promise.resolve(this.debtOrderData.creditorSignature);
        }

        this.debtOrderData.creditorSignature = await this.dharma.sign.asCreditor(
            this.debtOrderData,
            true,
        );

        return Promise.resolve(this.debtOrderData.creditorSignature);
    }

    private serialize(): DebtOrderData {
        return this.debtOrderData;
    }
}
