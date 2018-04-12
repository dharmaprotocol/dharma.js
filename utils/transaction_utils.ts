// External
import * as Web3 from "web3";
import * as ethjsABI from "ethjs-abi";
import * as promisify from "tiny-promisify";

// Types
import { TxData } from "src/types";

export namespace TransactionUtils {
    function filterMethodABI(abi: any[]): Web3.MethodAbi[] {
        return abi.filter((abiDef) => abiDef.type === "function");
    }

    function findMethod(
        abi: Web3.AbiDefinition[],
        name: string,
        inputTypes: string,
    ): Web3.MethodAbi {
        const methodAbi = filterMethodABI(abi).find((abiDef) => {
            const methodArgs = abiDef.inputs.map((input) => input.type).join(",");
            return abiDef.name === name && methodArgs === inputTypes;
        });

        if (methodAbi) {
            return methodAbi;
        }

        throw new Error(`Method: ${name} with input types: ${inputTypes} is not found`);
    }

    // sendTransaction is a util function to send a transaction to any overloaded
    // method of a contract.
    // Truffle contract instance cannot handle overloaded methods
    // (truffle will only handle the first implementation of the method).
    export async function sendRawTransaction(
        web3: Web3,
        web3ContractInstance: Web3.ContractInstance,
        methodName: string,
        inputTypes: string,
        inputVals: any[],
        txData: TxData = {},
    ): Promise<string> {
        const encodedData = encodeTransactionData(
            web3ContractInstance.abi,
            methodName,
            inputTypes,
            inputVals,
        );

        return promisify<string>(web3.eth.sendTransaction)({
            data: encodedData,
            ...txData,
            to: web3ContractInstance.address,
        });
    }

    export async function estimateGasRaw(
        web3: Web3,
        web3ContractInstance: Web3.ContractInstance,
        methodName: string,
        inputTypes: string,
        inputVals: any[],
        txData: TxData = {},
    ): Promise<number> {
        const encodedData = encodeTransactionData(
            web3ContractInstance.abi,
            methodName,
            inputTypes,
            inputVals,
        );

        return promisify<number>(web3.eth.estimateGas)({
            data: encodedData,
            ...txData,
            to: web3ContractInstance.address,
        });
    }

    function encodeTransactionData(
        abi: Web3.AbiDefinition[],
        methodName: string,
        inputTypes: string,
        inputVals: any[],
    ): string {
        const abiMethod = findMethod(abi, methodName, inputTypes);
        return ethjsABI.encodeMethod(abiMethod, inputVals);
    }
}
