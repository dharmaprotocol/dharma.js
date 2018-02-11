# #!/bin/bash
#
# This script transforms raw JSON artifacts copied from the
# Dharma charta repo into Typescript modules.  This makes
# interacting with the artifacts significantly easier throughout
# the dharma.js library.

DHARMA_JS_REPO=`pwd`
ARTIFACTS_DIR=$DHARMA_JS_REPO/src/artifacts
LOGS=$DHARMA_JS_REPO/logs/json_transpilation_logs.txt

cd $ARTIFACTS_DIR

for filename in $ARTIFACTS_DIR/json/*.json; do
    filename_base=$(basename $filename .json)
    echo -e "export const $filename_base = " > "ts/$filename_base.ts"
    cat "json/$filename_base.json" >> "ts/$filename_base.ts"

    echo -e "Transpiled $filename_base.json into $filename_base.ts"
done
