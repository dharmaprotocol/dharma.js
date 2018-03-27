// external
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";
import * as _ from "lodash";

// wrappers
import {
    ContractWrapper,
    DebtKernelContract,
    DebtRegistryContract,
    DebtTokenContract,
    TermsContract,
    TokenTransferProxyContract,
    TokenRegistryContract,
    ERC20Contract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
} from "../wrappers";

// utils
import {
    DEBT_KERNEL_CONTRACT_CACHE_KEY,
    DEBT_REGISTRY_CONTRACT_CACHE_KEY,
    DEBT_TOKEN_CONTRACT_CACHE_KEY,
    REPAYMENT_ROUTER_CONTRACT_CACHE_KEY,
    SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY,
    TOKEN_REGISTRY_CONTRACT_CACHE_KEY,
    TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY,
    NULL_ADDRESS,
} from "../../utils/constants";
import * as singleLineString from "single-line-string";

// types
import { DharmaConfig } from "../types";

export interface DharmaContracts {
    debtKernel: DebtKernelContract;
    debtRegistry: DebtRegistryContract;
    debtToken: DebtTokenContract;
    repaymentRouter: RepaymentRouterContract;
    tokenTransferProxy: TokenTransferProxyContract;
}

export const ContractsError = {
    SIMPLE_INTEREST_TERMS_CONTRACT_NOT_SUPPORTED: (principalToken: string) =>
        singleLineString`SimpleInterestTermsContract not supported for principal token at
                address ${principalToken}`,
    CANNOT_FIND_TOKEN_WITH_SYMBOL: (symbol: string) =>
        singleLineString`Could not find token associated with symbol ${symbol}.`,
    CANNOT_FIND_TOKEN_WITH_INDEX: (index: number) =>
        singleLineString`Could not find token associated with index ${index}.`,
    TERMS_CONTRACT_NOT_FOUND: (tokenAddress: string) =>
        singleLineString`Could not find a terms contract at address ${tokenAddress}`,
};

export class ContractsAPI {
    private web3: Web3;
    private config: DharmaConfig;

    private cache: { [contractName: string]: ContractWrapper };

    public constructor(web3: Web3, config: DharmaConfig = {}) {
        this.web3 = web3;
        this.config = config;

        this.cache = {};
    }

    public async loadDharmaContractsAsync(
        transactionOptions: object = {},
    ): Promise<DharmaContracts> {
        const debtKernel = await this.loadDebtKernelAsync(transactionOptions);
        const debtRegistry = await this.loadDebtRegistryAsync(transactionOptions);
        const debtToken = await this.loadDebtTokenAsync(transactionOptions);
        const repaymentRouter = await this.loadRepaymentRouterAsync(transactionOptions);
        const tokenTransferProxy = await this.loadTokenTransferProxyAsync(transactionOptions);

        return { debtKernel, debtRegistry, debtToken, repaymentRouter, tokenTransferProxy };
    }

    public async loadDebtKernelAsync(transactionOptions: object = {}): Promise<DebtKernelContract> {
        if (DEBT_KERNEL_CONTRACT_CACHE_KEY in this.cache) {
            return this.cache[DEBT_KERNEL_CONTRACT_CACHE_KEY] as DebtKernelContract;
        }

        let debtKernel: DebtKernelContract;

        if (this.config.kernelAddress) {
            debtKernel = await DebtKernelContract.at(
                this.config.kernelAddress,
                this.web3,
                transactionOptions,
            );
        } else {
            debtKernel = await DebtKernelContract.deployed(this.web3, transactionOptions);
        }

        this.cache[DEBT_KERNEL_CONTRACT_CACHE_KEY] = debtKernel;

        return debtKernel;
    }

    public async loadDebtRegistryAsync(
        transactionOptions: object = {},
    ): Promise<DebtRegistryContract> {
        if (DEBT_REGISTRY_CONTRACT_CACHE_KEY in this.cache) {
            return this.cache[DEBT_REGISTRY_CONTRACT_CACHE_KEY] as DebtRegistryContract;
        }

        let debtRegistry: DebtRegistryContract;

        if (this.config.debtRegistryAddress) {
            debtRegistry = await DebtRegistryContract.at(
                this.config.debtRegistryAddress,
                this.web3,
                transactionOptions,
            );
        } else {
            debtRegistry = await DebtRegistryContract.deployed(this.web3, transactionOptions);
        }

        this.cache[DEBT_REGISTRY_CONTRACT_CACHE_KEY] = debtRegistry;

        return debtRegistry;
    }

