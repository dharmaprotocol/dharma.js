export declare const ETHEREUM_ADDRESS_ERRORS: {
    INVALID_ADDRESS: (value: string) => string;
};
export declare class EthereumAddress {
    /**
     * Returns true if the provided value matches the format of an Ethereum address.
     *
     * @param {string} addressString
     * @returns {boolean}
     */
    static isValid(value: string): boolean;
    private readonly raw;
    constructor(value: string);
    toString(): string;
}
