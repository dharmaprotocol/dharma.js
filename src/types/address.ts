export const ADDRESS_ERRORS = {
    INVALID_ADDRESS: (addressString: string) =>
        `Address ${addressString} is not in the Ethereum address format`,
};

export class Address {
    /**
     * Returns true if the given address string matches the format of an Ethereum address.
     *
     * @param {string} addressString
     * @returns {boolean}
     */
    private static isEthereumAddress(addressString: string): boolean {
        const addressRegex = new RegExp("^0x[a-fA-F0-9]{40}$");

        return addressString.match(addressRegex) !== null;
    }

    constructor(private readonly addressString) {
        if (!Address.isEthereumAddress(addressString)) {
            throw Error(ADDRESS_ERRORS.INVALID_ADDRESS(addressString));
        }
    }

    public toString() {
        return this.addressString;
    }
}
