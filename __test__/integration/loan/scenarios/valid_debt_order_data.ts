// Utils
import { BigNumber } from "../../../../utils/bignumber";

export const generateDebtOrderData = (principalToken: string, termsContract: string) => {
    return {
        principalToken,
        termsContract,
        principalAmount: new BigNumber("2000000000000000000"),
        expirationTimestampInSec: new BigNumber("1532382995"),
        termsContractParameters: "0x04000000001bc16d674ec8000000c3502000400000000029a2241af62c000000",
        kernelVersion: "0x384cdafd4dddd1b7f9210534a16931e60809b658",
        issuanceVersion: "0x7b79a84b92b41a4626fa85a8c2db9b09df063caf",
        debtor: "0xd2f45e02ab7b190ac9a87b743eab4c8f2ed0e491",
        debtorFee: new BigNumber("0"),
        creditor: "0x0000000000000000000000000000000000000000",
        creditorFee: new BigNumber("0"),
        relayer: "0x0000000000000000000000000000000000000000",
        relayerFee: new BigNumber("0"),
        underwriter: "0x0000000000000000000000000000000000000000",
        underwriterFee: new BigNumber("0"),
        underwriterRiskRating: new BigNumber("0"),
        salt: new BigNumber("50852625203952757738"),
        debtorSignature: {
            v: 28,
            r: "0x7adec78d51f1f948e19b5a11d1b2e816d96648e2a9102718656794cb44f6de49",
            s: "0x6b71c0639f3dd6e96429a544ac04c773654b7518fae731ed541cf8e0cccc0d2b",
        },
        creditorSignature: {
            r: "",
            s: "",
            v: 0,
        },
        underwriterSignature: {
            r: "",
            s: "",
            v: 0,
        },
    };
};
