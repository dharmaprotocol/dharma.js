import { BigNumber } from "../../../../utils/bignumber";
import { NULL_BYTES32, NULL_ECDSA_SIGNATURE } from "../../../../utils/constants";
import * as Units from "../../../../utils/units";

import { DeserializeOrderScenario } from "./";

import { ACCOUNTS } from "../../../accounts";

export const DESERIALIZE_ORDER_SCENARIOS: DeserializeOrderScenario[] = [
    {
        input:
            "{" +
            '"kernelVersion":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"issuanceVersion":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"principalAmount":"1000000000000000000",' +
            '"principalToken":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"debtor":"0x3fa17c1f1a0ae2db269f0b572ca44b15bc83929a",' +
            '"debtorFee":"1000000000000000",' +
            '"creditor":"0x6385d458c76cd5360041245daa04df8f50d11a82",' +
            '"creditorFee":"1000000000000000",' +
            '"relayer":"0xbb90d6ca4e454be5f049d79322b3a52100383d02",' +
            '"relayerFee":"1000000000000000",' +
            '"underwriter":"0xdc4845b45c6c08f4ce4a8ef5e0493d8bf6158da0",' +
            '"underwriterFee":"1000000000000000",' +
            '"underwriterRiskRating":"10000",' +
            '"termsContract":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"termsContractParameters":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"expirationTimestampInSec":"1527721215",' +
            '"salt":"0"' +
            "}",
        output: {
            kernelVersion: NULL_BYTES32,
            issuanceVersion: NULL_BYTES32,
            principalAmount: Units.ether(1),
            principalToken: NULL_BYTES32,
            debtor: ACCOUNTS[1].address,
            debtorFee: Units.ether(0.001),
            creditor: ACCOUNTS[2].address,
            creditorFee: Units.ether(0.001),
            relayer: ACCOUNTS[3].address,
            relayerFee: Units.ether(0.001),
            underwriter: ACCOUNTS[4].address,
            underwriterFee: Units.ether(0.001),
            underwriterRiskRating: Units.percent(0.001),
            termsContract: NULL_BYTES32,
            termsContractParameters: NULL_BYTES32,
            expirationTimestampInSec: new BigNumber(1527721215),
            salt: new BigNumber(0),
        },
    },
    {
        input:
            "{" +
            '"kernelVersion":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"issuanceVersion":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"principalAmount":"1000000000000000000",' +
            '"principalToken":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"debtor":"0x3fa17c1f1a0ae2db269f0b572ca44b15bc83929a",' +
            '"debtorFee":"1000000000000000",' +
            '"creditor":"0x6385d458c76cd5360041245daa04df8f50d11a82",' +
            '"creditorFee":"1000000000000000",' +
            '"relayer":"0xbb90d6ca4e454be5f049d79322b3a52100383d02",' +
            '"relayerFee":"1000000000000000",' +
            '"underwriter":"0xdc4845b45c6c08f4ce4a8ef5e0493d8bf6158da0",' +
            '"underwriterFee":"1000000000000000",' +
            '"underwriterRiskRating":"10000",' +
            '"termsContract":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"termsContractParameters":"0x0000000000000000000000000000000000000000000000000000000000000000",' +
            '"expirationTimestampInSec":"1527721215",' +
            '"salt":"0",' +
            '"debtorSignature":{"r":"","s":"","v":0},' +
            '"creditorSignature":{"r":"","s":"","v":0},' +
            '"underwriterSignature":{"r":"","s":"","v":0}' +
            "}",
        output: {
            kernelVersion: NULL_BYTES32,
            issuanceVersion: NULL_BYTES32,
            principalAmount: Units.ether(1),
            principalToken: NULL_BYTES32,
            debtor: ACCOUNTS[1].address,
            debtorFee: Units.ether(0.001),
            creditor: ACCOUNTS[2].address,
            creditorFee: Units.ether(0.001),
            relayer: ACCOUNTS[3].address,
            relayerFee: Units.ether(0.001),
            underwriter: ACCOUNTS[4].address,
            underwriterFee: Units.ether(0.001),
            underwriterRiskRating: Units.percent(0.001),
            termsContract: NULL_BYTES32,
            termsContractParameters: NULL_BYTES32,
            expirationTimestampInSec: new BigNumber(1527721215),
            salt: new BigNumber(0),
            debtorSignature: NULL_ECDSA_SIGNATURE,
            creditorSignature: NULL_ECDSA_SIGNATURE,
            underwriterSignature: NULL_ECDSA_SIGNATURE,
        },
    },
];
