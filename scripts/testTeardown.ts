import * as Web3 from "web3";

import { Web3Utils } from "../utils/web3_utils";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

module.exports = async () => {
    console.log("\n\n* Test Teardown *\n");

    const originSnapshotString = process.env.originSnapshot;
    const originSnapshot = parseInt(originSnapshotString, 10);

    if (originSnapshotString && originSnapshot >= 0) {
        await web3Utils.revertToSnapshot(originSnapshot);
        console.log(`Reset blockchain to snapshot with ID: ${originSnapshot}`);
    }

    console.log("\n\n* Test Teardown Complete *\n");
};
