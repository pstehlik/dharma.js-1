import { Dharma, Web3 } from "../../../src";

jest.unmock("@pstehlik/dharma-contracts");

import { VALID_DEBT_ORDER_PARAMS } from "./scenarios/valid_debt_order_params";

import { testAcceptAsDebtor } from "./runners/accept_as_debtor";
import { testAcceptAsProxy } from "./runners/accept_as_proxy";
import { testCreate } from "./runners/create";
import { testCreateAndSignAsCreditor } from "./runners/create_and_sign_as_creditor";
import { testSignAsCreditor } from "./runners/sign_as_creditor";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const dharma = new Dharma(provider);

describe("Loan Request (Integration)", () => {
    describe("#create", async () => {
        await testCreate(dharma, VALID_DEBT_ORDER_PARAMS);
    });

    describe("#signAsCreditor", async () => {
        await testSignAsCreditor(dharma, VALID_DEBT_ORDER_PARAMS);
    });

    describe("#createAndSignAsCreditor", async () => {
        await testCreateAndSignAsCreditor(dharma, VALID_DEBT_ORDER_PARAMS);
    });

    describe("#acceptAsDebtor", async () => {
        await testAcceptAsDebtor(dharma, VALID_DEBT_ORDER_PARAMS);
    });

    describe("#acceptAsProxy", async () => {
        await testAcceptAsProxy(dharma, VALID_DEBT_ORDER_PARAMS);
    });
});
