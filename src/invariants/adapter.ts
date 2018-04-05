import { Adapter } from "../adapters";

export class AdapterAssertions {
    public conformsToInterface(object: any, errorMessage: string): void {
        if (!Adapter.conformsToAdapterInterface(object)) {
            throw new Error(errorMessage);
        }
    }
}
