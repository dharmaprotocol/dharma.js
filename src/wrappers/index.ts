import { DebtOrderWrapper } from "./debt_order_wrapper";
import { BaseContract } from "./contract_wrappers/base_contract_wrapper";
import { DebtKernelContract } from "./contract_wrappers/debt_kernel_wrapper";
import { DebtRegistryContract } from "./contract_wrappers/debt_registry_wrapper";
import { DebtTokenContract } from "./contract_wrappers/debt_token_wrapper";
import { DummyTokenContract } from "./contract_wrappers/dummy_token_wrapper";
import { TokenRegistryContract } from "./contract_wrappers/token_registry_wrapper";
import { TokenTransferProxyContract } from "./contract_wrappers/token_transfer_proxy_wrapper";
import { ERC20Contract } from "./contract_wrappers/erc20_wrapper";
import { TermsContract } from "./contract_wrappers/terms_contract_wrapper";
import { RepaymentRouterContract } from "./contract_wrappers/repayment_router_wrapper";
import { SimpleInterestTermsContractContract } from "./contract_wrappers/simple_interest_terms_contract_wrapper";

export type ContractWrapper =
    | DebtKernelContract
    | DebtRegistryContract
    | DebtTokenContract
    | TokenTransferProxyContract
    | ERC20Contract
    | RepaymentRouterContract
    | SimpleInterestTermsContractContract
    | TermsContract
    | TokenRegistryContract;

export {
    BaseContract,
    DebtOrderWrapper,
    DebtKernelContract,
    DebtRegistryContract,
    DebtTokenContract,
    DummyTokenContract,
    TokenRegistryContract,
    TokenTransferProxyContract,
    ERC20Contract,
    TermsContract,
    SimpleInterestTermsContractContract,
    RepaymentRouterContract,
};
