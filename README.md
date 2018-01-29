# Dharma.js (WIP)

## How to get up and running:

_Install dependencies:_
```bash
yarn
```

_Separately, download Charta smart contracts and get them set up_
```bash
cd ../
git clone https://github.com/dharmaprotocol/charta.git
cd charta/

# Install dependencies
yarn

# Start local test blockchain and install local dependencies:
yarn chain
```

**Wait until you see `Dependency contract migrations complete, test chain is ready for use!` before running tests.**

Then, in the `dharma.js` repo:

_Testing w/ hot-reloading_
```bash
yarn test:watch
```
