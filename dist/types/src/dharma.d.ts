import Web3 from "web3";
import { ContractsAPI, OrderAPI, SignerAPI, AdaptersAPI } from "./apis";
import { DharmaConfig } from "./types";
export default class Dharma {
    sign: SignerAPI;
    order: OrderAPI;
    contracts: ContractsAPI;
    adapters: AdaptersAPI;
    private web3;
    constructor(web3Provider: Web3.Provider, config: DharmaConfig);
}
