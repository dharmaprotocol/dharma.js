import { EthereumAddress } from "../types";

import { Dharma } from "../dharma";
import { BigNumber } from "../../utils/bignumber";

/**
 * Provides functionality for token transfer allowance.
 */
export class Allowance {
    private owner: EthereumAddress;

    constructor(
        private readonly dharma: Dharma,
        owner: string,
        private readonly tokenSymbol: string,
    ) {
        this.owner = new EthereumAddress(owner);
    }

    /**
     * Eventually sets the transfer allowance of the current token and user address pair
     * on the token transfer proxy to unlimited if necessary. If an update occurs, this method
     * returns a transaction hash.
     *
     * @example
     * const allowance = new Allowance(dharma, ethAddress, "WETH");
     * await allowance.makeUnlimitedIfNecessary();
     * => "0x..."
     *
     * @returns {Promise<string | void>}
     */
    public async makeUnlimitedIfNecessary(): Promise<string | void> {
        const tokenAddress = await this.dharma.contracts.getTokenAddressBySymbolAsync(
            this.tokenSymbol,
        );

        const hasUnlimitedAllowance = await this.dharma.token.hasUnlimitedAllowance(
            tokenAddress,
            this.owner.toString(),
        );

        if (!hasUnlimitedAllowance) {
            return this.dharma.token.setUnlimitedProxyAllowanceAsync(tokenAddress, {
                from: this.owner.toString(),
            });
        }
    }

    /**
     * Revokes the proxy's allowance for the current account.
     *
     * @returns {Promise<string | void>}
     */
    public async revoke(): Promise<string | void> {
        const tokenAddress = await this.dharma.contracts.getTokenAddressBySymbolAsync(
            this.tokenSymbol,
        );

        return this.dharma.token.setProxyAllowanceAsync(tokenAddress, new BigNumber(0), {
            from: this.owner.toString(),
        });
    }
}
