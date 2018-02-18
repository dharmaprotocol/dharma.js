[dharma.js](../../README.md#api_reference) > Token


# Class: TokenAPI

### Methods

* [getBalanceAsync](_token_api_.tokenapi.md#getbalanceasync)
* [getProxyAllowanceAsync](_token_api_.tokenapi.md#getproxyallowanceasync)
* [setProxyAllowanceAsync](_token_api_.tokenapi.md#setproxyallowanceasync)
* [setUnlimitedProxyAllowanceAsync](_token_api_.tokenapi.md#setunlimitedproxyallowanceasync)
* [transferAsync](_token_api_.tokenapi.md#transferasync)
* [transferFromAsync](_token_api_.tokenapi.md#transferfromasync)

---

## Methods
<a id="getbalanceasync"></a>

###  getBalanceAsync

► **getBalanceAsync**(tokenAddress: *`string`*, ownerAddress: *`string`*): `Promise`.<`BigNumber`>






Asynchronously retrieve the balance of tokens for the owner specified.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tokenAddress | `string`   |  address of the ERC20 token. |
| ownerAddress | `string`   |  address of the owner for whom the balance is being requested. |





**Returns:** `Promise`.<`BigNumber`>
the number of tokens the owner is holding.






___

<a id="getproxyallowanceasync"></a>

###  getProxyAllowanceAsync

► **getProxyAllowanceAsync**(tokenAddress: *`string`*, ownerAddress: *`string`*): `Promise`.<`BigNumber`>






Asynchronously determine the allowance afforded to the `tokenTransferProxy` allotted by the specified owner.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tokenAddress | `string`   |  address of the ERC20 token. |
| ownerAddress | `string`   |  the owner who made the allowance allotment. |





**Returns:** `Promise`.<`BigNumber`>
the allowance allotted to the `tokenTransferProxy`.






___

<a id="setproxyallowanceasync"></a>

###  setProxyAllowanceAsync

► **setProxyAllowanceAsync**(tokenAddress: *`string`*, allowance: *`BigNumber`*, options?: *`TxData`*): `Promise`.<`string`>






Asynchronously set an allowance to the `tokenTransferProxy`.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tokenAddress | `string`   |  address of the ERC20 token. |
| allowance | `BigNumber`   |  the size of the allowance. |
| options | `TxData`   |  any parameters necessary to modify the transaction. |





**Returns:** `Promise`.<`string`>
the hash of the resulting transaction.






___

<a id="setunlimitedproxyallowanceasync"></a>

###  setUnlimitedProxyAllowanceAsync

► **setUnlimitedProxyAllowanceAsync**(tokenAddress: *`string`*, options?: *`TxData`*): `Promise`.<`string`>






Asynchronously set an unlimited proxy allowance to the `tokenTransferProxy`.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tokenAddress | `string`   |  address of the ERC20 token. |
| options | `TxData`   |  any parameters necessary to modify the transaction. |





**Returns:** `Promise`.<`string`>
the hash of the resulting transaction.






___

<a id="transferasync"></a>

###  transferAsync

► **transferAsync**(tokenAddress: *`string`*, to: *`string`*, value: *`BigNumber`*, options?: *`TxData`*): `Promise`.<`string`>






Asynchronously transfer value denominated in the specified ERC20 token to the address specified.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tokenAddress | `string`   |  the address of the token being used. |
| to | `string`   |  to whom the transfer is being made. |
| value | `BigNumber`   |  the amount being transferred. |
| options | `TxData`   |  any parameters necessary to modify the transaction. |





**Returns:** `Promise`.<`string`>
the hash of the resulting transaction.






___

<a id="transferfromasync"></a>

###  transferFromAsync

► **transferFromAsync**(tokenAddress: *`string`*, from: *`string`*, to: *`string`*, value: *`BigNumber`*, options?: *`TxData`*): `Promise`.<`string`>






Asynchronously transfer the value amount in the token specified so long as the sender of the message has received sufficient allowance on behalf of `from` to do so.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tokenAddress | `string`   |  the address of the token being used. |
| from | `string`   |  from whom are the funds being transferred. |
| to | `string`   |  to whom are the funds being transferred. |
| value | `BigNumber`   |  the amount to be transferred. |
| options | `TxData`   |  any parameters necessary to modify the transaction. |





**Returns:** `Promise`.<`string`>
the hash of the resulting transaction.






___
