import * as ABIDecoder from "abi-decoder";
import * as _ from "lodash";
import * as Web3 from "web3";

import { ErrorParser } from "../types";

import { ContractsAPI } from ".";

import { Web3Utils } from "../../utils/web3_utils";
import { BaseContract } from "../wrappers";

export interface GetEventOptions {
    fromBlock?: number;
    toBlock?: number;
    limit?: number;
}

export class LogsAPI {
    private readonly web3: Web3;
    private web3Utils: Web3Utils;
    private contracts: ContractsAPI;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3Utils = new Web3Utils(web3);
        this.web3 = web3;
        this.contracts = contracts;
    }

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
    public async get(
        eventNames: string | string[],
        options: GetEventOptions = {},
    ): Promise<ABIDecoder.DecodedLogEntry[]> {
        const { fromBlock, limit, toBlock } = options;

        if (limit === 0) {
            return [];
        }

        eventNames = _.castArray(eventNames);

        const eventToContract = await this.getEventToContractsMap();

        let events = [];

        await Promise.all(
            eventNames.map(async (eventName) => {
                const contractWrapper = eventToContract[eventName];

                ABIDecoder.addABI(contractWrapper.abi);

                const contract = this.web3.eth
                    .contract(contractWrapper.abi)
                    .at(contractWrapper.address);

                return new Promise((resolve) => {
                    const eventsWatcher = contract.allEvents({
                        fromBlock: fromBlock || 0,
                        toBlock: toBlock || "latest",
                    });

                    eventsWatcher.get((error, logs) => {
                        const filteredEvents = _.filter(logs, (log) => log.event === eventName);

                        events = events.concat(filteredEvents);

                        ABIDecoder.removeABI(contractWrapper.abi);

                        resolve();
                    });

                    eventsWatcher.stopWatching();
                });
            }),
        );

        if (limit) {
            return _.take(events, limit);
        } else {
            return events;
        }
    }

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
    public async list(): Promise<string[]> {
        const eventToContract = await this.getEventToContractsMap();

        return Object.keys(eventToContract);
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
    private async getEventToContractsMap() {
        const contractWrappers = await this.getContractWrappers();

        // Create a mapping of event names to the contract where they originate.
        // E.g. "LogDebtOrderFilled" => DebtKernel
        const eventToContract = {};
        contractWrappers.forEach((wrapper: BaseContract) => {
            const filteredEvents = _.filter(wrapper.abi, (element) => element.type === "event");

            filteredEvents.forEach((event: Web3.MethodAbi) => {
                eventToContract[event.name] = wrapper;
            });
        });

        return eventToContract;
    }

    private async getContractWrappers(): Promise<BaseContract[]> {
        const {
            debtKernel,
            debtRegistry,
            debtToken,
            repaymentRouter,
            tokenTransferProxy,
            collateralizer,
        } = await this.contracts.loadDharmaContractsAsync();

        return [
            debtKernel,
            debtRegistry,
            debtToken,
            repaymentRouter,
            tokenTransferProxy,
            collateralizer,
        ];
    }
}
