"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsContractRegistry = {
    contractName: "TermsContractRegistry",
    abi: [
        {
            constant: false,
            inputs: [
                {
                    name: "tokenAddress",
                    type: "address",
                },
                {
                    name: "termsContract",
                    type: "address",
                },
            ],
            name: "setSimpleInterestTermsContractAddress",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    name: "tokenAddress",
                    type: "address",
                },
            ],
            name: "getSimpleInterestTermsContractAddress",
            outputs: [
                {
                    name: "",
                    type: "address",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    name: "",
                    type: "bytes32",
                },
            ],
            name: "symbolToTermsContractAddress",
            outputs: [
                {
                    name: "",
                    type: "address",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
    ],
    bytecode: "0x6060604052341561000f57600080fd5b6103848061001e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631ad43dc01461005c5780636ae369c1146100b45780639ef3daf61461012d575b600080fd5b341561006757600080fd5b6100b2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610194565b005b34156100bf57600080fd5b6100eb600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610269565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561013857600080fd5b610152600480803560001916906020019091905050610325565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b8060008084604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401807f53696d706c65496e7465726573745465726d73436f6e74726163740000000000815250601b0191505060405180910390206000191660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b600080600083604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401807f53696d706c65496e7465726573745465726d73436f6e74726163740000000000815250601b0191505060405180910390206000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820bebf76d041f252f1d3fa1fb168f8cbae0d0dce9df4a0d5c728056f3ea842de5d0029",
    deployedBytecode: "0x606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631ad43dc01461005c5780636ae369c1146100b45780639ef3daf61461012d575b600080fd5b341561006757600080fd5b6100b2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610194565b005b34156100bf57600080fd5b6100eb600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610269565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561013857600080fd5b610152600480803560001916906020019091905050610325565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b8060008084604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401807f53696d706c65496e7465726573745465726d73436f6e74726163740000000000815250601b0191505060405180910390206000191660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b600080600083604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401807f53696d706c65496e7465726573745465726d73436f6e74726163740000000000815250601b0191505060405180910390206000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820bebf76d041f252f1d3fa1fb168f8cbae0d0dce9df4a0d5c728056f3ea842de5d0029",
    sourceMap: "26:683:9:-;;;;;;;;;;;;;;;;;",
    deployedSourceMap: "26:683:9:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;134:284;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;424:283;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;63:64;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;134:284;398:13;277:28;:118;329:12;306:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;277:118;;;;;;;;;;;;;;;;;;:134;;;;;;;;;;;;;;;;;;134:284;;:::o;424:283::-;552:7;582:28;:118;634:12;611:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;582:118;;;;;;;;;;;;;;;;;;;;;;;;;;;575:125;;424:283;;;:::o;63:64::-;;;;;;;;;;;;;;;;;;;;;;:::o",
    source: 'pragma solidity 0.4.18;\n\n\ncontract TermsContractRegistry {\n    mapping (bytes32 => address) public symbolToTermsContractAddress;\n\n    function setSimpleInterestTermsContractAddress(\n        address tokenAddress,\n        address termsContract\n    )\n        public\n    {\n        symbolToTermsContractAddress[keccak256(\n            tokenAddress,\n            "SimpleInterestTermsContract"\n        )] = termsContract;\n    }\n\n    function getSimpleInterestTermsContractAddress(\n        address tokenAddress\n    )\n        public\n        view\n        returns (address)\n    {\n        return symbolToTermsContractAddress[keccak256(\n            tokenAddress,\n            "SimpleInterestTermsContract"\n        )];\n    }\n}\n',
    sourcePath: "/Users/nadavhollander/Documents/Dharma/Development/dharma.js/node_modules/charta/contracts/examples/TermsContractRegistry.sol",
    ast: {
        attributes: {
            absolutePath: "/Users/nadavhollander/Documents/Dharma/Development/dharma.js/node_modules/charta/contracts/examples/TermsContractRegistry.sol",
            exportedSymbols: {
                TermsContractRegistry: [2586],
            },
        },
        children: [
            {
                attributes: {
                    literals: ["solidity", "0.4", ".18"],
                },
                id: 2549,
                name: "PragmaDirective",
                src: "0:23:9",
            },
            {
                attributes: {
                    baseContracts: [null],
                    contractDependencies: [null],
                    contractKind: "contract",
                    documentation: null,
                    fullyImplemented: true,
                    linearizedBaseContracts: [2586],
                    name: "TermsContractRegistry",
                    scope: 2587,
                },
                children: [
                    {
                        attributes: {
                            constant: false,
                            name: "symbolToTermsContractAddress",
                            scope: 2586,
                            stateVariable: true,
                            storageLocation: "default",
                            type: "mapping(bytes32 => address)",
                            value: null,
                            visibility: "public",
                        },
                        children: [
                            {
                                attributes: {
                                    type: "mapping(bytes32 => address)",
                                },
                                children: [
                                    {
                                        attributes: {
                                            name: "bytes32",
                                            type: "bytes32",
                                        },
                                        id: 2550,
                                        name: "ElementaryTypeName",
                                        src: "72:7:9",
                                    },
                                    {
                                        attributes: {
                                            name: "address",
                                            type: "address",
                                        },
                                        id: 2551,
                                        name: "ElementaryTypeName",
                                        src: "83:7:9",
                                    },
                                ],
                                id: 2552,
                                name: "Mapping",
                                src: "63:28:9",
                            },
                        ],
                        id: 2553,
                        name: "VariableDeclaration",
                        src: "63:64:9",
                    },
                    {
                        attributes: {
                            constant: false,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "setSimpleInterestTermsContractAddress",
                            payable: false,
                            scope: 2586,
                            stateMutability: "nonpayable",
                            superFunction: null,
                            visibility: "public",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "tokenAddress",
                                            scope: 2570,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "address",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "address",
                                                    type: "address",
                                                },
                                                id: 2554,
                                                name: "ElementaryTypeName",
                                                src: "190:7:9",
                                            },
                                        ],
                                        id: 2555,
                                        name: "VariableDeclaration",
                                        src: "190:20:9",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "termsContract",
                                            scope: 2570,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "address",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "address",
                                                    type: "address",
                                                },
                                                id: 2556,
                                                name: "ElementaryTypeName",
                                                src: "220:7:9",
                                            },
                                        ],
                                        id: 2557,
                                        name: "VariableDeclaration",
                                        src: "220:21:9",
                                    },
                                ],
                                id: 2558,
                                name: "ParameterList",
                                src: "180:67:9",
                            },
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 2559,
                                name: "ParameterList",
                                src: "267:0:9",
                            },
                            {
                                children: [
                                    {
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    lValueRequested: false,
                                                    operator: "=",
                                                    type: "address",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: true,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 2553,
                                                                    type: "mapping(bytes32 => address)",
                                                                    value: "symbolToTermsContractAddress",
                                                                },
                                                                id: 2560,
                                                                name: "Identifier",
                                                                src: "277:28:9",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: false,
                                                                    isPure: false,
                                                                    isStructConstructorCall: false,
                                                                    lValueRequested: false,
                                                                    names: [null],
                                                                    type: "bytes32",
                                                                    type_conversion: false,
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: [
                                                                                {
                                                                                    typeIdentifier: "t_address",
                                                                                    typeString: "address",
                                                                                },
                                                                                {
                                                                                    typeIdentifier: "t_stringliteral_8b4cb97860a0dbe2b88011c128ededd7ecf3885dfbcfa754c7192f454c8d53ae",
                                                                                    typeString: 'literal_string "SimpleInterestTermsContract"',
                                                                                },
                                                                            ],
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 5932,
                                                                            type: "function () pure returns (bytes32)",
                                                                            value: "keccak256",
                                                                        },
                                                                        id: 2561,
                                                                        name: "Identifier",
                                                                        src: "306:9:9",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 2555,
                                                                            type: "address",
                                                                            value: "tokenAddress",
                                                                        },
                                                                        id: 2562,
                                                                        name: "Identifier",
                                                                        src: "329:12:9",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            hexvalue: "53696d706c65496e7465726573745465726d73436f6e7472616374",
                                                                            isConstant: false,
                                                                            isLValue: false,
                                                                            isPure: true,
                                                                            lValueRequested: false,
                                                                            subdenomination: null,
                                                                            token: "string",
                                                                            type: 'literal_string "SimpleInterestTermsContract"',
                                                                            value: "SimpleInterestTermsContract",
                                                                        },
                                                                        id: 2563,
                                                                        name: "Literal",
                                                                        src: "355:29:9",
                                                                    },
                                                                ],
                                                                id: 2564,
                                                                name: "FunctionCall",
                                                                src: "306:88:9",
                                                            },
                                                        ],
                                                        id: 2565,
                                                        name: "IndexAccess",
                                                        src: "277:118:9",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 2557,
                                                            type: "address",
                                                            value: "termsContract",
                                                        },
                                                        id: 2566,
                                                        name: "Identifier",
                                                        src: "398:13:9",
                                                    },
                                                ],
                                                id: 2567,
                                                name: "Assignment",
                                                src: "277:134:9",
                                            },
                                        ],
                                        id: 2568,
                                        name: "ExpressionStatement",
                                        src: "277:134:9",
                                    },
                                ],
                                id: 2569,
                                name: "Block",
                                src: "267:151:9",
                            },
                        ],
                        id: 2570,
                        name: "FunctionDefinition",
                        src: "134:284:9",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getSimpleInterestTermsContractAddress",
                            payable: false,
                            scope: 2586,
                            stateMutability: "view",
                            superFunction: null,
                            visibility: "public",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "tokenAddress",
                                            scope: 2585,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "address",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "address",
                                                    type: "address",
                                                },
                                                id: 2571,
                                                name: "ElementaryTypeName",
                                                src: "480:7:9",
                                            },
                                        ],
                                        id: 2572,
                                        name: "VariableDeclaration",
                                        src: "480:20:9",
                                    },
                                ],
                                id: 2573,
                                name: "ParameterList",
                                src: "470:36:9",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 2585,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "address",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "address",
                                                    type: "address",
                                                },
                                                id: 2574,
                                                name: "ElementaryTypeName",
                                                src: "552:7:9",
                                            },
                                        ],
                                        id: 2575,
                                        name: "VariableDeclaration",
                                        src: "552:7:9",
                                    },
                                ],
                                id: 2576,
                                name: "ParameterList",
                                src: "551:9:9",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 2576,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: true,
                                                    isPure: false,
                                                    lValueRequested: false,
                                                    type: "address",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 2553,
                                                            type: "mapping(bytes32 => address)",
                                                            value: "symbolToTermsContractAddress",
                                                        },
                                                        id: 2577,
                                                        name: "Identifier",
                                                        src: "582:28:9",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: false,
                                                            isPure: false,
                                                            isStructConstructorCall: false,
                                                            lValueRequested: false,
                                                            names: [null],
                                                            type: "bytes32",
                                                            type_conversion: false,
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: [
                                                                        {
                                                                            typeIdentifier: "t_address",
                                                                            typeString: "address",
                                                                        },
                                                                        {
                                                                            typeIdentifier: "t_stringliteral_8b4cb97860a0dbe2b88011c128ededd7ecf3885dfbcfa754c7192f454c8d53ae",
                                                                            typeString: 'literal_string "SimpleInterestTermsContract"',
                                                                        },
                                                                    ],
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 5932,
                                                                    type: "function () pure returns (bytes32)",
                                                                    value: "keccak256",
                                                                },
                                                                id: 2578,
                                                                name: "Identifier",
                                                                src: "611:9:9",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 2572,
                                                                    type: "address",
                                                                    value: "tokenAddress",
                                                                },
                                                                id: 2579,
                                                                name: "Identifier",
                                                                src: "634:12:9",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    hexvalue: "53696d706c65496e7465726573745465726d73436f6e7472616374",
                                                                    isConstant: false,
                                                                    isLValue: false,
                                                                    isPure: true,
                                                                    lValueRequested: false,
                                                                    subdenomination: null,
                                                                    token: "string",
                                                                    type: 'literal_string "SimpleInterestTermsContract"',
                                                                    value: "SimpleInterestTermsContract",
                                                                },
                                                                id: 2580,
                                                                name: "Literal",
                                                                src: "660:29:9",
                                                            },
                                                        ],
                                                        id: 2581,
                                                        name: "FunctionCall",
                                                        src: "611:88:9",
                                                    },
                                                ],
                                                id: 2582,
                                                name: "IndexAccess",
                                                src: "582:118:9",
                                            },
                                        ],
                                        id: 2583,
                                        name: "Return",
                                        src: "575:125:9",
                                    },
                                ],
                                id: 2584,
                                name: "Block",
                                src: "565:142:9",
                            },
                        ],
                        id: 2585,
                        name: "FunctionDefinition",
                        src: "424:283:9",
                    },
                ],
                id: 2586,
                name: "ContractDefinition",
                src: "26:683:9",
            },
        ],
        id: 2587,
        name: "SourceUnit",
        src: "0:710:9",
    },
    compiler: {
        name: "solc",
        version: "0.4.18+commit.9cf6e910.Emscripten.clang",
    },
    networks: {
        "42": {
            events: {},
            links: {},
            address: "0x25f47928dd4014d4a375c9397f9ed4ce64bb3c0f",
        },
        "70": {
            events: {},
            links: {},
            address: "0x9bdfaa4b13b917462ae4c9d7457f5764f1c7c2ef",
        },
    },
    schemaVersion: "1.0.1",
    updatedAt: "2018-02-16T11:14:32.758Z",
};
//# sourceMappingURL=TermsContractRegistry.js.map