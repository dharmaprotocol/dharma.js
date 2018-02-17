<img src="https://s3-us-west-2.amazonaws.com/dharma-assets/logo+orange.png"  width=300/>

------------
### Hello, `dharma.js`!

This repository contains the `dharma.js` client application development libraries.  `dharma.js` makes it easy for developers who may not be deeply familiar with smart contract development to interact with the various components of Dharma protocol and build hyper-flexible lending applications.

Extensive documentation on the libraries can be found [here](#).

For examples of how to integrate `dharma.js` into a client application, we recommend perusing the [Dharma React Starter Kit](https://github.com/dharmaprotocol/dharma-react-starter-kit) repository and playing around with the sample application.

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
