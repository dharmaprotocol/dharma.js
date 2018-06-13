export const ADDRESS_ERRORS = {
    INVALID_ADDRESS: (addressString: string) =>
        `Address ${addressString} is not in the Ethereum address format`,
};

export class Address {
    constructor(private readonly addressString) {
        if (!this.isEthereumAddress()) {
            throw Error(ADDRESS_ERRORS.INVALID_ADDRESS(addressString));
        }
    }

    public getAddressString() {
        return this.addressString;
    }

    /**
     * Returns true if the given address string matches the format of an Ethereum address.
     *
     * @param {string} addressString
     * @returns {boolean}
     */
    private isEthereumAddress() {
        const addressRegex = new RegExp("^0x[a-fA-F0-9]{40}$");

        return this.addressString.match(addressRegex);
    }
}
