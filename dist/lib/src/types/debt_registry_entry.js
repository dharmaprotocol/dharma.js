"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var DebtRegistryEntry = /** @class */ (function () {
    function DebtRegistryEntry(version, beneficiary, underwriter, underwriterRiskRating, termsContract, termsContractParameters, issuanceBlockTimestamp) {
        this.version = version;
        this.beneficiary = beneficiary;
        this.underwriter = underwriter;
        this.underwriterRiskRating = underwriterRiskRating;
        this.termsContract = termsContract;
        this.termsContractParameters = termsContractParameters;
        this.issuanceBlockTimestamp = issuanceBlockTimestamp;
        this.version = version;
        this.beneficiary = beneficiary;
        this.underwriter = underwriter;
        this.underwriterRiskRating = underwriterRiskRating;
        this.termsContract = termsContract;
        this.termsContractParameters = termsContractParameters;
        this.issuanceBlockTimestamp = issuanceBlockTimestamp;
    }
    DebtRegistryEntry.fromData = function (data) {
        return new this(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    };
    return DebtRegistryEntry;
}());
exports.DebtRegistryEntry = DebtRegistryEntry;
//# sourceMappingURL=debt_registry_entry.js.map