import {
    ContractWrapper,
    DebtKernelContract,
    DebtTokenContract,
    TokenTransferProxyContract,
    TokenRegistryContract,
    ERC20Contract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
    TermsContractRegistryContract,
} from "../wrappers";
import Web3 from "web3";
import { DharmaConfig } from "../types";
import {
    DEBT_KERNEL_CONTRACT_CACHE_KEY,
    DEBT_TOKEN_CONTRACT_CACHE_KEY,
    REPAYMENT_ROUTER_CONTRACT_CACHE_KEY,
    TOKEN_REGISTRY_CONTRACT_CACHE_KEY,
    TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY,
    TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY,
    NULL_ADDRESS,
} from "../../utils/constants";
import singleLineString from "single-line-string";

export interface DharmaContracts {
    debtKernel: DebtKernelContract;
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

    public async loadDharmaContractsAsync(transactionOptions: object): Promise<DharmaContracts> {
        const debtKernel = await this.loadDebtKernelAsync(transactionOptions);
        const debtToken = await this.loadDebtTokenAsync(transactionOptions);
        const repaymentRouter = await this.loadRepaymentRouterAsync(transactionOptions);
        const tokenTransferProxy = await this.loadTokenTransferProxyAsync(transactionOptions);

        return { debtKernel, debtToken, repaymentRouter, tokenTransferProxy };
    }

    public async loadDebtKernelAsync(transactionOptions: object): Promise<DebtKernelContract> {
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

    public async loadDebtTokenAsync(transactionOptions: object): Promise<DebtTokenContract> {
        if (DEBT_TOKEN_CONTRACT_CACHE_KEY in this.cache) {
            return this.cache[DEBT_TOKEN_CONTRACT_CACHE_KEY] as DebtTokenContract;
        }

        let debtToken: DebtTokenContract;

        if (this.config.kernelAddress) {
            debtToken = await DebtTokenContract.at(
                this.config.tokenAddress,
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
        transactionOptions: object,
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

    public async loadTokenTransferProxyAsync(
        transactionOptions: object,
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
        transactionOptions: object,
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

    public async loadTermsContractRegistry(
        transactionOptions: object,
    ): Promise<TermsContractRegistryContract> {
        if (TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY in this.cache) {
            return this.cache[
                TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY
            ] as TermsContractRegistryContract;
        }

        const termsContractRegistry = await TermsContractRegistryContract.deployed(
            this.web3,
            transactionOptions,
        );

        this.cache[TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY] = termsContractRegistry;

        return termsContractRegistry;
    }

    public async loadSimpleInterestTermsContract(
        tokenAddress: string,
        transactionOptions: object,
    ): Promise<SimpleInterestTermsContractContract> {
        const cacheKey = this.getSimpleInterestTermsContractCacheKey(tokenAddress);

        if (cacheKey in this.cache) {
            return this.cache[cacheKey] as SimpleInterestTermsContractContract;
        } else {
            const termsContractRegistry = await this.loadTermsContractRegistry(transactionOptions);
            const simpleInterestTermsContractAddress = await termsContractRegistry.getSimpleInterestTermsContractAddress.callAsync(
                tokenAddress,
            );

            if (simpleInterestTermsContractAddress === NULL_ADDRESS) {
                throw new Error(
                    ContractsError.SIMPLE_INTEREST_TERMS_CONTRACT_NOT_SUPPORTED(tokenAddress),
                );
            }

            const simpleInterestTermsContract = await SimpleInterestTermsContractContract.at(
                simpleInterestTermsContractAddress,
                this.web3,
                transactionOptions,
            );

            this.cache[cacheKey] = simpleInterestTermsContract;
            return simpleInterestTermsContract;
        }
    }

    public async loadTokenRegistry(transactionOptions: object): Promise<TokenRegistryContract> {
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

        const tokenAddress = await tokenRegistryContract.getTokenAddress.callAsync(symbol);

        if (tokenAddress === NULL_ADDRESS) {
            throw new Error(ContractsError.CANNOT_FIND_TOKEN_WITH_SYMBOL(symbol));
        }

        return tokenAddress;
    }

    public async loadTokenBySymbolAsync(
        symbol: string,
        transactionOptions: object,
    ): Promise<ERC20Contract> {
        const tokenAddress = await this.getTokenAddressBySymbolAsync(symbol);

        return this.loadERC20TokenAsync(tokenAddress, transactionOptions);
    }

    private getERC20TokenCacheKey(tokenAddress: string): string {
        return `ERC20_${tokenAddress}`;
    }

    private getSimpleInterestTermsContractCacheKey(tokenAddress: string): string {
        return `SimpleInterestTermsContract_${tokenAddress}`;
    }
}
