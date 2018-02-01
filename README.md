# Dharma.js (WIP)

## How to get up and running:

_Install dependencies:_
```bash
yarn
```

_Start `testrpc` and migrate Dharma contract dependencies_
```bash
yarn chain
```

**Wait until you see `Dependency contract migrations complete, test chain is ready for use!` before running tests.**

_Testing w/ hot-reloading_
```bash
yarn test:watch
```

## Troubleshooting

_Ensure watchman is updated_
```bash
brew uninstall watchman
brew install watchman
```
