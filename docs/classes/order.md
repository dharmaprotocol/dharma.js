[dharma.js](../../README.md) > Order

# Class: OrderAPI

## Index

### Methods

* [cancelIssuanceAsync](_order_api_.orderapi.md#cancelissuanceasync)
* [cancelOrderAsync](_order_api_.orderapi.md#cancelorderasync)
* [fillAsync](_order_api_.orderapi.md#fillasync)


---


## Methods
<a id="cancelissuanceasync"></a>

###  cancelIssuanceAsync

► **cancelIssuanceAsync**(issuanceCommitment: *`IssuanceCommitment`*, transactionOptions: *`TxData`*): `Promise`.<`string`>






**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| issuanceCommitment | `IssuanceCommitment`   |  - |
| transactionOptions | `TxData`   |  - |





**Returns:** `Promise`.<`string`>





___

<a id="cancelorderasync"></a>

###  cancelOrderAsync

► **cancelOrderAsync**(debtOrder: *`DebtOrder`*, options?: *`TxData`*): `Promise`.<`string`>






Asynchronously cancel a debt order if it has yet to be fulfilled.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| debtOrder | `DebtOrder`   |  the debt order to be canceled. |
| options | `TxData`   |  any params needed to modify the Ethereum transaction. |





**Returns:** `Promise`.<`string`>
the hash of the resulting Ethereum transaction.






___

<a id="fillasync"></a>

###  fillAsync

► **fillAsync**(debtOrder: *`DebtOrder`*, options?: *`TxData`*): `Promise`.<`string`>






Asynchronously fills a signed debt order.

If the order fills successfully, the creditor will be debited the principal amount, the debtor will receive the principal, and the underwriter and the relayer will receive their transaction fees (if applicable).

The debt order must be signed by all relevant parties and the associated data must be valid in order for the order to be fulfilled.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| debtOrder | `DebtOrder`   |  a valid, signed debt order. |
| options | `TxData`   |  any params needed to modify the Ethereum transaction. |





**Returns:** `Promise`.<`string`>
the hash of the ethereum transaction that fulfilled the debt order.






___
