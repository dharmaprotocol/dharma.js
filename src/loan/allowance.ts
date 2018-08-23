import { EthereumAddress } from "../types";

import { Dharma } from "../dharma";

import { BigNumber } from "../../utils/bignumber";

/**
 * Module that provides methods for setting token transfer allowances.
 *
 * Note: this class is never instantiated. It's a namespace that encapsulates allowance functionality.
 */
export class Allowance {
    /**
     * If necessary, eventually sets the transfer allowance for the specified token and user address
     * pair to unlimited. If an update occurs, the method returns a transaction hash.
     *
     * @example
     * await Allowance.makeUnlimitedIfNecessary(dharma, "0x...", "REP");
     * => "0x..."
     *
     * @returns {Promise<string | void>}
     */
    public static async makeUnlimitedIfNecessary(
        dharma: Dharma,
        owner: string,
        tokenSymbol: string,
    ): Promise<string | void> {
        EthereumAddress.assertValid(owner);

        const tokenAddress = await dharma.contracts.getTokenAddressBySymbolAsync(tokenSymbol);

        const hasUnlimitedAllowance = await dharma.token.hasUnlimitedAllowance(
            tokenAddress,
            owner.toString(),
        );

        if (!hasUnlimitedAllowance) {
            return dharma.token.setUnlimitedProxyAllowanceAsync(tokenAddress, {
                from: owner,
            });
        }
    }

    /**
     * Revokes the proxy's allowance for the specified token and user address pair
     *
     * * @example
     * await Allowance.revoke(dharma, "0x...", "REP");
     * => "0x..."
     *
     * @returns {Promise<string>}
     */
    public static async revoke(
        dharma: Dharma,
        owner: string,
        tokenSymbol: string,
    ): Promise<string> {
        EthereumAddress.assertValid(owner);

        const tokenAddress = await dharma.contracts.getTokenAddressBySymbolAsync(tokenSymbol);

        return dharma.token.setProxyAllowanceAsync(tokenAddress, new BigNumber(0), {
            from: owner,
        });
    }
}
