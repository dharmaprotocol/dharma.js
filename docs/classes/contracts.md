[dharma.js](../../README.md#api_reference) > Contracts

# Class: ContractsAPI

## Index

### Methods

* [getTokenAddressBySymbolAsync](_contracts_api_.contractsapi.md#gettokenaddressbysymbolasync)
* [loadDebtKernelAsync](_contracts_api_.contractsapi.md#loaddebtkernelasync)
* [loadDebtRegistryAsync](_contracts_api_.contractsapi.md#loaddebtregistryasync)
* [loadDebtTokenAsync](_contracts_api_.contractsapi.md#loaddebttokenasync)
* [loadDharmaContractsAsync](_contracts_api_.contractsapi.md#loaddharmacontractsasync)
* [loadERC20TokenAsync](_contracts_api_.contractsapi.md#loaderc20tokenasync)
* [loadRepaymentRouterAsync](_contracts_api_.contractsapi.md#loadrepaymentrouterasync)
* [loadRepaymentRouterAtAsync](_contracts_api_.contractsapi.md#loadrepaymentrouteratasync)
* [loadSimpleInterestTermsContract](_contracts_api_.contractsapi.md#loadsimpleinteresttermscontract)
* [loadTermsContractAsync](_contracts_api_.contractsapi.md#loadtermscontractasync)
* [loadTermsContractRegistry](_contracts_api_.contractsapi.md#loadtermscontractregistry)
* [loadTokenBySymbolAsync](_contracts_api_.contractsapi.md#loadtokenbysymbolasync)
* [loadTokenRegistry](_contracts_api_.contractsapi.md#loadtokenregistry)
* [loadTokenTransferProxyAsync](_contracts_api_.contractsapi.md#loadtokentransferproxyasync)



---
## Methods
<a id="gettokenaddressbysymbolasync"></a>

###  getTokenAddressBySymbolAsync

► **getTokenAddressBySymbolAsync**(symbol: *`string`*): `Promise`.<`string`>






**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| symbol | `string`   |  - |





**Returns:** `Promise`.<`string`>





___

<a id="loaddebtkernelasync"></a>

###  loadDebtKernelAsync

► **loadDebtKernelAsync**(transactionOptions?: *`object`*): `Promise`.<`DebtKernelContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`DebtKernelContract`>





___

<a id="loaddebtregistryasync"></a>

###  loadDebtRegistryAsync

► **loadDebtRegistryAsync**(transactionOptions?: *`object`*): `Promise`.<`DebtRegistryContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`DebtRegistryContract`>





___

<a id="loaddebttokenasync"></a>

###  loadDebtTokenAsync

► **loadDebtTokenAsync**(transactionOptions?: *`object`*): `Promise`.<`DebtTokenContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`DebtTokenContract`>





___

<a id="loaddharmacontractsasync"></a>

###  loadDharmaContractsAsync

► **loadDharmaContractsAsync**(transactionOptions?: *`object`*): `Promise`.<[DharmaContracts](../interfaces/_contracts_api_.dharmacontracts.md)>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<[DharmaContracts](../interfaces/_contracts_api_.dharmacontracts.md)>





___

<a id="loaderc20tokenasync"></a>

###  loadERC20TokenAsync

► **loadERC20TokenAsync**(tokenAddress: *`string`*, transactionOptions?: *`object`*): `Promise`.<`ERC20Contract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| tokenAddress | `string`  | - |   - |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`ERC20Contract`>





___

<a id="loadrepaymentrouterasync"></a>

###  loadRepaymentRouterAsync

► **loadRepaymentRouterAsync**(transactionOptions?: *`object`*): `Promise`.<`RepaymentRouterContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`RepaymentRouterContract`>





___

<a id="loadrepaymentrouteratasync"></a>

###  loadRepaymentRouterAtAsync

► **loadRepaymentRouterAtAsync**(address: *`string`*, transactionOptions?: *`object`*): `Promise`.<`RepaymentRouterContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| address | `string`  | - |   - |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`RepaymentRouterContract`>





___

<a id="loadsimpleinteresttermscontract"></a>

###  loadSimpleInterestTermsContract

► **loadSimpleInterestTermsContract**(tokenAddress: *`string`*, transactionOptions?: *`object`*): `Promise`.<`SimpleInterestTermsContractContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| tokenAddress | `string`  | - |   - |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`SimpleInterestTermsContractContract`>





___

<a id="loadtermscontractasync"></a>

###  loadTermsContractAsync

► **loadTermsContractAsync**(termsContractAddress: *`string`*, transactionOptions?: *`object`*): `Promise`.<`TermsContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| termsContractAddress | `string`  | - |   - |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`TermsContract`>





___

<a id="loadtermscontractregistry"></a>

###  loadTermsContractRegistry

► **loadTermsContractRegistry**(transactionOptions?: *`object`*): `Promise`.<`TermsContractRegistryContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`TermsContractRegistryContract`>





___

<a id="loadtokenbysymbolasync"></a>

###  loadTokenBySymbolAsync

► **loadTokenBySymbolAsync**(symbol: *`string`*, transactionOptions: *`object`*): `Promise`.<`ERC20Contract`>






**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| symbol | `string`   |  - |
| transactionOptions | `object`   |  - |





**Returns:** `Promise`.<`ERC20Contract`>





___

<a id="loadtokenregistry"></a>

###  loadTokenRegistry

► **loadTokenRegistry**(transactionOptions?: *`object`*): `Promise`.<`TokenRegistryContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`TokenRegistryContract`>





___

<a id="loadtokentransferproxyasync"></a>

###  loadTokenTransferProxyAsync

► **loadTokenTransferProxyAsync**(transactionOptions?: *`object`*): `Promise`.<`TokenTransferProxyContract`>






**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| transactionOptions | `object`  |  {} |   - |





**Returns:** `Promise`.<`TokenTransferProxyContract`>





___
