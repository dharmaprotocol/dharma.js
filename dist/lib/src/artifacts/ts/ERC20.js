"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20 = {
    contractName: "ERC20",
    abi: [
        {
            constant: false,
            inputs: [
                {
                    name: "spender",
                    type: "address",
                },
                {
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "approve",
            outputs: [
                {
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "totalSupply",
            outputs: [
                {
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "from",
                    type: "address",
                },
                {
                    name: "to",
                    type: "address",
                },
                {
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "transferFrom",
            outputs: [
                {
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    name: "who",
                    type: "address",
                },
            ],
            name: "balanceOf",
            outputs: [
                {
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "to",
                    type: "address",
                },
                {
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "transfer",
            outputs: [
                {
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    name: "owner",
                    type: "address",
                },
                {
                    name: "spender",
                    type: "address",
                },
            ],
            name: "allowance",
            outputs: [
                {
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "owner",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "spender",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "from",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "to",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Transfer",
            type: "event",
        },
    ],
    bytecode: "0x",
    deployedBytecode: "0x",
    sourceMap: "",
    deployedSourceMap: "",
    source: 'pragma solidity ^0.4.18;\n\nimport "./ERC20Basic.sol";\n\n\n/**\n * @title ERC20 interface\n * @dev see https://github.com/ethereum/EIPs/issues/20\n */\ncontract ERC20 is ERC20Basic {\n  function allowance(address owner, address spender) public view returns (uint256);\n  function transferFrom(address from, address to, uint256 value) public returns (bool);\n  function approve(address spender, uint256 value) public returns (bool);\n  event Approval(address indexed owner, address indexed spender, uint256 value);\n}\n',
    sourcePath: "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    ast: {
        attributes: {
            absolutePath: "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
            exportedSymbols: {
                ERC20: [5748],
            },
        },
        children: [
            {
                attributes: {
                    literals: ["solidity", "^", "0.4", ".18"],
                },
                id: 5707,
                name: "PragmaDirective",
                src: "0:24:29",
            },
            {
                attributes: {
                    SourceUnit: 5781,
                    absolutePath: "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
                    file: "./ERC20Basic.sol",
                    scope: 5749,
                    symbolAliases: [null],
                    unitAlias: "",
                },
                id: 5708,
                name: "ImportDirective",
                src: "26:26:29",
            },
            {
                attributes: {
                    contractDependencies: [5780],
                    contractKind: "contract",
                    documentation: "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
                    fullyImplemented: false,
                    linearizedBaseContracts: [5748, 5780],
                    name: "ERC20",
                    scope: 5749,
                },
                children: [
                    {
                        attributes: {
                            arguments: [null],
                        },
                        children: [
                            {
                                attributes: {
                                    contractScope: null,
                                    name: "ERC20Basic",
                                    referencedDeclaration: 5780,
                                    type: "contract ERC20Basic",
                                },
                                id: 5709,
                                name: "UserDefinedTypeName",
                                src: "162:10:29",
                            },
                        ],
                        id: 5710,
                        name: "InheritanceSpecifier",
                        src: "162:10:29",
                    },
                    {
                        attributes: {
                            body: null,
                            constant: true,
                            implemented: false,
                            isConstructor: false,
                            modifiers: [null],
                            name: "allowance",
                            payable: false,
                            scope: 5748,
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
                                            name: "owner",
                                            scope: 5719,
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
                                                id: 5711,
                                                name: "ElementaryTypeName",
                                                src: "196:7:29",
                                            },
                                        ],
                                        id: 5712,
                                        name: "VariableDeclaration",
                                        src: "196:13:29",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "spender",
                                            scope: 5719,
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
                                                id: 5713,
                                                name: "ElementaryTypeName",
                                                src: "211:7:29",
                                            },
                                        ],
                                        id: 5714,
                                        name: "VariableDeclaration",
                                        src: "211:15:29",
                                    },
                                ],
                                id: 5715,
                                name: "ParameterList",
                                src: "195:32:29",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 5719,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint256",
                                                    type: "uint256",
                                                },
                                                id: 5716,
                                                name: "ElementaryTypeName",
                                                src: "249:7:29",
                                            },
                                        ],
                                        id: 5717,
                                        name: "VariableDeclaration",
                                        src: "249:7:29",
                                    },
                                ],
                                id: 5718,
                                name: "ParameterList",
                                src: "248:9:29",
                            },
                        ],
                        id: 5719,
                        name: "FunctionDefinition",
                        src: "177:81:29",
                    },
                    {
                        attributes: {
                            body: null,
                            constant: false,
                            implemented: false,
                            isConstructor: false,
                            modifiers: [null],
                            name: "transferFrom",
                            payable: false,
                            scope: 5748,
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
                                            name: "from",
                                            scope: 5730,
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
                                                id: 5720,
                                                name: "ElementaryTypeName",
                                                src: "283:7:29",
                                            },
                                        ],
                                        id: 5721,
                                        name: "VariableDeclaration",
                                        src: "283:12:29",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "to",
                                            scope: 5730,
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
                                                id: 5722,
                                                name: "ElementaryTypeName",
                                                src: "297:7:29",
                                            },
                                        ],
                                        id: 5723,
                                        name: "VariableDeclaration",
                                        src: "297:10:29",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "value",
                                            scope: 5730,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint256",
                                                    type: "uint256",
                                                },
                                                id: 5724,
                                                name: "ElementaryTypeName",
                                                src: "309:7:29",
                                            },
                                        ],
                                        id: 5725,
                                        name: "VariableDeclaration",
                                        src: "309:13:29",
                                    },
                                ],
                                id: 5726,
                                name: "ParameterList",
                                src: "282:41:29",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 5730,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "bool",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "bool",
                                                    type: "bool",
                                                },
                                                id: 5727,
                                                name: "ElementaryTypeName",
                                                src: "340:4:29",
                                            },
                                        ],
                                        id: 5728,
                                        name: "VariableDeclaration",
                                        src: "340:4:29",
                                    },
                                ],
                                id: 5729,
                                name: "ParameterList",
                                src: "339:6:29",
                            },
                        ],
                        id: 5730,
                        name: "FunctionDefinition",
                        src: "261:85:29",
                    },
                    {
                        attributes: {
                            body: null,
                            constant: false,
                            implemented: false,
                            isConstructor: false,
                            modifiers: [null],
                            name: "approve",
                            payable: false,
                            scope: 5748,
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
                                            name: "spender",
                                            scope: 5739,
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
                                                id: 5731,
                                                name: "ElementaryTypeName",
                                                src: "366:7:29",
                                            },
                                        ],
                                        id: 5732,
                                        name: "VariableDeclaration",
                                        src: "366:15:29",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "value",
                                            scope: 5739,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint256",
                                                    type: "uint256",
                                                },
                                                id: 5733,
                                                name: "ElementaryTypeName",
                                                src: "383:7:29",
                                            },
                                        ],
                                        id: 5734,
                                        name: "VariableDeclaration",
                                        src: "383:13:29",
                                    },
                                ],
                                id: 5735,
                                name: "ParameterList",
                                src: "365:32:29",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 5739,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "bool",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "bool",
                                                    type: "bool",
                                                },
                                                id: 5736,
                                                name: "ElementaryTypeName",
                                                src: "414:4:29",
                                            },
                                        ],
                                        id: 5737,
                                        name: "VariableDeclaration",
                                        src: "414:4:29",
                                    },
                                ],
                                id: 5738,
                                name: "ParameterList",
                                src: "413:6:29",
                            },
                        ],
                        id: 5739,
                        name: "FunctionDefinition",
                        src: "349:71:29",
                    },
                    {
                        attributes: {
                            anonymous: false,
                            name: "Approval",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: true,
                                            name: "owner",
                                            scope: 5747,
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
                                                id: 5740,
                                                name: "ElementaryTypeName",
                                                src: "438:7:29",
                                            },
                                        ],
                                        id: 5741,
                                        name: "VariableDeclaration",
                                        src: "438:21:29",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: true,
                                            name: "spender",
                                            scope: 5747,
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
                                                id: 5742,
                                                name: "ElementaryTypeName",
                                                src: "461:7:29",
                                            },
                                        ],
                                        id: 5743,
                                        name: "VariableDeclaration",
                                        src: "461:23:29",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: false,
                                            name: "value",
                                            scope: 5747,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint256",
                                                    type: "uint256",
                                                },
                                                id: 5744,
                                                name: "ElementaryTypeName",
                                                src: "486:7:29",
                                            },
                                        ],
                                        id: 5745,
                                        name: "VariableDeclaration",
                                        src: "486:13:29",
                                    },
                                ],
                                id: 5746,
                                name: "ParameterList",
                                src: "437:63:29",
                            },
                        ],
                        id: 5747,
                        name: "EventDefinition",
                        src: "423:78:29",
                    },
                ],
                id: 5748,
                name: "ContractDefinition",
                src: "144:359:29",
            },
        ],
        id: 5749,
        name: "SourceUnit",
        src: "0:504:29",
    },
    compiler: {
        name: "solc",
        version: "0.4.18+commit.9cf6e910.Emscripten.clang",
    },
    networks: {},
    schemaVersion: "1.0.1",
    updatedAt: "2018-02-10T00:40:28.695Z",
};
//# sourceMappingURL=ERC20.js.map