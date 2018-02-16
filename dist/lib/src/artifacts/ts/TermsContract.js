"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsContract = {
    contractName: "TermsContract",
    abi: [
        {
            constant: true,
            inputs: [
                {
                    name: "agreementId",
                    type: "bytes32",
                },
            ],
            name: "getValueRepaidToDate",
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
                    name: "agreementId",
                    type: "bytes32",
                },
                {
                    name: "payer",
                    type: "address",
                },
                {
                    name: "beneficiary",
                    type: "address",
                },
                {
                    name: "unitsOfRepayment",
                    type: "uint256",
                },
                {
                    name: "tokenAddress",
                    type: "address",
                },
            ],
            name: "registerRepayment",
            outputs: [
                {
                    name: "_success",
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
                    name: "agreementId",
                    type: "bytes32",
                },
                {
                    name: "timestamp",
                    type: "uint256",
                },
            ],
            name: "getExpectedRepaymentValue",
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
    ],
    bytecode: "0x",
    deployedBytecode: "0x",
    sourceMap: "",
    deployedSourceMap: "",
    source: '/*\n\n  Copyright 2017 Dharma Labs Inc.\n\n  Licensed under the Apache License, Version 2.0 (the "License");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an "AS IS" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity 0.4.18;\n\n\ninterface TermsContract {\n     /// When called, the registerRepayment function records the debtor\'s\n     ///  repayment, as well as any auxiliary metadata needed by the contract\n     ///  to determine ex post facto the value repaid (e.g. current USD\n     ///  exchange rate)\n     /// @param  agreementId bytes32. The agreement id (issuance hash) of the debt agreement to which this pertains.\n     /// @param  payer address. The address of the payer.\n     /// @param  beneficiary address. The address of the payment\'s beneficiary.\n     /// @param  unitsOfRepayment uint. The units-of-value repaid in the transaction.\n     /// @param  tokenAddress address. The address of the token with which the repayment transaction was executed.\n    function registerRepayment(\n        bytes32 agreementId,\n        address payer,\n        address beneficiary,\n        uint256 unitsOfRepayment,\n        address tokenAddress\n    ) public returns (bool _success);\n\n     /// Returns the cumulative units-of-value expected to be repaid by a given block timestamp.\n     ///  Note this is not a constant function -- this value can vary on basis of any number of\n     ///  conditions (e.g. interest rates can be renegotiated if repayments are delinquent).\n     /// @param  agreementId bytes32. The agreement id (issuance hash) of the debt agreement to which this pertains.\n     /// @param  timestamp uint. The timestamp of the block for which repayment expectation is being queried.\n     /// @return uint256 The cumulative units-of-value expected to be repaid by the time the given timestamp lapses.\n    function getExpectedRepaymentValue(\n        bytes32 agreementId,\n        uint256 timestamp\n    ) public view returns (uint256);\n\n     /// Returns the cumulative units-of-value repaid by the point at which this method is called.\n     /// @param  agreementId bytes32. The agreement id (issuance hash) of the debt agreement to which this pertains.\n     /// @return uint256 The cumulative units-of-value repaid up until now.\n    function getValueRepaidToDate(\n        bytes32 agreementId\n    ) public view returns (uint256);\n}\n',
    sourcePath: "/Users/nadavhollander/Documents/Dharma/Development/dharma.js/node_modules/charta/contracts/TermsContract.sol",
    ast: {
        attributes: {
            absolutePath: "/Users/nadavhollander/Documents/Dharma/Development/dharma.js/node_modules/charta/contracts/TermsContract.sol",
            exportedSymbols: {
                TermsContract: [2105],
            },
        },
        children: [
            {
                attributes: {
                    literals: ["solidity", "0.4", ".18"],
                },
                id: 2073,
                name: "PragmaDirective",
                src: "584:23:5",
            },
            {
                attributes: {
                    baseContracts: [null],
                    contractDependencies: [null],
                    contractKind: "interface",
                    documentation: null,
                    fullyImplemented: false,
                    linearizedBaseContracts: [2105],
                    name: "TermsContract",
                    scope: 2106,
                },
                children: [
                    {
                        attributes: {
                            body: null,
                            constant: false,
                            implemented: false,
                            isConstructor: false,
                            modifiers: [null],
                            name: "registerRepayment",
                            payable: false,
                            scope: 2105,
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
                                            name: "agreementId",
                                            scope: 2088,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "bytes32",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "bytes32",
                                                    type: "bytes32",
                                                },
                                                id: 2074,
                                                name: "ElementaryTypeName",
                                                src: "1381:7:5",
                                            },
                                        ],
                                        id: 2075,
                                        name: "VariableDeclaration",
                                        src: "1381:19:5",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "payer",
                                            scope: 2088,
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
                                                id: 2076,
                                                name: "ElementaryTypeName",
                                                src: "1410:7:5",
                                            },
                                        ],
                                        id: 2077,
                                        name: "VariableDeclaration",
                                        src: "1410:13:5",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "beneficiary",
                                            scope: 2088,
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
                                                id: 2078,
                                                name: "ElementaryTypeName",
                                                src: "1433:7:5",
                                            },
                                        ],
                                        id: 2079,
                                        name: "VariableDeclaration",
                                        src: "1433:19:5",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "unitsOfRepayment",
                                            scope: 2088,
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
                                                id: 2080,
                                                name: "ElementaryTypeName",
                                                src: "1462:7:5",
                                            },
                                        ],
                                        id: 2081,
                                        name: "VariableDeclaration",
                                        src: "1462:24:5",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "tokenAddress",
                                            scope: 2088,
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
                                                id: 2082,
                                                name: "ElementaryTypeName",
                                                src: "1496:7:5",
                                            },
                                        ],
                                        id: 2083,
                                        name: "VariableDeclaration",
                                        src: "1496:20:5",
                                    },
                                ],
                                id: 2084,
                                name: "ParameterList",
                                src: "1371:151:5",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_success",
                                            scope: 2088,
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
                                                id: 2085,
                                                name: "ElementaryTypeName",
                                                src: "1539:4:5",
                                            },
                                        ],
                                        id: 2086,
                                        name: "VariableDeclaration",
                                        src: "1539:13:5",
                                    },
                                ],
                                id: 2087,
                                name: "ParameterList",
                                src: "1538:15:5",
                            },
                        ],
                        id: 2088,
                        name: "FunctionDefinition",
                        src: "1345:209:5",
                    },
                    {
                        attributes: {
                            body: null,
                            constant: true,
                            implemented: false,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getExpectedRepaymentValue",
                            payable: false,
                            scope: 2105,
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
                                            name: "agreementId",
                                            scope: 2097,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "bytes32",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "bytes32",
                                                    type: "bytes32",
                                                },
                                                id: 2089,
                                                name: "ElementaryTypeName",
                                                src: "2234:7:5",
                                            },
                                        ],
                                        id: 2090,
                                        name: "VariableDeclaration",
                                        src: "2234:19:5",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "timestamp",
                                            scope: 2097,
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
                                                id: 2091,
                                                name: "ElementaryTypeName",
                                                src: "2263:7:5",
                                            },
                                        ],
                                        id: 2092,
                                        name: "VariableDeclaration",
                                        src: "2263:17:5",
                                    },
                                ],
                                id: 2093,
                                name: "ParameterList",
                                src: "2224:62:5",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 2097,
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
                                                id: 2094,
                                                name: "ElementaryTypeName",
                                                src: "2308:7:5",
                                            },
                                        ],
                                        id: 2095,
                                        name: "VariableDeclaration",
                                        src: "2308:7:5",
                                    },
                                ],
                                id: 2096,
                                name: "ParameterList",
                                src: "2307:9:5",
                            },
                        ],
                        id: 2097,
                        name: "FunctionDefinition",
                        src: "2190:127:5",
                    },
                    {
                        attributes: {
                            body: null,
                            constant: true,
                            implemented: false,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getValueRepaidToDate",
                            payable: false,
                            scope: 2105,
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
                                            name: "agreementId",
                                            scope: 2104,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "bytes32",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "bytes32",
                                                    type: "bytes32",
                                                },
                                                id: 2098,
                                                name: "ElementaryTypeName",
                                                src: "2654:7:5",
                                            },
                                        ],
                                        id: 2099,
                                        name: "VariableDeclaration",
                                        src: "2654:19:5",
                                    },
                                ],
                                id: 2100,
                                name: "ParameterList",
                                src: "2644:35:5",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 2104,
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
                                                id: 2101,
                                                name: "ElementaryTypeName",
                                                src: "2701:7:5",
                                            },
                                        ],
                                        id: 2102,
                                        name: "VariableDeclaration",
                                        src: "2701:7:5",
                                    },
                                ],
                                id: 2103,
                                name: "ParameterList",
                                src: "2700:9:5",
                            },
                        ],
                        id: 2104,
                        name: "FunctionDefinition",
                        src: "2615:95:5",
                    },
                ],
                id: 2105,
                name: "ContractDefinition",
                src: "610:2102:5",
            },
        ],
        id: 2106,
        name: "SourceUnit",
        src: "584:2129:5",
    },
    compiler: {
        name: "solc",
        version: "0.4.18+commit.9cf6e910.Emscripten.clang",
    },
    networks: {},
    schemaVersion: "1.0.1",
    updatedAt: "2018-02-16T11:14:26.825Z",
};
//# sourceMappingURL=TermsContract.js.map