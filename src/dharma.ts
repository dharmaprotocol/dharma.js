import Web3 from 'web3'
import { SignerAPI } from './apis/signer_api'

export default class Dharma {
    public sign: SignerAPI
    private web3: Web3

    constructor(web3Provider: Web3.Provider) {
        this.web3 = new Web3(web3Provider)

        this.sign = new SignerAPI(this.web3)
    }
}
