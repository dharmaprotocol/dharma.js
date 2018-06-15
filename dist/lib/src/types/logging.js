"use strict";
/*
These types help us process decoded logs from the `ABIDecoder`.

Logging the output from `ABIDecoder.decodeLogs(receipt.logs)` returns the
following raw JSON data:

 ```[ { name: 'LogError',
      events: [ [Object], [Object] ],
      address: '0x384cdafd4dddd1b7f9210534a16931e60809b658' } ]```

This object is represented now by our `Logging.Entry` interface.

Subsequently logging the `events` property of the `Logging.Entry` returns the
following raw JSON data:

 ```[ { name: '_errorId', type: 'uint8', value: '4' },
    { name: '_orderHash',
      type: 'bytes32',
      value: '0x880eb4d0b5d7f665f34640a32662f0bcd69088b451f610efa63c72ef4cb35d37' } ]```

We represent this in our `Logging.Event` type.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var Logging;
(function (Logging) {
    Logging.LOG_ERROR_NAME = "LogError";
    Logging.ERROR_ID = "_errorId";
    var SolidityType;
    (function (SolidityType) {
        SolidityType["address"] = "address";
        SolidityType["uint256"] = "uint256";
        SolidityType["uint8"] = "uint8";
        SolidityType["uint"] = "uint";
        SolidityType["bytes32"] = "bytes32";
    })(SolidityType = Logging.SolidityType || (Logging.SolidityType = {}));
})(Logging = exports.Logging || (exports.Logging = {}));
//# sourceMappingURL=logging.js.map