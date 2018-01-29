import { AccountAssertions } from './account'
import Web3 from 'web3'

export class Assertions {
    public account: AccountAssertions
    private web3: Web3

    public constructor(web3: Web3) {
        this.web3 = web3

        this.account = new AccountAssertions(web3)
    }
}
