import * as Web3 from "web3";

export class MockContract {
    public static abi: Web3.AbiDefinition[];
    public static networks: object;

    public static mock(abi: Web3.AbiDefinition[], networks: object) {
        MockContract.abi = abi;
        MockContract.networks = networks;
    }
}
