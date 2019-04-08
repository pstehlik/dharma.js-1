/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from "../../types";
import * as promisify from "tiny-promisify";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { BigNumber } from "../../../utils/bignumber";
import { SimpleInterestTermsContract as ContractArtifacts } from "@pstehlik/dharma-contracts";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class SimpleInterestTermsContractContract extends BaseContract {
    public unpackParameters = {
        async callAsync(
            parameters: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[BigNumber, BigNumber, BigNumber]> {
            const self = this as SimpleInterestTermsContractContract;
            const result = await promisify<[BigNumber, BigNumber, BigNumber]>(
                self.web3ContractInstance.unpackParameters.call,
                self.web3ContractInstance,
            )(parameters);
            return result;
        },
    };
    public HOUR_BLOCK_LENGTH = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as SimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.HOUR_BLOCK_LENGTH.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public getAmortizationUnitLengthInBlocks = {
        async callAsync(
            amortizationUnitType: number | BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as SimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getAmortizationUnitLengthInBlocks.call,
                self.web3ContractInstance,
            )(amortizationUnitType);
            return result;
        },
    };
    public registerRepayment = {
        async sendTransactionAsync(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as SimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.registerRepayment.estimateGasAsync.bind(
                    self,
                    agreementId,
                    payer,
                    beneficiary,
                    unitsOfRepayment,
                    tokenAddress,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.registerRepayment,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, unitsOfRepayment, tokenAddress, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as SimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.registerRepayment.estimateGas,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, unitsOfRepayment, tokenAddress, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): string {
            const self = this as SimpleInterestTermsContractContract;
            const abiEncodedTransactionData = self.web3ContractInstance.registerRepayment.getData();
            return abiEncodedTransactionData;
        },
    };
    public getExpectedRepaymentValue = {
        async callAsync(
            issuanceHash: string,
            timestamp: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<string> {
            const self = this as SimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getExpectedRepaymentValue.call,
                self.web3ContractInstance,
            )(issuanceHash, timestamp);
            return result;
        },
    };
    public MONTH_BLOCK_LENGTH = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as SimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.MONTH_BLOCK_LENGTH.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public YEAR_BLOCK_LENGTH = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as SimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.YEAR_BLOCK_LENGTH.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public DAY_BLOCK_LENGTH = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as SimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.DAY_BLOCK_LENGTH.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public WEEK_BLOCK_LENGTH = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as SimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.WEEK_BLOCK_LENGTH.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public getValueRepaid = {
        async callAsync(
            agreementId: string,
            blockNumber: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as SimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getValueRepaid.call,
                self.web3ContractInstance,
            )(agreementId, blockNumber);
            return result;
        },
    };

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    public static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<SimpleInterestTermsContractContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new SimpleInterestTermsContractContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "SimpleInterestTermsContract",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "SimpleInterestTermsContract",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<SimpleInterestTermsContractContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new SimpleInterestTermsContractContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "SimpleInterestTermsContract",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
