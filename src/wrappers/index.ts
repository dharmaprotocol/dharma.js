import { BaseContract } from "./contract_wrappers/base_contract_wrapper";
import { CollateralizedSimpleInterestTermsContractContract } from "./contract_wrappers/collateralized_simple_interest_terms_contract_wrapper";
import { ERC721CollateralizedSimpleInterestTermsContractContract } from "./contract_wrappers/e_r_c721_collateralized_simple_interest_terms_contract_wrapper";
import { CollateralizerContract } from "./contract_wrappers/collateralizer_wrapper";
import { ContractRegistryContract } from "./contract_wrappers/contract_registry_wrapper";
import { DebtKernelContract } from "./contract_wrappers/debt_kernel_wrapper";
import { DebtRegistryContract } from "./contract_wrappers/debt_registry_wrapper";
import { DebtTokenContract } from "./contract_wrappers/debt_token_wrapper";
import { DummyTokenContract } from "./contract_wrappers/dummy_token_wrapper";
import { ERC20Contract } from "./contract_wrappers/erc20_wrapper";
import { ERC721ReceiverContract } from "./contract_wrappers/erc721_receiver_wrapper";
import { MockERC721ReceiverContract } from "./contract_wrappers/mock_erc721_receiver_wrapper";
import { RepaymentRouterContract } from "./contract_wrappers/repayment_router_wrapper";
import { SimpleInterestTermsContractContract } from "./contract_wrappers/simple_interest_terms_contract_wrapper";
import { TermsContract } from "./contract_wrappers/terms_contract_wrapper";
import { TokenRegistryContract } from "./contract_wrappers/token_registry_wrapper";
import { TokenTransferProxyContract } from "./contract_wrappers/token_transfer_proxy_wrapper";
import { DebtOrderDataWrapper } from "./debt_order_data_wrapper";
import { ERC721TokenRegistryContract } from "./contract_wrappers/e_r_c721_token_registry_wrapper";
import { ERC721TokenContract } from "./contract_wrappers/e_r_c721_token_wrapper";
import { ERC721CollateralizerContract } from "./contract_wrappers/e_r_c721_collateralizer_wrapper";
import { MintableERC721TokenContract } from "./contract_wrappers/mintable_e_r_c721_token_wrapper";
import { CreditorProxyContract } from "./contract_wrappers/creditor_proxy_wrapper";

export type ContractWrapper =
    | DebtKernelContract
    | DebtRegistryContract
    | DebtTokenContract
    | TokenTransferProxyContract
    | ERC20Contract
    | ERC721ReceiverContract
    | MockERC721ReceiverContract
    | RepaymentRouterContract
    | SimpleInterestTermsContractContract
    | CollateralizedSimpleInterestTermsContractContract
    | ERC721CollateralizedSimpleInterestTermsContractContract
    | ERC721CollateralizerContract
    | ERC721TokenRegistryContract
    | MintableERC721TokenContract
    | ERC721TokenContract
    | TermsContract
    | TokenRegistryContract
    | CollateralizerContract
    | ContractRegistryContract
    | CreditorProxyContract;

export {
    BaseContract,
    DebtOrderDataWrapper,
    DebtKernelContract,
    DebtRegistryContract,
    DebtTokenContract,
    DummyTokenContract,
    TokenRegistryContract,
    TokenTransferProxyContract,
    ERC20Contract,
    ERC721ReceiverContract,
    MockERC721ReceiverContract,
    TermsContract,
    SimpleInterestTermsContractContract,
    CollateralizedSimpleInterestTermsContractContract,
    ERC721CollateralizedSimpleInterestTermsContractContract,
    RepaymentRouterContract,
    CollateralizerContract,
    ContractRegistryContract,
    ERC721TokenRegistryContract,
    ERC721TokenContract,
    ERC721CollateralizerContract,
    MintableERC721TokenContract,
    CreditorProxyContract
};
