// Debt Order
import { DebtOrderParams } from "../../../../src/debt_order";

// Types
import { Address, InterestRate, TimeInterval, TokenAmount } from "../../../../src/types";

// Test utils
import { ACCOUNTS } from "../../../accounts";

const debtor = ACCOUNTS[1];

export const DEBT_ORDERS: DebtOrderParams[] = [
    {
        principal: new TokenAmount(5, "REP"),
        collateral: new TokenAmount(10, "WETH"),
        interestRate: new InterestRate(12.3),
        termLength: new TimeInterval(6, "months"),
        debtorAddress: new Address(debtor.address),
        expiresIn: new TimeInterval(5, "days"),
    },
];
