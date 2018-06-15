import * as Web3 from "web3";
import { AdaptersAPI, BlockchainAPI, ContractsAPI, LogsAPI, OrderAPI, ServicingAPI, SignerAPI, TokenAPI } from "./apis";
import * as Types from "./types";
declare class Dharma {
    sign: SignerAPI;
    order: OrderAPI;
    contracts: ContractsAPI;
    adapters: AdaptersAPI;
    servicing: ServicingAPI;
    token: TokenAPI;
    blockchain: BlockchainAPI;
    logs: LogsAPI;
    private readonly web3;
    constructor(web3Provider: Web3.Provider, addressBook?: Types.AddressBook);
}
export { Dharma, Types };
