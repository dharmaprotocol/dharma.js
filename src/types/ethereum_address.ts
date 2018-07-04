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
