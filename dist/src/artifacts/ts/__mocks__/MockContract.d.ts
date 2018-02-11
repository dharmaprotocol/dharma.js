import * as Web3 from "web3";
export declare class MockContract {
    static abi: Web3.AbiDefinition[];
    static networks: object;
    static mock(abi: Web3.AbiDefinition[], networks: object): void;
}
