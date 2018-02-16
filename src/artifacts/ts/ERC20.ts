export const ERC20 = {
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
    source:
        'pragma solidity ^0.4.18;\n\nimport "./ERC20Basic.sol";\n\n\n/**\n * @title ERC20 interface\n * @dev see https://github.com/ethereum/EIPs/issues/20\n */\ncontract ERC20 is ERC20Basic {\n  function allowance(address owner, address spender) public view returns (uint256);\n  function transferFrom(address from, address to, uint256 value) public returns (bool);\n  function approve(address spender, uint256 value) public returns (bool);\n  event Approval(address indexed owner, address indexed spender, uint256 value);\n}\n',
    sourcePath: "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    ast: {
        attributes: {
            absolutePath: "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
            exportedSymbols: {
                ERC20: [5553],
            },
        },
        children: [
            {
                attributes: {
                    literals: ["solidity", "^", "0.4", ".18"],
                },
                id: 5512,
                name: "PragmaDirective",
                src: "0:24:28",
            },
            {
                attributes: {
                    SourceUnit: 5586,
                    absolutePath: "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
                    file: "./ERC20Basic.sol",
                    scope: 5554,
                    symbolAliases: [null],
                    unitAlias: "",
                },
                id: 5513,
                name: "ImportDirective",
                src: "26:26:28",
            },
            {
                attributes: {
                    contractDependencies: [5585],
                    contractKind: "contract",
                    documentation:
                        "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
                    fullyImplemented: false,
                    linearizedBaseContracts: [5553, 5585],
                    name: "ERC20",
                    scope: 5554,
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
                                    referencedDeclaration: 5585,
                                    type: "contract ERC20Basic",
                                },
                                id: 5514,
                                name: "UserDefinedTypeName",
                                src: "162:10:28",
                            },
                        ],
                        id: 5515,
                        name: "InheritanceSpecifier",
                        src: "162:10:28",
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
                            scope: 5553,
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
                                            scope: 5524,
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
                                                id: 5516,
                                                name: "ElementaryTypeName",
                                                src: "196:7:28",
                                            },
                                        ],
                                        id: 5517,
                                        name: "VariableDeclaration",
                                        src: "196:13:28",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "spender",
                                            scope: 5524,
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
                                                id: 5518,
                                                name: "ElementaryTypeName",
                                                src: "211:7:28",
                                            },
                                        ],
                                        id: 5519,
                                        name: "VariableDeclaration",
                                        src: "211:15:28",
                                    },
                                ],
                                id: 5520,
                                name: "ParameterList",
                                src: "195:32:28",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 5524,
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
                                                id: 5521,
                                                name: "ElementaryTypeName",
                                                src: "249:7:28",
                                            },
                                        ],
                                        id: 5522,
                                        name: "VariableDeclaration",
                                        src: "249:7:28",
                                    },
                                ],
                                id: 5523,
                                name: "ParameterList",
                                src: "248:9:28",
                            },
                        ],
                        id: 5524,
                        name: "FunctionDefinition",
                        src: "177:81:28",
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
                            scope: 5553,
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
                                            scope: 5535,
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
                                                id: 5525,
                                                name: "ElementaryTypeName",
                                                src: "283:7:28",
                                            },
                                        ],
                                        id: 5526,
                                        name: "VariableDeclaration",
                                        src: "283:12:28",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "to",
                                            scope: 5535,
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
                                                id: 5527,
                                                name: "ElementaryTypeName",
                                                src: "297:7:28",
                                            },
                                        ],
                                        id: 5528,
                                        name: "VariableDeclaration",
                                        src: "297:10:28",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "value",
                                            scope: 5535,
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
                                                id: 5529,
                                                name: "ElementaryTypeName",
                                                src: "309:7:28",
                                            },
                                        ],
                                        id: 5530,
                                        name: "VariableDeclaration",
                                        src: "309:13:28",
                                    },
                                ],
                                id: 5531,
                                name: "ParameterList",
                                src: "282:41:28",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 5535,
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
                                                id: 5532,
                                                name: "ElementaryTypeName",
                                                src: "340:4:28",
                                            },
                                        ],
                                        id: 5533,
                                        name: "VariableDeclaration",
                                        src: "340:4:28",
                                    },
                                ],
                                id: 5534,
                                name: "ParameterList",
                                src: "339:6:28",
                            },
                        ],
                        id: 5535,
                        name: "FunctionDefinition",
                        src: "261:85:28",
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
                            scope: 5553,
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
                                            scope: 5544,
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
                                                id: 5536,
                                                name: "ElementaryTypeName",
                                                src: "366:7:28",
                                            },
                                        ],
                                        id: 5537,
                                        name: "VariableDeclaration",
                                        src: "366:15:28",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "value",
                                            scope: 5544,
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
                                                id: 5538,
                                                name: "ElementaryTypeName",
                                                src: "383:7:28",
                                            },
                                        ],
                                        id: 5539,
                                        name: "VariableDeclaration",
                                        src: "383:13:28",
                                    },
                                ],
                                id: 5540,
                                name: "ParameterList",
                                src: "365:32:28",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 5544,
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
                                                id: 5541,
                                                name: "ElementaryTypeName",
                                                src: "414:4:28",
                                            },
                                        ],
                                        id: 5542,
                                        name: "VariableDeclaration",
                                        src: "414:4:28",
                                    },
                                ],
                                id: 5543,
                                name: "ParameterList",
                                src: "413:6:28",
                            },
                        ],
                        id: 5544,
                        name: "FunctionDefinition",
                        src: "349:71:28",
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
                                            scope: 5552,
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
                                                id: 5545,
                                                name: "ElementaryTypeName",
                                                src: "438:7:28",
                                            },
                                        ],
                                        id: 5546,
                                        name: "VariableDeclaration",
                                        src: "438:21:28",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: true,
                                            name: "spender",
                                            scope: 5552,
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
                                                id: 5547,
                                                name: "ElementaryTypeName",
                                                src: "461:7:28",
                                            },
                                        ],
                                        id: 5548,
                                        name: "VariableDeclaration",
                                        src: "461:23:28",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: false,
                                            name: "value",
                                            scope: 5552,
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
                                                id: 5549,
                                                name: "ElementaryTypeName",
                                                src: "486:7:28",
                                            },
                                        ],
                                        id: 5550,
                                        name: "VariableDeclaration",
                                        src: "486:13:28",
                                    },
                                ],
                                id: 5551,
                                name: "ParameterList",
                                src: "437:63:28",
                            },
                        ],
                        id: 5552,
                        name: "EventDefinition",
                        src: "423:78:28",
                    },
                ],
                id: 5553,
                name: "ContractDefinition",
                src: "144:359:28",
            },
        ],
        id: 5554,
        name: "SourceUnit",
        src: "0:504:28",
    },
    compiler: {
        name: "solc",
        version: "0.4.18+commit.9cf6e910.Emscripten.clang",
    },
    networks: {},
    schemaVersion: "1.0.1",
    updatedAt: "2018-02-16T11:30:45.701Z",
};
