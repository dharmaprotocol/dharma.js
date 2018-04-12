import { DebtTokenContract, ERC721ReceiverContract } from "../wrappers";
import { BigNumber } from "utils/bignumber";
import * as Web3 from "web3";
import { Web3Utils } from "utils/web3_utils";

export class DebtTokenAssertions {
    public async exists(
        debtTokenContract: DebtTokenContract,
        tokenID: BigNumber,
        errorMessage: string,
    ): Promise<void> {
        const exists = await debtTokenContract.exists.callAsync(tokenID);

        if (!exists) {
            throw new Error(errorMessage);
        }
    }

    public async onlyOwner(
        debtTokenContract: DebtTokenContract,
        tokenID: BigNumber,
        account: string,
        errorMessage: string,
    ): Promise<void> {
        const tokenOwner = await debtTokenContract.ownerOf.callAsync(tokenID);

        if (tokenOwner !== account) {
            throw new Error(errorMessage);
        }
    }

    public async notOwner(
        debtTokenContract: DebtTokenContract,
        tokenID: BigNumber,
        account: string,
        errorMessage: string,
    ): Promise<void> {
        const tokenOwner = await debtTokenContract.ownerOf.callAsync(tokenID);

        if (tokenOwner === account) {
            throw new Error(errorMessage);
        }
    }

    public async canBeTransferredByAccount(
        debtTokenContract: DebtTokenContract,
        tokenID: BigNumber,
        account: string,
        errorMessage: string,
    ): Promise<void> {
        // We include a try-catch here because the Zeppelin 721 implementation
        // reverts on `ownerOf` if the token's owner is NULL_ADDRESS
        try {
            const tokenOwner = await debtTokenContract.ownerOf.callAsync(tokenID);
            const tokensApprovedAddress = await debtTokenContract.getApproved.callAsync(tokenID);
            const isApprovedForAll = await debtTokenContract.isApprovedForAll.callAsync(
                tokenOwner,
                account,
            );

            if (tokenOwner !== account && tokensApprovedAddress !== account && !isApprovedForAll) {
                throw new Error(errorMessage);
            }
        } catch (e) {
            throw new Error(errorMessage);
        }
    }

    public async canBeReceivedByAccountWithData(
        web3: Web3,
        tokenID: BigNumber,
        recipient: string,
        sender: string,
        data: string = "",
        errorMessage: string,
    ): Promise<void> {
        const utils = new Web3Utils(web3);
        const isRecipientContract = await utils.doesContractExistAtAddressAsync(recipient);

        // If a transfer recipient is a contract, it must implement the ERC721 Wallet interface
        if (isRecipientContract) {
            const EMPTY_TX_DEFAULTS = {};

            const erc721Receiver = await ERC721ReceiverContract.at(
                recipient,
                web3,
                EMPTY_TX_DEFAULTS,
            );

            // We check whether the recipient will accurately register a 721 interface
            // by sending a message call to onERC721Received method (which is not mined)
            // and seeing whether the call reverts.
            try {
                await erc721Receiver.onERC721Received.callAsync(sender, tokenID, data);
            } catch (e) {
                throw new Error(errorMessage);
            }
        }
    }
}
