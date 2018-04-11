// Base Runner
import { TransferBaseScenarioRunner, TransferAPICallParameters } from "./transfer_base";

export class TransferScenarioRunner extends TransferBaseScenarioRunner {
    protected getAPICallPromise(params: TransferAPICallParameters): Promise<string> {
        const { api, to, tokenID, txOptions } = params;

        return api.transfer(to, tokenID, txOptions);
    }
}
