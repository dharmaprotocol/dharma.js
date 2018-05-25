import * as ABIDecoder from "abi-decoder";
import * as Web3 from "web3";

import { ErrorParser } from "../types";

import { DebtKernel, RepaymentRouter } from "@dharmaprotocol/contracts";

import { ContractsAPI } from ".";

import { Web3Utils } from "../../utils/web3_utils";

export class LogsAPI {
    private web3Utils: Web3Utils;
    private contracts: ContractsAPI;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3Utils = new Web3Utils(web3);
        this.contracts = contracts;

        // We need to configure the ABI Decoder in order to pull out relevant logs.
        ABIDecoder.addABI(DebtKernel.abi);
        ABIDecoder.addABI(RepaymentRouter.abi);
    }

    /**
     * Asynchronously retrieve any error logs that might have occurred during a
     * given transaction. These errors are returned as human-readable strings.
     *
     * @param  txHash the hash of the transaction for which error logs are being queried.
     * @return        the errors encountered (as human-readable strings).
     */
    public async getErrorLogs(txHash: string): Promise<string[]> {
        const receipt = await this.web3Utils.getTransactionReceiptAsync(txHash);

        const { debtKernel, repaymentRouter } = await this.contracts.loadDharmaContractsAsync();

        const decodedLogs = ABIDecoder.decodeLogs(receipt.logs);

        const parser = new ErrorParser({
            debtKernel: debtKernel.address,
            repaymentRouter: repaymentRouter.address,
        });

        return parser.parseDecodedLogs(decodedLogs);
    }
}
