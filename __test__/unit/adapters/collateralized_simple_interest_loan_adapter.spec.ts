// libraries
import * as Web3 from "web3";
import * as moment from "moment";

// utils
import { BigNumber } from "utils/bignumber";
import { ACCOUNTS } from "../../accounts";
import * as Units from "utils/units";
import { Web3Utils } from "utils/web3_utils";

// wrappers
import {
    DebtKernelContract,
    ERC20Contract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";

// types
import { DebtOrder, DebtRegistryEntry } from "src/types";

// adapters
import {
    CollateralizedSimpleInterestLoanAdapter,
    CollateralizedLoanTerms,
    CollateralizedAdapterErrors,
    CollateralizedTermsContractParameters,
    CollateralizedSimpleInterestLoanOrder,
} from "src/adapters/collateralized_simple_interest_loan_adapter";

import { ContractsAPI, ContractsError } from "src/apis/contracts_api";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);
const contracts = new ContractsAPI(web3);

const collateralizedSimpleInterestLoanAdapter = new CollateralizedSimpleInterestLoanAdapter(
    web3,
    contracts,
);
const collateralizedLoanTerms = new CollateralizedLoanTerms(web3, contracts);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Collateralized Simple Interest Terms Contract Interface (Unit Tests)", () => {
    let snapshotId: number;

    beforeEach(async () => {
        snapshotId = await web3Utils.saveTestSnapshot();
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(snapshotId);
    });
});
