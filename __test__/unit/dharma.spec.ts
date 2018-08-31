import * as Web3 from "web3";

import { Dharma, DharmaInstantiationErrors, MAXIMUM_MAJOR_VERSION } from "../../src/dharma";

describe("Dharma (Unit)", () => {
    describe("instantiation", () => {
        describe("when web3 is passed in", () => {
            describe("when web3 instance of the correct version is passed in", () => {
                test("successfully instantiates Dharma.js", () => {
                    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

                    const dharma = new Dharma(web3);

                    expect(dharma).toBeInstanceOf(Dharma);
                    expect(dharma.web3).toBe(web3);
                });
            });

            describe(`when web3 instance of major version > ${MAXIMUM_MAJOR_VERSION} is passed in`, () => {
                test("throws", () => {
                    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

                    web3.version = "1.0.0";

                    expect(() => new Dharma(web3)).toThrow(
                        DharmaInstantiationErrors.WEB3_VERSION_INCOMPATIBLE,
                    );
                });
            });
        });

        describe("when blockchain host is passed in", () => {
            describe("when correctly formatted blockchain host is passed in", () => {
                test("successfully instantiates Dharma.js", () => {
                    const dharma = Dharma.initializeWithNode("http://localhost:8545");

                    expect(dharma).toBeInstanceOf(Dharma);
                });
            });

            describe("when incorrectly formatted blockchain host is passed in", () => {
                test("throws", () => {
                    expect(() => Dharma.initializeWithNode("a random string")).toThrow();
                });
            });
        });

        describe("when no parameter is passed in", () => {
            describe("when a web3 instance is present on the window", () => {
                let web3: Web3;

                beforeAll(() => {
                    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

                    (global as any).web3 = web3;
                });

                afterAll(() => {
                    (global as any).web3 = null;
                });

                test("successfully instantiates Dharma.js", () => {
                    const dharma = Dharma.initialize();

                    expect(dharma).toBeInstanceOf(Dharma);
                    expect(dharma.web3).toBe(Web3);
                });
            });

            describe("when a web3 instance is not present on the window", () => {
                test("throws", () => {
                    expect(() => Dharma.initialize()).toThrow(
                        DharmaInstantiationErrors.WEB3_NOT_FOUND_ON_WINDOW,
                    );
                });
            });
        });
    });
});
