import * as Web3 from "web3";

import { Dharma } from "../../src/dharma";

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

            describe("when web3 instance of an incorrect version is passed in with the 1.x.x structure", () => {
                test("throws", () => {
                    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

                    web3.version = "1.0.0";

                    expect(() => new Dharma(web3)).toThrow();
                });
            });

            describe("when web3 instance of an incorrect version is passed in with the 0.x.x structure", () => {
                test("throws", () => {
                    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

                    web3.version.api = `${web3.version.api}0`;

                    expect(() => new Dharma(web3)).toThrow();
                });
            });
        });

        describe("when blockchain host is passed in", () => {
            describe("when correctly formatted blockchain host is passed in", () => {
                test("successfully instantiates Dharma.js", () => {
                    const dharma = Dharma.withBlockchainHost("http://localhost:8545");

                    expect(dharma).toBeInstanceOf(Dharma);
                });
            });

            describe("when incorrectly formatted blockchain host is passed in", () => {
                test("throws", () => {
                    expect(() => Dharma.withBlockchainHost("a random string")).toThrow();
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
                    const dharma = new Dharma();

                    expect(dharma).toBeInstanceOf(Dharma);
                    expect(dharma.web3).toBeInstanceOf(Web3);
                });
            });

            describe("when a web3 instance is not present on the window", () => {
                test("throws", () => {
                    expect(() => new Dharma()).toThrow();
                });
            });
        });
    });
});
