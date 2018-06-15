import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { ContractsAPI } from "../apis";
import { DebtOrderData, TxData } from "../types";
import { DebtKernelContract, DebtTokenContract, ERC20Contract, TokenTransferProxyContract } from "../wrappers";
export declare class OrderAssertions {
    private web3Utils;
    private contracts;
    constructor(web3: Web3, contracts: ContractsAPI);
    validDebtorFee(debtOrderData: DebtOrderData, errorMessage: string): void;
    validUnderwriterFee(debtOrderData: DebtOrderData, errorMessage: string): void;
    validRelayerFee(debtOrderData: DebtOrderData, errorMessage: string): void;
    validFees(debtOrderData: DebtOrderData, errorMessage: string): void;
    notExpired(debtOrderData: DebtOrderData, errorMessage: string): Promise<void>;
    notAlreadyIssuedAsync(debtOrderData: DebtOrderData, debtToken: DebtTokenContract, errorMessage: string): Promise<void>;
    /**
     * If the given DebtOrder is cancelled, throws the given errorMessage.
     *
     * @param {debtOrderData} DebtOrderData
     * @param {DebtKernelContract} debtKernel
     * @param {string} errorMessage
     * @returns {Promise<void>}
     */
    debtOrderNotCancelledAsync(debtOrderData: DebtOrderData, debtKernel: DebtKernelContract, errorMessage: string): Promise<void>;
    issuanceNotCancelledAsync(debtOrderData: DebtOrderData, debtKernel: DebtKernelContract, errorMessage: string): Promise<void>;
    senderAuthorizedToCancelOrder(debtOrderData: DebtOrderData, transactionOptions: TxData, errorMessage: string): void;
    senderAuthorizedToCancelIssuance(debtOrderData: DebtOrderData, transactionOptions: TxData, errorMessage: string): void;
    validDebtorSignature(debtOrderData: DebtOrderData, transactionOptions: TxData, errorMessage: string): Promise<void>;
    validCreditorSignature(debtOrderData: DebtOrderData, transactionOptions: TxData, errorMessage: string): Promise<void>;
    validUnderwriterSignature(debtOrderData: DebtOrderData, transactionOptions: TxData, errorMessage: string): Promise<void>;
    sufficientCreditorBalanceAsync(debtOrderData: DebtOrderData, principalToken: ERC20Contract, errorMessage: string): Promise<void>;
    sufficientCreditorAllowanceAsync(debtOrderData: DebtOrderData, principalToken: ERC20Contract, tokenTransferProxy: TokenTransferProxyContract, errorMessage: string): Promise<void>;
    sufficientCollateralizerAllowanceAsync(debtOrderData: DebtOrderData, collateralToken: ERC20Contract, collateralAmount: BigNumber, tokenTransferProxy: TokenTransferProxyContract, errorMessage: string): Promise<void>;
    sufficientCollateralizerBalanceAsync(debtOrderData: DebtOrderData, collateralToken: ERC20Contract, collateralAmount: BigNumber, errorMessage: string): Promise<void>;
    /**
     * Given a DebtOrder instance, eventually returns true if that DebtOrder has
     * been cancelled. Returns false otherwise.
     *
     * @example
     * await dharma.order.isCancelled(debtOrder, debtKernel);
     * => false
     *
     * @param {DebtOrderData} debtOrderData
     * @param {DebtKernelContract} debtKernel
     * @returns {Promise<boolean>}
     */
    private isCancelled(debtOrderData, debtKernel);
}
