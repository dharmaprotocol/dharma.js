import * as ABIDecoder from "abi-decoder";
import * as Web3 from "web3";
import { ContractsAPI } from ".";
export interface GetEventOptions {
    fromBlock?: number;
    toBlock?: number;
    limit?: number;
}
export declare class LogsAPI {
    private readonly web3;
    private web3Utils;
    private contracts;
    constructor(web3: Web3, contracts: ContractsAPI);
    /**
     * @example
     * // Get all "LogLoanOrderFilled" events between blocks 0 and 300.
     * await dharma.logs.get(["LogLoanOrderFilled"], { from: 0, to: 300 });
     *
     * // Get the last 10 "LogLoanOrderFilled" events between blocks 0 and 300.
     * await dharma.logs.get(["LogLoanOrderFilled"], { from: 0, to: 300, limit: 10 });
     *
     * // Get the last 10 "LogLoanOrderFilled" events.
     * await dharma.logs.get(["LogLoanOrderFilled"], { limit: 10 });
     *
     * // Get the last 10 "LogLoanOrderFilled" or "LogLoanOrderCancelled" events that occurred.
     * await dharma.logs.get(["LogLoanOrderFilled", "LogLoanOrderCancelled"], { limit: 10 });
     *
     * // Get all of the "LogLoanOrderFilled" events.
     * await dharma.logs.get(["LogLoanOrderFilled"]);
     *
     * // Get all of the "LogLoanOrderFilled" events.
     * await dharma.logs.get("LogLoanOrderFilled");
     *
     * @param {string | string[]} eventNames
     * @param {GetEventOptions} options
     * @returns {Promise<any>}
     */
    get(eventNames: string | string[], options?: GetEventOptions): Promise<ABIDecoder.DecodedLogEntry[]>;
    /**
     * Returns a list of events that are obtainable from Dharma Protocol contracts.
     *
     * @example
     * dharma.logs.list()
     * => [
     *  "LogDebtOrderFilled",
     *  "LogIssuanceCancelled",
     *  "LogDebtOrderCancelled",
     *  "LogError",
     *  "Pause",
     *  ...
     * ]
     *
     * @returns {string[]}
     */
    list(): Promise<string[]>;
    /**
     * Asynchronously retrieve any error logs that might have occurred during a
     * given transaction. These errors are returned as human-readable strings.
     *
     * @param  txHash the hash of the transaction for which error logs are being queried.
     * @return        the errors encountered (as human-readable strings).
     */
    getErrorLogs(txHash: string): Promise<string[]>;
    /**
     * TODO: Add watch function.
     *
     * @example
     * // Get a listener for "LogLoanOrderFilled" events
     * dharma.logs.watch("LogLoanOrderFilled");
     *
     * @param {string | string[]} eventNames
     * @returns {Promise<any>}
     *
     * public watch(eventNames: string | string[]): Promise<any>;
     */
    /**
     * Creates a mapping of event names to the contract where they originate.
     *
     * @example
     * getEventToContractsMap();
     * => { "LogDebtOrderFilled" => DebtKernel, ... }
     *
     * @returns {Promise<object>}
     */
    private getEventToContractsMap();
    private getContractWrappers();
}
