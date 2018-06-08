import * as _ from "lodash";
import { Dharma } from "../";
import { ECDSASignature, TokenAmount } from "../types";

export class DebtOrder {
    // Signatures
    private debtorSignature?: ECDSASignature;
    private creditorSignature?: ECDSASignature;
    private underwriterSignature?: ECDSASignature;

    constructor(private dharma: Dharma) {}

    public isSignedByUnderwriter(): boolean {
        return !_.isEmpty(this.underwriterSignature);
    }

    public isSignedByDebtor(): boolean {
        return !_.isEmpty(this.debtorSignature);
    }

    public isSignedByCreditor(): boolean {
        return !_.isEmpty(this.creditorSignature);
    }

    public async signAsCreditor() {
        if (this.isSignedByCreditor()) {
            return;
        }
        // TODO(kayvon): pass debt order data interface to underyling api methods.
        this.creditorSignature = await this.dharma.sign.asCreditor(this);
    }

    public async signAsUnderwriter() {
        if (this.isSignedByUnderwriter()) {
            return;
        }
        // TODO(kayvon): pass debt order data interface to underyling api methods.
        this.creditorSignature = await this.dharma.sign.asUnderwriter(this);
    }

    public async signAsDebtor() {
        if (this.isSignedByDebtor()) {
            return;
        }
        // TODO(kayvon): pass debt order data interface to underyling api methods.
        this.creditorSignature = await this.dharma.sign.asDebtor(this);
    }

    public async isCanceled(): Promise<boolean> {
        // TODO(kayvon): use new method from order api.
    }

    public async cancel(): Promise<string> {
        // TODO(kayvon): fix
        this.dharma.order.cancelOrderAsync(this);
    }

    public async isFilled(): Promise<boolean> {
        // TODO(kayvon): fix
        return this.dharma.order.checkOrderFilledAsync(this);
    }

    public async fill(): Promise<string> {
        // TODO(kayvon): fix
        return this.dharma.order.fillAsync(this);
    }

    public async isDelinquent(): Promise<boolean> {
        // stub
    }

    public async isFullyRepaid(): Promise<boolean> {
        // stub
    }

    public async hasCollateralBeenSeized(): Promise<boolean> {
        // stub
    }
}
