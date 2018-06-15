import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { DebtTokenContract } from "../wrappers";
export declare class DebtTokenAssertions {
    exists(debtTokenContract: DebtTokenContract, tokenID: BigNumber, errorMessage: string): Promise<void>;
    onlyOwner(debtTokenContract: DebtTokenContract, tokenID: BigNumber, account: string, errorMessage: string): Promise<void>;
    notOwner(debtTokenContract: DebtTokenContract, tokenID: BigNumber, account: string, errorMessage: string): Promise<void>;
    canBeTransferredByAccount(debtTokenContract: DebtTokenContract, tokenID: BigNumber, account: string, errorMessage: string): Promise<void>;
    canBeReceivedByAccountWithData(web3: Web3, tokenID: BigNumber, recipient: string, sender: string, data: string, errorMessage: string): Promise<void>;
}
