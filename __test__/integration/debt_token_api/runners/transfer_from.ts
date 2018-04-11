// Base Runner
import { TransferBaseScenarioRunner, TransferAPICallParameters } from "./transfer_base";

export class TransferFromScenarioRunner extends TransferBaseScenarioRunner {
    protected getAPICallPromise(params: TransferAPICallParameters): Promise<string> {
        const { api, from, to, tokenID, data, txOptions } = params;

        return api.transferFrom(from, to, tokenID, data, txOptions);
    }
}
