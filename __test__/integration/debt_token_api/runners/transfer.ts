// Types
import { TransferFromScenarioRunner } from "./";
import { TransferAPICallParameters } from "./transfer_from";

export class TransferScenarioRunner extends TransferFromScenarioRunner {
    protected getAPICallPromise(params: TransferAPICallParameters): Promise<string> {
        const { api, to, tokenID, txOptions } = params;

        return api.transfer(to, tokenID, txOptions);
    }
}
