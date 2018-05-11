import { Adapter, conformsToAdapterInterface } from "../adapters";

export class AdapterAssertions {
    public conformsToInterface(object: any, errorMessage: string): void {
        if (!conformsToAdapterInterface(object)) {
            throw new Error(errorMessage);
        }
    }
}
