"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// external
var moment = require("moment");
var bignumber_1 = require("../../utils/bignumber");
// utils
var constants_1 = require("../../utils/constants");
exports.DEBT_ORDER_DATA_DEFAULTS = {
    kernelVersion: constants_1.NULL_ADDRESS,
    issuanceVersion: constants_1.NULL_ADDRESS,
    principalAmount: new bignumber_1.BigNumber(0),
    principalToken: constants_1.NULL_ADDRESS,
    debtor: constants_1.NULL_ADDRESS,
    debtorFee: new bignumber_1.BigNumber(0),
    creditor: constants_1.NULL_ADDRESS,
    creditorFee: new bignumber_1.BigNumber(0),
    relayer: constants_1.NULL_ADDRESS,
    relayerFee: new bignumber_1.BigNumber(0),
    underwriter: constants_1.NULL_ADDRESS,
    underwriterFee: new bignumber_1.BigNumber(0),
    underwriterRiskRating: new bignumber_1.BigNumber(0),
    termsContract: constants_1.NULL_ADDRESS,
    termsContractParameters: constants_1.NULL_BYTES32,
    expirationTimestampInSec: new bignumber_1.BigNumber(moment()
        .add(30, "days")
        .unix()),
    salt: new bignumber_1.BigNumber(0),
    debtorSignature: constants_1.NULL_ECDSA_SIGNATURE,
    creditorSignature: constants_1.NULL_ECDSA_SIGNATURE,
    underwriterSignature: constants_1.NULL_ECDSA_SIGNATURE,
};
//# sourceMappingURL=debt_order_data.js.map