export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const NULL_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";

export namespace ERC20TokenSymbol {
    export const REP = "REP";
    export const ZRX = "ZRX";
    export const MKR = "MKR";
}

export const NULL_ECDSA_SIGNATURE = {
    r: "",
    s: "",
    v: 0,
};

export const WEB3_ERROR_INVALID_ADDRESS = "invalid address";
export const WEB3_ERROR_ACCOUNT_NOT_FOUND = "Account not found";
export const WEB3_ERROR_NO_PRIVATE_KEY = "cannot sign data; no private key";

export const DEBT_KERNEL_CONTRACT_CACHE_KEY = "DebtKernel";
export const DEBT_REGISTRY_CONTRACT_CACHE_KEY = "DebtRegistry";
export const DEBT_TOKEN_CONTRACT_CACHE_KEY = "DebtToken";
export const REPAYMENT_ROUTER_CONTRACT_CACHE_KEY = "RepaymentRouter";
export const SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY = "SimpleInterestTermsContract";
export const TOKEN_REGISTRY_CONTRACT_CACHE_KEY = "TokenRegistry";
export const TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY = "TokenTransferProxy";
export const TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY = "TermsContractRegistry";
export const COLLATERALIZED_SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY =
    "CollateralizedSimpleInterestTermsContract";
export const COLLATERALIZER_CONTRACT_CACHE_KEY = "CollateralizerContract";

export const TERMS_CONTRACT_TYPES = {
    COLLATERALIZED_SIMPLE_INTEREST_LOAN: "CollateralizedSimpleInterestLoan",
    SIMPLE_INTEREST_LOAN: "SimpleInterestLoan",
};
