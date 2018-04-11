import * as pickBy from "lodash.pickby";
import * as isUndefined from "lodash.isundefined";
import * as Web3 from "web3";
import * as singleLineString from "single-line-string";
import { TxData, TxDataPayable } from "src/types/";

// Gas estimates can vary from the amount in practise. To prevent reverts,
// we add some amount to the estimate.
const GAS_SAFETY_MARGIN = 40000;
// The maximum amount of gas that should be used for any transaction.
const MAXIMUM_GAS = 4000000;

export const CONTRACT_WRAPPER_ERRORS = {
    CONTRACT_NOT_FOUND_ON_NETWORK: (contractName: string, networkId: number) =>
        singleLineString`Unable to find address for contract ${contractName}
                         on network with id ${networkId}`,
    ARTIFACTS_NOT_READABLE: (contractName: string) =>
        singleLineString`Artifacts for contract ${contractName} either malformed
                         or nonexistent.`,
};

export class BaseContract {
    public address: string;
    public abi: Web3.AbiDefinition[];

    public web3ContractInstance: Web3.ContractInstance;

    protected defaults: Partial<TxData>;

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        this.web3ContractInstance = web3ContractInstance;
        this.address = web3ContractInstance.address;
        this.abi = web3ContractInstance.abi;
        this.defaults = defaults;
    }

    protected async applyDefaultsToTxDataAsync<T extends TxData | TxDataPayable>(
        txData: T,
        estimateGasAsync?: (txData: T) => Promise<number>,
    ): Promise<TxData> {
        // Gas amount sourced with the following priorities:
        // 1. Optional param passed in to public method call
        // 2. Global config passed in at library instantiation
        // 3. Gas estimate calculation + safety margin
        const removeUndefinedProperties = pickBy;
        const txDataWithDefaults = {
            ...removeUndefinedProperties(this.defaults),
            ...removeUndefinedProperties(txData as any),
            // HACK: TS can't prove that T is spreadable.
            // Awaiting https://github.com/Microsoft/TypeScript/pull/13288 to be merged
        } as TxData;
        if (isUndefined(txDataWithDefaults.gas) && !isUndefined(estimateGasAsync)) {
            const estimatedGas = await estimateGasAsync(txData);
            txDataWithDefaults.gas = Math.min(estimatedGas + GAS_SAFETY_MARGIN, MAXIMUM_GAS);
        }
        return txDataWithDefaults;
    }
}
