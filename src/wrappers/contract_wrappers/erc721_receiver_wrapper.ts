/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from "../../types";
import * as promisify from "tiny-promisify";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { BigNumber } from "../../../utils/bignumber";
import { ERC721Receiver as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class ERC721ReceiverContract extends BaseContract {
    public onERC721Received = {
        async callAsync(
            _from: string,
            _tokenId: BigNumber,
            _data: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<string> {
            const self = this as ERC721ReceiverContract;
            const result = await promisify<string>(
                self.web3ContractInstance.onERC721Received.call,
                self.web3ContractInstance,
            )(_from, _tokenId, _data);
            return result;
        },
        async estimateGasAsync(
            _from: string,
            _tokenId: BigNumber,
            _data: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as ERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.onERC721Received.estimateGas,
                self.web3ContractInstance,
            )(_from, _tokenId, _data, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _from: string,
            _tokenId: BigNumber,
            _data: string,
            txData: TxData = {},
        ): string {
            const self = this as ERC721ReceiverContract;
            const abiEncodedTransactionData = self.web3ContractInstance.onERC721Received.getData();
            return abiEncodedTransactionData;
        },
    };

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ERC721ReceiverContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new ERC721ReceiverContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "ERC721Receiver",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
