import * as Web3 from "web3";
import { TxData, TxDataPayable } from "../../../src/types/";
export declare const CONTRACT_WRAPPER_ERRORS: {
    CONTRACT_NOT_FOUND_ON_NETWORK: (contractName: string, networkId: number) => any;
    ARTIFACTS_NOT_READABLE: (contractName: string) => any;
};
export declare class BaseContract {
    address: string;
    abi: Web3.AbiDefinition[];
    web3ContractInstance: Web3.ContractInstance;
    protected defaults: Partial<TxData>;
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    protected applyDefaultsToTxDataAsync<T extends TxData | TxDataPayable>(txData: T, estimateGasAsync?: (txData: T) => Promise<number>): Promise<TxData>;
}
