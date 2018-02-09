import Web3 from "web3";
import { DebtOrder, TxData } from "../types";
import { DebtTokenContract, DebtKernelContract, TokenTransferProxyContract, ERC20Contract } from "../wrappers";
export declare class OrderAssertions {
    private web3;
    constructor(web3: Web3);
    validDebtorFee(debtOrder: DebtOrder, errorMessage: string): void;
    validUnderwriterFee(debtOrder: DebtOrder, errorMessage: string): void;
    validRelayerFee(debtOrder: DebtOrder, errorMessage: string): void;
    validFees(debtOrder: DebtOrder, errorMessage: string): void;
    notExpired(debtOrder: DebtOrder, errorMessage: string): void;
    notAlreadyIssuedAsync(debtOrder: DebtOrder, debtToken: DebtTokenContract, errorMessage: string): Promise<void>;
    debtOrderNotCancelledAsync(debtOrder: DebtOrder, debtKernel: DebtKernelContract, errorMessage: string): Promise<void>;
    issuanceNotCancelledAsync(debtOrder: DebtOrder, debtKernel: DebtKernelContract, errorMessage: string): Promise<void>;
    validDebtorSignature(debtOrder: DebtOrder, transactionOptions: TxData, errorMessage: string): void;
    validCreditorSignature(debtOrder: DebtOrder, transactionOptions: TxData, errorMessage: string): void;
    validUnderwriterSignature(debtOrder: DebtOrder, transactionOptions: TxData, errorMessage: string): void;
    sufficientCreditorBalanceAsync(debtOrder: DebtOrder, principalToken: ERC20Contract, errorMessage: string): Promise<void>;
    sufficientCreditorAllowanceAsync(debtOrder: DebtOrder, principalToken: ERC20Contract, tokenTransferProxy: TokenTransferProxyContract, errorMessage: string): Promise<void>;
}
