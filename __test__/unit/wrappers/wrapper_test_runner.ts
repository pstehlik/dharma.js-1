// External libraries
// We use an unmocked version of "fs" in order to pull the correct
// contract address from our artifacts for testing purposes
import * as fs from "fs";
import * as promisify from "tiny-promisify";
import * as Web3 from "web3";
// Utils
import { Web3Utils } from "../../../utils/web3_utils";
// Wrapper errors
import { CONTRACT_WRAPPER_ERRORS } from "../../../src/wrappers/contract_wrappers/base_contract_wrapper";
// Accounts
import { ACCOUNTS } from "../../accounts";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

/**
 * An interface describing a contract wrapper that we would like to test.
 */
export interface WrapperTestObject {
    // E.g. ERC721TokenRegistry
    name: string;
    // E.g. ERC 721 Token Registry Contract
    displayName: string;
    // e.g. node_modules/@pstehlik/dharma-contracts/artifacts/json/ERC721TokenRegistry.json
    artifactPath: string;
    // E.g. ERC721TokenRegistryContract
    contract: any;
    // E.g. import { ERC721TokenRegistry } from "@pstehlik/dharma-contracts";
    artifact: any;
}

/**
 * A class that contains methods for testing the basics of a contract wrapper.
 *
 * @example
 * const runner = new WrapperTestRunner();
 * runner.testWrapper(wrapper);
 */
export class WrapperTestRunner {
    public testWrapper(wrapper: WrapperTestObject) {
        describe(`${wrapper.displayName} Wrapper (Unit)`, () => {
            let networkId: number;
            let contractAddress: string;
            let wrapperAbi: Web3.ContractAbi;

            beforeAll(async () => {
                networkId = await web3Utils.getNetworkIdAsync();

                const readFilePromise = promisify(fs.readFile);
                const artifact = await readFilePromise(wrapper.artifactPath);
                const { networks, abi } = JSON.parse(artifact);
                const { address } = networks[networkId];

                contractAddress = address;
                wrapperAbi = abi;
            });

            describe("#deployed()", () => {
                describe("no contract address associated w/ current network id", () => {
                    beforeAll(() => {
                        wrapper.artifact.mock(wrapperAbi, {});
                    });

                    test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                        await expect(
                            wrapper.contract.deployed(web3, TX_DEFAULTS),
                        ).rejects.toThrowError(
                            CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                                wrapper.name,
                                networkId,
                            ),
                        );
                    });
                });

                describe("contract address associated w/ current network id does not point to contract", () => {
                    beforeAll(async () => {
                        const mockNetworks = {};

                        mockNetworks[networkId] = {
                            address: ACCOUNTS[0].address,
                        };

                        wrapper.artifact.mock(wrapperAbi, mockNetworks);
                    });

                    test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                        await expect(
                            wrapper.contract.deployed(web3, TX_DEFAULTS),
                        ).rejects.toThrowError(
                            CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                                wrapper.name,
                                networkId,
                            ),
                        );
                    });
                });

                describe("local artifacts readable and contract address associated w/ network id is valid", () => {
                    beforeAll(async () => {
                        const mockNetworks = {};

                        mockNetworks[networkId] = {
                            address: contractAddress,
                        };

                        wrapper.artifact.mock(wrapperAbi, mockNetworks);
                    });

                    test(`returns new ${
                        wrapper.name
                    } wrapper w/ current address correctly set`, async () => {
                        const contractWrapper = await wrapper.contract.deployed(web3, TX_DEFAULTS);

                        expect(contractWrapper.address).toBe(contractAddress);
                        expect(contractWrapper.abi).toEqual(wrapperAbi);
                    });
                });
            });

            describe("#at()", () => {
                describe("contract address does not point to contract", () => {
                    beforeAll(async () => {
                        const mockNetworks = {};

                        mockNetworks[networkId] = {
                            address: ACCOUNTS[0].address,
                        };

                        wrapper.artifact.mock(wrapperAbi, mockNetworks);
                    });

                    test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                        await expect(
                            wrapper.contract.at(ACCOUNTS[0].address, web3, TX_DEFAULTS),
                        ).rejects.toThrowError(
                            CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                                wrapper.name,
                                networkId,
                            ),
                        );
                    });
                });

                describe("local artifacts readable and contract address associated w/ network id is valid", () => {
                    beforeAll(async () => {
                        const mockNetworks = {};

                        mockNetworks[networkId] = {
                            address: ACCOUNTS[0].address,
                        };

                        wrapper.artifact.mock(wrapperAbi, mockNetworks);
                    });

                    test(`returns new ${
                        wrapper.name
                    }Contract w/ current address correctly set`, async () => {
                        const contractWrapper = await wrapper.contract.at(
                            contractAddress,
                            web3,
                            TX_DEFAULTS,
                        );

                        expect(contractWrapper.address).toBe(contractAddress);
                        expect(contractWrapper.abi).toEqual(wrapperAbi);
                    });
                });
            });
        });
    }
}
