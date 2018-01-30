# #!/bin/bash
CHARTA_REPO=`pwd`

bash $CHARTA_REPO/scripts/migrate_dharma_contracts.sh &

ganache-cli --networkId 70 --accounts 20 --mnemonic 'arm impose enemy alpha bird attend hunt host town sleep charge catalog'
