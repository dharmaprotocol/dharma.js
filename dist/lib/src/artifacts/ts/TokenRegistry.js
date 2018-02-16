"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRegistry = {
    contractName: "TokenRegistry",
    abi: [
        {
            constant: false,
            inputs: [
                {
                    name: "symbol",
                    type: "string",
                },
                {
                    name: "token",
                    type: "address",
                },
            ],
            name: "setTokenAddress",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
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
            name: "symbolToTokenAddress",
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
            inputs: [],
            name: "owner",
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
                    name: "symbol",
                    type: "string",
                },
            ],
            name: "getTokenAddress",
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
            constant: false,
            inputs: [
                {
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "transferOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "previousOwner",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
    ],
    bytecode: "0x6060604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061061b806100536000396000f30060606040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806317456e5614610072578063202b9688146100ee5780638da5cb5b14610155578063c4091236146101aa578063f2fde38b14610247575b600080fd5b341561007d57600080fd5b6100ec600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610280565b005b34156100f957600080fd5b61011360048080356000191690602001909190505061039b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561016057600080fd5b6101686103ce565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101b557600080fd5b610205600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506103f3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561025257600080fd5b61027e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061049a565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102db57600080fd5b8060016000846040518082805190602001908083835b60208310151561031657805182526020820191506020810190506020830392506102f1565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60016020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060016000836040518082805190602001908083835b60208310151561042f578051825260208201915060208101905060208303925061040a565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104f557600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561053157600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582095ba734c8ce774c2cf58bd316a40c119cc7d9b55a03e0c3f8c9b1649610291af0029",
    deployedBytecode: "0x60606040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806317456e5614610072578063202b9688146100ee5780638da5cb5b14610155578063c4091236146101aa578063f2fde38b14610247575b600080fd5b341561007d57600080fd5b6100ec600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610280565b005b34156100f957600080fd5b61011360048080356000191690602001909190505061039b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561016057600080fd5b6101686103ce565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101b557600080fd5b610205600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506103f3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561025257600080fd5b61027e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061049a565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102db57600080fd5b8060016000846040518082805190602001908083835b60208310151561031657805182526020820191506020810190506020830392506102f1565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60016020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060016000836040518082805190602001908083835b60208310151561042f578051825260208201915060208101905060208303925061040a565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104f557600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561053157600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582095ba734c8ce774c2cf58bd316a40c119cc7d9b55a03e0c3f8c9b1649610291af0029",
    sourceMap: "87:380:6:-;;;509:10:26;501:5;;:18;;;;;;;;;;;;;;;;;;87:380:6;;;;;;",
    deployedSourceMap: "87:380:6:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;190:136;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;127:56;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;238:20:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;332:133:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;832:169:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;190:136:6;653:5:26;;;;;;;;;;;639:19;;:10;:19;;;631:28;;;;;;;;314:5:6;272:20;:39;303:6;293:17;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:2;51:6;36:153;;;182:3;176:5;171:3;164:6;98:2;93:3;89;82:19;;123:2;118:3;114;107:19;;148:2;143:3;139;132:19;;36:153;;;274:1;267:3;263:2;259:3;254;250;246;315:4;311:3;305;299:5;295:3;356:4;350:3;344:5;340:3;389:7;380;377:2;372:3;365:6;3:399;;;;;;;;;;;;;;;;;;;272:39:6;;;;;;;;;;;;;;;;;;:47;;;;;;;;;;;;;;;;;;190:136;;:::o;127:56::-;;;;;;;;;;;;;;;;;;;;;;:::o;238:20:26:-;;;;;;;;;;;;;:::o;332:133:6:-;393:7;419:20;:39;450:6;440:17;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:2;51:6;36:153;;;182:3;176:5;171:3;164:6;98:2;93:3;89;82:19;;123:2;118:3;114;107:19;;148:2;143:3;139;132:19;;36:153;;;274:1;267:3;263:2;259:3;254;250;246;315:4;311:3;305;299:5;295:3;356:4;350:3;344:5;340:3;389:7;380;377:2;372:3;365:6;3:399;;;;;;;;;;;;;;;;;;;419:39:6;;;;;;;;;;;;;;;;;;;;;;;;;;;412:46;;332:133;;;:::o;832:169:26:-;653:5;;;;;;;;;;;639:19;;:10;:19;;;631:28;;;;;;;;928:1;908:22;;:8;:22;;;;900:31;;;;;;;;965:8;937:37;;958:5;;;;;;;;;;;937:37;;;;;;;;;;;;988:8;980:5;;:16;;;;;;;;;;;;;;;;;;832:169;:::o",
    source: 'pragma solidity 0.4.18;\n\nimport "zeppelin-solidity/contracts/ownership/Ownable.sol";\n\n\ncontract TokenRegistry is Ownable {\n    mapping (bytes32 => address) public symbolToTokenAddress;\n\n    function setTokenAddress(string symbol, address token) public onlyOwner {\n        symbolToTokenAddress[keccak256(symbol)] = token;\n    }\n\n    function getTokenAddress(string symbol) public view returns (address) {\n        return symbolToTokenAddress[keccak256(symbol)];\n    }\n}\n',
    sourcePath: "/Users/nadavhollander/Documents/Dharma/Development/dharma.js/node_modules/charta/contracts/TokenRegistry.sol",
    ast: {
        attributes: {
            absolutePath: "/Users/nadavhollander/Documents/Dharma/Development/dharma.js/node_modules/charta/contracts/TokenRegistry.sol",
            exportedSymbols: {
                TokenRegistry: [2147],
            },
        },
        children: [
            {
                attributes: {
                    literals: ["solidity", "0.4", ".18"],
                },
                id: 2107,
                name: "PragmaDirective",
                src: "0:23:6",
            },
            {
                attributes: {
                    SourceUnit: 5415,
                    absolutePath: "zeppelin-solidity/contracts/ownership/Ownable.sol",
                    file: "zeppelin-solidity/contracts/ownership/Ownable.sol",
                    scope: 2148,
                    symbolAliases: [null],
                    unitAlias: "",
                },
                id: 2108,
                name: "ImportDirective",
                src: "25:59:6",
            },
            {
                attributes: {
                    contractDependencies: [5414],
                    contractKind: "contract",
                    documentation: null,
                    fullyImplemented: true,
                    linearizedBaseContracts: [2147, 5414],
                    name: "TokenRegistry",
                    scope: 2148,
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
                                    name: "Ownable",
                                    referencedDeclaration: 5414,
                                    type: "contract Ownable",
                                },
                                id: 2109,
                                name: "UserDefinedTypeName",
                                src: "113:7:6",
                            },
                        ],
                        id: 2110,
                        name: "InheritanceSpecifier",
                        src: "113:7:6",
                    },
                    {
                        attributes: {
                            constant: false,
                            name: "symbolToTokenAddress",
                            scope: 2147,
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
                                        id: 2111,
                                        name: "ElementaryTypeName",
                                        src: "136:7:6",
                                    },
                                    {
                                        attributes: {
                                            name: "address",
                                            type: "address",
                                        },
                                        id: 2112,
                                        name: "ElementaryTypeName",
                                        src: "147:7:6",
                                    },
                                ],
                                id: 2113,
                                name: "Mapping",
                                src: "127:28:6",
                            },
                        ],
                        id: 2114,
                        name: "VariableDeclaration",
                        src: "127:56:6",
                    },
                    {
                        attributes: {
                            constant: false,
                            implemented: true,
                            isConstructor: false,
                            name: "setTokenAddress",
                            payable: false,
                            scope: 2147,
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
                                            name: "symbol",
                                            scope: 2132,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "string memory",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "string",
                                                    type: "string storage pointer",
                                                },
                                                id: 2115,
                                                name: "ElementaryTypeName",
                                                src: "215:6:6",
                                            },
                                        ],
                                        id: 2116,
                                        name: "VariableDeclaration",
                                        src: "215:13:6",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "token",
                                            scope: 2132,
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
                                                id: 2117,
                                                name: "ElementaryTypeName",
                                                src: "230:7:6",
                                            },
                                        ],
                                        id: 2118,
                                        name: "VariableDeclaration",
                                        src: "230:13:6",
                                    },
                                ],
                                id: 2119,
                                name: "ParameterList",
                                src: "214:30:6",
                            },
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 2122,
                                name: "ParameterList",
                                src: "262:0:6",
                            },
                            {
                                attributes: {
                                    arguments: [null],
                                },
                                children: [
                                    {
                                        attributes: {
                                            argumentTypes: null,
                                            overloadedDeclarations: [null],
                                            referencedDeclaration: 5388,
                                            type: "modifier ()",
                                            value: "onlyOwner",
                                        },
                                        id: 2120,
                                        name: "Identifier",
                                        src: "252:9:6",
                                    },
                                ],
                                id: 2121,
                                name: "ModifierInvocation",
                                src: "252:9:6",
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
                                                                    referencedDeclaration: 2114,
                                                                    type: "mapping(bytes32 => address)",
                                                                    value: "symbolToTokenAddress",
                                                                },
                                                                id: 2123,
                                                                name: "Identifier",
                                                                src: "272:20:6",
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
                                                                                    typeIdentifier: "t_string_memory_ptr",
                                                                                    typeString: "string memory",
                                                                                },
                                                                            ],
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 5932,
                                                                            type: "function () pure returns (bytes32)",
                                                                            value: "keccak256",
                                                                        },
                                                                        id: 2124,
                                                                        name: "Identifier",
                                                                        src: "293:9:6",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 2116,
                                                                            type: "string memory",
                                                                            value: "symbol",
                                                                        },
                                                                        id: 2125,
                                                                        name: "Identifier",
                                                                        src: "303:6:6",
                                                                    },
                                                                ],
                                                                id: 2126,
                                                                name: "FunctionCall",
                                                                src: "293:17:6",
                                                            },
                                                        ],
                                                        id: 2127,
                                                        name: "IndexAccess",
                                                        src: "272:39:6",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 2118,
                                                            type: "address",
                                                            value: "token",
                                                        },
                                                        id: 2128,
                                                        name: "Identifier",
                                                        src: "314:5:6",
                                                    },
                                                ],
                                                id: 2129,
                                                name: "Assignment",
                                                src: "272:47:6",
                                            },
                                        ],
                                        id: 2130,
                                        name: "ExpressionStatement",
                                        src: "272:47:6",
                                    },
                                ],
                                id: 2131,
                                name: "Block",
                                src: "262:64:6",
                            },
                        ],
                        id: 2132,
                        name: "FunctionDefinition",
                        src: "190:136:6",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getTokenAddress",
                            payable: false,
                            scope: 2147,
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
                                            name: "symbol",
                                            scope: 2146,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "string memory",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "string",
                                                    type: "string storage pointer",
                                                },
                                                id: 2133,
                                                name: "ElementaryTypeName",
                                                src: "357:6:6",
                                            },
                                        ],
                                        id: 2134,
                                        name: "VariableDeclaration",
                                        src: "357:13:6",
                                    },
                                ],
                                id: 2135,
                                name: "ParameterList",
                                src: "356:15:6",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 2146,
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
                                                id: 2136,
                                                name: "ElementaryTypeName",
                                                src: "393:7:6",
                                            },
                                        ],
                                        id: 2137,
                                        name: "VariableDeclaration",
                                        src: "393:7:6",
                                    },
                                ],
                                id: 2138,
                                name: "ParameterList",
                                src: "392:9:6",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 2138,
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
                                                            referencedDeclaration: 2114,
                                                            type: "mapping(bytes32 => address)",
                                                            value: "symbolToTokenAddress",
                                                        },
                                                        id: 2139,
                                                        name: "Identifier",
                                                        src: "419:20:6",
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
                                                                            typeIdentifier: "t_string_memory_ptr",
                                                                            typeString: "string memory",
                                                                        },
                                                                    ],
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 5932,
                                                                    type: "function () pure returns (bytes32)",
                                                                    value: "keccak256",
                                                                },
                                                                id: 2140,
                                                                name: "Identifier",
                                                                src: "440:9:6",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 2134,
                                                                    type: "string memory",
                                                                    value: "symbol",
                                                                },
                                                                id: 2141,
                                                                name: "Identifier",
                                                                src: "450:6:6",
                                                            },
                                                        ],
                                                        id: 2142,
                                                        name: "FunctionCall",
                                                        src: "440:17:6",
                                                    },
                                                ],
                                                id: 2143,
                                                name: "IndexAccess",
                                                src: "419:39:6",
                                            },
                                        ],
                                        id: 2144,
                                        name: "Return",
                                        src: "412:46:6",
                                    },
                                ],
                                id: 2145,
                                name: "Block",
                                src: "402:63:6",
                            },
                        ],
                        id: 2146,
                        name: "FunctionDefinition",
                        src: "332:133:6",
                    },
                ],
                id: 2147,
                name: "ContractDefinition",
                src: "87:380:6",
            },
        ],
        id: 2148,
        name: "SourceUnit",
        src: "0:468:6",
    },
    compiler: {
        name: "solc",
        version: "0.4.18+commit.9cf6e910.Emscripten.clang",
    },
    networks: {
        "42": {
            events: {},
            links: {},
            address: "0xc282bb053387080a2f40354b6e83e0e00a0c483a",
        },
        "70": {
            events: {},
            links: {},
            address: "0xdff109b81a5e63c533f0b5e8696023b20b7ef1f6",
        },
    },
    schemaVersion: "1.0.1",
    updatedAt: "2018-02-16T11:14:32.764Z",
};
//# sourceMappingURL=TokenRegistry.js.map