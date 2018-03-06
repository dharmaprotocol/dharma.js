import { BigNumber } from "../../utils/bignumber";
import { Web3Utils } from "../../utils/web3_utils";
import { DebtOrder } from "./debt_order";

/*
This type represents the raw data received from calls to our
`DebtRegistry`'s `get` method whose signature is as follows:

```
function get(bytes32 issuanceHash)
        public
        view
        returns(address, address, address, uint, address, bytes32, uint);
```

This data represents an unpacked instance of our `Entry` model as stored in the
`DebtRegistry`.
 */
export type IssuanceCommitmentData = [string, string, string, BigNumber, string, string, BigNumber];

/*
This type maps 1:1 to the `Entry` struct in our `DebtRegistry` smart contract
whose spec is as follows:

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
export class IssuanceCommitment {
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

    public getHash(): string {
        return Web3Utils.soliditySHA3(
            this.version,
            this.beneficiary,
            this.underwriter,
            this.underwriterRiskRating,
            this.termsContract,
            this.termsContractParameters,
            this.issuanceBlockTimestamp,
        );
    }

    static fromData(data: IssuanceCommitmentData) {
        return new this(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    }

    static fromDebtOrder(order: DebtOrder) {
        return new this(
            order.issuanceVersion,
            order.creditor,
            order.underwriter,
            order.underwriterRiskRating,
            order.termsContract,
            order.termsContractParameters,
            order.issuanceBlockTimestamp,
        );
    }
}
