import * as Web3 from "web3";
import { Web3Utils } from "../../utils/web3_utils";
import { ContractsAPI } from "./";
import { BigNumber } from "bignumber.js";
import { TxData } from "../types";

const TRANSFER_GAS_MAXIMUM = 70000;

export class TokenAPI {
    private web3: Web3;
    private contracts: ContractsAPI;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3 = web3;
        this.contracts = contracts;
    }

    /**
     * Asynchronously transfer value denominated in the specified ERC20 token to
     * the address specified.
     *
     * @param  tokenAddress the address of the token being used.
     * @param  to           to whom the transfer is being made.
     * @param  value        the amount being transferred.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    public async transferAsync(
        tokenAddress: string,
        to: string,
        value: BigNumber,
        options?: TxData,
    ): Promise<string> {
        const transactionOptions = await this.getTxDefaultOptions();

        Object.assign(transactionOptions, options);

        const tokenContract = await this.contracts.loadERC20TokenAsync(tokenAddress);

        return tokenContract.transfer.sendTransactionAsync(to, value, transactionOptions);
    }

    /**
     * Asynchronously transfer the value amount in the token specified so long
     * as the sender of the message has received sufficient allowance on behalf
     * of `from` to do so.
     *
     * @param  tokenAddress the address of the token being used.
     * @param  from         from whom are the funds being transferred.
     * @param  to           to whom are the funds being transferred.
     * @param  value        the amount to be transferred.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    public async transferFromAsync(
        tokenAddress: string,
        from: string,
        to: string,
        value: BigNumber,
        options?: TxData,
    ): Promise<string> {
        const transactionOptions = await this.getTxDefaultOptions();

        Object.assign(transactionOptions, options);

        const tokenContract = await this.contracts.loadERC20TokenAsync(tokenAddress);

        return tokenContract.transferFrom.sendTransactionAsync(from, to, value, transactionOptions);
    }

    /**
     * Asynchronously retrieve the balance of tokens for the owner specified.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  ownerAddress address of the owner for whom the balance is being requested.
     * @return              the number of tokens the owner is holding.
     */
    public async getBalanceAsync(tokenAddress: string, ownerAddress: string): Promise<BigNumber> {
        const tokenContract = await this.contracts.loadERC20TokenAsync(tokenAddress);

        return tokenContract.balanceOf.callAsync(ownerAddress);
    }

    /**
     * Asynchronously set a proxy allowance.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  allowance    the size of the allowance.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    public async setProxyAllowanceAsync(
        tokenAddress: string,
        allowance: BigNumber,
        options?: TxData,
    ): Promise<string> {
        const transactionOptions = await this.getTxDefaultOptions();

        Object.assign(transactionOptions, options);

        const tokenContract = await this.contracts.loadERC20TokenAsync(tokenAddress);
        const tokenTransferProxy = await this.contracts.loadTokenTransferProxyAsync();

        return tokenContract.approve.sendTransactionAsync(
            tokenTransferProxy.address,
            allowance,
            transactionOptions,
        );
    }

    /**
     * Asynchronously set an unlimited proxy allowance.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    public async setUnlimitedProxyAllowanceAsync(
        tokenAddress: string,
        options?: TxData,
    ): Promise<string> {
        // We set an allowance to be "unlimited" by setting it to
        // it's maximum possible value -- namely, 2^256 - 1.
        const unlimitedAllowance = new BigNumber(2).pow(256).sub(1);

        return this.setProxyAllowanceAsync(tokenAddress, unlimitedAllowance, options);
    }

    /**
     * Asynchronously determine the proxy allowance for a specified address.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  ownerAddress the address of the owner whose allowance we're querying.
     * @return              the allowance allotted to the owner specified.
     */
    public async getProxyAllowanceAsync(
        tokenAddress: string,
        ownerAddress: string,
    ): Promise<BigNumber> {
        const tokenContract = await this.contracts.loadERC20TokenAsync(tokenAddress);
        const tokenTransferProxy = await this.contracts.loadTokenTransferProxyAsync();

        return tokenContract.allowance.callAsync(ownerAddress, tokenTransferProxy.address);
    }

    private async getTxDefaultOptions(): Promise<object> {
        const web3Utils = new Web3Utils(this.web3);

        const accounts = await web3Utils.getAvailableAddressesAsync();

        // TODO: Add fault tolerance to scenario in which not addresses are available

        return {
            from: accounts[0],
            gas: TRANSFER_GAS_MAXIMUM,
        };
    }
}
