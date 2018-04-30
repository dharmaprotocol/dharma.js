// External Libraries
import * as _ from "lodash";

// Utils
import { BigNumber } from "../../utils/bignumber";
import { TOKEN_REGISTRY_TRACKED_TOKENS } from "../../utils/constants";

export class Token {
    public readonly address: string;
    public readonly decimals: BigNumber;
    public readonly name: string;
    public readonly symbol: string;

    constructor(symbol: string) {
        this.symbol = symbol;

        const token = _.find(
            TOKEN_REGISTRY_TRACKED_TOKENS,
            (tokenObject) => tokenObject.symbol === symbol,
        );

        if (!token) {
            throw new Error("Cannot find token with given symbol in token registry");
        }

        this.address = token.address;
        this.decimals = new BigNumber(token.decimals);
        this.name = token.name;
    }
}
