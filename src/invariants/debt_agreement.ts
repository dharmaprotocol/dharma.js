import * as Web3 from "web3";
import { DebtTokenContract } from "../wrappers";
import { NULL_ADDRESS } from "../../utils/constants";
import { BigNumber } from "bignumber.js";

export class DebtAgreementAssertions {
    private web3: Web3;

    constructor(web3: Web3) {
        this.web3 = web3;
    }

    public async exists(
        issuanceHash: string,
        debtToken: DebtTokenContract,
        errorMessage: string,
    ): Promise<void> {
        const debtTokenOwner = await debtToken.ownerOf.callAsync(new BigNumber(issuanceHash));

        if (debtTokenOwner === NULL_ADDRESS) {
            throw new Error(errorMessage);
        }
    }
}
