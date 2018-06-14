import { ETHEREUM_ADDRESS_ERRORS, EthereumAddress } from "../../../src/types/ethereum_address";

describe("Ethereum Address (Unit)", () => {
    const valid = "0xdc4845b45c6c08f4ce4a8ef5e0493d8bf6158da0";
    const invalid = valid.substring(2, 42);

    describe("instantiation", () => {
        describe("when input is valid", () => {
            test("not throw", () => {
                const address = new EthereumAddress(valid);
                expect(address).not.toBeNull();
            });
        });

        describe("when input is invalid", () => {
            test("should throw", () => {
                try {
                    const address = new EthereumAddress(invalid);
                    // note: the below expectation will only be reached if the above constructor
                    // call succeeds -- which it shouldn't.
                    expect(true).toBe(false);
                } catch (e) {
                    expect(e.message).toEqual(ETHEREUM_ADDRESS_ERRORS.INVALID_ADDRESS(invalid));
                }
            });
        });
    });

    describe("#toString", () => {
        test("should return the the address in string form", () => {
            const instance = new EthereumAddress(valid);
            expect(instance.toString()).toEqual(valid);
        });
    });

    describe("#isValid", () => {
        describe("when input is valid", () => {
            test("should return true", () => {
                expect(EthereumAddress.isValid(valid)).toBeTruthy();
            });
        });

        describe("when input is invalid", () => {
            test("should return false", () => {
                expect(EthereumAddress.isValid(invalid)).toBeFalsy();
            });
        });
    });
});