    public async loadDebtTokenAsync(transactionOptions: object = {}): Promise<DebtTokenContract> {
        if (DEBT_TOKEN_CONTRACT_CACHE_KEY in this.cache) {
            return this.cache[DEBT_TOKEN_CONTRACT_CACHE_KEY] as DebtTokenContract;
        }

        let debtToken: DebtTokenContract;

        if (this.config.kernelAddress) {
            debtToken = await DebtTokenContract.at(
                this.config.debtTokenAddress,
                this.web3,
                transactionOptions,
            );
        } else {
            debtToken = await DebtTokenContract.deployed(this.web3, transactionOptions);
        }

        this.cache[DEBT_TOKEN_CONTRACT_CACHE_KEY] = debtToken;

        return debtToken;
    }

    public async loadRepaymentRouterAsync(
        transactionOptions: object = {},
    ): Promise<RepaymentRouterContract> {
        if (REPAYMENT_ROUTER_CONTRACT_CACHE_KEY in this.cache) {
            return this.cache[REPAYMENT_ROUTER_CONTRACT_CACHE_KEY] as RepaymentRouterContract;
        }

        let repaymentRouter: RepaymentRouterContract;

        if (this.config.repaymentRouterAddress) {
            repaymentRouter = await RepaymentRouterContract.at(
                this.config.repaymentRouterAddress,
                this.web3,
                transactionOptions,
            );
        } else {
            repaymentRouter = await RepaymentRouterContract.deployed(this.web3, transactionOptions);
        }

        this.cache[REPAYMENT_ROUTER_CONTRACT_CACHE_KEY] = repaymentRouter;

        return repaymentRouter;
    }

    public async loadRepaymentRouterAtAsync(
        address: string,
        transactionOptions: object = {},
    ): Promise<RepaymentRouterContract> {
        const cacheKey = this.getRepaymentRouterCacheKey(address);

        if (cacheKey in this.cache) {
            return this.cache[cacheKey] as RepaymentRouterContract;
        }

        let repaymentRouter = await RepaymentRouterContract.at(
            address,
            this.web3,
            transactionOptions,
        );

        this.cache[cacheKey] = repaymentRouter;

        return repaymentRouter;
    }

    public async loadTokenTransferProxyAsync(
        transactionOptions: object = {},
    ): Promise<TokenTransferProxyContract> {
        if (TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY in this.cache) {
            return this.cache[
                TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY
            ] as TokenTransferProxyContract;
        }

        let tokenTransferProxy: TokenTransferProxyContract;

        if (this.config.tokenTransferProxyAddress) {
            tokenTransferProxy = await TokenTransferProxyContract.at(
                this.config.tokenTransferProxyAddress,
                this.web3,
                transactionOptions,
            );
        } else {
            tokenTransferProxy = await TokenTransferProxyContract.deployed(
                this.web3,
                transactionOptions,
            );
        }

        this.cache[TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY] = tokenTransferProxy;

        return tokenTransferProxy;
    }

    public async loadERC20TokenAsync(
        tokenAddress: string,
        transactionOptions: object = {},
    ): Promise<ERC20Contract> {
        const cacheKey = this.getERC20TokenCacheKey(tokenAddress);

        if (cacheKey in this.cache) {
            return this.cache[cacheKey] as ERC20Contract;
        } else {
            const tokenContract = await ERC20Contract.at(
                tokenAddress,
                this.web3,
                transactionOptions,
            );
            this.cache[cacheKey] = tokenContract;
            return tokenContract;
        }
    }

    public async loadTermsContractAsync(
        termsContractAddress: string,
        transactionOptions: object = {},
    ): Promise<TermsContract> {
        const cacheKey = this.getTermsContractCacheKey(termsContractAddress);

        if (cacheKey in this.cache) {
            return this.cache[cacheKey] as TermsContract;
        } else {
            const termsContract = await TermsContract.at(
                termsContractAddress,
                this.web3,
                transactionOptions,
            );
            this.cache[cacheKey] = termsContract;
            return termsContract;
        }
    }

