[dharma.js](../../README.md#api_reference) > Blockchain


# Class: BlockchainAPI

### Methods

* [awaitTransactionMinedAsync](_blockchain_api_.blockchainapi.md#awaittransactionminedasync)


---


## Methods
<a id="awaittransactionminedasync"></a>

###  awaitTransactionMinedAsync

► **awaitTransactionMinedAsync**(txHash: *`string`*, pollingIntervalMs?: *`number`*, timeoutMs?: *`number`*): `Promise`.<`Web3.TransactionReceipt`>






Asynchronously polls the Ethereum blockchain until the specified transaction has been mined or the timeout limit is reached, whichever occurs first.


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| txHash | `string`  | - |   the hash of the transaction. |
| pollingIntervalMs | `number`  | 1000 |   - |
| timeoutMs | `number`  | - |   the number of milliseconds until this process times out. |





**Returns:** `Promise`.<`Web3.TransactionReceipt`>
the transaction receipt resulting from the mining process.






___
