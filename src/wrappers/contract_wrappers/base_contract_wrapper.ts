import * as _ from "lodash";
import { BigNumber } from "../../../utils/bignumber";
import * as Web3 from "web3";
import singleLineString from "single-line-string";

export interface TxData {
    from?: string;
    gas?: number;
    gasPrice?: BigNumber;
    nonce?: number;
}

export interface TxDataPayable extends TxData {
    value?: BigNumber;
}

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
        const removeUndefinedProperties = _.pickBy;
        const txDataWithDefaults = {
            ...removeUndefinedProperties(this.defaults),
            ...removeUndefinedProperties(txData as any),
            // HACK: TS can't prove that T is spreadable.
            // Awaiting https://github.com/Microsoft/TypeScript/pull/13288 to be merged
        } as TxData;
        if (_.isUndefined(txDataWithDefaults.gas) && !_.isUndefined(estimateGasAsync)) {
            const estimatedGas = await estimateGasAsync(txData);
            txDataWithDefaults.gas = estimatedGas;
        }
        return txDataWithDefaults;
    }
}
