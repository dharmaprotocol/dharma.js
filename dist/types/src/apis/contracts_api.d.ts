import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { CollateralizedSimpleInterestTermsContractContract, CollateralizerContract, DebtKernelContract, DebtRegistryContract, DebtTokenContract, ERC20Contract, RepaymentRouterContract, SimpleInterestTermsContractContract, TermsContract, TokenRegistryContract, TokenTransferProxyContract } from "../wrappers";
import { AddressBook } from "../types";
export interface DharmaContracts {
    debtKernel: DebtKernelContract;
    debtRegistry: DebtRegistryContract;
    debtToken: DebtTokenContract;
    repaymentRouter: RepaymentRouterContract;
    tokenTransferProxy: TokenTransferProxyContract;
    collateralizer: CollateralizerContract;
}
export declare const ContractsError: {
    CANNOT_FIND_TOKEN_WITH_SYMBOL: (symbol: string) => any;
    CANNOT_FIND_TOKEN_WITH_INDEX: (index: number) => any;
    TERMS_CONTRACT_NOT_FOUND: (termsContractAddress: string) => any;
};
export declare class ContractsAPI {
    private web3;
    private addressBook;
    private cache;
    constructor(web3: Web3, addressBook?: AddressBook);
    loadDharmaContractsAsync(transactionOptions?: object): Promise<DharmaContracts>;
    loadDebtKernelAsync(transactionOptions?: object): Promise<DebtKernelContract>;
    loadCollateralizerAsync(transactionOptions?: object): Promise<CollateralizerContract>;
    loadDebtRegistryAsync(transactionOptions?: object): Promise<DebtRegistryContract>;
    loadDebtTokenAsync(transactionOptions?: object): Promise<DebtTokenContract>;
    loadRepaymentRouterAsync(transactionOptions?: object): Promise<RepaymentRouterContract>;
    loadRepaymentRouterAtAsync(address: string, transactionOptions?: object): Promise<RepaymentRouterContract>;
    loadTokenTransferProxyAsync(transactionOptions?: object): Promise<TokenTransferProxyContract>;
    loadERC20TokenAsync(tokenAddress: string, transactionOptions?: object): Promise<ERC20Contract>;
    loadTermsContractAsync(termsContractAddress: string, transactionOptions?: object): Promise<TermsContract>;
    /**
     * Given a terms contract address, returns the name of that contract.
     *
     * @example
     *  getTermsContractType("0x069cb8891d9dbf02d89079a77169e0dc8bacda65")
     *  => "SimpleInterestLoan"
     *
     * @param {string} tokenAddress
     * @returns {string}
     */
    getTermsContractType(contractAddress: string): Promise<string>;
    loadSimpleInterestTermsContract(transactionOptions?: object): Promise<SimpleInterestTermsContractContract>;
    loadCollateralizedSimpleInterestTermsContract(transactionOptions?: object): Promise<CollateralizedSimpleInterestTermsContractContract>;
    loadTokenRegistry(transactionOptions?: object): Promise<TokenRegistryContract>;
    getTokenAddressBySymbolAsync(symbol: string): Promise<string>;
    /**
     * Given the index of a token in the Token Registry, returns the address of that
     * token's contract.
     *
     * @param {number} index
     * @returns {Promise<string>}
     */
    getTokenAddressByIndexAsync(index: BigNumber): Promise<string>;
    getTokenIndexBySymbolAsync(symbol: string): Promise<BigNumber>;
    getTokenSymbolByIndexAsync(index: BigNumber): Promise<string>;
    loadTokenBySymbolAsync(symbol: string, transactionOptions?: object): Promise<ERC20Contract>;
    /**
     * Given the index of a token in the token registry, loads an instance of that
     * token and returns it.
     *
     * @param {number} index
     * @param {object} transactionOptions
     * @returns {Promise<ERC20Contract>}
     */
    loadTokenByIndexAsync(index: BigNumber, transactionOptions?: object): Promise<ERC20Contract>;
    doesTokenCorrespondToSymbol(tokenAddress: string, symbol: string): Promise<boolean>;
    private getERC20TokenCacheKey(tokenAddress);
    private getTermsContractCacheKey(termsContractAddress);
    private getRepaymentRouterCacheKey(tokenAddress);
}
