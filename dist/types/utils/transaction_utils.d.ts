import * as Web3 from "web3";
import { ContractsAPI } from "../src/apis";
import { DebtOrderData, TxData } from "../src/types";
export declare function sendRawTransaction(web3: Web3, web3ContractInstance: Web3.ContractInstance, methodName: string, inputTypes: string, inputVals: any[], txData?: TxData): Promise<string>;
export declare function applyNetworkDefaults(debtOrderData: DebtOrderData, contracts: ContractsAPI): Promise<DebtOrderData>;
