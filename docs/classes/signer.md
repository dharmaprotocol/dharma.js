[dharma.js](../../README.md#api_reference) > Signer


# Class: SignerAPI


### Methods

* [asCreditor](#ascreditor)
* [asDebtor](#asdebtor)
* [asUnderwriter](#asunderwriter)



---



## Methods
<a id="ascreditor"></a>

###  asCreditor

► **asCreditor**(debtOrder: *`DebtOrder`*): `Promise`.<`ECDSASignature`>






Given a debt order, produce ECDSA signature of the creditor commitment hash using the creditor's private key. If current web3 provider is unable to produce a cryptographic signature using the creditor's private key (for instance, if the account is not unlocked in Geth / Parity), it throws.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| debtOrder | `DebtOrder`   |  The debt order for which we desire a signature |





**Returns:** `Promise`.<`ECDSASignature`>
The ECDSA signature of the debt order's debtor commitment hash






___

<a id="asdebtor"></a>

###  asDebtor

► **asDebtor**(debtOrder: *`DebtOrder`*): `Promise`.<`ECDSASignature`>






Given a debt order, produce ECDSA signature of the debtor commitment hash using the debtor's private key. If current web3 provider is unable to produce a cryptographic signature using the debtor's private key (for instance, if the account is not unlocked in Geth / Parity), it throws.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| debtOrder | `DebtOrder`   |  The debt order for which we desire a signature |





**Returns:** `Promise`.<`ECDSASignature`>
The ECDSA signature of the debt order's debtor commitment hash






___

<a id="asunderwriter"></a>

###  asUnderwriter

► **asUnderwriter**(debtOrder: *`DebtOrder`*): `Promise`.<`ECDSASignature`>






Given a debt order, produce ECDSA signature of the underwriter commitment hash using the underwriter's private key. If current web3 provider is unable to produce a cryptographic signature using the underwriter's private key (for instance, if the account is not unlocked in Geth / Parity), it throws.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| debtOrder | `DebtOrder`   |  The debt order for which we desire a signature |





**Returns:** `Promise`.<`ECDSASignature`>
The ECDSA signature of the debt order's debtor commitment hash






___
