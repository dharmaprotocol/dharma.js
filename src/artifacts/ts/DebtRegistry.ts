export const DebtRegistry = {
    contractName: "DebtRegistry",
    abi: [
        {
            constant: true,
            inputs: [
                {
                    name: "issuanceHash",
                    type: "bytes32",
                },
            ],
            name: "getTermsContractParameters",
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [],
            name: "unpause",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "agent",
                    type: "address",
                },
            ],
            name: "addAuthorizedEditAgent",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "issuanceHash",
                    type: "bytes32",
                },
                {
                    name: "newBeneficiary",
                    type: "address",
                },
            ],
            name: "modifyBeneficiary",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "paused",
            outputs: [
                {
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "getAuthorizedInsertAgents",
            outputs: [
                {
                    name: "",
                    type: "address[]",
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
                    name: "issuanceHash",
                    type: "bytes32",
                },
            ],
            name: "getTerms",
            outputs: [
                {
                    name: "",
                    type: "address",
                },
                {
                    name: "",
                    type: "bytes32",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [],
            name: "pause",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
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
                    name: "issuanceHash",
                    type: "bytes32",
                },
            ],
            name: "get",
            outputs: [
                {
                    name: "",
                    type: "address",
                },
                {
                    name: "",
                    type: "address",
                },
                {
                    name: "",
                    type: "address",
                },
                {
                    name: "",
                    type: "uint256",
                },
                {
                    name: "",
                    type: "address",
                },
                {
                    name: "",
                    type: "bytes32",
                },
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
                    name: "agent",
                    type: "address",
                },
            ],
            name: "revokeEditAgentAuthorization",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "agent",
                    type: "address",
                },
            ],
            name: "addAuthorizedInsertAgent",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    name: "issuanceHash",
                    type: "bytes32",
                },
            ],
            name: "getBeneficiary",
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
                    name: "agent",
                    type: "address",
                },
            ],
            name: "revokeInsertAgentAuthorization",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "_version",
                    type: "address",
                },
                {
                    name: "_beneficiary",
                    type: "address",
                },
                {
                    name: "_debtor",
                    type: "address",
                },
                {
                    name: "_underwriter",
                    type: "address",
                },
                {
                    name: "_underwriterRiskRating",
                    type: "uint256",
                },
                {
                    name: "_termsContract",
                    type: "address",
                },
                {
                    name: "_termsContractParameters",
                    type: "bytes32",
                },
                {
                    name: "_salt",
                    type: "uint256",
                },
            ],
            name: "insert",
            outputs: [
                {
                    name: "_issuanceHash",
                    type: "bytes32",
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
                    name: "issuanceHash",
                    type: "bytes32",
                },
            ],
            name: "getIssuanceBlockTimestamp",
            outputs: [
                {
                    name: "timestamp",
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
            constant: true,
            inputs: [
                {
                    name: "issuanceHash",
                    type: "bytes32",
                },
            ],
            name: "getTermsContract",
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
            name: "getAuthorizedEditAgents",
            outputs: [
                {
                    name: "",
                    type: "address[]",
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
                    name: "issuanceHash",
                    type: "bytes32",
                },
                {
                    indexed: true,
                    name: "beneficiary",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "underwriter",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "underwriterRiskRating",
                    type: "uint256",
                },
                {
                    indexed: false,
                    name: "termsContract",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "termsContractParameters",
                    type: "bytes32",
                },
            ],
            name: "LogInsertEntry",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "issuanceHash",
                    type: "bytes32",
                },
                {
                    indexed: true,
                    name: "previousBeneficiary",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "newBeneficiary",
                    type: "address",
                },
            ],
            name: "LogModifyEntryBeneficiary",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    name: "agent",
                    type: "address",
                },
            ],
            name: "LogAddAuthorizedInsertAgent",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    name: "agent",
                    type: "address",
                },
            ],
            name: "LogAddAuthorizedEditAgent",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    name: "agent",
                    type: "address",
                },
            ],
            name: "LogRevokeInsertAgentAuthorization",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    name: "agent",
                    type: "address",
                },
            ],
            name: "LogRevokeEditAgentAuthorization",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [],
            name: "Pause",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [],
            name: "Unpause",
            type: "event",
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
    bytecode:
        "0x606060405260008060146101000a81548160ff021916908315150217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611df98061006d6000396000f300606060405260043610610107576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063314a522e1461010c5780633f4ba83a1461014f57806342cc6b04146101645780635969549e1461019d5780635c975abb146101e357806364a666f2146102105780636be39bda1461027a5780638456cb59146102f05780638da5cb5b146103055780638eaa6ac01461035a5780639329939514610477578063ad655998146104b0578063ba20dda4146104e9578063c205e64c14610550578063cf9df5eb14610589578063d69dbf6314610679578063f2fde38b146106b4578063f6f494c9146106ed578063f94df67814610754575b600080fd5b341561011757600080fd5b6101316004808035600019169060200190919050506107be565b60405180826000191660001916815260200191505060405180910390f35b341561015a57600080fd5b6101626107e6565b005b341561016f57600080fd5b61019b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a4565b005b34156101a857600080fd5b6101e160048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610979565b005b34156101ee57600080fd5b6101f6610b72565b604051808215151515815260200191505060405180910390f35b341561021b57600080fd5b610223610b85565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561026657808201518184015260208101905061024b565b505050509050019250505060405180910390f35b341561028557600080fd5b61029f600480803560001916906020019091905050610b9c565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182600019166000191681526020019250505060405180910390f35b34156102fb57600080fd5b610303610c06565b005b341561031057600080fd5b610318610cc6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561036557600080fd5b61037f600480803560001916906020019091905050610ceb565b604051808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001836000191660001916815260200182815260200197505050505050505060405180910390f35b341561048257600080fd5b6104ae600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610e68565b005b34156104bb57600080fd5b6104e7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610f3d565b005b34156104f457600080fd5b61050e600480803560001916906020019091905050611012565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561055b57600080fd5b610587600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061105a565b005b341561059457600080fd5b61065b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356000191690602001909190803590602001909190505061112f565b60405180826000191660001916815260200191505060405180910390f35b341561068457600080fd5b61069e6004808035600019169060200190919050506114fe565b6040518082815260200191505060405180910390f35b34156106bf57600080fd5b6106eb600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611526565b005b34156106f857600080fd5b61071260048080356000191690602001909190505061167b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561075f57600080fd5b6107676116c3565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156107aa57808201518184015260208101905061078f565b505050509050019250505060405180910390f35b6000600160008360001916600019168152602001908152602001600020600501549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561084157600080fd5b600060149054906101000a900460ff16151561085c57600080fd5b60008060146101000a81548160ff0219169083151502179055507f7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b3360405160405180910390a1565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108ff57600080fd5b6109138160056116da90919063ffffffff16565b7f1adcf3642077febc29ae94e96f4b266cd0014c4499a4ad57e1e6935efaf73c5c81604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b600061098f33600561180290919063ffffffff16565b151561099a57600080fd5b600060149054906101000a900460ff161515156109b657600080fd5b82600073ffffffffffffffffffffffffffffffffffffffff1660016000836000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151515610a3157600080fd5b82600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610a6e57600080fd5b60016000866000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692508360016000876000191660001916815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1686600019167f7afbd1e661f2fdce6222afdac74cd28b1847177e232db3d0f0dcf3739e8d809460405160405180910390a45050505050565b600060149054906101000a900460ff1681565b610b8d611ca3565b610b97600261185b565b905090565b60008060016000846000191660001916815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166001600085600019166000191681526020019081526020016000206005015491509150915091565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c6157600080fd5b600060149054906101000a900460ff16151515610c7d57600080fd5b6001600060146101000a81548160ff0219169083151502179055507f6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff62560405160405180910390a1565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600080600080600060016000896000191660001916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160008a6000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160008b6000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160008c6000191660001916815260200190815260200160002060030154600160008d6000191660001916815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160008e6000191660001916815260200190815260200160002060050154600160008f60001916600019168152602001908152602001600020600601549650965096509650965096509650919395979092949650565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ec357600080fd5b610ed78160056118f390919063ffffffff16565b7fd70b180c6a151902a25cf1e39c2d5d75079bb235362289aa42cd258a7e5af92181604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f9857600080fd5b610fac8160026116da90919063ffffffff16565b7f3742184d7c9c1646421a0b618adffa131109c009b2c9f9fab3c8d890e295e5dd81604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b600060016000836000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156110b557600080fd5b6110c98160026118f390919063ffffffff16565b7fc265a0634721cf43fbe76b8ab5c6f79b59fabfc8056dea60d2f0d2612fc70b1281604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b6000611139611cb7565b600061114f33600261180290919063ffffffff16565b151561115a57600080fd5b600060149054906101000a900460ff1615151561117657600080fd5b89600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156111b357600080fd5b60e0604051908101604052808d73ffffffffffffffffffffffffffffffffffffffff1681526020018c73ffffffffffffffffffffffffffffffffffffffff1681526020018a73ffffffffffffffffffffffffffffffffffffffff1681526020018981526020018873ffffffffffffffffffffffffffffffffffffffff16815260200187600019168152602001428152509250611250838b87611b35565b9150600073ffffffffffffffffffffffffffffffffffffffff1660016000846000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156112cb57600080fd5b8260016000846000191660001916815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816003015560808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a0820151816005019060001916905560c08201518160060155905050826040015173ffffffffffffffffffffffffffffffffffffffff16836020015173ffffffffffffffffffffffffffffffffffffffff1683600019167f10919d8a6bfbd0c46213ad51d6258e42af00bbf36133aada8a058bbe4f4a9240866060015187608001518860a00151604051808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018260001916600019168152602001935050505060405180910390a481935050505098975050505050505050565b6000600160008360001916600019168152602001908152602001600020600601549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561158157600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156115bd57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600060016000836000191660001916815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6116cb611ca3565b6116d5600561185b565b905090565b6116e48282611c8e565b15156116ef57600080fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555081600201805480600101828161175f9190611d50565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060018260020180549050038260010160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b60008260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b611863611ca3565b816002018054806020026020016040519081016040528092919081815260200182805480156118e757602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161189d575b50505050509050919050565b60008060006119028585611802565b151561190d57600080fd5b8460010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054925060018560020180549050039150846002018281548110151561196f57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508460000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff0219169055808560020184815481101515611a0057fe5b906000526020600020900160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828560010160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508460010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600090558460020182815481101515611ae557fe5b906000526020600020900160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018560020181818054905003915081611b2d9190611d7c565b505050505050565b60008360000151838560400151866060015187608001518860a0015187604051808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018360001916600019168152602001828152602001975050505050505050604051809103902090509392505050565b6000611c9a8383611802565b15905092915050565b602060405190810160405280600081525090565b60e060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008019168152602001600081525090565b815481835581811511611d7757818360005260206000209182019101611d769190611da8565b5b505050565b815481835581811511611da357818360005260206000209182019101611da29190611da8565b5b505050565b611dca91905b80821115611dc6576000816000905550600101611dae565b5090565b905600a165627a7a72305820bd9b8631ec420b5abcc37bacf620493e5d1d3bb75735420449166580e99d4acf0029",
    deployedBytecode:
        "0x606060405260043610610107576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063314a522e1461010c5780633f4ba83a1461014f57806342cc6b04146101645780635969549e1461019d5780635c975abb146101e357806364a666f2146102105780636be39bda1461027a5780638456cb59146102f05780638da5cb5b146103055780638eaa6ac01461035a5780639329939514610477578063ad655998146104b0578063ba20dda4146104e9578063c205e64c14610550578063cf9df5eb14610589578063d69dbf6314610679578063f2fde38b146106b4578063f6f494c9146106ed578063f94df67814610754575b600080fd5b341561011757600080fd5b6101316004808035600019169060200190919050506107be565b60405180826000191660001916815260200191505060405180910390f35b341561015a57600080fd5b6101626107e6565b005b341561016f57600080fd5b61019b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a4565b005b34156101a857600080fd5b6101e160048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610979565b005b34156101ee57600080fd5b6101f6610b72565b604051808215151515815260200191505060405180910390f35b341561021b57600080fd5b610223610b85565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561026657808201518184015260208101905061024b565b505050509050019250505060405180910390f35b341561028557600080fd5b61029f600480803560001916906020019091905050610b9c565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182600019166000191681526020019250505060405180910390f35b34156102fb57600080fd5b610303610c06565b005b341561031057600080fd5b610318610cc6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561036557600080fd5b61037f600480803560001916906020019091905050610ceb565b604051808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001836000191660001916815260200182815260200197505050505050505060405180910390f35b341561048257600080fd5b6104ae600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610e68565b005b34156104bb57600080fd5b6104e7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610f3d565b005b34156104f457600080fd5b61050e600480803560001916906020019091905050611012565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561055b57600080fd5b610587600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061105a565b005b341561059457600080fd5b61065b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356000191690602001909190803590602001909190505061112f565b60405180826000191660001916815260200191505060405180910390f35b341561068457600080fd5b61069e6004808035600019169060200190919050506114fe565b6040518082815260200191505060405180910390f35b34156106bf57600080fd5b6106eb600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611526565b005b34156106f857600080fd5b61071260048080356000191690602001909190505061167b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561075f57600080fd5b6107676116c3565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156107aa57808201518184015260208101905061078f565b505050509050019250505060405180910390f35b6000600160008360001916600019168152602001908152602001600020600501549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561084157600080fd5b600060149054906101000a900460ff16151561085c57600080fd5b60008060146101000a81548160ff0219169083151502179055507f7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b3360405160405180910390a1565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108ff57600080fd5b6109138160056116da90919063ffffffff16565b7f1adcf3642077febc29ae94e96f4b266cd0014c4499a4ad57e1e6935efaf73c5c81604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b600061098f33600561180290919063ffffffff16565b151561099a57600080fd5b600060149054906101000a900460ff161515156109b657600080fd5b82600073ffffffffffffffffffffffffffffffffffffffff1660016000836000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151515610a3157600080fd5b82600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610a6e57600080fd5b60016000866000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692508360016000876000191660001916815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1686600019167f7afbd1e661f2fdce6222afdac74cd28b1847177e232db3d0f0dcf3739e8d809460405160405180910390a45050505050565b600060149054906101000a900460ff1681565b610b8d611ca3565b610b97600261185b565b905090565b60008060016000846000191660001916815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166001600085600019166000191681526020019081526020016000206005015491509150915091565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c6157600080fd5b600060149054906101000a900460ff16151515610c7d57600080fd5b6001600060146101000a81548160ff0219169083151502179055507f6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff62560405160405180910390a1565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600080600080600060016000896000191660001916815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160008a6000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160008b6000191660001916815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160008c6000191660001916815260200190815260200160002060030154600160008d6000191660001916815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160008e6000191660001916815260200190815260200160002060050154600160008f60001916600019168152602001908152602001600020600601549650965096509650965096509650919395979092949650565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ec357600080fd5b610ed78160056118f390919063ffffffff16565b7fd70b180c6a151902a25cf1e39c2d5d75079bb235362289aa42cd258a7e5af92181604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f9857600080fd5b610fac8160026116da90919063ffffffff16565b7f3742184d7c9c1646421a0b618adffa131109c009b2c9f9fab3c8d890e295e5dd81604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b600060016000836000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156110b557600080fd5b6110c98160026118f390919063ffffffff16565b7fc265a0634721cf43fbe76b8ab5c6f79b59fabfc8056dea60d2f0d2612fc70b1281604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b6000611139611cb7565b600061114f33600261180290919063ffffffff16565b151561115a57600080fd5b600060149054906101000a900460ff1615151561117657600080fd5b89600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156111b357600080fd5b60e0604051908101604052808d73ffffffffffffffffffffffffffffffffffffffff1681526020018c73ffffffffffffffffffffffffffffffffffffffff1681526020018a73ffffffffffffffffffffffffffffffffffffffff1681526020018981526020018873ffffffffffffffffffffffffffffffffffffffff16815260200187600019168152602001428152509250611250838b87611b35565b9150600073ffffffffffffffffffffffffffffffffffffffff1660016000846000191660001916815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156112cb57600080fd5b8260016000846000191660001916815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816003015560808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a0820151816005019060001916905560c08201518160060155905050826040015173ffffffffffffffffffffffffffffffffffffffff16836020015173ffffffffffffffffffffffffffffffffffffffff1683600019167f10919d8a6bfbd0c46213ad51d6258e42af00bbf36133aada8a058bbe4f4a9240866060015187608001518860a00151604051808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018260001916600019168152602001935050505060405180910390a481935050505098975050505050505050565b6000600160008360001916600019168152602001908152602001600020600601549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561158157600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156115bd57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600060016000836000191660001916815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6116cb611ca3565b6116d5600561185b565b905090565b6116e48282611c8e565b15156116ef57600080fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555081600201805480600101828161175f9190611d50565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060018260020180549050038260010160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b60008260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b611863611ca3565b816002018054806020026020016040519081016040528092919081815260200182805480156118e757602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161189d575b50505050509050919050565b60008060006119028585611802565b151561190d57600080fd5b8460010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054925060018560020180549050039150846002018281548110151561196f57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508460000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff0219169055808560020184815481101515611a0057fe5b906000526020600020900160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828560010160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508460010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600090558460020182815481101515611ae557fe5b906000526020600020900160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018560020181818054905003915081611b2d9190611d7c565b505050505050565b60008360000151838560400151866060015187608001518860a0015187604051808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018360001916600019168152602001828152602001975050505050505050604051809103902090509392505050565b6000611c9a8383611802565b15905092915050565b602060405190810160405280600081525090565b60e060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008019168152602001600081525090565b815481835581811511611d7757818360005260206000209182019101611d769190611da8565b5b505050565b815481835581811511611da357818360005260206000209182019101611da29190611da8565b5b505050565b611dca91905b80821115611dc6576000816000905550600101611dae565b5090565b905600a165627a7a72305820bd9b8631ec420b5abcc37bacf620493e5d1d3bb75735420449166580e99d4acf0029",
    sourceMap:
        "1082:8182:1:-;;;268:5:24;247:26;;;;;;;;;;;;;;;;;;;;509:10:26;501:5;;:18;;;;;;;;;;;;;;;;;;1082:8182:1;;;;;;",
    deployedSourceMap:
        "1082:8182:1:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7404:186;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;833:87:24;;;;;;;;;;;;;;5336:180:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;4381:500;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;247:26:24;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8352:164:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;7715:250:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;666:85:24;;;;;;;;;;;;;;238:20:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6292:541:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6003:202;;;;;;;;;;;;;;;;;;;;;;;;;;;;5010:186;;;;;;;;;;;;;;;;;;;;;;;;;;;;6906:161;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5650:208;;;;;;;;;;;;;;;;;;;;;;;;;;;;3083:1127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8067:191;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;832:169:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;7151:166:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8621:160;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;7404:186:1;7507:7;7537:8;:22;7546:12;7537:22;;;;;;;;;;;;;;;;;:46;;;7530:53;;7404:186;;;:::o;833:87:24:-;653:5:26;;;;;;;;;;;639:19;;:10;:19;;;631:28;;;;;;;;568:6:24;;;;;;;;;;;560:15;;;;;;;;895:5;886:6;;:14;;;;;;;;;;;;;;;;;;906:9;;;;;;;;;;833:87::o;5336:180:1:-;653:5:26;;;;;;;;;;;639:19;;:10;:19;;;631:28;;;;;;;;5430:37:1;5461:5;5430:20;:30;;:37;;;;:::i;:::-;5477:32;5503:5;5477:32;;;;;;;;;;;;;;;;;;;;;;5336:180;:::o;4381:500::-;4615:27;2598:45;2632:10;2598:20;:33;;:45;;;;:::i;:::-;2590:54;;;;;;;;416:6:24;;;;;;;;;;;415:7;407:16;;;;;;;;4544:12:1;2779:1;2733:48;;:8;:22;2742:12;2733:22;;;;;;;;;;;;;;;;;:34;;;;;;;;;;;;:48;;;;2725:57;;;;;;;;4585:14;2896:1;2873:25;;:11;:25;;;;2865:34;;;;;;;;4645:8;:22;4654:12;4645:22;;;;;;;;;;;;;;;;;:34;;;;;;;;;;;;4615:64;;4727:14;4690:8;:22;4699:12;4690:22;;;;;;;;;;;;;;;;;:34;;;:51;;;;;;;;;;;;;;;;;;4850:14;4752:122;;4817:19;4752:122;;4791:12;4752:122;;;;;;;;;;;;;2792:1;429::24;4381:500:1;;;:::o;247:26:24:-;;;;;;;;;;;;;:::o;8352:164:1:-;8433:9;;:::i;:::-;8465:44;:22;:42;:44::i;:::-;8458:51;;8352:164;:::o;7715:250::-;7799:7;7808;7852:8;:22;7861:12;7852:22;;;;;;;;;;;;;;;;;:36;;;;;;;;;;;;7902:8;:22;7911:12;7902:22;;;;;;;;;;;;;;;;;:46;;;7831:127;;;;7715:250;;;:::o;666:85:24:-;653:5:26;;;;;;;;;;;639:19;;:10;:19;;;631:28;;;;;;;;416:6:24;;;;;;;;;;;415:7;407:16;;;;;;;;729:4;720:6;;:13;;;;;;;;;;;;;;;;;;739:7;;;;;;;;;;666:85::o;238:20:26:-;;;;;;;;;;;;;:::o;6292:541:1:-;6371:7;6380;6389;6398:4;6404:7;6413;6422:4;6463:8;:22;6472:12;6463:22;;;;;;;;;;;;;;;;;:30;;;;;;;;;;;;6507:8;:22;6516:12;6507:22;;;;;;;;;;;;;;;;;:34;;;;;;;;;;;;6555:8;:22;6564:12;6555:22;;;;;;;;;;;;;;;;;:34;;;;;;;;;;;;6603:8;:22;6612:12;6603:22;;;;;;;;;;;;;;;;;:44;;;6661:8;:22;6670:12;6661:22;;;;;;;;;;;;;;;;;:36;;;;;;;;;;;;6711:8;:22;6720:12;6711:22;;;;;;;;;;;;;;;;;:46;;;6771:8;:22;6780:12;6771:22;;;;;;;;;;;;;;;;;:45;;;6442:384;;;;;;;;;;;;;;6292:541;;;;;;;;;:::o;6003:202::-;653:5:26;;;;;;;;;;;639:19;;:10;:19;;;631:28;;;;;;;;6103:47:1;6144:5;6103:20;:40;;:47;;;;:::i;:::-;6160:38;6192:5;6160:38;;;;;;;;;;;;;;;;;;;;;;6003:202;:::o;5010:186::-;653:5:26;;;;;;;;;;;639:19;;:10;:19;;;631:28;;;;;;;;5106:39:1;5139:5;5106:22;:32;;:39;;;;:::i;:::-;5155:34;5183:5;5155:34;;;;;;;;;;;;;;;;;;;;;;5010:186;:::o;6906:161::-;6996:7;7026:8;:22;7035:12;7026:22;;;;;;;;;;;;;;;;;:34;;;;;;;;;;;;7019:41;;6906:161;;;:::o;5650:208::-;653:5:26;;;;;;;;;;;639:19;;:10;:19;;;631:28;;;;;;;;5752:49:1;5795:5;5752:22;:42;;:49;;;;:::i;:::-;5811:40;5845:5;5811:40;;;;;;;;;;;;;;;;;;;;;;5650:208;:::o;3083:1127::-;3473:21;3510:18;;:::i;:::-;3762:20;2476:47;2512:10;2476:22;:35;;:47;;;;:::i;:::-;2468:56;;;;;;;;416:6:24;;;;;;;;;;;415:7;407:16;;;;;;;;3442:12:1;2896:1;2873:25;;:11;:25;;;;2865:34;;;;;;;;3531:220;;;;;;;;;3550:8;3531:220;;;;;;3572:12;3531:220;;;;;;3598:12;3531:220;;;;;;3624:22;3531:220;;;;3660:14;3531:220;;;;;;3688:24;3531:220;;;;;;;3726:15;3531:220;;;3510:241;;3785:39;3802:5;3809:7;3818:5;3785:16;:39::i;:::-;3762:62;;3889:1;3843:48;;:8;:22;3852:12;3843:22;;;;;;;;;;;;;;;;;:34;;;;;;;;;;;;:48;;;3835:57;;;;;;;;3928:5;3903:8;:22;3912:12;3903:22;;;;;;;;;;;;;;;;;:30;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4029:5;:17;;;3944:229;;3998:5;:17;;;3944:229;;3972:12;3944:229;;;;4060:5;:27;;;4101:5;:19;;;4134:5;:29;;;3944:229;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4191:12;4184:19;;429:1:24;3083:1127:1;;;;;;;;;;;;:::o;8067:191::-;8169:14;8206:8;:22;8215:12;8206:22;;;;;;;;;;;;;;;;;:45;;;8199:52;;8067:191;;;:::o;832:169:26:-;653:5;;;;;;;;;;;639:19;;:10;:19;;;631:28;;;;;;;;928:1;908:22;;:8;:22;;;;900:31;;;;;;;;965:8;937:37;;958:5;;;;;;;;;;;937:37;;;;;;;;;;;;988:8;980:5;;:16;;;;;;;;;;;;;;;;;;832:169;:::o;7151:166:1:-;7244:7;7274:8;:22;7283:12;7274:22;;;;;;;;;;;;;;;;;:36;;;;;;;;;;;;7267:43;;7151:166;;;:::o;8621:160::-;8700:9;;:::i;:::-;8732:42;:20;:40;:42::i;:::-;8725:49;;8621:160;:::o;825:287:10:-;924:28;940:4;946:5;924:15;:28::i;:::-;916:37;;;;;;;;989:4;964;:15;;:22;980:5;964:22;;;;;;;;;;;;;;;;:29;;;;;;;;;;;;;;;;;;1003:4;:21;;:33;;;;;;;;;;;:::i;:::-;;;;;;;;;;1030:5;1003:33;;;;;;;;;;;;;;;;;;;;;;;1104:1;1073:4;:21;;:28;;;;:32;1046:4;:17;;:24;1064:5;1046:24;;;;;;;;;;;;;;;:59;;;;825:287;;:::o;2185:166::-;2295:4;2322;:15;;:22;2338:5;2322:22;;;;;;;;;;;;;;;;;;;;;;;;;2315:29;;2185:166;;;;:::o;2536:162::-;2638:9;;:::i;:::-;2670:4;:21;;2663:28;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2536:162;;;:::o;1118:1061::-;1433:25;1495:23;1563:19;1396:25;1409:4;1415:5;1396:12;:25::i;:::-;1388:34;;;;;;;;1461:4;:17;;:24;1479:5;1461:24;;;;;;;;;;;;;;;;1433:52;;1552:1;1521:4;:21;;:28;;;;:32;1495:58;;1585:4;:21;;1607:18;1585:41;;;;;;;;;;;;;;;;;;;;;;;;;;;;1563:63;;1689:4;:15;;:22;1705:5;1689:22;;;;;;;;;;;;;;;;1682:29;;;;;;;;;;;1838:11;1792:4;:21;;1814:20;1792:43;;;;;;;;;;;;;;;;;;;:57;;;;;;;;;;;;;;;;;;1953:20;1920:4;:17;;:30;1938:11;1920:30;;;;;;;;;;;;;;;:53;;;;1990:4;:17;;:24;2008:5;1990:24;;;;;;;;;;;;;;;1983:31;;;2088:4;:21;;2110:18;2088:41;;;;;;;;;;;;;;;;;;;2081:48;;;;;;;;;;;2171:1;2139:4;:21;;:33;;;;;;;;;;;;;;:::i;:::-;;1118:1061;;;;;:::o;8871:391:1:-;8986:7;9039:6;:14;;;9067:7;9088:6;:18;;;9120:6;:28;;;9162:6;:20;;;9196:6;:30;;;9240:5;9016:239;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;9009:246;;8871:391;;;;;:::o;2357:173:10:-;2470:4;2498:25;2511:4;2517:5;2498:12;:25::i;:::-;2497:26;2490:33;;2357:173;;;;:::o;1082:8182:1:-;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
    source:
        "/*\n\n  Copyright 2017 Dharma Labs Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity 0.4.18;\n\nimport \"./libraries/PermissionsLib.sol\";\nimport \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport \"zeppelin-solidity/contracts/lifecycle/Pausable.sol\";\n\n\n/**\n * The DebtRegistry stores the parameters and beneficiaries of all debt agreements in\n * Dharma protocol.  It authorizes a limited number of agents to\n * perform mutations on it -- those agents can be changed at any\n * time by the contract's owner.\n *\n * Author: Nadav Hollander -- Github: nadavhollander\n */\ncontract DebtRegistry is Pausable {\n    using SafeMath for uint;\n    using PermissionsLib for PermissionsLib.Permissions;\n\n    struct Entry {\n        address version;\n        address beneficiary;\n        address underwriter;\n        uint underwriterRiskRating;\n        address termsContract;\n        bytes32 termsContractParameters;\n        uint issuanceBlockTimestamp;\n    }\n\n    // Primary registry mapping issuance hashes to their corresponding entries\n    mapping (bytes32 => Entry) internal registry;\n\n    PermissionsLib.Permissions internal entryInsertPermissions;\n    PermissionsLib.Permissions internal entryEditPermissions;\n\n    event LogInsertEntry(\n        bytes32 indexed issuanceHash,\n        address indexed beneficiary,\n        address indexed underwriter,\n        uint underwriterRiskRating,\n        address termsContract,\n        bytes32 termsContractParameters\n    );\n\n    event LogModifyEntryBeneficiary(\n        bytes32 indexed issuanceHash,\n        address indexed previousBeneficiary,\n        address indexed newBeneficiary\n    );\n\n    event LogAddAuthorizedInsertAgent(\n        address agent\n    );\n\n    event LogAddAuthorizedEditAgent(\n        address agent\n    );\n\n    event LogRevokeInsertAgentAuthorization(\n        address agent\n    );\n\n    event LogRevokeEditAgentAuthorization(\n        address agent\n    );\n\n    modifier onlyAuthorizedToInsert() {\n        require(entryInsertPermissions.isAuthorized(msg.sender));\n        _;\n    }\n\n    modifier onlyAuthorizedToEdit() {\n        require(entryEditPermissions.isAuthorized(msg.sender));\n        _;\n    }\n\n    modifier onlyExtantEntry(bytes32 issuanceHash) {\n        require(registry[issuanceHash].beneficiary != address(0));\n        _;\n    }\n\n    modifier nonNullBeneficiary(address beneficiary) {\n        require(beneficiary != address(0));\n        _;\n    }\n\n    /**\n     * Inserts a new entry into the registry, if the entry is valid and sender is\n     * authorized to make 'insert' mutations to the registry.\n     */\n    function insert(\n        address _version,\n        address _beneficiary,\n        address _debtor,\n        address _underwriter,\n        uint _underwriterRiskRating,\n        address _termsContract,\n        bytes32 _termsContractParameters,\n        uint _salt\n    )\n        public\n        onlyAuthorizedToInsert\n        whenNotPaused\n        nonNullBeneficiary(_beneficiary)\n        returns (bytes32 _issuanceHash)\n    {\n        Entry memory entry = Entry(\n            _version,\n            _beneficiary,\n            _underwriter,\n            _underwriterRiskRating,\n            _termsContract,\n            _termsContractParameters,\n            block.timestamp\n        );\n\n        bytes32 issuanceHash = _getIssuanceHash(entry, _debtor, _salt);\n\n        require(registry[issuanceHash].beneficiary == address(0));\n\n        registry[issuanceHash] = entry;\n\n        LogInsertEntry(\n            issuanceHash,\n            entry.beneficiary,\n            entry.underwriter,\n            entry.underwriterRiskRating,\n            entry.termsContract,\n            entry.termsContractParameters\n        );\n\n        return issuanceHash;\n    }\n\n    /**\n     * Modifies the beneficiary of a debt issuance, if the sender\n     * is authorized to make 'modifyBeneficiary' mutations to\n     * the registry.\n     */\n    function modifyBeneficiary(bytes32 issuanceHash, address newBeneficiary)\n        public\n        onlyAuthorizedToEdit\n        whenNotPaused\n        onlyExtantEntry(issuanceHash)\n        nonNullBeneficiary(newBeneficiary)\n    {\n        address previousBeneficiary = registry[issuanceHash].beneficiary;\n\n        registry[issuanceHash].beneficiary = newBeneficiary;\n\n        LogModifyEntryBeneficiary(\n            issuanceHash,\n            previousBeneficiary,\n            newBeneficiary\n        );\n    }\n\n    /**\n     * Adds an address to the list of agents authorized\n     * to make 'insert' mutations to the registry.\n     */\n    function addAuthorizedInsertAgent(address agent)\n        public\n        onlyOwner\n    {\n        entryInsertPermissions.authorize(agent);\n        LogAddAuthorizedInsertAgent(agent);\n    }\n\n    /**\n     * Adds an address to the list of agents authorized\n     * to make 'modifyBeneficiary' mutations to the registry.\n     */\n    function addAuthorizedEditAgent(address agent)\n        public\n        onlyOwner\n    {\n        entryEditPermissions.authorize(agent);\n        LogAddAuthorizedEditAgent(agent);\n    }\n\n    /**\n     * Removes an address from the list of agents authorized\n     * to make 'insert' mutations to the registry.\n     */\n    function revokeInsertAgentAuthorization(address agent)\n        public\n        onlyOwner\n    {\n        entryInsertPermissions.revokeAuthorization(agent);\n        LogRevokeInsertAgentAuthorization(agent);\n    }\n\n    /**\n     * Removes an address from the list of agents authorized\n     * to make 'modifyBeneficiary' mutations to the registry.\n     */\n    function revokeEditAgentAuthorization(address agent)\n        public\n        onlyOwner\n    {\n        entryEditPermissions.revokeAuthorization(agent);\n        LogRevokeEditAgentAuthorization(agent);\n    }\n\n    /**\n     * Returns the parameters of a debt issuance in the registry\n     */\n    function get(bytes32 issuanceHash)\n        public\n        view\n        returns(address, address, address, uint, address, bytes32, uint)\n    {\n        return (\n            registry[issuanceHash].version,\n            registry[issuanceHash].beneficiary,\n            registry[issuanceHash].underwriter,\n            registry[issuanceHash].underwriterRiskRating,\n            registry[issuanceHash].termsContract,\n            registry[issuanceHash].termsContractParameters,\n            registry[issuanceHash].issuanceBlockTimestamp\n        );\n    }\n\n    /**\n     * Returns the beneficiary of a given issuance\n     */\n    function getBeneficiary(bytes32 issuanceHash)\n        public\n        view\n        returns(address)\n    {\n        return registry[issuanceHash].beneficiary;\n    }\n\n    /**\n     * Returns the terms contract address of a given issuance\n     */\n    function getTermsContract(bytes32 issuanceHash)\n        public\n        view\n        returns (address)\n    {\n        return registry[issuanceHash].termsContract;\n    }\n\n    /**\n     * Returns the terms contract parameters of a given issuance\n     */\n    function getTermsContractParameters(bytes32 issuanceHash)\n        public\n        view\n        returns (bytes32)\n    {\n        return registry[issuanceHash].termsContractParameters;\n    }\n\n    /**\n     * Returns a tuple of the terms contract and its associated parameters\n     * for a given issuance\n     */\n    function getTerms(bytes32 issuanceHash)\n        public\n        view\n        returns(address, bytes32)\n    {\n        return (\n            registry[issuanceHash].termsContract,\n            registry[issuanceHash].termsContractParameters\n        );\n    }\n\n    /**\n     * Returns the timestamp of the block at which a debt agreement was issued.\n     */\n    function getIssuanceBlockTimestamp(bytes32 issuanceHash)\n        public\n        view\n        returns (uint timestamp)\n    {\n        return registry[issuanceHash].issuanceBlockTimestamp;\n    }\n\n    /**\n     * Returns the list of agents authorized to make 'insert' mutations\n     */\n    function getAuthorizedInsertAgents()\n        public\n        view\n        returns(address[])\n    {\n        return entryInsertPermissions.getAuthorizedAgents();\n    }\n\n    /**\n     * Returns the list of agents authorized to make 'modifyBeneficiary' mutations\n     */\n    function getAuthorizedEditAgents()\n        public\n        view\n        returns(address[])\n    {\n        return entryEditPermissions.getAuthorizedAgents();\n    }\n\n\n    /**\n     * Helper function for computing the hash of a given issuance.\n     */\n    function _getIssuanceHash(Entry _entry, address _debtor, uint _salt)\n        internal\n        pure\n        returns(bytes32)\n    {\n        return keccak256(\n            _entry.version,\n            _debtor,\n            _entry.underwriter,\n            _entry.underwriterRiskRating,\n            _entry.termsContract,\n            _entry.termsContractParameters,\n            _salt\n        );\n    }\n}\n",
    sourcePath:
        "/Users/nadavhollander/Documents/Dharma/Development/dharma.js/node_modules/charta/contracts/DebtRegistry.sol",
    ast: {
        attributes: {
            absolutePath:
                "/Users/nadavhollander/Documents/Dharma/Development/dharma.js/node_modules/charta/contracts/DebtRegistry.sol",
            exportedSymbols: {
                DebtRegistry: [1610],
            },
        },
        children: [
            {
                attributes: {
                    literals: ["solidity", "0.4", ".18"],
                },
                id: 1118,
                name: "PragmaDirective",
                src: "584:23:1",
            },
            {
                attributes: {
                    SourceUnit: 2767,
                    absolutePath:
                        "/Users/nadavhollander/Documents/Dharma/Development/dharma.js/node_modules/charta/contracts/libraries/PermissionsLib.sol",
                    file: "./libraries/PermissionsLib.sol",
                    scope: 1611,
                    symbolAliases: [null],
                    unitAlias: "",
                },
                id: 1119,
                name: "ImportDirective",
                src: "609:40:1",
            },
            {
                attributes: {
                    SourceUnit: 5359,
                    absolutePath: "zeppelin-solidity/contracts/math/SafeMath.sol",
                    file: "zeppelin-solidity/contracts/math/SafeMath.sol",
                    scope: 1611,
                    symbolAliases: [null],
                    unitAlias: "",
                },
                id: 1120,
                name: "ImportDirective",
                src: "650:55:1",
            },
            {
                attributes: {
                    SourceUnit: 5261,
                    absolutePath: "zeppelin-solidity/contracts/lifecycle/Pausable.sol",
                    file: "zeppelin-solidity/contracts/lifecycle/Pausable.sol",
                    scope: 1611,
                    symbolAliases: [null],
                    unitAlias: "",
                },
                id: 1121,
                name: "ImportDirective",
                src: "706:60:1",
            },
            {
                attributes: {
                    contractDependencies: [5260, 5414],
                    contractKind: "contract",
                    documentation:
                        "The DebtRegistry stores the parameters and beneficiaries of all debt agreements in\nDharma protocol.  It authorizes a limited number of agents to\nperform mutations on it -- those agents can be changed at any\ntime by the contract's owner.\n * Author: Nadav Hollander -- Github: nadavhollander",
                    fullyImplemented: true,
                    linearizedBaseContracts: [1610, 5260, 5414],
                    name: "DebtRegistry",
                    scope: 1611,
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
                                    name: "Pausable",
                                    referencedDeclaration: 5260,
                                    type: "contract Pausable",
                                },
                                id: 1122,
                                name: "UserDefinedTypeName",
                                src: "1107:8:1",
                            },
                        ],
                        id: 1123,
                        name: "InheritanceSpecifier",
                        src: "1107:8:1",
                    },
                    {
                        children: [
                            {
                                attributes: {
                                    contractScope: null,
                                    name: "SafeMath",
                                    referencedDeclaration: 5358,
                                    type: "library SafeMath",
                                },
                                id: 1124,
                                name: "UserDefinedTypeName",
                                src: "1128:8:1",
                            },
                            {
                                attributes: {
                                    name: "uint",
                                    type: "uint256",
                                },
                                id: 1125,
                                name: "ElementaryTypeName",
                                src: "1141:4:1",
                            },
                        ],
                        id: 1126,
                        name: "UsingForDirective",
                        src: "1122:24:1",
                    },
                    {
                        children: [
                            {
                                attributes: {
                                    contractScope: null,
                                    name: "PermissionsLib",
                                    referencedDeclaration: 2766,
                                    type: "library PermissionsLib",
                                },
                                id: 1127,
                                name: "UserDefinedTypeName",
                                src: "1157:14:1",
                            },
                            {
                                attributes: {
                                    contractScope: null,
                                    name: "PermissionsLib.Permissions",
                                    referencedDeclaration: 2600,
                                    type: "struct PermissionsLib.Permissions storage pointer",
                                },
                                id: 1128,
                                name: "UserDefinedTypeName",
                                src: "1176:26:1",
                            },
                        ],
                        id: 1129,
                        name: "UsingForDirective",
                        src: "1151:52:1",
                    },
                    {
                        attributes: {
                            canonicalName: "DebtRegistry.Entry",
                            name: "Entry",
                            scope: 1610,
                            visibility: "public",
                        },
                        children: [
                            {
                                attributes: {
                                    constant: false,
                                    name: "version",
                                    scope: 1144,
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
                                        id: 1130,
                                        name: "ElementaryTypeName",
                                        src: "1232:7:1",
                                    },
                                ],
                                id: 1131,
                                name: "VariableDeclaration",
                                src: "1232:15:1",
                            },
                            {
                                attributes: {
                                    constant: false,
                                    name: "beneficiary",
                                    scope: 1144,
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
                                        id: 1132,
                                        name: "ElementaryTypeName",
                                        src: "1257:7:1",
                                    },
                                ],
                                id: 1133,
                                name: "VariableDeclaration",
                                src: "1257:19:1",
                            },
                            {
                                attributes: {
                                    constant: false,
                                    name: "underwriter",
                                    scope: 1144,
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
                                        id: 1134,
                                        name: "ElementaryTypeName",
                                        src: "1286:7:1",
                                    },
                                ],
                                id: 1135,
                                name: "VariableDeclaration",
                                src: "1286:19:1",
                            },
                            {
                                attributes: {
                                    constant: false,
                                    name: "underwriterRiskRating",
                                    scope: 1144,
                                    stateVariable: false,
                                    storageLocation: "default",
                                    type: "uint256",
                                    value: null,
                                    visibility: "internal",
                                },
                                children: [
                                    {
                                        attributes: {
                                            name: "uint",
                                            type: "uint256",
                                        },
                                        id: 1136,
                                        name: "ElementaryTypeName",
                                        src: "1315:4:1",
                                    },
                                ],
                                id: 1137,
                                name: "VariableDeclaration",
                                src: "1315:26:1",
                            },
                            {
                                attributes: {
                                    constant: false,
                                    name: "termsContract",
                                    scope: 1144,
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
                                        id: 1138,
                                        name: "ElementaryTypeName",
                                        src: "1351:7:1",
                                    },
                                ],
                                id: 1139,
                                name: "VariableDeclaration",
                                src: "1351:21:1",
                            },
                            {
                                attributes: {
                                    constant: false,
                                    name: "termsContractParameters",
                                    scope: 1144,
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
                                        id: 1140,
                                        name: "ElementaryTypeName",
                                        src: "1382:7:1",
                                    },
                                ],
                                id: 1141,
                                name: "VariableDeclaration",
                                src: "1382:31:1",
                            },
                            {
                                attributes: {
                                    constant: false,
                                    name: "issuanceBlockTimestamp",
                                    scope: 1144,
                                    stateVariable: false,
                                    storageLocation: "default",
                                    type: "uint256",
                                    value: null,
                                    visibility: "internal",
                                },
                                children: [
                                    {
                                        attributes: {
                                            name: "uint",
                                            type: "uint256",
                                        },
                                        id: 1142,
                                        name: "ElementaryTypeName",
                                        src: "1423:4:1",
                                    },
                                ],
                                id: 1143,
                                name: "VariableDeclaration",
                                src: "1423:27:1",
                            },
                        ],
                        id: 1144,
                        name: "StructDefinition",
                        src: "1209:248:1",
                    },
                    {
                        attributes: {
                            constant: false,
                            name: "registry",
                            scope: 1610,
                            stateVariable: true,
                            storageLocation: "default",
                            type: "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                            value: null,
                            visibility: "internal",
                        },
                        children: [
                            {
                                attributes: {
                                    type:
                                        "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                },
                                children: [
                                    {
                                        attributes: {
                                            name: "bytes32",
                                            type: "bytes32",
                                        },
                                        id: 1145,
                                        name: "ElementaryTypeName",
                                        src: "1551:7:1",
                                    },
                                    {
                                        attributes: {
                                            contractScope: null,
                                            name: "Entry",
                                            referencedDeclaration: 1144,
                                            type: "struct DebtRegistry.Entry storage pointer",
                                        },
                                        id: 1146,
                                        name: "UserDefinedTypeName",
                                        src: "1562:5:1",
                                    },
                                ],
                                id: 1147,
                                name: "Mapping",
                                src: "1542:26:1",
                            },
                        ],
                        id: 1148,
                        name: "VariableDeclaration",
                        src: "1542:44:1",
                    },
                    {
                        attributes: {
                            constant: false,
                            name: "entryInsertPermissions",
                            scope: 1610,
                            stateVariable: true,
                            storageLocation: "default",
                            type: "struct PermissionsLib.Permissions storage ref",
                            value: null,
                            visibility: "internal",
                        },
                        children: [
                            {
                                attributes: {
                                    contractScope: null,
                                    name: "PermissionsLib.Permissions",
                                    referencedDeclaration: 2600,
                                    type: "struct PermissionsLib.Permissions storage pointer",
                                },
                                id: 1149,
                                name: "UserDefinedTypeName",
                                src: "1593:26:1",
                            },
                        ],
                        id: 1150,
                        name: "VariableDeclaration",
                        src: "1593:58:1",
                    },
                    {
                        attributes: {
                            constant: false,
                            name: "entryEditPermissions",
                            scope: 1610,
                            stateVariable: true,
                            storageLocation: "default",
                            type: "struct PermissionsLib.Permissions storage ref",
                            value: null,
                            visibility: "internal",
                        },
                        children: [
                            {
                                attributes: {
                                    contractScope: null,
                                    name: "PermissionsLib.Permissions",
                                    referencedDeclaration: 2600,
                                    type: "struct PermissionsLib.Permissions storage pointer",
                                },
                                id: 1151,
                                name: "UserDefinedTypeName",
                                src: "1657:26:1",
                            },
                        ],
                        id: 1152,
                        name: "VariableDeclaration",
                        src: "1657:56:1",
                    },
                    {
                        attributes: {
                            anonymous: false,
                            name: "LogInsertEntry",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: true,
                                            name: "issuanceHash",
                                            scope: 1166,
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
                                                id: 1153,
                                                name: "ElementaryTypeName",
                                                src: "1750:7:1",
                                            },
                                        ],
                                        id: 1154,
                                        name: "VariableDeclaration",
                                        src: "1750:28:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: true,
                                            name: "beneficiary",
                                            scope: 1166,
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
                                                id: 1155,
                                                name: "ElementaryTypeName",
                                                src: "1788:7:1",
                                            },
                                        ],
                                        id: 1156,
                                        name: "VariableDeclaration",
                                        src: "1788:27:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: true,
                                            name: "underwriter",
                                            scope: 1166,
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
                                                id: 1157,
                                                name: "ElementaryTypeName",
                                                src: "1825:7:1",
                                            },
                                        ],
                                        id: 1158,
                                        name: "VariableDeclaration",
                                        src: "1825:27:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: false,
                                            name: "underwriterRiskRating",
                                            scope: 1166,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint",
                                                    type: "uint256",
                                                },
                                                id: 1159,
                                                name: "ElementaryTypeName",
                                                src: "1862:4:1",
                                            },
                                        ],
                                        id: 1160,
                                        name: "VariableDeclaration",
                                        src: "1862:26:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: false,
                                            name: "termsContract",
                                            scope: 1166,
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
                                                id: 1161,
                                                name: "ElementaryTypeName",
                                                src: "1898:7:1",
                                            },
                                        ],
                                        id: 1162,
                                        name: "VariableDeclaration",
                                        src: "1898:21:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: false,
                                            name: "termsContractParameters",
                                            scope: 1166,
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
                                                id: 1163,
                                                name: "ElementaryTypeName",
                                                src: "1929:7:1",
                                            },
                                        ],
                                        id: 1164,
                                        name: "VariableDeclaration",
                                        src: "1929:31:1",
                                    },
                                ],
                                id: 1165,
                                name: "ParameterList",
                                src: "1740:226:1",
                            },
                        ],
                        id: 1166,
                        name: "EventDefinition",
                        src: "1720:247:1",
                    },
                    {
                        attributes: {
                            anonymous: false,
                            name: "LogModifyEntryBeneficiary",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: true,
                                            name: "issuanceHash",
                                            scope: 1174,
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
                                                id: 1167,
                                                name: "ElementaryTypeName",
                                                src: "2014:7:1",
                                            },
                                        ],
                                        id: 1168,
                                        name: "VariableDeclaration",
                                        src: "2014:28:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: true,
                                            name: "previousBeneficiary",
                                            scope: 1174,
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
                                                id: 1169,
                                                name: "ElementaryTypeName",
                                                src: "2052:7:1",
                                            },
                                        ],
                                        id: 1170,
                                        name: "VariableDeclaration",
                                        src: "2052:35:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: true,
                                            name: "newBeneficiary",
                                            scope: 1174,
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
                                                id: 1171,
                                                name: "ElementaryTypeName",
                                                src: "2097:7:1",
                                            },
                                        ],
                                        id: 1172,
                                        name: "VariableDeclaration",
                                        src: "2097:30:1",
                                    },
                                ],
                                id: 1173,
                                name: "ParameterList",
                                src: "2004:129:1",
                            },
                        ],
                        id: 1174,
                        name: "EventDefinition",
                        src: "1973:161:1",
                    },
                    {
                        attributes: {
                            anonymous: false,
                            name: "LogAddAuthorizedInsertAgent",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: false,
                                            name: "agent",
                                            scope: 1178,
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
                                                id: 1175,
                                                name: "ElementaryTypeName",
                                                src: "2183:7:1",
                                            },
                                        ],
                                        id: 1176,
                                        name: "VariableDeclaration",
                                        src: "2183:13:1",
                                    },
                                ],
                                id: 1177,
                                name: "ParameterList",
                                src: "2173:29:1",
                            },
                        ],
                        id: 1178,
                        name: "EventDefinition",
                        src: "2140:63:1",
                    },
                    {
                        attributes: {
                            anonymous: false,
                            name: "LogAddAuthorizedEditAgent",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: false,
                                            name: "agent",
                                            scope: 1182,
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
                                                id: 1179,
                                                name: "ElementaryTypeName",
                                                src: "2250:7:1",
                                            },
                                        ],
                                        id: 1180,
                                        name: "VariableDeclaration",
                                        src: "2250:13:1",
                                    },
                                ],
                                id: 1181,
                                name: "ParameterList",
                                src: "2240:29:1",
                            },
                        ],
                        id: 1182,
                        name: "EventDefinition",
                        src: "2209:61:1",
                    },
                    {
                        attributes: {
                            anonymous: false,
                            name: "LogRevokeInsertAgentAuthorization",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: false,
                                            name: "agent",
                                            scope: 1186,
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
                                                id: 1183,
                                                name: "ElementaryTypeName",
                                                src: "2325:7:1",
                                            },
                                        ],
                                        id: 1184,
                                        name: "VariableDeclaration",
                                        src: "2325:13:1",
                                    },
                                ],
                                id: 1185,
                                name: "ParameterList",
                                src: "2315:29:1",
                            },
                        ],
                        id: 1186,
                        name: "EventDefinition",
                        src: "2276:69:1",
                    },
                    {
                        attributes: {
                            anonymous: false,
                            name: "LogRevokeEditAgentAuthorization",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            indexed: false,
                                            name: "agent",
                                            scope: 1190,
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
                                                id: 1187,
                                                name: "ElementaryTypeName",
                                                src: "2398:7:1",
                                            },
                                        ],
                                        id: 1188,
                                        name: "VariableDeclaration",
                                        src: "2398:13:1",
                                    },
                                ],
                                id: 1189,
                                name: "ParameterList",
                                src: "2388:29:1",
                            },
                        ],
                        id: 1190,
                        name: "EventDefinition",
                        src: "2351:67:1",
                    },
                    {
                        attributes: {
                            name: "onlyAuthorizedToInsert",
                            visibility: "internal",
                        },
                        children: [
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 1191,
                                name: "ParameterList",
                                src: "2455:2:1",
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
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
                                                    type_conversion: false,
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: [
                                                                {
                                                                    typeIdentifier: "t_bool",
                                                                    typeString: "bool",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 5941,
                                                            type: "function (bool) pure",
                                                            value: "require",
                                                        },
                                                        id: 1192,
                                                        name: "Identifier",
                                                        src: "2468:7:1",
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
                                                            type: "bool",
                                                            type_conversion: false,
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: [
                                                                        {
                                                                            typeIdentifier:
                                                                                "t_address",
                                                                            typeString: "address",
                                                                        },
                                                                    ],
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    member_name: "isAuthorized",
                                                                    referencedDeclaration: 2737,
                                                                    type:
                                                                        "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1150,
                                                                            type:
                                                                                "struct PermissionsLib.Permissions storage ref",
                                                                            value:
                                                                                "entryInsertPermissions",
                                                                        },
                                                                        id: 1193,
                                                                        name: "Identifier",
                                                                        src: "2476:22:1",
                                                                    },
                                                                ],
                                                                id: 1194,
                                                                name: "MemberAccess",
                                                                src: "2476:35:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: false,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    member_name: "sender",
                                                                    referencedDeclaration: null,
                                                                    type: "address",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 5938,
                                                                            type: "msg",
                                                                            value: "msg",
                                                                        },
                                                                        id: 1195,
                                                                        name: "Identifier",
                                                                        src: "2512:3:1",
                                                                    },
                                                                ],
                                                                id: 1196,
                                                                name: "MemberAccess",
                                                                src: "2512:10:1",
                                                            },
                                                        ],
                                                        id: 1197,
                                                        name: "FunctionCall",
                                                        src: "2476:47:1",
                                                    },
                                                ],
                                                id: 1198,
                                                name: "FunctionCall",
                                                src: "2468:56:1",
                                            },
                                        ],
                                        id: 1199,
                                        name: "ExpressionStatement",
                                        src: "2468:56:1",
                                    },
                                    {
                                        id: 1200,
                                        name: "PlaceholderStatement",
                                        src: "2534:1:1",
                                    },
                                ],
                                id: 1201,
                                name: "Block",
                                src: "2458:84:1",
                            },
                        ],
                        id: 1202,
                        name: "ModifierDefinition",
                        src: "2424:118:1",
                    },
                    {
                        attributes: {
                            name: "onlyAuthorizedToEdit",
                            visibility: "internal",
                        },
                        children: [
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 1203,
                                name: "ParameterList",
                                src: "2577:2:1",
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
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
                                                    type_conversion: false,
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: [
                                                                {
                                                                    typeIdentifier: "t_bool",
                                                                    typeString: "bool",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 5941,
                                                            type: "function (bool) pure",
                                                            value: "require",
                                                        },
                                                        id: 1204,
                                                        name: "Identifier",
                                                        src: "2590:7:1",
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
                                                            type: "bool",
                                                            type_conversion: false,
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: [
                                                                        {
                                                                            typeIdentifier:
                                                                                "t_address",
                                                                            typeString: "address",
                                                                        },
                                                                    ],
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    member_name: "isAuthorized",
                                                                    referencedDeclaration: 2737,
                                                                    type:
                                                                        "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1152,
                                                                            type:
                                                                                "struct PermissionsLib.Permissions storage ref",
                                                                            value:
                                                                                "entryEditPermissions",
                                                                        },
                                                                        id: 1205,
                                                                        name: "Identifier",
                                                                        src: "2598:20:1",
                                                                    },
                                                                ],
                                                                id: 1206,
                                                                name: "MemberAccess",
                                                                src: "2598:33:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: false,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    member_name: "sender",
                                                                    referencedDeclaration: null,
                                                                    type: "address",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 5938,
                                                                            type: "msg",
                                                                            value: "msg",
                                                                        },
                                                                        id: 1207,
                                                                        name: "Identifier",
                                                                        src: "2632:3:1",
                                                                    },
                                                                ],
                                                                id: 1208,
                                                                name: "MemberAccess",
                                                                src: "2632:10:1",
                                                            },
                                                        ],
                                                        id: 1209,
                                                        name: "FunctionCall",
                                                        src: "2598:45:1",
                                                    },
                                                ],
                                                id: 1210,
                                                name: "FunctionCall",
                                                src: "2590:54:1",
                                            },
                                        ],
                                        id: 1211,
                                        name: "ExpressionStatement",
                                        src: "2590:54:1",
                                    },
                                    {
                                        id: 1212,
                                        name: "PlaceholderStatement",
                                        src: "2654:1:1",
                                    },
                                ],
                                id: 1213,
                                name: "Block",
                                src: "2580:82:1",
                            },
                        ],
                        id: 1214,
                        name: "ModifierDefinition",
                        src: "2548:114:1",
                    },
                    {
                        attributes: {
                            name: "onlyExtantEntry",
                            visibility: "internal",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "issuanceHash",
                                            scope: 1231,
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
                                                id: 1215,
                                                name: "ElementaryTypeName",
                                                src: "2693:7:1",
                                            },
                                        ],
                                        id: 1216,
                                        name: "VariableDeclaration",
                                        src: "2693:20:1",
                                    },
                                ],
                                id: 1217,
                                name: "ParameterList",
                                src: "2692:22:1",
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
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
                                                    type_conversion: false,
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: [
                                                                {
                                                                    typeIdentifier: "t_bool",
                                                                    typeString: "bool",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 5941,
                                                            type: "function (bool) pure",
                                                            value: "require",
                                                        },
                                                        id: 1218,
                                                        name: "Identifier",
                                                        src: "2725:7:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            commonType: {
                                                                typeIdentifier: "t_address",
                                                                typeString: "address",
                                                            },
                                                            isConstant: false,
                                                            isLValue: false,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            operator: "!=",
                                                            type: "bool",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    member_name: "beneficiary",
                                                                    referencedDeclaration: 1133,
                                                                    type: "address",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            isConstant: false,
                                                                            isLValue: true,
                                                                            isPure: false,
                                                                            lValueRequested: false,
                                                                            type:
                                                                                "struct DebtRegistry.Entry storage ref",
                                                                        },
                                                                        children: [
                                                                            {
                                                                                attributes: {
                                                                                    argumentTypes: null,
                                                                                    overloadedDeclarations: [
                                                                                        null,
                                                                                    ],
                                                                                    referencedDeclaration: 1148,
                                                                                    type:
                                                                                        "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                                    value:
                                                                                        "registry",
                                                                                },
                                                                                id: 1219,
                                                                                name: "Identifier",
                                                                                src: "2733:8:1",
                                                                            },
                                                                            {
                                                                                attributes: {
                                                                                    argumentTypes: null,
                                                                                    overloadedDeclarations: [
                                                                                        null,
                                                                                    ],
                                                                                    referencedDeclaration: 1216,
                                                                                    type: "bytes32",
                                                                                    value:
                                                                                        "issuanceHash",
                                                                                },
                                                                                id: 1220,
                                                                                name: "Identifier",
                                                                                src: "2742:12:1",
                                                                            },
                                                                        ],
                                                                        id: 1221,
                                                                        name: "IndexAccess",
                                                                        src: "2733:22:1",
                                                                    },
                                                                ],
                                                                id: 1222,
                                                                name: "MemberAccess",
                                                                src: "2733:34:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: false,
                                                                    isPure: true,
                                                                    isStructConstructorCall: false,
                                                                    lValueRequested: false,
                                                                    names: [null],
                                                                    type: "address",
                                                                    type_conversion: true,
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: [
                                                                                {
                                                                                    typeIdentifier:
                                                                                        "t_rational_0_by_1",
                                                                                    typeString:
                                                                                        "int_const 0",
                                                                                },
                                                                            ],
                                                                            isConstant: false,
                                                                            isLValue: false,
                                                                            isPure: true,
                                                                            lValueRequested: false,
                                                                            type: "type(address)",
                                                                            value: "address",
                                                                        },
                                                                        id: 1223,
                                                                        name:
                                                                            "ElementaryTypeNameExpression",
                                                                        src: "2771:7:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            hexvalue: "30",
                                                                            isConstant: false,
                                                                            isLValue: false,
                                                                            isPure: true,
                                                                            lValueRequested: false,
                                                                            subdenomination: null,
                                                                            token: "number",
                                                                            type: "int_const 0",
                                                                            value: "0",
                                                                        },
                                                                        id: 1224,
                                                                        name: "Literal",
                                                                        src: "2779:1:1",
                                                                    },
                                                                ],
                                                                id: 1225,
                                                                name: "FunctionCall",
                                                                src: "2771:10:1",
                                                            },
                                                        ],
                                                        id: 1226,
                                                        name: "BinaryOperation",
                                                        src: "2733:48:1",
                                                    },
                                                ],
                                                id: 1227,
                                                name: "FunctionCall",
                                                src: "2725:57:1",
                                            },
                                        ],
                                        id: 1228,
                                        name: "ExpressionStatement",
                                        src: "2725:57:1",
                                    },
                                    {
                                        id: 1229,
                                        name: "PlaceholderStatement",
                                        src: "2792:1:1",
                                    },
                                ],
                                id: 1230,
                                name: "Block",
                                src: "2715:85:1",
                            },
                        ],
                        id: 1231,
                        name: "ModifierDefinition",
                        src: "2668:132:1",
                    },
                    {
                        attributes: {
                            name: "nonNullBeneficiary",
                            visibility: "internal",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "beneficiary",
                                            scope: 1245,
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
                                                id: 1232,
                                                name: "ElementaryTypeName",
                                                src: "2834:7:1",
                                            },
                                        ],
                                        id: 1233,
                                        name: "VariableDeclaration",
                                        src: "2834:19:1",
                                    },
                                ],
                                id: 1234,
                                name: "ParameterList",
                                src: "2833:21:1",
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
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
                                                    type_conversion: false,
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: [
                                                                {
                                                                    typeIdentifier: "t_bool",
                                                                    typeString: "bool",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 5941,
                                                            type: "function (bool) pure",
                                                            value: "require",
                                                        },
                                                        id: 1235,
                                                        name: "Identifier",
                                                        src: "2865:7:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            commonType: {
                                                                typeIdentifier: "t_address",
                                                                typeString: "address",
                                                            },
                                                            isConstant: false,
                                                            isLValue: false,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            operator: "!=",
                                                            type: "bool",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1233,
                                                                    type: "address",
                                                                    value: "beneficiary",
                                                                },
                                                                id: 1236,
                                                                name: "Identifier",
                                                                src: "2873:11:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: false,
                                                                    isPure: true,
                                                                    isStructConstructorCall: false,
                                                                    lValueRequested: false,
                                                                    names: [null],
                                                                    type: "address",
                                                                    type_conversion: true,
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: [
                                                                                {
                                                                                    typeIdentifier:
                                                                                        "t_rational_0_by_1",
                                                                                    typeString:
                                                                                        "int_const 0",
                                                                                },
                                                                            ],
                                                                            isConstant: false,
                                                                            isLValue: false,
                                                                            isPure: true,
                                                                            lValueRequested: false,
                                                                            type: "type(address)",
                                                                            value: "address",
                                                                        },
                                                                        id: 1237,
                                                                        name:
                                                                            "ElementaryTypeNameExpression",
                                                                        src: "2888:7:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            hexvalue: "30",
                                                                            isConstant: false,
                                                                            isLValue: false,
                                                                            isPure: true,
                                                                            lValueRequested: false,
                                                                            subdenomination: null,
                                                                            token: "number",
                                                                            type: "int_const 0",
                                                                            value: "0",
                                                                        },
                                                                        id: 1238,
                                                                        name: "Literal",
                                                                        src: "2896:1:1",
                                                                    },
                                                                ],
                                                                id: 1239,
                                                                name: "FunctionCall",
                                                                src: "2888:10:1",
                                                            },
                                                        ],
                                                        id: 1240,
                                                        name: "BinaryOperation",
                                                        src: "2873:25:1",
                                                    },
                                                ],
                                                id: 1241,
                                                name: "FunctionCall",
                                                src: "2865:34:1",
                                            },
                                        ],
                                        id: 1242,
                                        name: "ExpressionStatement",
                                        src: "2865:34:1",
                                    },
                                    {
                                        id: 1243,
                                        name: "PlaceholderStatement",
                                        src: "2909:1:1",
                                    },
                                ],
                                id: 1244,
                                name: "Block",
                                src: "2855:62:1",
                            },
                        ],
                        id: 1245,
                        name: "ModifierDefinition",
                        src: "2806:111:1",
                    },
                    {
                        attributes: {
                            constant: false,
                            implemented: true,
                            isConstructor: false,
                            name: "insert",
                            payable: false,
                            scope: 1610,
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
                                            name: "_version",
                                            scope: 1328,
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
                                                id: 1246,
                                                name: "ElementaryTypeName",
                                                src: "3108:7:1",
                                            },
                                        ],
                                        id: 1247,
                                        name: "VariableDeclaration",
                                        src: "3108:16:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_beneficiary",
                                            scope: 1328,
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
                                                id: 1248,
                                                name: "ElementaryTypeName",
                                                src: "3134:7:1",
                                            },
                                        ],
                                        id: 1249,
                                        name: "VariableDeclaration",
                                        src: "3134:20:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_debtor",
                                            scope: 1328,
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
                                                id: 1250,
                                                name: "ElementaryTypeName",
                                                src: "3164:7:1",
                                            },
                                        ],
                                        id: 1251,
                                        name: "VariableDeclaration",
                                        src: "3164:15:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_underwriter",
                                            scope: 1328,
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
                                                id: 1252,
                                                name: "ElementaryTypeName",
                                                src: "3189:7:1",
                                            },
                                        ],
                                        id: 1253,
                                        name: "VariableDeclaration",
                                        src: "3189:20:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_underwriterRiskRating",
                                            scope: 1328,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint",
                                                    type: "uint256",
                                                },
                                                id: 1254,
                                                name: "ElementaryTypeName",
                                                src: "3219:4:1",
                                            },
                                        ],
                                        id: 1255,
                                        name: "VariableDeclaration",
                                        src: "3219:27:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_termsContract",
                                            scope: 1328,
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
                                                id: 1256,
                                                name: "ElementaryTypeName",
                                                src: "3256:7:1",
                                            },
                                        ],
                                        id: 1257,
                                        name: "VariableDeclaration",
                                        src: "3256:22:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_termsContractParameters",
                                            scope: 1328,
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
                                                id: 1258,
                                                name: "ElementaryTypeName",
                                                src: "3288:7:1",
                                            },
                                        ],
                                        id: 1259,
                                        name: "VariableDeclaration",
                                        src: "3288:32:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_salt",
                                            scope: 1328,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint",
                                                    type: "uint256",
                                                },
                                                id: 1260,
                                                name: "ElementaryTypeName",
                                                src: "3330:4:1",
                                            },
                                        ],
                                        id: 1261,
                                        name: "VariableDeclaration",
                                        src: "3330:10:1",
                                    },
                                ],
                                id: 1262,
                                name: "ParameterList",
                                src: "3098:248:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_issuanceHash",
                                            scope: 1328,
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
                                                id: 1270,
                                                name: "ElementaryTypeName",
                                                src: "3473:7:1",
                                            },
                                        ],
                                        id: 1271,
                                        name: "VariableDeclaration",
                                        src: "3473:21:1",
                                    },
                                ],
                                id: 1272,
                                name: "ParameterList",
                                src: "3472:23:1",
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
                                            referencedDeclaration: 1202,
                                            type: "modifier ()",
                                            value: "onlyAuthorizedToInsert",
                                        },
                                        id: 1263,
                                        name: "Identifier",
                                        src: "3370:22:1",
                                    },
                                ],
                                id: 1264,
                                name: "ModifierInvocation",
                                src: "3370:22:1",
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
                                            referencedDeclaration: 5221,
                                            type: "modifier ()",
                                            value: "whenNotPaused",
                                        },
                                        id: 1265,
                                        name: "Identifier",
                                        src: "3401:13:1",
                                    },
                                ],
                                id: 1266,
                                name: "ModifierInvocation",
                                src: "3401:13:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            argumentTypes: null,
                                            overloadedDeclarations: [null],
                                            referencedDeclaration: 1245,
                                            type: "modifier (address)",
                                            value: "nonNullBeneficiary",
                                        },
                                        id: 1267,
                                        name: "Identifier",
                                        src: "3423:18:1",
                                    },
                                    {
                                        attributes: {
                                            argumentTypes: null,
                                            overloadedDeclarations: [null],
                                            referencedDeclaration: 1249,
                                            type: "address",
                                            value: "_beneficiary",
                                        },
                                        id: 1268,
                                        name: "Identifier",
                                        src: "3442:12:1",
                                    },
                                ],
                                id: 1269,
                                name: "ModifierInvocation",
                                src: "3423:32:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            assignments: [1274],
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    constant: false,
                                                    name: "entry",
                                                    scope: 1328,
                                                    stateVariable: false,
                                                    storageLocation: "memory",
                                                    type: "struct DebtRegistry.Entry memory",
                                                    value: null,
                                                    visibility: "internal",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            contractScope: null,
                                                            name: "Entry",
                                                            referencedDeclaration: 1144,
                                                            type:
                                                                "struct DebtRegistry.Entry storage pointer",
                                                        },
                                                        id: 1273,
                                                        name: "UserDefinedTypeName",
                                                        src: "3510:5:1",
                                                    },
                                                ],
                                                id: 1274,
                                                name: "VariableDeclaration",
                                                src: "3510:18:1",
                                            },
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: true,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "struct DebtRegistry.Entry memory",
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
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_uint256",
                                                                    typeString: "uint256",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_bytes32",
                                                                    typeString: "bytes32",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_uint256",
                                                                    typeString: "uint256",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1144,
                                                            type:
                                                                "type(struct DebtRegistry.Entry storage pointer)",
                                                            value: "Entry",
                                                        },
                                                        id: 1275,
                                                        name: "Identifier",
                                                        src: "3531:5:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1247,
                                                            type: "address",
                                                            value: "_version",
                                                        },
                                                        id: 1276,
                                                        name: "Identifier",
                                                        src: "3550:8:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1249,
                                                            type: "address",
                                                            value: "_beneficiary",
                                                        },
                                                        id: 1277,
                                                        name: "Identifier",
                                                        src: "3572:12:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1253,
                                                            type: "address",
                                                            value: "_underwriter",
                                                        },
                                                        id: 1278,
                                                        name: "Identifier",
                                                        src: "3598:12:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1255,
                                                            type: "uint256",
                                                            value: "_underwriterRiskRating",
                                                        },
                                                        id: 1279,
                                                        name: "Identifier",
                                                        src: "3624:22:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1257,
                                                            type: "address",
                                                            value: "_termsContract",
                                                        },
                                                        id: 1280,
                                                        name: "Identifier",
                                                        src: "3660:14:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1259,
                                                            type: "bytes32",
                                                            value: "_termsContractParameters",
                                                        },
                                                        id: 1281,
                                                        name: "Identifier",
                                                        src: "3688:24:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: false,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "timestamp",
                                                            referencedDeclaration: null,
                                                            type: "uint256",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 5930,
                                                                    type: "block",
                                                                    value: "block",
                                                                },
                                                                id: 1282,
                                                                name: "Identifier",
                                                                src: "3726:5:1",
                                                            },
                                                        ],
                                                        id: 1283,
                                                        name: "MemberAccess",
                                                        src: "3726:15:1",
                                                    },
                                                ],
                                                id: 1284,
                                                name: "FunctionCall",
                                                src: "3531:220:1",
                                            },
                                        ],
                                        id: 1285,
                                        name: "VariableDeclarationStatement",
                                        src: "3510:241:1",
                                    },
                                    {
                                        attributes: {
                                            assignments: [1287],
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    constant: false,
                                                    name: "issuanceHash",
                                                    scope: 1328,
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
                                                        id: 1286,
                                                        name: "ElementaryTypeName",
                                                        src: "3762:7:1",
                                                    },
                                                ],
                                                id: 1287,
                                                name: "VariableDeclaration",
                                                src: "3762:20:1",
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
                                                                    typeIdentifier:
                                                                        "t_struct$_Entry_$1144_memory_ptr",
                                                                    typeString:
                                                                        "struct DebtRegistry.Entry memory",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_uint256",
                                                                    typeString: "uint256",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1609,
                                                            type:
                                                                "function (struct DebtRegistry.Entry memory,address,uint256) pure returns (bytes32)",
                                                            value: "_getIssuanceHash",
                                                        },
                                                        id: 1288,
                                                        name: "Identifier",
                                                        src: "3785:16:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1274,
                                                            type:
                                                                "struct DebtRegistry.Entry memory",
                                                            value: "entry",
                                                        },
                                                        id: 1289,
                                                        name: "Identifier",
                                                        src: "3802:5:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1251,
                                                            type: "address",
                                                            value: "_debtor",
                                                        },
                                                        id: 1290,
                                                        name: "Identifier",
                                                        src: "3809:7:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1261,
                                                            type: "uint256",
                                                            value: "_salt",
                                                        },
                                                        id: 1291,
                                                        name: "Identifier",
                                                        src: "3818:5:1",
                                                    },
                                                ],
                                                id: 1292,
                                                name: "FunctionCall",
                                                src: "3785:39:1",
                                            },
                                        ],
                                        id: 1293,
                                        name: "VariableDeclarationStatement",
                                        src: "3762:62:1",
                                    },
                                    {
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
                                                    type_conversion: false,
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: [
                                                                {
                                                                    typeIdentifier: "t_bool",
                                                                    typeString: "bool",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 5941,
                                                            type: "function (bool) pure",
                                                            value: "require",
                                                        },
                                                        id: 1294,
                                                        name: "Identifier",
                                                        src: "3835:7:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            commonType: {
                                                                typeIdentifier: "t_address",
                                                                typeString: "address",
                                                            },
                                                            isConstant: false,
                                                            isLValue: false,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            operator: "==",
                                                            type: "bool",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    member_name: "beneficiary",
                                                                    referencedDeclaration: 1133,
                                                                    type: "address",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            isConstant: false,
                                                                            isLValue: true,
                                                                            isPure: false,
                                                                            lValueRequested: false,
                                                                            type:
                                                                                "struct DebtRegistry.Entry storage ref",
                                                                        },
                                                                        children: [
                                                                            {
                                                                                attributes: {
                                                                                    argumentTypes: null,
                                                                                    overloadedDeclarations: [
                                                                                        null,
                                                                                    ],
                                                                                    referencedDeclaration: 1148,
                                                                                    type:
                                                                                        "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                                    value:
                                                                                        "registry",
                                                                                },
                                                                                id: 1295,
                                                                                name: "Identifier",
                                                                                src: "3843:8:1",
                                                                            },
                                                                            {
                                                                                attributes: {
                                                                                    argumentTypes: null,
                                                                                    overloadedDeclarations: [
                                                                                        null,
                                                                                    ],
                                                                                    referencedDeclaration: 1287,
                                                                                    type: "bytes32",
                                                                                    value:
                                                                                        "issuanceHash",
                                                                                },
                                                                                id: 1296,
                                                                                name: "Identifier",
                                                                                src: "3852:12:1",
                                                                            },
                                                                        ],
                                                                        id: 1297,
                                                                        name: "IndexAccess",
                                                                        src: "3843:22:1",
                                                                    },
                                                                ],
                                                                id: 1298,
                                                                name: "MemberAccess",
                                                                src: "3843:34:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: false,
                                                                    isPure: true,
                                                                    isStructConstructorCall: false,
                                                                    lValueRequested: false,
                                                                    names: [null],
                                                                    type: "address",
                                                                    type_conversion: true,
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: [
                                                                                {
                                                                                    typeIdentifier:
                                                                                        "t_rational_0_by_1",
                                                                                    typeString:
                                                                                        "int_const 0",
                                                                                },
                                                                            ],
                                                                            isConstant: false,
                                                                            isLValue: false,
                                                                            isPure: true,
                                                                            lValueRequested: false,
                                                                            type: "type(address)",
                                                                            value: "address",
                                                                        },
                                                                        id: 1299,
                                                                        name:
                                                                            "ElementaryTypeNameExpression",
                                                                        src: "3881:7:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            hexvalue: "30",
                                                                            isConstant: false,
                                                                            isLValue: false,
                                                                            isPure: true,
                                                                            lValueRequested: false,
                                                                            subdenomination: null,
                                                                            token: "number",
                                                                            type: "int_const 0",
                                                                            value: "0",
                                                                        },
                                                                        id: 1300,
                                                                        name: "Literal",
                                                                        src: "3889:1:1",
                                                                    },
                                                                ],
                                                                id: 1301,
                                                                name: "FunctionCall",
                                                                src: "3881:10:1",
                                                            },
                                                        ],
                                                        id: 1302,
                                                        name: "BinaryOperation",
                                                        src: "3843:48:1",
                                                    },
                                                ],
                                                id: 1303,
                                                name: "FunctionCall",
                                                src: "3835:57:1",
                                            },
                                        ],
                                        id: 1304,
                                        name: "ExpressionStatement",
                                        src: "3835:57:1",
                                    },
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
                                                    type: "struct DebtRegistry.Entry storage ref",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: true,
                                                            type:
                                                                "struct DebtRegistry.Entry storage ref",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1148,
                                                                    type:
                                                                        "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                    value: "registry",
                                                                },
                                                                id: 1305,
                                                                name: "Identifier",
                                                                src: "3903:8:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1287,
                                                                    type: "bytes32",
                                                                    value: "issuanceHash",
                                                                },
                                                                id: 1306,
                                                                name: "Identifier",
                                                                src: "3912:12:1",
                                                            },
                                                        ],
                                                        id: 1307,
                                                        name: "IndexAccess",
                                                        src: "3903:22:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1274,
                                                            type:
                                                                "struct DebtRegistry.Entry memory",
                                                            value: "entry",
                                                        },
                                                        id: 1308,
                                                        name: "Identifier",
                                                        src: "3928:5:1",
                                                    },
                                                ],
                                                id: 1309,
                                                name: "Assignment",
                                                src: "3903:30:1",
                                            },
                                        ],
                                        id: 1310,
                                        name: "ExpressionStatement",
                                        src: "3903:30:1",
                                    },
                                    {
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
                                                    type_conversion: false,
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: [
                                                                {
                                                                    typeIdentifier: "t_bytes32",
                                                                    typeString: "bytes32",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_uint256",
                                                                    typeString: "uint256",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_bytes32",
                                                                    typeString: "bytes32",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1166,
                                                            type:
                                                                "function (bytes32,address,address,uint256,address,bytes32)",
                                                            value: "LogInsertEntry",
                                                        },
                                                        id: 1311,
                                                        name: "Identifier",
                                                        src: "3944:14:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1287,
                                                            type: "bytes32",
                                                            value: "issuanceHash",
                                                        },
                                                        id: 1312,
                                                        name: "Identifier",
                                                        src: "3972:12:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "beneficiary",
                                                            referencedDeclaration: 1133,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1274,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "entry",
                                                                },
                                                                id: 1313,
                                                                name: "Identifier",
                                                                src: "3998:5:1",
                                                            },
                                                        ],
                                                        id: 1314,
                                                        name: "MemberAccess",
                                                        src: "3998:17:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "underwriter",
                                                            referencedDeclaration: 1135,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1274,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "entry",
                                                                },
                                                                id: 1315,
                                                                name: "Identifier",
                                                                src: "4029:5:1",
                                                            },
                                                        ],
                                                        id: 1316,
                                                        name: "MemberAccess",
                                                        src: "4029:17:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "underwriterRiskRating",
                                                            referencedDeclaration: 1137,
                                                            type: "uint256",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1274,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "entry",
                                                                },
                                                                id: 1317,
                                                                name: "Identifier",
                                                                src: "4060:5:1",
                                                            },
                                                        ],
                                                        id: 1318,
                                                        name: "MemberAccess",
                                                        src: "4060:27:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "termsContract",
                                                            referencedDeclaration: 1139,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1274,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "entry",
                                                                },
                                                                id: 1319,
                                                                name: "Identifier",
                                                                src: "4101:5:1",
                                                            },
                                                        ],
                                                        id: 1320,
                                                        name: "MemberAccess",
                                                        src: "4101:19:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "termsContractParameters",
                                                            referencedDeclaration: 1141,
                                                            type: "bytes32",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1274,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "entry",
                                                                },
                                                                id: 1321,
                                                                name: "Identifier",
                                                                src: "4134:5:1",
                                                            },
                                                        ],
                                                        id: 1322,
                                                        name: "MemberAccess",
                                                        src: "4134:29:1",
                                                    },
                                                ],
                                                id: 1323,
                                                name: "FunctionCall",
                                                src: "3944:229:1",
                                            },
                                        ],
                                        id: 1324,
                                        name: "ExpressionStatement",
                                        src: "3944:229:1",
                                    },
                                    {
                                        attributes: {
                                            functionReturnParameters: 1272,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    overloadedDeclarations: [null],
                                                    referencedDeclaration: 1287,
                                                    type: "bytes32",
                                                    value: "issuanceHash",
                                                },
                                                id: 1325,
                                                name: "Identifier",
                                                src: "4191:12:1",
                                            },
                                        ],
                                        id: 1326,
                                        name: "Return",
                                        src: "4184:19:1",
                                    },
                                ],
                                id: 1327,
                                name: "Block",
                                src: "3500:710:1",
                            },
                        ],
                        id: 1328,
                        name: "FunctionDefinition",
                        src: "3083:1127:1",
                    },
                    {
                        attributes: {
                            constant: false,
                            implemented: true,
                            isConstructor: false,
                            name: "modifyBeneficiary",
                            payable: false,
                            scope: 1610,
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
                                            name: "issuanceHash",
                                            scope: 1366,
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
                                                id: 1329,
                                                name: "ElementaryTypeName",
                                                src: "4408:7:1",
                                            },
                                        ],
                                        id: 1330,
                                        name: "VariableDeclaration",
                                        src: "4408:20:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "newBeneficiary",
                                            scope: 1366,
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
                                                id: 1331,
                                                name: "ElementaryTypeName",
                                                src: "4430:7:1",
                                            },
                                        ],
                                        id: 1332,
                                        name: "VariableDeclaration",
                                        src: "4430:22:1",
                                    },
                                ],
                                id: 1333,
                                name: "ParameterList",
                                src: "4407:46:1",
                            },
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 1344,
                                name: "ParameterList",
                                src: "4605:0:1",
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
                                            referencedDeclaration: 1214,
                                            type: "modifier ()",
                                            value: "onlyAuthorizedToEdit",
                                        },
                                        id: 1334,
                                        name: "Identifier",
                                        src: "4477:20:1",
                                    },
                                ],
                                id: 1335,
                                name: "ModifierInvocation",
                                src: "4477:20:1",
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
                                            referencedDeclaration: 5221,
                                            type: "modifier ()",
                                            value: "whenNotPaused",
                                        },
                                        id: 1336,
                                        name: "Identifier",
                                        src: "4506:13:1",
                                    },
                                ],
                                id: 1337,
                                name: "ModifierInvocation",
                                src: "4506:13:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            argumentTypes: null,
                                            overloadedDeclarations: [null],
                                            referencedDeclaration: 1231,
                                            type: "modifier (bytes32)",
                                            value: "onlyExtantEntry",
                                        },
                                        id: 1338,
                                        name: "Identifier",
                                        src: "4528:15:1",
                                    },
                                    {
                                        attributes: {
                                            argumentTypes: null,
                                            overloadedDeclarations: [null],
                                            referencedDeclaration: 1330,
                                            type: "bytes32",
                                            value: "issuanceHash",
                                        },
                                        id: 1339,
                                        name: "Identifier",
                                        src: "4544:12:1",
                                    },
                                ],
                                id: 1340,
                                name: "ModifierInvocation",
                                src: "4528:29:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            argumentTypes: null,
                                            overloadedDeclarations: [null],
                                            referencedDeclaration: 1245,
                                            type: "modifier (address)",
                                            value: "nonNullBeneficiary",
                                        },
                                        id: 1341,
                                        name: "Identifier",
                                        src: "4566:18:1",
                                    },
                                    {
                                        attributes: {
                                            argumentTypes: null,
                                            overloadedDeclarations: [null],
                                            referencedDeclaration: 1332,
                                            type: "address",
                                            value: "newBeneficiary",
                                        },
                                        id: 1342,
                                        name: "Identifier",
                                        src: "4585:14:1",
                                    },
                                ],
                                id: 1343,
                                name: "ModifierInvocation",
                                src: "4566:34:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            assignments: [1346],
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    constant: false,
                                                    name: "previousBeneficiary",
                                                    scope: 1366,
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
                                                        id: 1345,
                                                        name: "ElementaryTypeName",
                                                        src: "4615:7:1",
                                                    },
                                                ],
                                                id: 1346,
                                                name: "VariableDeclaration",
                                                src: "4615:27:1",
                                            },
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: true,
                                                    isPure: false,
                                                    lValueRequested: false,
                                                    member_name: "beneficiary",
                                                    referencedDeclaration: 1133,
                                                    type: "address",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            type:
                                                                "struct DebtRegistry.Entry storage ref",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1148,
                                                                    type:
                                                                        "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                    value: "registry",
                                                                },
                                                                id: 1347,
                                                                name: "Identifier",
                                                                src: "4645:8:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1330,
                                                                    type: "bytes32",
                                                                    value: "issuanceHash",
                                                                },
                                                                id: 1348,
                                                                name: "Identifier",
                                                                src: "4654:12:1",
                                                            },
                                                        ],
                                                        id: 1349,
                                                        name: "IndexAccess",
                                                        src: "4645:22:1",
                                                    },
                                                ],
                                                id: 1350,
                                                name: "MemberAccess",
                                                src: "4645:34:1",
                                            },
                                        ],
                                        id: 1351,
                                        name: "VariableDeclarationStatement",
                                        src: "4615:64:1",
                                    },
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
                                                            member_name: "beneficiary",
                                                            referencedDeclaration: 1133,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1352,
                                                                        name: "Identifier",
                                                                        src: "4690:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1330,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1353,
                                                                        name: "Identifier",
                                                                        src: "4699:12:1",
                                                                    },
                                                                ],
                                                                id: 1354,
                                                                name: "IndexAccess",
                                                                src: "4690:22:1",
                                                            },
                                                        ],
                                                        id: 1355,
                                                        name: "MemberAccess",
                                                        src: "4690:34:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1332,
                                                            type: "address",
                                                            value: "newBeneficiary",
                                                        },
                                                        id: 1356,
                                                        name: "Identifier",
                                                        src: "4727:14:1",
                                                    },
                                                ],
                                                id: 1357,
                                                name: "Assignment",
                                                src: "4690:51:1",
                                            },
                                        ],
                                        id: 1358,
                                        name: "ExpressionStatement",
                                        src: "4690:51:1",
                                    },
                                    {
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
                                                    type_conversion: false,
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: [
                                                                {
                                                                    typeIdentifier: "t_bytes32",
                                                                    typeString: "bytes32",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1174,
                                                            type:
                                                                "function (bytes32,address,address)",
                                                            value: "LogModifyEntryBeneficiary",
                                                        },
                                                        id: 1359,
                                                        name: "Identifier",
                                                        src: "4752:25:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1330,
                                                            type: "bytes32",
                                                            value: "issuanceHash",
                                                        },
                                                        id: 1360,
                                                        name: "Identifier",
                                                        src: "4791:12:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1346,
                                                            type: "address",
                                                            value: "previousBeneficiary",
                                                        },
                                                        id: 1361,
                                                        name: "Identifier",
                                                        src: "4817:19:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1332,
                                                            type: "address",
                                                            value: "newBeneficiary",
                                                        },
                                                        id: 1362,
                                                        name: "Identifier",
                                                        src: "4850:14:1",
                                                    },
                                                ],
                                                id: 1363,
                                                name: "FunctionCall",
                                                src: "4752:122:1",
                                            },
                                        ],
                                        id: 1364,
                                        name: "ExpressionStatement",
                                        src: "4752:122:1",
                                    },
                                ],
                                id: 1365,
                                name: "Block",
                                src: "4605:276:1",
                            },
                        ],
                        id: 1366,
                        name: "FunctionDefinition",
                        src: "4381:500:1",
                    },
                    {
                        attributes: {
                            constant: false,
                            implemented: true,
                            isConstructor: false,
                            name: "addAuthorizedInsertAgent",
                            payable: false,
                            scope: 1610,
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
                                            name: "agent",
                                            scope: 1384,
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
                                                id: 1367,
                                                name: "ElementaryTypeName",
                                                src: "5044:7:1",
                                            },
                                        ],
                                        id: 1368,
                                        name: "VariableDeclaration",
                                        src: "5044:13:1",
                                    },
                                ],
                                id: 1369,
                                name: "ParameterList",
                                src: "5043:15:1",
                            },
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 1372,
                                name: "ParameterList",
                                src: "5096:0:1",
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
                                        id: 1370,
                                        name: "Identifier",
                                        src: "5082:9:1",
                                    },
                                ],
                                id: 1371,
                                name: "ModifierInvocation",
                                src: "5082:9:1",
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
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
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
                                                            ],
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "authorize",
                                                            referencedDeclaration: 2643,
                                                            type:
                                                                "function (struct PermissionsLib.Permissions storage pointer,address)",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1150,
                                                                    type:
                                                                        "struct PermissionsLib.Permissions storage ref",
                                                                    value: "entryInsertPermissions",
                                                                },
                                                                id: 1373,
                                                                name: "Identifier",
                                                                src: "5106:22:1",
                                                            },
                                                        ],
                                                        id: 1375,
                                                        name: "MemberAccess",
                                                        src: "5106:32:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1368,
                                                            type: "address",
                                                            value: "agent",
                                                        },
                                                        id: 1376,
                                                        name: "Identifier",
                                                        src: "5139:5:1",
                                                    },
                                                ],
                                                id: 1377,
                                                name: "FunctionCall",
                                                src: "5106:39:1",
                                            },
                                        ],
                                        id: 1378,
                                        name: "ExpressionStatement",
                                        src: "5106:39:1",
                                    },
                                    {
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
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
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1178,
                                                            type: "function (address)",
                                                            value: "LogAddAuthorizedInsertAgent",
                                                        },
                                                        id: 1379,
                                                        name: "Identifier",
                                                        src: "5155:27:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1368,
                                                            type: "address",
                                                            value: "agent",
                                                        },
                                                        id: 1380,
                                                        name: "Identifier",
                                                        src: "5183:5:1",
                                                    },
                                                ],
                                                id: 1381,
                                                name: "FunctionCall",
                                                src: "5155:34:1",
                                            },
                                        ],
                                        id: 1382,
                                        name: "ExpressionStatement",
                                        src: "5155:34:1",
                                    },
                                ],
                                id: 1383,
                                name: "Block",
                                src: "5096:100:1",
                            },
                        ],
                        id: 1384,
                        name: "FunctionDefinition",
                        src: "5010:186:1",
                    },
                    {
                        attributes: {
                            constant: false,
                            implemented: true,
                            isConstructor: false,
                            name: "addAuthorizedEditAgent",
                            payable: false,
                            scope: 1610,
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
                                            name: "agent",
                                            scope: 1402,
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
                                                id: 1385,
                                                name: "ElementaryTypeName",
                                                src: "5368:7:1",
                                            },
                                        ],
                                        id: 1386,
                                        name: "VariableDeclaration",
                                        src: "5368:13:1",
                                    },
                                ],
                                id: 1387,
                                name: "ParameterList",
                                src: "5367:15:1",
                            },
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 1390,
                                name: "ParameterList",
                                src: "5420:0:1",
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
                                        id: 1388,
                                        name: "Identifier",
                                        src: "5406:9:1",
                                    },
                                ],
                                id: 1389,
                                name: "ModifierInvocation",
                                src: "5406:9:1",
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
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
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
                                                            ],
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "authorize",
                                                            referencedDeclaration: 2643,
                                                            type:
                                                                "function (struct PermissionsLib.Permissions storage pointer,address)",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1152,
                                                                    type:
                                                                        "struct PermissionsLib.Permissions storage ref",
                                                                    value: "entryEditPermissions",
                                                                },
                                                                id: 1391,
                                                                name: "Identifier",
                                                                src: "5430:20:1",
                                                            },
                                                        ],
                                                        id: 1393,
                                                        name: "MemberAccess",
                                                        src: "5430:30:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1386,
                                                            type: "address",
                                                            value: "agent",
                                                        },
                                                        id: 1394,
                                                        name: "Identifier",
                                                        src: "5461:5:1",
                                                    },
                                                ],
                                                id: 1395,
                                                name: "FunctionCall",
                                                src: "5430:37:1",
                                            },
                                        ],
                                        id: 1396,
                                        name: "ExpressionStatement",
                                        src: "5430:37:1",
                                    },
                                    {
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
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
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1182,
                                                            type: "function (address)",
                                                            value: "LogAddAuthorizedEditAgent",
                                                        },
                                                        id: 1397,
                                                        name: "Identifier",
                                                        src: "5477:25:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1386,
                                                            type: "address",
                                                            value: "agent",
                                                        },
                                                        id: 1398,
                                                        name: "Identifier",
                                                        src: "5503:5:1",
                                                    },
                                                ],
                                                id: 1399,
                                                name: "FunctionCall",
                                                src: "5477:32:1",
                                            },
                                        ],
                                        id: 1400,
                                        name: "ExpressionStatement",
                                        src: "5477:32:1",
                                    },
                                ],
                                id: 1401,
                                name: "Block",
                                src: "5420:96:1",
                            },
                        ],
                        id: 1402,
                        name: "FunctionDefinition",
                        src: "5336:180:1",
                    },
                    {
                        attributes: {
                            constant: false,
                            implemented: true,
                            isConstructor: false,
                            name: "revokeInsertAgentAuthorization",
                            payable: false,
                            scope: 1610,
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
                                            name: "agent",
                                            scope: 1420,
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
                                                id: 1403,
                                                name: "ElementaryTypeName",
                                                src: "5690:7:1",
                                            },
                                        ],
                                        id: 1404,
                                        name: "VariableDeclaration",
                                        src: "5690:13:1",
                                    },
                                ],
                                id: 1405,
                                name: "ParameterList",
                                src: "5689:15:1",
                            },
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 1408,
                                name: "ParameterList",
                                src: "5742:0:1",
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
                                        id: 1406,
                                        name: "Identifier",
                                        src: "5728:9:1",
                                    },
                                ],
                                id: 1407,
                                name: "ModifierInvocation",
                                src: "5728:9:1",
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
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
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
                                                            ],
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "revokeAuthorization",
                                                            referencedDeclaration: 2722,
                                                            type:
                                                                "function (struct PermissionsLib.Permissions storage pointer,address)",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1150,
                                                                    type:
                                                                        "struct PermissionsLib.Permissions storage ref",
                                                                    value: "entryInsertPermissions",
                                                                },
                                                                id: 1409,
                                                                name: "Identifier",
                                                                src: "5752:22:1",
                                                            },
                                                        ],
                                                        id: 1411,
                                                        name: "MemberAccess",
                                                        src: "5752:42:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1404,
                                                            type: "address",
                                                            value: "agent",
                                                        },
                                                        id: 1412,
                                                        name: "Identifier",
                                                        src: "5795:5:1",
                                                    },
                                                ],
                                                id: 1413,
                                                name: "FunctionCall",
                                                src: "5752:49:1",
                                            },
                                        ],
                                        id: 1414,
                                        name: "ExpressionStatement",
                                        src: "5752:49:1",
                                    },
                                    {
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
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
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1186,
                                                            type: "function (address)",
                                                            value:
                                                                "LogRevokeInsertAgentAuthorization",
                                                        },
                                                        id: 1415,
                                                        name: "Identifier",
                                                        src: "5811:33:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1404,
                                                            type: "address",
                                                            value: "agent",
                                                        },
                                                        id: 1416,
                                                        name: "Identifier",
                                                        src: "5845:5:1",
                                                    },
                                                ],
                                                id: 1417,
                                                name: "FunctionCall",
                                                src: "5811:40:1",
                                            },
                                        ],
                                        id: 1418,
                                        name: "ExpressionStatement",
                                        src: "5811:40:1",
                                    },
                                ],
                                id: 1419,
                                name: "Block",
                                src: "5742:116:1",
                            },
                        ],
                        id: 1420,
                        name: "FunctionDefinition",
                        src: "5650:208:1",
                    },
                    {
                        attributes: {
                            constant: false,
                            implemented: true,
                            isConstructor: false,
                            name: "revokeEditAgentAuthorization",
                            payable: false,
                            scope: 1610,
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
                                            name: "agent",
                                            scope: 1438,
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
                                                id: 1421,
                                                name: "ElementaryTypeName",
                                                src: "6041:7:1",
                                            },
                                        ],
                                        id: 1422,
                                        name: "VariableDeclaration",
                                        src: "6041:13:1",
                                    },
                                ],
                                id: 1423,
                                name: "ParameterList",
                                src: "6040:15:1",
                            },
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 1426,
                                name: "ParameterList",
                                src: "6093:0:1",
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
                                        id: 1424,
                                        name: "Identifier",
                                        src: "6079:9:1",
                                    },
                                ],
                                id: 1425,
                                name: "ModifierInvocation",
                                src: "6079:9:1",
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
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
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
                                                            ],
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "revokeAuthorization",
                                                            referencedDeclaration: 2722,
                                                            type:
                                                                "function (struct PermissionsLib.Permissions storage pointer,address)",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1152,
                                                                    type:
                                                                        "struct PermissionsLib.Permissions storage ref",
                                                                    value: "entryEditPermissions",
                                                                },
                                                                id: 1427,
                                                                name: "Identifier",
                                                                src: "6103:20:1",
                                                            },
                                                        ],
                                                        id: 1429,
                                                        name: "MemberAccess",
                                                        src: "6103:40:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1422,
                                                            type: "address",
                                                            value: "agent",
                                                        },
                                                        id: 1430,
                                                        name: "Identifier",
                                                        src: "6144:5:1",
                                                    },
                                                ],
                                                id: 1431,
                                                name: "FunctionCall",
                                                src: "6103:47:1",
                                            },
                                        ],
                                        id: 1432,
                                        name: "ExpressionStatement",
                                        src: "6103:47:1",
                                    },
                                    {
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "tuple()",
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
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1190,
                                                            type: "function (address)",
                                                            value:
                                                                "LogRevokeEditAgentAuthorization",
                                                        },
                                                        id: 1433,
                                                        name: "Identifier",
                                                        src: "6160:31:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1422,
                                                            type: "address",
                                                            value: "agent",
                                                        },
                                                        id: 1434,
                                                        name: "Identifier",
                                                        src: "6192:5:1",
                                                    },
                                                ],
                                                id: 1435,
                                                name: "FunctionCall",
                                                src: "6160:38:1",
                                            },
                                        ],
                                        id: 1436,
                                        name: "ExpressionStatement",
                                        src: "6160:38:1",
                                    },
                                ],
                                id: 1437,
                                name: "Block",
                                src: "6093:112:1",
                            },
                        ],
                        id: 1438,
                        name: "FunctionDefinition",
                        src: "6003:202:1",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "get",
                            payable: false,
                            scope: 1610,
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
                                            name: "issuanceHash",
                                            scope: 1488,
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
                                                id: 1439,
                                                name: "ElementaryTypeName",
                                                src: "6305:7:1",
                                            },
                                        ],
                                        id: 1440,
                                        name: "VariableDeclaration",
                                        src: "6305:20:1",
                                    },
                                ],
                                id: 1441,
                                name: "ParameterList",
                                src: "6304:22:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1488,
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
                                                id: 1442,
                                                name: "ElementaryTypeName",
                                                src: "6371:7:1",
                                            },
                                        ],
                                        id: 1443,
                                        name: "VariableDeclaration",
                                        src: "6371:7:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1488,
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
                                                id: 1444,
                                                name: "ElementaryTypeName",
                                                src: "6380:7:1",
                                            },
                                        ],
                                        id: 1445,
                                        name: "VariableDeclaration",
                                        src: "6380:7:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1488,
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
                                                id: 1446,
                                                name: "ElementaryTypeName",
                                                src: "6389:7:1",
                                            },
                                        ],
                                        id: 1447,
                                        name: "VariableDeclaration",
                                        src: "6389:7:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1488,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint",
                                                    type: "uint256",
                                                },
                                                id: 1448,
                                                name: "ElementaryTypeName",
                                                src: "6398:4:1",
                                            },
                                        ],
                                        id: 1449,
                                        name: "VariableDeclaration",
                                        src: "6398:4:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1488,
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
                                                id: 1450,
                                                name: "ElementaryTypeName",
                                                src: "6404:7:1",
                                            },
                                        ],
                                        id: 1451,
                                        name: "VariableDeclaration",
                                        src: "6404:7:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1488,
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
                                                id: 1452,
                                                name: "ElementaryTypeName",
                                                src: "6413:7:1",
                                            },
                                        ],
                                        id: 1453,
                                        name: "VariableDeclaration",
                                        src: "6413:7:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1488,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint",
                                                    type: "uint256",
                                                },
                                                id: 1454,
                                                name: "ElementaryTypeName",
                                                src: "6422:4:1",
                                            },
                                        ],
                                        id: 1455,
                                        name: "VariableDeclaration",
                                        src: "6422:4:1",
                                    },
                                ],
                                id: 1456,
                                name: "ParameterList",
                                src: "6370:57:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 1456,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isInlineArray: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    lValueRequested: false,
                                                    type:
                                                        "tuple(address,address,address,uint256,address,bytes32,uint256)",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "version",
                                                            referencedDeclaration: 1131,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1457,
                                                                        name: "Identifier",
                                                                        src: "6463:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1440,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1458,
                                                                        name: "Identifier",
                                                                        src: "6472:12:1",
                                                                    },
                                                                ],
                                                                id: 1459,
                                                                name: "IndexAccess",
                                                                src: "6463:22:1",
                                                            },
                                                        ],
                                                        id: 1460,
                                                        name: "MemberAccess",
                                                        src: "6463:30:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "beneficiary",
                                                            referencedDeclaration: 1133,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1461,
                                                                        name: "Identifier",
                                                                        src: "6507:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1440,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1462,
                                                                        name: "Identifier",
                                                                        src: "6516:12:1",
                                                                    },
                                                                ],
                                                                id: 1463,
                                                                name: "IndexAccess",
                                                                src: "6507:22:1",
                                                            },
                                                        ],
                                                        id: 1464,
                                                        name: "MemberAccess",
                                                        src: "6507:34:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "underwriter",
                                                            referencedDeclaration: 1135,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1465,
                                                                        name: "Identifier",
                                                                        src: "6555:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1440,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1466,
                                                                        name: "Identifier",
                                                                        src: "6564:12:1",
                                                                    },
                                                                ],
                                                                id: 1467,
                                                                name: "IndexAccess",
                                                                src: "6555:22:1",
                                                            },
                                                        ],
                                                        id: 1468,
                                                        name: "MemberAccess",
                                                        src: "6555:34:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "underwriterRiskRating",
                                                            referencedDeclaration: 1137,
                                                            type: "uint256",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1469,
                                                                        name: "Identifier",
                                                                        src: "6603:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1440,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1470,
                                                                        name: "Identifier",
                                                                        src: "6612:12:1",
                                                                    },
                                                                ],
                                                                id: 1471,
                                                                name: "IndexAccess",
                                                                src: "6603:22:1",
                                                            },
                                                        ],
                                                        id: 1472,
                                                        name: "MemberAccess",
                                                        src: "6603:44:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "termsContract",
                                                            referencedDeclaration: 1139,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1473,
                                                                        name: "Identifier",
                                                                        src: "6661:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1440,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1474,
                                                                        name: "Identifier",
                                                                        src: "6670:12:1",
                                                                    },
                                                                ],
                                                                id: 1475,
                                                                name: "IndexAccess",
                                                                src: "6661:22:1",
                                                            },
                                                        ],
                                                        id: 1476,
                                                        name: "MemberAccess",
                                                        src: "6661:36:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "termsContractParameters",
                                                            referencedDeclaration: 1141,
                                                            type: "bytes32",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1477,
                                                                        name: "Identifier",
                                                                        src: "6711:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1440,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1478,
                                                                        name: "Identifier",
                                                                        src: "6720:12:1",
                                                                    },
                                                                ],
                                                                id: 1479,
                                                                name: "IndexAccess",
                                                                src: "6711:22:1",
                                                            },
                                                        ],
                                                        id: 1480,
                                                        name: "MemberAccess",
                                                        src: "6711:46:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "issuanceBlockTimestamp",
                                                            referencedDeclaration: 1143,
                                                            type: "uint256",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1481,
                                                                        name: "Identifier",
                                                                        src: "6771:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1440,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1482,
                                                                        name: "Identifier",
                                                                        src: "6780:12:1",
                                                                    },
                                                                ],
                                                                id: 1483,
                                                                name: "IndexAccess",
                                                                src: "6771:22:1",
                                                            },
                                                        ],
                                                        id: 1484,
                                                        name: "MemberAccess",
                                                        src: "6771:45:1",
                                                    },
                                                ],
                                                id: 1485,
                                                name: "TupleExpression",
                                                src: "6449:377:1",
                                            },
                                        ],
                                        id: 1486,
                                        name: "Return",
                                        src: "6442:384:1",
                                    },
                                ],
                                id: 1487,
                                name: "Block",
                                src: "6432:401:1",
                            },
                        ],
                        id: 1488,
                        name: "FunctionDefinition",
                        src: "6292:541:1",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getBeneficiary",
                            payable: false,
                            scope: 1610,
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
                                            name: "issuanceHash",
                                            scope: 1501,
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
                                                id: 1489,
                                                name: "ElementaryTypeName",
                                                src: "6930:7:1",
                                            },
                                        ],
                                        id: 1490,
                                        name: "VariableDeclaration",
                                        src: "6930:20:1",
                                    },
                                ],
                                id: 1491,
                                name: "ParameterList",
                                src: "6929:22:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1501,
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
                                                id: 1492,
                                                name: "ElementaryTypeName",
                                                src: "6996:7:1",
                                            },
                                        ],
                                        id: 1493,
                                        name: "VariableDeclaration",
                                        src: "6996:7:1",
                                    },
                                ],
                                id: 1494,
                                name: "ParameterList",
                                src: "6995:9:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 1494,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: true,
                                                    isPure: false,
                                                    lValueRequested: false,
                                                    member_name: "beneficiary",
                                                    referencedDeclaration: 1133,
                                                    type: "address",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            type:
                                                                "struct DebtRegistry.Entry storage ref",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1148,
                                                                    type:
                                                                        "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                    value: "registry",
                                                                },
                                                                id: 1495,
                                                                name: "Identifier",
                                                                src: "7026:8:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1490,
                                                                    type: "bytes32",
                                                                    value: "issuanceHash",
                                                                },
                                                                id: 1496,
                                                                name: "Identifier",
                                                                src: "7035:12:1",
                                                            },
                                                        ],
                                                        id: 1497,
                                                        name: "IndexAccess",
                                                        src: "7026:22:1",
                                                    },
                                                ],
                                                id: 1498,
                                                name: "MemberAccess",
                                                src: "7026:34:1",
                                            },
                                        ],
                                        id: 1499,
                                        name: "Return",
                                        src: "7019:41:1",
                                    },
                                ],
                                id: 1500,
                                name: "Block",
                                src: "7009:58:1",
                            },
                        ],
                        id: 1501,
                        name: "FunctionDefinition",
                        src: "6906:161:1",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getTermsContract",
                            payable: false,
                            scope: 1610,
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
                                            name: "issuanceHash",
                                            scope: 1514,
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
                                                id: 1502,
                                                name: "ElementaryTypeName",
                                                src: "7177:7:1",
                                            },
                                        ],
                                        id: 1503,
                                        name: "VariableDeclaration",
                                        src: "7177:20:1",
                                    },
                                ],
                                id: 1504,
                                name: "ParameterList",
                                src: "7176:22:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1514,
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
                                                id: 1505,
                                                name: "ElementaryTypeName",
                                                src: "7244:7:1",
                                            },
                                        ],
                                        id: 1506,
                                        name: "VariableDeclaration",
                                        src: "7244:7:1",
                                    },
                                ],
                                id: 1507,
                                name: "ParameterList",
                                src: "7243:9:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 1507,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: true,
                                                    isPure: false,
                                                    lValueRequested: false,
                                                    member_name: "termsContract",
                                                    referencedDeclaration: 1139,
                                                    type: "address",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            type:
                                                                "struct DebtRegistry.Entry storage ref",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1148,
                                                                    type:
                                                                        "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                    value: "registry",
                                                                },
                                                                id: 1508,
                                                                name: "Identifier",
                                                                src: "7274:8:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1503,
                                                                    type: "bytes32",
                                                                    value: "issuanceHash",
                                                                },
                                                                id: 1509,
                                                                name: "Identifier",
                                                                src: "7283:12:1",
                                                            },
                                                        ],
                                                        id: 1510,
                                                        name: "IndexAccess",
                                                        src: "7274:22:1",
                                                    },
                                                ],
                                                id: 1511,
                                                name: "MemberAccess",
                                                src: "7274:36:1",
                                            },
                                        ],
                                        id: 1512,
                                        name: "Return",
                                        src: "7267:43:1",
                                    },
                                ],
                                id: 1513,
                                name: "Block",
                                src: "7257:60:1",
                            },
                        ],
                        id: 1514,
                        name: "FunctionDefinition",
                        src: "7151:166:1",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getTermsContractParameters",
                            payable: false,
                            scope: 1610,
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
                                            name: "issuanceHash",
                                            scope: 1527,
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
                                                id: 1515,
                                                name: "ElementaryTypeName",
                                                src: "7440:7:1",
                                            },
                                        ],
                                        id: 1516,
                                        name: "VariableDeclaration",
                                        src: "7440:20:1",
                                    },
                                ],
                                id: 1517,
                                name: "ParameterList",
                                src: "7439:22:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1527,
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
                                                id: 1518,
                                                name: "ElementaryTypeName",
                                                src: "7507:7:1",
                                            },
                                        ],
                                        id: 1519,
                                        name: "VariableDeclaration",
                                        src: "7507:7:1",
                                    },
                                ],
                                id: 1520,
                                name: "ParameterList",
                                src: "7506:9:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 1520,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: true,
                                                    isPure: false,
                                                    lValueRequested: false,
                                                    member_name: "termsContractParameters",
                                                    referencedDeclaration: 1141,
                                                    type: "bytes32",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            type:
                                                                "struct DebtRegistry.Entry storage ref",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1148,
                                                                    type:
                                                                        "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                    value: "registry",
                                                                },
                                                                id: 1521,
                                                                name: "Identifier",
                                                                src: "7537:8:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1516,
                                                                    type: "bytes32",
                                                                    value: "issuanceHash",
                                                                },
                                                                id: 1522,
                                                                name: "Identifier",
                                                                src: "7546:12:1",
                                                            },
                                                        ],
                                                        id: 1523,
                                                        name: "IndexAccess",
                                                        src: "7537:22:1",
                                                    },
                                                ],
                                                id: 1524,
                                                name: "MemberAccess",
                                                src: "7537:46:1",
                                            },
                                        ],
                                        id: 1525,
                                        name: "Return",
                                        src: "7530:53:1",
                                    },
                                ],
                                id: 1526,
                                name: "Block",
                                src: "7520:70:1",
                            },
                        ],
                        id: 1527,
                        name: "FunctionDefinition",
                        src: "7404:186:1",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getTerms",
                            payable: false,
                            scope: 1610,
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
                                            name: "issuanceHash",
                                            scope: 1547,
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
                                                id: 1528,
                                                name: "ElementaryTypeName",
                                                src: "7733:7:1",
                                            },
                                        ],
                                        id: 1529,
                                        name: "VariableDeclaration",
                                        src: "7733:20:1",
                                    },
                                ],
                                id: 1530,
                                name: "ParameterList",
                                src: "7732:22:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1547,
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
                                                id: 1531,
                                                name: "ElementaryTypeName",
                                                src: "7799:7:1",
                                            },
                                        ],
                                        id: 1532,
                                        name: "VariableDeclaration",
                                        src: "7799:7:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1547,
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
                                                id: 1533,
                                                name: "ElementaryTypeName",
                                                src: "7808:7:1",
                                            },
                                        ],
                                        id: 1534,
                                        name: "VariableDeclaration",
                                        src: "7808:7:1",
                                    },
                                ],
                                id: 1535,
                                name: "ParameterList",
                                src: "7798:18:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 1535,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isInlineArray: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    lValueRequested: false,
                                                    type: "tuple(address,bytes32)",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "termsContract",
                                                            referencedDeclaration: 1139,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1536,
                                                                        name: "Identifier",
                                                                        src: "7852:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1529,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1537,
                                                                        name: "Identifier",
                                                                        src: "7861:12:1",
                                                                    },
                                                                ],
                                                                id: 1538,
                                                                name: "IndexAccess",
                                                                src: "7852:22:1",
                                                            },
                                                        ],
                                                        id: 1539,
                                                        name: "MemberAccess",
                                                        src: "7852:36:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "termsContractParameters",
                                                            referencedDeclaration: 1141,
                                                            type: "bytes32",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    isConstant: false,
                                                                    isLValue: true,
                                                                    isPure: false,
                                                                    lValueRequested: false,
                                                                    type:
                                                                        "struct DebtRegistry.Entry storage ref",
                                                                },
                                                                children: [
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1148,
                                                                            type:
                                                                                "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                            value: "registry",
                                                                        },
                                                                        id: 1540,
                                                                        name: "Identifier",
                                                                        src: "7902:8:1",
                                                                    },
                                                                    {
                                                                        attributes: {
                                                                            argumentTypes: null,
                                                                            overloadedDeclarations: [
                                                                                null,
                                                                            ],
                                                                            referencedDeclaration: 1529,
                                                                            type: "bytes32",
                                                                            value: "issuanceHash",
                                                                        },
                                                                        id: 1541,
                                                                        name: "Identifier",
                                                                        src: "7911:12:1",
                                                                    },
                                                                ],
                                                                id: 1542,
                                                                name: "IndexAccess",
                                                                src: "7902:22:1",
                                                            },
                                                        ],
                                                        id: 1543,
                                                        name: "MemberAccess",
                                                        src: "7902:46:1",
                                                    },
                                                ],
                                                id: 1544,
                                                name: "TupleExpression",
                                                src: "7838:120:1",
                                            },
                                        ],
                                        id: 1545,
                                        name: "Return",
                                        src: "7831:127:1",
                                    },
                                ],
                                id: 1546,
                                name: "Block",
                                src: "7821:144:1",
                            },
                        ],
                        id: 1547,
                        name: "FunctionDefinition",
                        src: "7715:250:1",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getIssuanceBlockTimestamp",
                            payable: false,
                            scope: 1610,
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
                                            name: "issuanceHash",
                                            scope: 1560,
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
                                                id: 1548,
                                                name: "ElementaryTypeName",
                                                src: "8102:7:1",
                                            },
                                        ],
                                        id: 1549,
                                        name: "VariableDeclaration",
                                        src: "8102:20:1",
                                    },
                                ],
                                id: 1550,
                                name: "ParameterList",
                                src: "8101:22:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "timestamp",
                                            scope: 1560,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint",
                                                    type: "uint256",
                                                },
                                                id: 1551,
                                                name: "ElementaryTypeName",
                                                src: "8169:4:1",
                                            },
                                        ],
                                        id: 1552,
                                        name: "VariableDeclaration",
                                        src: "8169:14:1",
                                    },
                                ],
                                id: 1553,
                                name: "ParameterList",
                                src: "8168:16:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 1553,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    isConstant: false,
                                                    isLValue: true,
                                                    isPure: false,
                                                    lValueRequested: false,
                                                    member_name: "issuanceBlockTimestamp",
                                                    referencedDeclaration: 1143,
                                                    type: "uint256",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            type:
                                                                "struct DebtRegistry.Entry storage ref",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1148,
                                                                    type:
                                                                        "mapping(bytes32 => struct DebtRegistry.Entry storage ref)",
                                                                    value: "registry",
                                                                },
                                                                id: 1554,
                                                                name: "Identifier",
                                                                src: "8206:8:1",
                                                            },
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1549,
                                                                    type: "bytes32",
                                                                    value: "issuanceHash",
                                                                },
                                                                id: 1555,
                                                                name: "Identifier",
                                                                src: "8215:12:1",
                                                            },
                                                        ],
                                                        id: 1556,
                                                        name: "IndexAccess",
                                                        src: "8206:22:1",
                                                    },
                                                ],
                                                id: 1557,
                                                name: "MemberAccess",
                                                src: "8206:45:1",
                                            },
                                        ],
                                        id: 1558,
                                        name: "Return",
                                        src: "8199:52:1",
                                    },
                                ],
                                id: 1559,
                                name: "Block",
                                src: "8189:69:1",
                            },
                        ],
                        id: 1560,
                        name: "FunctionDefinition",
                        src: "8067:191:1",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getAuthorizedInsertAgents",
                            payable: false,
                            scope: 1610,
                            stateMutability: "view",
                            superFunction: null,
                            visibility: "public",
                        },
                        children: [
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 1561,
                                name: "ParameterList",
                                src: "8386:2:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1571,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "address[] memory",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    length: null,
                                                    type: "address[] storage pointer",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            name: "address",
                                                            type: "address",
                                                        },
                                                        id: 1562,
                                                        name: "ElementaryTypeName",
                                                        src: "8433:7:1",
                                                    },
                                                ],
                                                id: 1563,
                                                name: "ArrayTypeName",
                                                src: "8433:9:1",
                                            },
                                        ],
                                        id: 1564,
                                        name: "VariableDeclaration",
                                        src: "8433:9:1",
                                    },
                                ],
                                id: 1565,
                                name: "ParameterList",
                                src: "8432:11:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 1565,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    arguments: [null],
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "address[] memory",
                                                    type_conversion: false,
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: [null],
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "getAuthorizedAgents",
                                                            referencedDeclaration: 2765,
                                                            type:
                                                                "function (struct PermissionsLib.Permissions storage pointer) view returns (address[] memory)",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1150,
                                                                    type:
                                                                        "struct PermissionsLib.Permissions storage ref",
                                                                    value: "entryInsertPermissions",
                                                                },
                                                                id: 1566,
                                                                name: "Identifier",
                                                                src: "8465:22:1",
                                                            },
                                                        ],
                                                        id: 1567,
                                                        name: "MemberAccess",
                                                        src: "8465:42:1",
                                                    },
                                                ],
                                                id: 1568,
                                                name: "FunctionCall",
                                                src: "8465:44:1",
                                            },
                                        ],
                                        id: 1569,
                                        name: "Return",
                                        src: "8458:51:1",
                                    },
                                ],
                                id: 1570,
                                name: "Block",
                                src: "8448:68:1",
                            },
                        ],
                        id: 1571,
                        name: "FunctionDefinition",
                        src: "8352:164:1",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "getAuthorizedEditAgents",
                            payable: false,
                            scope: 1610,
                            stateMutability: "view",
                            superFunction: null,
                            visibility: "public",
                        },
                        children: [
                            {
                                attributes: {
                                    parameters: [null],
                                },
                                children: [],
                                id: 1572,
                                name: "ParameterList",
                                src: "8653:2:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1582,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "address[] memory",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    length: null,
                                                    type: "address[] storage pointer",
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            name: "address",
                                                            type: "address",
                                                        },
                                                        id: 1573,
                                                        name: "ElementaryTypeName",
                                                        src: "8700:7:1",
                                                    },
                                                ],
                                                id: 1574,
                                                name: "ArrayTypeName",
                                                src: "8700:9:1",
                                            },
                                        ],
                                        id: 1575,
                                        name: "VariableDeclaration",
                                        src: "8700:9:1",
                                    },
                                ],
                                id: 1576,
                                name: "ParameterList",
                                src: "8699:11:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 1576,
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    argumentTypes: null,
                                                    arguments: [null],
                                                    isConstant: false,
                                                    isLValue: false,
                                                    isPure: false,
                                                    isStructConstructorCall: false,
                                                    lValueRequested: false,
                                                    names: [null],
                                                    type: "address[] memory",
                                                    type_conversion: false,
                                                },
                                                children: [
                                                    {
                                                        attributes: {
                                                            argumentTypes: [null],
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "getAuthorizedAgents",
                                                            referencedDeclaration: 2765,
                                                            type:
                                                                "function (struct PermissionsLib.Permissions storage pointer) view returns (address[] memory)",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1152,
                                                                    type:
                                                                        "struct PermissionsLib.Permissions storage ref",
                                                                    value: "entryEditPermissions",
                                                                },
                                                                id: 1577,
                                                                name: "Identifier",
                                                                src: "8732:20:1",
                                                            },
                                                        ],
                                                        id: 1578,
                                                        name: "MemberAccess",
                                                        src: "8732:40:1",
                                                    },
                                                ],
                                                id: 1579,
                                                name: "FunctionCall",
                                                src: "8732:42:1",
                                            },
                                        ],
                                        id: 1580,
                                        name: "Return",
                                        src: "8725:49:1",
                                    },
                                ],
                                id: 1581,
                                name: "Block",
                                src: "8715:66:1",
                            },
                        ],
                        id: 1582,
                        name: "FunctionDefinition",
                        src: "8621:160:1",
                    },
                    {
                        attributes: {
                            constant: true,
                            implemented: true,
                            isConstructor: false,
                            modifiers: [null],
                            name: "_getIssuanceHash",
                            payable: false,
                            scope: 1610,
                            stateMutability: "pure",
                            superFunction: null,
                            visibility: "internal",
                        },
                        children: [
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_entry",
                                            scope: 1609,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "struct DebtRegistry.Entry memory",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    contractScope: null,
                                                    name: "Entry",
                                                    referencedDeclaration: 1144,
                                                    type:
                                                        "struct DebtRegistry.Entry storage pointer",
                                                },
                                                id: 1583,
                                                name: "UserDefinedTypeName",
                                                src: "8897:5:1",
                                            },
                                        ],
                                        id: 1584,
                                        name: "VariableDeclaration",
                                        src: "8897:12:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_debtor",
                                            scope: 1609,
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
                                                id: 1585,
                                                name: "ElementaryTypeName",
                                                src: "8911:7:1",
                                            },
                                        ],
                                        id: 1586,
                                        name: "VariableDeclaration",
                                        src: "8911:15:1",
                                    },
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "_salt",
                                            scope: 1609,
                                            stateVariable: false,
                                            storageLocation: "default",
                                            type: "uint256",
                                            value: null,
                                            visibility: "internal",
                                        },
                                        children: [
                                            {
                                                attributes: {
                                                    name: "uint",
                                                    type: "uint256",
                                                },
                                                id: 1587,
                                                name: "ElementaryTypeName",
                                                src: "8928:4:1",
                                            },
                                        ],
                                        id: 1588,
                                        name: "VariableDeclaration",
                                        src: "8928:10:1",
                                    },
                                ],
                                id: 1589,
                                name: "ParameterList",
                                src: "8896:43:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            constant: false,
                                            name: "",
                                            scope: 1609,
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
                                                id: 1590,
                                                name: "ElementaryTypeName",
                                                src: "8986:7:1",
                                            },
                                        ],
                                        id: 1591,
                                        name: "VariableDeclaration",
                                        src: "8986:7:1",
                                    },
                                ],
                                id: 1592,
                                name: "ParameterList",
                                src: "8985:9:1",
                            },
                            {
                                children: [
                                    {
                                        attributes: {
                                            functionReturnParameters: 1592,
                                        },
                                        children: [
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
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_uint256",
                                                                    typeString: "uint256",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_address",
                                                                    typeString: "address",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_bytes32",
                                                                    typeString: "bytes32",
                                                                },
                                                                {
                                                                    typeIdentifier: "t_uint256",
                                                                    typeString: "uint256",
                                                                },
                                                            ],
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 5932,
                                                            type:
                                                                "function () pure returns (bytes32)",
                                                            value: "keccak256",
                                                        },
                                                        id: 1593,
                                                        name: "Identifier",
                                                        src: "9016:9:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "version",
                                                            referencedDeclaration: 1131,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1584,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "_entry",
                                                                },
                                                                id: 1594,
                                                                name: "Identifier",
                                                                src: "9039:6:1",
                                                            },
                                                        ],
                                                        id: 1595,
                                                        name: "MemberAccess",
                                                        src: "9039:14:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1586,
                                                            type: "address",
                                                            value: "_debtor",
                                                        },
                                                        id: 1596,
                                                        name: "Identifier",
                                                        src: "9067:7:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "underwriter",
                                                            referencedDeclaration: 1135,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1584,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "_entry",
                                                                },
                                                                id: 1597,
                                                                name: "Identifier",
                                                                src: "9088:6:1",
                                                            },
                                                        ],
                                                        id: 1598,
                                                        name: "MemberAccess",
                                                        src: "9088:18:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "underwriterRiskRating",
                                                            referencedDeclaration: 1137,
                                                            type: "uint256",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1584,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "_entry",
                                                                },
                                                                id: 1599,
                                                                name: "Identifier",
                                                                src: "9120:6:1",
                                                            },
                                                        ],
                                                        id: 1600,
                                                        name: "MemberAccess",
                                                        src: "9120:28:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "termsContract",
                                                            referencedDeclaration: 1139,
                                                            type: "address",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1584,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "_entry",
                                                                },
                                                                id: 1601,
                                                                name: "Identifier",
                                                                src: "9162:6:1",
                                                            },
                                                        ],
                                                        id: 1602,
                                                        name: "MemberAccess",
                                                        src: "9162:20:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            isConstant: false,
                                                            isLValue: true,
                                                            isPure: false,
                                                            lValueRequested: false,
                                                            member_name: "termsContractParameters",
                                                            referencedDeclaration: 1141,
                                                            type: "bytes32",
                                                        },
                                                        children: [
                                                            {
                                                                attributes: {
                                                                    argumentTypes: null,
                                                                    overloadedDeclarations: [null],
                                                                    referencedDeclaration: 1584,
                                                                    type:
                                                                        "struct DebtRegistry.Entry memory",
                                                                    value: "_entry",
                                                                },
                                                                id: 1603,
                                                                name: "Identifier",
                                                                src: "9196:6:1",
                                                            },
                                                        ],
                                                        id: 1604,
                                                        name: "MemberAccess",
                                                        src: "9196:30:1",
                                                    },
                                                    {
                                                        attributes: {
                                                            argumentTypes: null,
                                                            overloadedDeclarations: [null],
                                                            referencedDeclaration: 1588,
                                                            type: "uint256",
                                                            value: "_salt",
                                                        },
                                                        id: 1605,
                                                        name: "Identifier",
                                                        src: "9240:5:1",
                                                    },
                                                ],
                                                id: 1606,
                                                name: "FunctionCall",
                                                src: "9016:239:1",
                                            },
                                        ],
                                        id: 1607,
                                        name: "Return",
                                        src: "9009:246:1",
                                    },
                                ],
                                id: 1608,
                                name: "Block",
                                src: "8999:263:1",
                            },
                        ],
                        id: 1609,
                        name: "FunctionDefinition",
                        src: "8871:391:1",
                    },
                ],
                id: 1610,
                name: "ContractDefinition",
                src: "1082:8182:1",
            },
        ],
        id: 1611,
        name: "SourceUnit",
        src: "584:8681:1",
    },
    compiler: {
        name: "solc",
        version: "0.4.18+commit.9cf6e910.Emscripten.clang",
    },
    networks: {
        "70": {
            events: {
                "0x10919d8a6bfbd0c46213ad51d6258e42af00bbf36133aada8a058bbe4f4a9240": {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            name: "issuanceHash",
                            type: "bytes32",
                        },
                        {
                            indexed: true,
                            name: "beneficiary",
                            type: "address",
                        },
                        {
                            indexed: true,
                            name: "underwriter",
                            type: "address",
                        },
                        {
                            indexed: false,
                            name: "underwriterRiskRating",
                            type: "uint256",
                        },
                        {
                            indexed: false,
                            name: "termsContract",
                            type: "address",
                        },
                        {
                            indexed: false,
                            name: "termsContractParameters",
                            type: "bytes32",
                        },
                    ],
                    name: "LogInsertEntry",
                    type: "event",
                },
                "0x7afbd1e661f2fdce6222afdac74cd28b1847177e232db3d0f0dcf3739e8d8094": {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            name: "issuanceHash",
                            type: "bytes32",
                        },
                        {
                            indexed: true,
                            name: "previousBeneficiary",
                            type: "address",
                        },
                        {
                            indexed: true,
                            name: "newBeneficiary",
                            type: "address",
                        },
                    ],
                    name: "LogModifyEntryBeneficiary",
                    type: "event",
                },
                "0x3742184d7c9c1646421a0b618adffa131109c009b2c9f9fab3c8d890e295e5dd": {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            name: "agent",
                            type: "address",
                        },
                    ],
                    name: "LogAddAuthorizedInsertAgent",
                    type: "event",
                },
                "0x1adcf3642077febc29ae94e96f4b266cd0014c4499a4ad57e1e6935efaf73c5c": {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            name: "agent",
                            type: "address",
                        },
                    ],
                    name: "LogAddAuthorizedEditAgent",
                    type: "event",
                },
                "0xc265a0634721cf43fbe76b8ab5c6f79b59fabfc8056dea60d2f0d2612fc70b12": {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            name: "agent",
                            type: "address",
                        },
                    ],
                    name: "LogRevokeInsertAgentAuthorization",
                    type: "event",
                },
                "0xd70b180c6a151902a25cf1e39c2d5d75079bb235362289aa42cd258a7e5af921": {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            name: "agent",
                            type: "address",
                        },
                    ],
                    name: "LogRevokeEditAgentAuthorization",
                    type: "event",
                },
                "0x6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff625": {
                    anonymous: false,
                    inputs: [],
                    name: "Pause",
                    type: "event",
                },
                "0x7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b33": {
                    anonymous: false,
                    inputs: [],
                    name: "Unpause",
                    type: "event",
                },
                "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": {
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
            },
            links: {},
            address: "0x1d02b56e6c96f7794151f9113f5329cdb79d10ff",
        },
    },
    schemaVersion: "1.0.1",
    updatedAt: "2018-02-16T01:40:39.436Z",
};
