import Web3 from 'web3'
import { OrderSigner } from './order_signer'
import { DebtOrder } from './types'

export default class Dharma {
    public sign: OrderSigner
    private web3: Web3

    constructor(web3Provider: Web3.Provider) {
        this.web3 = new Web3(web3Provider)

        this.sign = new OrderSigner(this.web3)
    }

    async fillDebtOrder(debtOrder: DebtOrder): Promise<string> {
        // something
        return ''
    }
}
