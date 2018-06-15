/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "../../types";
import { BigNumber } from "../../../utils/bignumber";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class ERC721ReceiverContract extends BaseContract {
    onERC721Received: {
        callAsync(_from: string, _tokenId: BigNumber, _data: string, defaultBlock?: Web3.BlockParam): Promise<string>;
        estimateGasAsync(_from: string, _tokenId: BigNumber, _data: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_from: string, _tokenId: BigNumber, _data: string, txData?: TxData): string;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<ERC721ReceiverContract>;
}
