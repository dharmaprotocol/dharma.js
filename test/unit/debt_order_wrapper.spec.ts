import { BigNumber } from 'bignumber.js'
import { DebtOrderWrapper } from 'src/wrappers'
import * as Units from 'utils/units'
import moment from 'moment'
import Web3Utils from 'web3-utils'

import { ACCOUNTS } from '../accounts'

let debtOrderWrapper: DebtOrderWrapper

// For the unit test's purposes, we use arbitrary
// addresses for all debt order fields that expect addresses.
let debtOrder = {
    kernelVersion: ACCOUNTS[0].address,
    issuanceVersion: ACCOUNTS[1].address,
    principalAmount: Units.ether(1),
    principalToken: ACCOUNTS[2].address,
    debtor: ACCOUNTS[3].address,
    debtorFee: Units.ether(0.001),
    creditor: ACCOUNTS[4].address,
    creditorFee: Units.ether(0.001),
    relayer: ACCOUNTS[5].address,
    relayerFee: Units.ether(0.001),
    underwriter: ACCOUNTS[6].address,
    underwriterFee: Units.ether(0.001),
    underwriterRiskRating: Units.percent(0.001),
    termsContract: ACCOUNTS[7].address,
    termsContractParameters: ACCOUNTS[8].address,
    expirationTimestampInSec: new BigNumber(moment().seconds()),
    salt: new BigNumber(0)
}

describe('Debt Order Wrapper (Unit Tests)', () => {
    beforeAll(() => {
        debtOrderWrapper = new DebtOrderWrapper(debtOrder)
    })

    describe('#getIssuanceCommitment', () => {
        test('returna correct subset of debt order as defined in whitepaper', () => {
            expect(debtOrderWrapper.getIssuanceCommitment()).toEqual({
                issuanceVersion: debtOrder.issuanceVersion,
                debtor: debtOrder.debtor,
                underwriter: debtOrder.underwriter,
                underwriterRiskRating: debtOrder.underwriterRiskRating,
                termsContract: debtOrder.termsContract,
                termsContractParameters: debtOrder.termsContractParameters,
                salt: debtOrder.salt
            })
        })
    })

    describe('#getIssuanceCommitmentHash', () => {
        test('returns correctly hashed issuance commitment as defined in whitepaper', () => {
            expect(debtOrderWrapper.getIssuanceCommitmentHash()).toBe(
                Web3Utils.soliditySha3(
                    debtOrder.issuanceVersion,
                    debtOrder.debtor,
                    debtOrder.underwriter,
                    debtOrder.underwriterRiskRating,
                    debtOrder.termsContract,
                    debtOrder.termsContractParameters,
                    debtOrder.salt
                )
            )
        })
    })

    describe('#getHash', () => {
        test('returns correctly hashed debt order as defined in whitepaper', () => {
            expect(debtOrderWrapper.getHash()).toBe(
                Web3Utils.soliditySha3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySha3(
                        debtOrder.issuanceVersion,
                        debtOrder.debtor,
                        debtOrder.underwriter,
                        debtOrder.underwriterRiskRating,
                        debtOrder.termsContract,
                        debtOrder.termsContractParameters,
                        debtOrder.salt
                    ),
                    debtOrder.underwriterFee,
                    debtOrder.principalAmount,
                    debtOrder.principalToken,
                    debtOrder.debtorFee,
                    debtOrder.creditorFee,
                    debtOrder.relayer,
                    debtOrder.relayerFee,
                    debtOrder.expirationTimestampInSec
                )
            )
        })
    })

    describe('#getDebtAgreementId', () => {
        test('returns issuance commitment hash cast to BigNumber', () => {
            expect(debtOrderWrapper.getDebtAgreementId()).toEqual(
                new BigNumber(debtOrderWrapper.getHash())
            )
        })
    })

    describe('#getDebtorCommitmentHash', () => {
        test('returns #getHash alias', () => {
            expect(debtOrderWrapper.getDebtorCommitmentHash()).toBe(debtOrderWrapper.getHash())
        })
    })

    describe('#getCreditorCommitmentHash', () => {
        test('returns #getHash alias', () => {
            expect(debtOrderWrapper.getCreditorCommitmentHash()).toBe(debtOrderWrapper.getHash())
        })
    })

    describe('#getUnderwriterCommitmentHash', () => {
        test('returns correctly hashed underwriter commitment as defined in whitepaper', () => {
            expect(debtOrderWrapper.getUnderwriterCommitmentHash()).toEqual(
                Web3Utils.soliditySha3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySha3(
                        debtOrder.issuanceVersion,
                        debtOrder.debtor,
                        debtOrder.underwriter,
                        debtOrder.underwriterRiskRating,
                        debtOrder.termsContract,
                        debtOrder.termsContractParameters,
                        debtOrder.salt
                    ),
                    debtOrder.underwriterFee,
                    debtOrder.principalAmount,
                    debtOrder.principalToken,
                    debtOrder.expirationTimestampInSec
                )
            )
        })
    })
})
