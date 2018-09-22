import * as singleLineString from "single-line-string";

import { Dharma } from "../types/dharma";

import { DEBT_ORDER_ERRORS, DebtOrder, DebtOrderParams } from "./debt_order";

import { EthereumAddress } from "../types";

export class LoanRequest extends DebtOrder {
    /**
     * Eventually returns an instance of a LoanRequest object with the terms specified, signed by
     * the debtor as well.
     *
     * @example
     * const loanRequest = await LoanRequest.create(dharma, {
     *      principalAmount: 5,
     *      principalToken: "REP",
     *      collateralAmount: 10,
     *      collateralToken: "MKR",
     *      relayerAddress: "0x000000000000000000000000000000",
     *      relayerFeeAmount: 23.1,
     *      interestRate: 12.3,
     *      termDuration: 6,
     *      termUnit: "months",
     *      expiresInDuration: 5,
     *      expiresInUnit: "days",
     *  }, debtor);
     *
     * @returns {Promise<LoanRequest>}
     */
    public static async createAndSignAsDebtor(
        dharma: Dharma,
        params: DebtOrderParams,
        debtor?: string,
    ): Promise<LoanRequest> {
        const request = await LoanRequest.create<LoanRequest>(dharma, params);

        await request.signAsDebtor(debtor);

        return request;
    }

    /**
     * Eventually signs the loan request as the creditor.
     *
     * @throws Throws if the loan request is already signed by a creditor.
     *
     * @example
     * loanRequest.signAsCreditor();
     * => Promise<void>
     *
     * @return {Promise<void>}
     */
    public async signAsCreditor(creditorAddress?: string): Promise<void> {
        if (this.isSignedByCreditor()) {
            throw new Error(DEBT_ORDER_ERRORS.ALREADY_SIGNED_BY_CREDITOR);
        }

        this.data.creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            creditorAddress,
        );

        const isMetaMask = !!this.dharma.web3.currentProvider.isMetaMask;

        this.data.creditorSignature = await this.dharma.sign.asCreditor(this.data, isMetaMask);
    }

    /**
     * Eventually returns true if the current loan request has been filled by a creditor.
     *
     * @example
     * await loanRequest.isFilled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isFilled(): Promise<boolean> {
        return this.dharma.order.checkOrderFilledAsync(this.data);
    }

    /**
     * Eventually determines if the prospective creditor is able to fill the loan request.
     *
     * @returns {Promise<boolean>}
     */
    public async isFillable(prospectiveCreditorAddress?: string): Promise<boolean> {
        const creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            prospectiveCreditorAddress,
        );

        return this.dharma.order.isFillableBy(this.data, creditor, {
            from: creditor,
        });
    }

    /**
     * Eventually throws if the prospective creditor is unable to fill the loan request.
     *
     * @returns {Promise<void>}
     */
    public async assertFillable(prospectiveCreditorAddress?: string): Promise<void> {
        const creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            prospectiveCreditorAddress,
        );

        return this.dharma.order.assertFillableBy(this.data, creditor, {
            from: creditor,
        });
    }

    /**
     * Eventually fills the loan request as creditor, transferring the principal to the debtor.
     *
     * @example
     * loanRequest.fillAsCreditor();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to fill the loan request
     */
    public async fillAsCreditor(creditorAddress?: string): Promise<string> {
        this.data.creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            creditorAddress,
        );

        return this.dharma.order.fillAsync(this.data, {
            from: this.data.creditor,
        });
    }

    /**
     * Eventually fills the loan as proxy. Requires that the loan request be signed by both the
     * creditor and debtor.
     *
     * @throws Throws if the loan request is not signed by both the creditor and debtor.
     *
     * @example
     * loanRequest.fillAsProxy();
     * => Promise<string>
     *
     * @return {Promise<string>}
     */
    public async fillAsProxy(proxyAddress?: string): Promise<string> {
        if (this.isSignedByCreditor() && this.isSignedByDebtor()) {
            const sender = await EthereumAddress.validAddressOrCurrentUser(
                this.dharma,
                proxyAddress,
            );

            return this.dharma.order.fillAsync(this.data, {
                from: sender,
            });
        } else {
            throw new Error(DEBT_ORDER_ERRORS.PROXY_FILL_DISALLOWED("loan request"));
        }
    }
}