    /**
     * Given a terms contract address, returns the name of that contract.
     *
     * Examples:
     *  getTermsContractType("0x069cb8891d9dbf02d89079a77169e0dc8bacda65")
     *  => "SimpleInterestTermsContractContract"
     *
     * @param {string} tokenAddress
     * @returns {string}
     */
    public async getTermsContractType(contractAddress: string): Promise<string> {
        const simpleInterestTermsContract = await this.loadSimpleInterestTermsContract();
        const supportedTermsContracts = [simpleInterestTermsContract];

        const matchingTermsContract = _.find(
            supportedTermsContracts,
            termsContract => termsContract.address === contractAddress,
        );

        if (!matchingTermsContract) {
            throw new Error(ContractsError.TERMS_CONTRACT_NOT_FOUND(contractAddress));
        }

        return matchingTermsContract.constructor.name;
    }

    public async loadSimpleInterestTermsContract(
        transactionOptions: object = {},
    ): Promise<SimpleInterestTermsContractContract> {
        if (SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY in this.cache) {
            return this.cache[
                SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY
            ] as SimpleInterestTermsContractContract;
        }

        let simpleInterestTermsContract: SimpleInterestTermsContractContract;

        if (this.config.simpleInterestTermsContractAddress) {
            simpleInterestTermsContract = await SimpleInterestTermsContractContract.at(
                this.config.simpleInterestTermsContractAddress,
                this.web3,
                transactionOptions,
            );
        } else {
            simpleInterestTermsContract = await SimpleInterestTermsContractContract.deployed(
                this.web3,
                transactionOptions,
            );
        }

        this.cache[SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY] = simpleInterestTermsContract;

        return simpleInterestTermsContract;
    }

    public async loadTokenRegistry(
        transactionOptions: object = {},
    ): Promise<TokenRegistryContract> {
        if (TOKEN_REGISTRY_CONTRACT_CACHE_KEY in this.cache) {
            return this.cache[TOKEN_REGISTRY_CONTRACT_CACHE_KEY] as TokenRegistryContract;
        }

        let tokenRegistryContract: TokenRegistryContract;

        if (this.config.tokenRegistryAddress) {
            tokenRegistryContract = await TokenRegistryContract.at(
                this.config.tokenRegistryAddress,
                this.web3,
                transactionOptions,
            );
        } else {
            tokenRegistryContract = await TokenRegistryContract.deployed(
                this.web3,
                transactionOptions,
            );
        }

        this.cache[TOKEN_REGISTRY_CONTRACT_CACHE_KEY] = tokenRegistryContract;

        return tokenRegistryContract;
    }

    public async getTokenAddressBySymbolAsync(symbol: string): Promise<string> {
        const tokenRegistryContract = await this.loadTokenRegistry({});

        const tokenAddress = await tokenRegistryContract.getTokenAddressBySymbol.callAsync(symbol);

        if (tokenAddress === NULL_ADDRESS) {
            throw new Error(ContractsError.CANNOT_FIND_TOKEN_WITH_SYMBOL(symbol));
        }

        return tokenAddress;
    }

    public async getTokenIndexBySymbolAsync(symbol: string): Promise<BigNumber> {
        const tokenRegistryContract = await this.loadTokenRegistry();

        // We first confirm token exists with the given symbol.  This call
        // will throw if the token is not tracked by the registry.
        await this.getTokenAddressBySymbolAsync(symbol);

        return tokenRegistryContract.getTokenIndexBySymbol.callAsync(symbol);
    }

    public async getTokenSymbolByIndexAsync(index: BigNumber): Promise<string> {
        const tokenRegistryContract = await this.loadTokenRegistry();

        const symbol = await tokenRegistryContract.getTokenSymbolByIndex.callAsync(index);

        if (!symbol || symbol === "") {
            throw new Error(ContractsError.CANNOT_FIND_TOKEN_WITH_INDEX(index.toNumber()));
        }

        return symbol;
    }

    public async loadTokenBySymbolAsync(
        symbol: string,
        transactionOptions: object = {},
    ): Promise<ERC20Contract> {
        const tokenAddress = await this.getTokenAddressBySymbolAsync(symbol);

        return this.loadERC20TokenAsync(tokenAddress, transactionOptions);
    }

    private getERC20TokenCacheKey(tokenAddress: string): string {
        return `ERC20_${tokenAddress}`;
    }

    private getTermsContractCacheKey(termsContractAddress: string): string {
        return `TermsContract_${termsContractAddress}`;
    }

    private getRepaymentRouterCacheKey(tokenAddress: string): string {
        return `RepaymentRouter_${tokenAddress}`;
    }
}
