import { Dharma } from "../dharma";

export const ETHEREUM_ADDRESS_ERRORS = {
    INVALID_ADDRESS: (value: string) => `${value} is not a valid Ethereum address.`,
};

export class EthereumAddress {
    /**
     * Returns true if the provided value matches the format of an Ethereum address.
     *
     * @param {string} addressString
     * @returns {boolean}
     */
    public static isValid(value: string): boolean {
        const addressRegex = new RegExp("^0x[a-fA-F0-9]{40}$");

        return value.match(addressRegex) !== null;
    }

    /**
     * Validates the user-specified address if present. Otherwise, retrieves the current user from
     * web3. This function will throw is the address specified is invalid.
     *
     * @param  address
     * @returns {Promise<string>} a validated user-specified address, or the current user.
     */
    public static async validAddressOrCurrentUser(
        dharma: Dharma,
        address?: string,
    ): Promise<string> {
        if (address) {
            const validAddress = new EthereumAddress(address);
            return validAddress.toString();
        } else {
            return dharma.blockchain.getCurrentUser();
        }
    }

    private readonly raw: string;

    constructor(value: string) {
        if (!EthereumAddress.isValid(value)) {
            throw Error(ETHEREUM_ADDRESS_ERRORS.INVALID_ADDRESS(value));
        }

        this.raw = value.toLowerCase();
    }

    public toString(): string {
        return this.raw;
    }
}
