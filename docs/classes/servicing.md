[dharma.js](../../README.md#api_reference) > Servicing

# Class: ServicingAPI

## Index

### Methods

* [getExpectedValueRepaid](#getexpectedvaluerepaid)
* [getValueRepaid](#getvaluerepaid)
* [makeRepayment](#makerepayment)


---


## Methods
<a id="getexpectedvaluerepaid"></a>

###  getExpectedValueRepaid

► **getExpectedValueRepaid**(issuanceHash: *`string`*, timestamp: *`number`*): `Promise`.<`BigNumber`>






Asynchronously determine the expected value of repayments at a given point in time for a given debt agreement.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| issuanceHash | `string`   |  the hash of a debt agreement. |
| timestamp | `number`   |  the point in time at which the expected value is to be calculated. |





**Returns:** `Promise`.<`BigNumber`>
the expected value of repayments at the point in time specified.






___

<a id="getvaluerepaid"></a>

###  getValueRepaid

► **getValueRepaid**(issuanceHash: *`string`*): `Promise`.<`BigNumber`>






Asynchronously retrieve the amount that has been repaid to date towards a debt agreement.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| issuanceHash | `string`   |  the hash of the debt agreement. |





**Returns:** `Promise`.<`BigNumber`>
the amount that has been repaid to date.






___

<a id="makerepayment"></a>

###  makeRepayment

► **makeRepayment**(issuanceHash: *`string`*, amount: *`BigNumber`*, tokenAddress: *`string`*, options?: *`TxData`*): `Promise`.<`string`>






Asynchronously issue a repayment towards a debt agreement.

Note that the address of whoever is making the repayment must allot a sufficient allowance (equal to or greater than the amount specified in this call) to the `tokenTransferProxy` in order for this transaction to succeed.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| issuanceHash | `string`   |  the hash of the issuance to which the repayment is being made. |
| amount | `BigNumber`   |  the amount that is being repaid. |
| tokenAddress | `string`   |  the address of the token in which the repayment is being made. |
| options | `TxData`   |  any parameters necessary to modify the transaction. |





**Returns:** `Promise`.<`string`>
the hash of the resulting transaction.






___
