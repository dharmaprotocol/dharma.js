<img src="https://s3-us-west-2.amazonaws.com/dharma-assets/logo+orange.png"  width=300/>

------------
### Hello, `dharma.js`!

This repository contains the `dharma.js` client application development libraries.  `dharma.js` makes it easy for developers who may not be deeply familiar with smart contract development to interact with the various components of Dharma protocol and build hyper-flexible lending applications.

Extensive documentation on the libraries can be found [here](https://docs.dharma.io).

For examples of how to integrate `dharma.js` into a client application, we recommend perusing the [Dharma React Starter Kit](https://github.com/dharmaprotocol/dharma-react-starter-kit) repository and playing around with the sample application

##### Installation & Setup:
```
yarn add @dharmaprotocol/dharma.js
```

##### Using ES6 style imports (recommended):
```javascript
import Dharma from "@dharmaprotocol/dharma.js"

const dharma = new Dharma(web3.currentProvider);
```


We recommend brushing up on the basics of Dharma protocol before diving in -- a non-techincal primer can be found [here](https://blog.dharma.io/dharma-protocol-in-a-nutshell-a7abcc716429).  For a deeper dive, study the [Dharma whitepaper](https://whitepaper.dharma.io).

[Join us on our chat](https://chat.dharma.io) for any technical or general questions.

> [Dharma](https://dharma.io) is a protocol for generic tokenized debt issuance and fundraising on blockchains supporting requisite smart contract functionality (i.e. EVM blockchains).  For a full description of the protocol's mechanics, a thorough overview can be found in the [Dharma Protocol Whitepaper](https://whitepaper.dharma.io/).  

**Happy Hacking!**

### Contributing
---------------
##### Dependencies

Install dependencies:
```
yarn
```

##### Compile & Migrate Contracts

Start `testrpc` and setup dependencies:
```
yarn chain
```
Wait until the `dependency migration complete` message appears before interacting with the contracts.

##### Testing
```
yarn test:watch
```

<a id="api_reference"></a>
## Dharma.js API Reference


* Dharma
  * [adapters](docs/classes/adapters.md)
    * [simpleInterestLoan](docs/classes/adapters.md#simpleinterestloan)
  * [blockchain](docs/classes/blockchain)
    * [awaitTransactionMinedAsync](docs/classes/blockchain.md#awaittransactionminedasync)
  * [contracts](docs/classes/contracts.md)
    * [getTokenAddressBySymbolAsync](docs/classes/contracts.md#gettokenaddressbysymbolasync)
    * [loadDebtKernelAsync](docs/classes/contracts.md#loaddebtkernelasync)
    * [loadDebtRegistryAsync](docs/classes/contracts.md#loaddebtregistryasync)
    * [loadDebtTokenAsync](docs/classes/contracts.md#loaddebttokenasync)
    * [loadDharmaContractsAsync](docs/classes/contracts.md#loaddharmacontractsasync)
    * [loadERC20TokenAsync](docs/classes/contracts.md#loaderc20tokenasync)
    * [loadRepaymentRouterAsync](docs/classes/contracts.md#loadrepaymentrouterasync)
    * [loadRepaymentRouterAtAsync](docs/classes/contracts.md#loadrepaymentrouteratasync)
    * [loadSimpleInterestTermsContract](docs/classes/contracts.md#loadsimpleinteresttermscontract)
    * [loadTermsContractAsync](docs/classes/contracts.md#loadtermscontractasync)
    * [loadTermsContractRegistry](docs/classes/contracts.md#loadtermscontractregistry)
    * [loadTokenBySymbolAsync](docs/classes/contracts.md#loadtokenbysymbolasync)
    * [loadTokenRegistry](docs/classes/contracts.md#loadtokenregistry)
    * [loadTokenTransferProxyAsync](docs/classes/contracts.md#loadtokentransferproxyasync)
  * [order](docs/classes/order.md)
    * [cancelIssuanceAsync](docs/classes/order.md#cancelissuanceasync)
    * [cancelOrderAsync](docs/classes/order.md#cancelorderasync)
    * [fillAsync](docs/classes/order.md#fillasync)
  * [servicing](docs/classes/servicing.md)
    * [getExpectedValueRepaid](docs/classes/servicing.md#getexpectedvaluerepaid)
    * [getValueRepaid](docs/classes/servicing.md#getvaluerepaid)
    * [makeRepayment](docs/classes/servicing.md#makerepayment)
  * [signer](docs/classes/signer.md)
    * [asCreditor](docs/classes/token.md#ascreditor)
    * [asDebtor](docs/classes/token.md#asdebtor)
    * [asUnderwriter](docs/classes/token.md#asunderwriter)
  * [token](docs/classes/token.md)
    * [getBalanceAsync](docs/classes/token.md#getbalanceasync)
    * [getProxyAllowanceAsync](docs/classes/token.md#getproxyallowanceasync)
    * [setProxyAllowanceAsync](docs/classes/token.md#setproxyallowanceasync)
    * [setUnlimitedProxyAllowanceAsync](docs/classes/token.md#setunlimitedproxyallowanceasync)
    * [transferAsync](docs/classes/token.md#transferasync)
    * [transferFromAsync](docs/classes/token.md#transferfromasync)
