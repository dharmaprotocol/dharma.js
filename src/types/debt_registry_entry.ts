import { BigNumber } from "../../utils/bignumber";

/*
This type represents the data as received from calls to the `DebtRegistry`'s
`get` method -- whose signature is included below.

This data represents all the information we store on-chain for a given entry in
the `DebtRegistry`.

```
function get(bytes32 issuanceHash)
        public
        view
        returns(address, address, address, uint, address, bytes32, uint);
```
 */
export type DebtRegistryEntryData = [string, string, string, BigNumber, string, string, BigNumber];

/*
This type maps 1:1 to the `Entry` struct in our `DebtRegistry` smart contract:

```
struct Entry {
    address version;
    address beneficiary;
    address underwriter;
    uint underwriterRiskRating;
    address termsContract;
    bytes32 termsContractParameters;
    uint issuanceBlockTimestamp;
}
```
 */
export class DebtRegistryEntry {
    public static fromData(data: DebtRegistryEntryData) {
        return new this(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    }

    constructor(
        public version: string,
        public beneficiary: string,
        public underwriter: string,
        public underwriterRiskRating: BigNumber,
        public termsContract: string,
        public termsContractParameters: string,
        public issuanceBlockTimestamp: BigNumber,
    ) {
        this.version = version;
        this.beneficiary = beneficiary;
        this.underwriter = underwriter;
        this.underwriterRiskRating = underwriterRiskRating;
        this.termsContract = termsContract;
        this.termsContractParameters = termsContractParameters;
        this.issuanceBlockTimestamp = issuanceBlockTimestamp;
    }
}
