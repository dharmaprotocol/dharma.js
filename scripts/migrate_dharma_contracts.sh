# #!/bin/bash
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

mkdir -p logs

CHARTA_REPO=`pwd`
LOGS=$CHARTA_REPO/logs/dharma_contract_migration.txt

DHARMA_SMART_CONTRACTS=$CHARTA_REPO/node_modules/charta

cd $DHARMA_SMART_CONTRACTS

sleep 3

echo -e "${CYAN}Installing Dharma contract deployment dependencies...${NO_COLOR}"
npm install > $LOGS 2>&1
echo -e "\n"

echo -e "${CYAN}Compiling Dharma smart contracts...${NO_COLOR}"
npm run compile > $LOGS 2>&1
echo -e "\n"

echo -e "${CYAN}Running Dharma smart contract migrations...${NO_COLOR}"
truffle migrate > $LOGS 2>&1
echo -e "\n"

cd build/contracts/

echo -e "${CYAN}Copying Dharma smart contract artifacts to local artifacts folder...${NO_COLOR}"
for f in "DebtKernel.json" "DebtToken.json" "TokenTransferProxy.json" "DummyToken.json" "TokenRegistry.json" \
    "ERC20.json" "RepaymentRouter.json" "SimpleInterestTermsContract.json" "TermsContractRegistry.json"; do cp -- "$f" "$CHARTA_REPO/src/artifacts/$f"; done

echo -e "${CYAN}Dependency contract migrations complete, test chain is ready for use!${NO_COLOR}"
