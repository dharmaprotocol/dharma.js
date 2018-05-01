// Utils
import { BigNumber } from "../../utils/bignumber";

import { TOKEN_REGISTRY_TRACKED_TOKENS } from "../../utils/constants";

export class Token {
    public readonly numDecimals: BigNumber;
    public readonly name: string;
    public readonly symbol: string;

    constructor(symbol: string) {
        this.symbol = symbol;

        const registryData = TOKEN_REGISTRY_TRACKED_TOKENS.find(
            (tokenObject) => tokenObject.symbol === symbol,
        );

        if (!registryData) {
            throw new Error("Cannot find token with given symbol in token registry");
        }

        this.numDecimals = new BigNumber(registryData.decimals);
        this.name = registryData.name;
    }
}
