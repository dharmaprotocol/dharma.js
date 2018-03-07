// utils
import * as Units from "utils/units";

import { GetValueRepaidScenario } from "./";

export const GET_VALUE_REPAID: GetValueRepaidScenario[] = [
    {
        description: "when one payment of 0.8 Ether has been made",
        amount: Units.ether(0.8),
        repaymentAttempts: 1,
        expected: Units.ether(0.8),
    },
    {
        description: "when two payments of 0.3 Ether have been made",
        amount: Units.ether(0.3),
        repaymentAttempts: 2,
        expected: Units.ether(0.6),
    },
    {
        description: "when no payments have been made",
        amount: Units.ether(0),
        repaymentAttempts: 0,
        expected: Units.ether(0),
    },
];
