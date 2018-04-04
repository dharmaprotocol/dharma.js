import { BaseAdapter } from "../adapters";

export class AdapterAssertions {
    public conformsToInterface(object: any, errorMessage: string): void {
        if (!BaseAdapter.conformsToAdapterInterface(object)) {
            throw new Error(errorMessage);
        }
    }
}
