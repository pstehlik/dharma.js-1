import { Investment } from "./investment";

import { ExpandedLoanData } from "./loan";

import { Dharma } from "../";

/**
 * Describes a collection of investments and provides functionality for managing such a collection.
 */
export class Investments {
    /**
     * Retrieves a collection of investments that belong to the specified owner.
     *
     * @returns {Promise<Investment[]>}
     */
    public static async get(dharma: Dharma, owner: string): Promise<Investment[]> {
        const agreementIds = await dharma.servicing.getInvestmentsAsync(owner);

        return Promise.all(
            agreementIds.map(async (agreementId) => {
                return Investment.fetch<Investment>(dharma, agreementId);
            }),
        );
    }

    public static async getExpandedData(
        dharma: Dharma,
        owner: string,
    ): Promise<ExpandedLoanData[]> {
        const investments = await Investments.get(dharma, owner);

        return Promise.all(
            investments.map(async (investment) => {
                return investment.getExpandedData();
            }),
        );
    }
}
