import Web3 from 'web3'
import { SignerAPI } from './apis/signer_api'
import { OrderAPI } from './apis/order_api'

export default class Dharma {
    public sign: SignerAPI
    public order: OrderAPI
    private web3: Web3

    constructor(web3Provider: Web3.Provider) {
        this.web3 = new Web3(web3Provider)

        this.sign = new SignerAPI(this.web3)
        this.order = new OrderAPI(this.web3)
    }
}
