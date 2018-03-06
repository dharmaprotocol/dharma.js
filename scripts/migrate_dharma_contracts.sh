# #!/bin/bash
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NO_COLOR='\033[0m'

mkdir -p logs

DHARMA_JS_REPO=`pwd`
LOGS=$DHARMA_JS_REPO/logs/dharma_contract_migration.txt

DHARMA_SMART_CONTRACTS=$DHARMA_JS_REPO/node_modules/@dharmaprotocol/contracts

cd $DHARMA_SMART_CONTRACTS

sleep 3

echo -e "${CYAN}Installing Dharma contract deployment dependencies...${NO_COLOR}"
npm install >> $LOGS 2>&1
echo -e "\n"

echo -e "${CYAN}Running Dharma smart contract migrations...${NO_COLOR}"
npm run deploy:development >> $LOGS 2>&1
echo -e "\n"

echo -e "${CYAN}Transpiling newly generated artifacts for usage in the dharma.js repo...${NO_COLOR}"
npm run dist >> $LOGS 2>&1
echo -e "\n"

echo -e "${GREEN}Dependency contract migrations complete, test chain is ready for use!${NO_COLOR}"
echo -e "${GREEN}Artifacts for the contracts deployed to the test chain can be imported directly from the \
@dharmaprotocol/contracts package.${NO_COLOR}"
