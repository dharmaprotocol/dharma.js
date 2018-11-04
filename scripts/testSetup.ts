import * as Web3 from "web3";

import { Web3Utils } from "../utils/web3_utils";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

module.exports = async () => {
    console.log("\n\n* Test Setup *\n");

    const originSnapshot = await web3Utils.saveTestSnapshot();

    process.env.originSnapshot = originSnapshot.toString();

    console.log(`Saved origin snapshot with ID: ${originSnapshot}`);

    console.log("\n\n* Test Setup Complete *\n");
};
