"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("../../utils/bignumber");
var TermsContractParameters;
(function (TermsContractParameters) {
    function generateHexValueOfLength(length) {
        return "0x" + "f".repeat(length);
    }
    TermsContractParameters.generateHexValueOfLength = generateHexValueOfLength;
    function bitShiftLeft(target, numPlaces) {
        var binaryTargetString = target.toString(2);
        var binaryTargetStringShifted = binaryTargetString + "0".repeat(numPlaces);
        return new bignumber_1.BigNumber(binaryTargetStringShifted, 2);
    }
    TermsContractParameters.bitShiftLeft = bitShiftLeft;
    function isDecimalValue(value) {
        return value.toNumber() % 1 != 0;
    }
    TermsContractParameters.isDecimalValue = isDecimalValue;
})(TermsContractParameters = exports.TermsContractParameters || (exports.TermsContractParameters = {}));
//# sourceMappingURL=terms_contract_parameters.js.map