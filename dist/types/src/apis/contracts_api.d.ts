import { DebtKernelContract, DebtTokenContract, TokenTransferProxyContract, TokenRegistryContract, ERC20Contract, RepaymentRouterContract, SimpleInterestTermsContractContract, TermsContractRegistryContract } from "../wrappers";
import Web3 from "web3";
import { DharmaConfig } from "../types";
export interface DharmaContracts {
    debtKernel: DebtKernelContract;
    debtToken: DebtTokenContract;
    repaymentRouter: RepaymentRouterContract;
    tokenTransferProxy: TokenTransferProxyContract;
}
export declare const ContractsError: {
    SIMPLE_INTEREST_TERMS_CONTRACT_NOT_SUPPORTED: (principalToken: string) => string;
    CANNOT_FIND_TOKEN_WITH_SYMBOL: (symbol: string) => string;
};
export declare class ContractsAPI {
    private web3;
    private config;
    private cache;
    constructor(web3: Web3, config?: DharmaConfig);
    loadDharmaContractsAsync(transactionOptions: object): Promise<DharmaContracts>;
    loadDebtKernelAsync(transactionOptions: object): Promise<DebtKernelContract>;
    loadDebtTokenAsync(transactionOptions: object): Promise<DebtTokenContract>;
    loadRepaymentRouterAsync(transactionOptions: object): Promise<RepaymentRouterContract>;
    loadTokenTransferProxyAsync(transactionOptions: object): Promise<TokenTransferProxyContract>;
    loadERC20TokenAsync(tokenAddress: string, transactionOptions: object): Promise<ERC20Contract>;
    loadTermsContractRegistry(transactionOptions: object): Promise<TermsContractRegistryContract>;
    loadSimpleInterestTermsContract(tokenAddress: string, transactionOptions: object): Promise<SimpleInterestTermsContractContract>;
    loadTokenRegistry(transactionOptions: object): Promise<TokenRegistryContract>;
    getTokenAddressBySymbolAsync(symbol: string): Promise<string>;
    loadTokenBySymbolAsync(symbol: string, transactionOptions: object): Promise<ERC20Contract>;
    private getERC20TokenCacheKey(tokenAddress);
    private getSimpleInterestTermsContractCacheKey(tokenAddress);
}
