<img src="https://s3-us-west-2.amazonaws.com/dharma-assets/logo+orange.png"  width=300/>

# NOTE: `dharma.js` is deprecated and no longer in active maintenance.  Please email support@dharma.io if you have any questions or concerns 

------------
## Hello, `dharma.js`!

[![CircleCI](https://circleci.com/gh/dharmaprotocol/dharma.js/tree/master.svg?style=svg)](https://circleci.com/gh/dharmaprotocol/dharma.js/tree/master)

This repository contains the `dharma.js` client application development libraries.  `dharma.js` makes it easy for developers who may not be deeply familiar with smart contract development to interact with the various components of Dharma protocol and build hyper-flexible lending applications.

For more information, please check out the [Dharma Developer Portal](https://developer.dharma.io).

## Getting Started with Dharma.js

### Installing Dharma.js

Add Dharma.js to your project using yarn:

```bash
yarn add @dharmaprotocol/dharma.js
```

Alternatively, add Dharma.js to your project using npm:

```bash
npm install @dharmaprotocol/dharma.js --save
```

### Importing Dharma.js

Include Dharma.js in your project code using ES6 style imports (recommended):

```javascript
import { Dharma } from "@dharmaprotocol/dharma.js";
```

Alternatively, include Dharma.js in your project code using _require_ syntax:

```javascript
const { Dharma } = require("@dharmaprotocol/dharma.js");
```

### Instantiating Dharma.js

In order to instantiate Dharma.js, you need to specify a web3 provider.

The web3 provider can either be instantiated directly, or pulled from the browser's window object.

#### Instantiating the web3 provider directly

You'll want to instantiate a web3 provider directly if you're:

- running Dharma.js on a backend
- working with a local blockchain

You'll first import Dharma and Web3 from the Dharma.js package:

```javascript
import { Dharma, Web3 } from "@dharmaprotocol/dharma.js";
```

Assuming you're running a local blockchain on localhost port 8545, you'd specify the provider as follows:

```javascript
const host = "http://localhost:8545";
const provider = new Web3.providers.HttpProvider(host);
```

You'd then pass the above provider to the Dharma constructor, using JavaScript's `new` operator to construct an instance of Dharma connected to your local blockchain:

```javascript
const dharma = new Dharma(provider);
```

#### Pulling the web3 provider off the browser's window object

If the user is interacting with your dApp via a web3 wallet (e.g., MetaMask, Coinbase Wallet, etc.), you can pull the web3 provider from the browser's window object and pass that to the Dharma constructor:

```javascript
const provider = window.web3.currentProvider;

const dharma = new Dharma(provider);
```
