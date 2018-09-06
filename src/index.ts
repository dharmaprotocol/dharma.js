/***********
 *  Utils  *
 ***********/

// Allows the user to instantiate the correct version of BigNumber.js without
// needing to add version 5.0.0 to their project.
export { BigNumber } from "../utils/bignumber";

// Allow users to specify enhanced web3 configuration options that are compatible with
// our version of web3.
export import Web3ProviderEngine = require("web3-provider-engine");

/***********
 *  Types  *
 ***********/

export { Dharma } from "./types/dharma";
