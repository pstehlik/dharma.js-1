// External
import * as Web3 from "web3";
// APIs
import { AdaptersAPI, ContractsAPI, OrderAPI, SignerAPI } from "src/apis";
// Scenarios
import { UNSUCCESSFUL_RETURN_COLLATERAL_SCENARIOS } from "./scenarios/unsuccessful_return_collateral_scenarios";

import { SUCCESSFUL_RETURN_COLLATERAL_SCENARIOS } from "./scenarios/successful_return_collateral_scenarios";

import { SUCCESSFUL_SEIZE_COLLATERAL_SCENARIOS } from "./scenarios/successful_seize_collateral_scenarios";

import { UNSUCCESSFUL_SEIZE_COLLATERAL_SCENARIOS } from "./scenarios/unsuccessful_seize_collateral_scenarios";
// Runners
import { ReturnCollateralRunner, SeizeCollateralRunner } from "./runners";

import { ERC721CollateralizedSimpleInterestLoanAdapter } from "../../../../src/adapters/erc721_collateralized_simple_interest/loan_adapter";

import { ServicingAPI, TokenAPI } from "../../../../src/apis";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);

// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@pstehlik/dharma-contracts");

describe("ERC721 Collateralized Simple Interest Loan Adapter (Integration Tests)", () => {
    const contractsApi = new ContractsAPI(web3);

    const adaptersApi = new AdaptersAPI(web3, contractsApi);

    const servicingApi = new ServicingAPI(web3, contractsApi);

    const adapter = new ERC721CollateralizedSimpleInterestLoanAdapter(web3, contractsApi);

    const orderApi = new OrderAPI(web3, contractsApi, adaptersApi);

    const signerApi = new SignerAPI(web3, contractsApi);

    const tokenApi = new TokenAPI(web3, contractsApi);

    const returnCollateralRunner = new ReturnCollateralRunner(web3, adapter, {
        orderApi,
        signerApi,
        servicingApi,
        contractsApi,
        tokenApi,
    });

    const seizeCollateralRunner = new SeizeCollateralRunner(web3, adapter, {
        orderApi,
        signerApi,
        servicingApi,
        contractsApi,
        tokenApi,
    });

    it("Note: this test suite (and feature set) has been temporarily deprecated");

    // Temporarily deprecating test suite for 721 because we're temporarily deprecating 721 collateralization
    // as a feature.

    // describe("#returnCollateral", () => {
    //     describe("Successful return of collateral", () => {
    //         SUCCESSFUL_RETURN_COLLATERAL_SCENARIOS.forEach(returnCollateralRunner.testScenario);
    //     });
    //
    //     describe("Unsuccessful attempt to return collateral", () => {
    //         UNSUCCESSFUL_RETURN_COLLATERAL_SCENARIOS.forEach(returnCollateralRunner.testScenario);
    //     });
    // });
    //
    // describe("#seizeCollateral", () => {
    //     describe("Successful seizure of collateral", () => {
    //         SUCCESSFUL_SEIZE_COLLATERAL_SCENARIOS.forEach(seizeCollateralRunner.testScenario);
    //     });
    //
    //     describe("Unsuccessful attempt to seize collateral", () => {
    //         UNSUCCESSFUL_SEIZE_COLLATERAL_SCENARIOS.forEach(seizeCollateralRunner.testScenario);
    //     });
    // });
});
