"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PFPs__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class PFPs__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.PFPs__factory = PFPs__factory;
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "propose",
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
                type: "uint256",
            },
        ],
        name: "proposals",
        outputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "manager",
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
                type: "address",
            },
        ],
        name: "extras",
        outputs: [
            {
                name: "",
                type: "string",
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
                type: "uint256",
            },
        ],
        name: "addrs",
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
                type: "address",
            },
            {
                name: "",
                type: "address",
            },
        ],
        name: "managersIndex",
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
                name: "addr",
                type: "address",
            },
            {
                name: "extra",
                type: "string",
            },
        ],
        name: "setExtra",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "receiver",
                type: "address",
            },
            {
                name: "royalty",
                type: "uint256",
            },
        ],
        name: "setRoyalty",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "addByPFPOwner",
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
                type: "address",
            },
            {
                name: "",
                type: "uint256",
            },
        ],
        name: "managers",
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
                name: "addr",
                type: "address",
            },
        ],
        name: "getTotalSupply",
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
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "totalSupply",
                type: "uint256",
            },
        ],
        name: "setTotalSupply",
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
                type: "address",
            },
        ],
        name: "added",
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
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "manager",
                type: "address",
            },
        ],
        name: "addManager",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "addByMinter",
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
                name: "addr",
                type: "address",
            },
        ],
        name: "managerCount",
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
        constant: true,
        inputs: [],
        name: "isOwner",
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
        inputs: [
            {
                name: "",
                type: "address",
            },
        ],
        name: "enumerables",
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
        inputs: [
            {
                name: "",
                type: "address",
            },
        ],
        name: "totalSupplies",
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
                name: "addr",
                type: "address",
            },
        ],
        name: "ban",
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
                type: "address",
            },
        ],
        name: "banned",
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
        constant: false,
        inputs: [
            {
                name: "proposalId",
                type: "uint256",
            },
        ],
        name: "passProposal",
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
                type: "address",
            },
        ],
        name: "royalties",
        outputs: [
            {
                name: "receiver",
                type: "address",
            },
            {
                name: "royalty",
                type: "uint256",
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
                name: "addr",
                type: "address",
            },
            {
                name: "manager",
                type: "address",
            },
        ],
        name: "existsManager",
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
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "unban",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "manager",
                type: "address",
            },
        ],
        name: "addByOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "proposalCount",
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
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "enumerable",
                type: "bool",
            },
        ],
        name: "setEnumerable",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "manager",
                type: "address",
            },
        ],
        name: "removeManager",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "addrCount",
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
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "manager",
                type: "address",
            },
        ],
        name: "Propose",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "manager",
                type: "address",
            },
        ],
        name: "Add",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "manager",
                type: "address",
            },
        ],
        name: "AddManager",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "manager",
                type: "address",
            },
        ],
        name: "RemoveManager",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: false,
                name: "enumerable",
                type: "bool",
            },
        ],
        name: "SetEnumerable",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: false,
                name: "totalSupply",
                type: "uint256",
            },
        ],
        name: "SetTotalSupply",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: false,
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                name: "royalty",
                type: "uint256",
            },
        ],
        name: "SetRoyalty",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: false,
                name: "extra",
                type: "string",
            },
        ],
        name: "SetExtra",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
        ],
        name: "Ban",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
        ],
        name: "Unban",
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
];
const _bytecode = "0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3612b23806100cf6000396000f3fe608060405234801561001057600080fd5b50600436106101f05760003560e01c80638f1273221161010f578063b16f0f88116100a2578063f2fde38b11610071578063f2fde38b14610c1d578063f4c8119714610c61578063f85771b214610cb1578063f9dabeff14610d15576101f0565b8063b16f0f8814610adb578063b9f1455714610b57578063d7ef5f3114610b9b578063da35c66414610bff576101f0565b806397c3ccd8116100de57806397c3ccd8146109825780639c8d83bb146109c65780639c93e16614610a225780639fa6b4a014610a50576101f0565b80638f127322146108545780638f32d59b146108ac578063970aa34e146108ce5780639782e8211461092a576101f0565b806362c855ac116101875780637f440103116101565780637f440103146107065780638513c619146107625780638af5d0d2146107c65780638da5cb5b1461080a576101f0565b806362c855ac146105c857806368da10ae14610656578063715018a6146106ae57806379ba7f39146106b8576101f0565b80633f790146116101c35780633f7901461461040557806354f053971461047d57806355c338aa146105165780636024828c14610584576101f0565b806301267951146101f5578063013cf08b146102395780630a1ffba3146102da578063371eb66914610397575b600080fd5b6102376004803603602081101561020b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d33565b005b6102656004803603602081101561024f57600080fd5b8101908080359060200190929190505050610e8f565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b61031c600480360360208110156102f057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f00565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561035c578082015181840152602081019050610341565b50505050905090810190601f1680156103895780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103c3600480360360208110156103ad57600080fd5b8101908080359060200190929190505050610fb0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104676004803603604081101561041b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610fec565b6040518082815260200191505060405180910390f35b6105146004803603604081101561049357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156104d057600080fd5b8201836020820111156104e257600080fd5b8035906020019184600183028401116401000000008311171561050457600080fd5b9091929391929390505050611011565b005b6105826004803603606081101561052c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611111565b005b6105c66004803603602081101561059a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611297565b005b610614600480360360408110156105de57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061135c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6106986004803603602081101561066c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506113a7565b6040518082815260200191505060405180910390f35b6106b66114d2565b005b610704600480360360408110156106ce57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061160b565b005b6107486004803603602081101561071c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506116d3565b604051808215151515815260200191505060405180910390f35b6107c46004803603604081101561077857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506116f3565b005b610808600480360360208110156107dc57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611904565b005b6108126119d9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6108966004803603602081101561086a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611a02565b6040518082815260200191505060405180910390f35b6108b4611a4e565b604051808215151515815260200191505060405180910390f35b610910600480360360208110156108e457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611aa5565b604051808215151515815260200191505060405180910390f35b61096c6004803603602081101561094057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611ac5565b6040518082815260200191505060405180910390f35b6109c46004803603602081101561099857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611add565b005b610a08600480360360208110156109dc57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611bf5565b604051808215151515815260200191505060405180910390f35b610a4e60048036036020811015610a3857600080fd5b8101908080359060200190929190505050611c15565b005b610a9260048036036020811015610a6657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611d81565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b610b3d60048036036040811015610af157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611dc5565b604051808215151515815260200191505060405180910390f35b610b9960048036036020811015610b6d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611eee565b005b610bfd60048036036040811015610bb157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612006565b005b610c0761208e565b6040518082815260200191505060405180910390f35b610c5f60048036036020811015610c3357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061209b565b005b610caf60048036036040811015610c7757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050612121565b005b610d1360048036036040811015610cc757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612200565b005b610d1d6125a8565b6040518082815260200191505060405180910390f35b600160405180604001604052808373ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050906001820390600052602060002090600202016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f84877e6a47b1faeeabf9d4ac0d4c83816c6e6e69a69919bd28b31868999221f860405160405180910390a350565b60018181548110610e9c57fe5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b60096020528060005260406000206000915090508054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610fa85780601f10610f7d57610100808354040283529160200191610fa8565b820191906000526020600020905b815481529060010190602001808311610f8b57829003601f168201915b505050505081565b60028181548110610fbd57fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6005602052816000526040600020602052806000526040600020600091509150505481565b826001151561101e611a4e565b151514806110395750600115156110358233611dc5565b1515145b61104257600080fd5b8282600960008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091906110909291906129ba565b508373ffffffffffffffffffffffffffffffffffffffff167f8bddafc1afbb5ffb7978ef140ddf8afae8c1d786c5d32b73f8da2d0c813bc10e848460405180806020018281038252848482818152602001925080828437600081840152601f19601f820116905080830192505050935050505060405180910390a250505050565b826001151561111e611a4e565b151514806111395750600115156111358233611dc5565b1515145b61114257600080fd5b6103e882111561115157600080fd5b60405180604001604052808473ffffffffffffffffffffffffffffffffffffffff16815260200183815250600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101559050508373ffffffffffffffffffffffffffffffffffffffff167fb6b61d78ac5372b51940cf3b322ea21839c456cade69acdf1b9fb9a6f79d6ff78484604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a250505050565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156112f457600080fd5b505afa158015611308573d6000803e3d6000fd5b505050506040513d602081101561131e57600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff161461134f57600080fd5b61135981336125b5565b50565b6004602052816000526040600020818154811061137557fe5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060011515600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515141561148a578173ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561144857600080fd5b505afa15801561145c573d6000803e3d6000fd5b505050506040513d602081101561147257600080fd5b810190808051906020019092919050505090506114cd565b600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b6114da611a4e565b61154c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b8160011515611618611a4e565b1515148061163357506001151561162f8233611dc5565b1515145b61163c57600080fd5b81600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f39d2a73d35776663391b17495b1604c7f03a3ea88e0eaf24f5a9ab3bdb3205df836040518082815260200191505060405180910390a2505050565b60036020528060005260406000206000915054906101000a900460ff1681565b8160011515611700611a4e565b1515148061171b5750600115156117178233611dc5565b1515145b61172457600080fd5b600115156117328484611dc5565b1515141561173f57600080fd5b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208290806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f80dc3d87a7a642c46b6272b119f53d4db8aef58e5984b633f1055308b77dce6d60405160405180910390a3505050565b600115158173ffffffffffffffffffffffffffffffffffffffff1663aa271e1a336040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561198557600080fd5b505afa158015611999573d6000803e3d6000fd5b505050506040513d60208110156119af57600080fd5b81019080805190602001909291905050501515146119cc57600080fd5b6119d681336125b5565b50565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490509050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b60066020528060005260406000206000915054906101000a900460ff1681565b60076020528060005260406000206000915090505481565b611ae5611a4e565b611b57576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6001600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f9a4e757235705bd178419abc9fa645392c5c7dce5b09940a81ef76794b84bd6860405160405180910390a250565b600a6020528060005260406000206000915054906101000a900460ff1681565b611c1d611a4e565b611c8f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b611c97612a3a565b60018281548110611ca457fe5b90600052602060002090600202016040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050611d7d816000015182602001516125b5565b5050565b60086020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b60008173ffffffffffffffffffffffffffffffffffffffff16600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481548110611ea457fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614905092915050565b611ef6611a4e565b611f68576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6000600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f866c4c4c778f85c380f911e6c43d125e57865fec38a5ccf53b62b74a8473ed1660405160405180910390a250565b61200e611a4e565b612080576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b61208a82826125b5565b5050565b6000600180549050905090565b6120a3611a4e565b612115576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b61211e8161276c565b50565b816001151561212e611a4e565b151514806121495750600115156121458233611dc5565b1515145b61215257600080fd5b81600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508273ffffffffffffffffffffffffffffffffffffffff167fe54e1d877db9d59fb8b6055f09c39b9cf6e4ef0e7423d71bd06b2d86496ba51c83604051808215151515815260200191505060405180910390a2505050565b816001151561220d611a4e565b151514806122285750600115156122248233611dc5565b1515145b61223157600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415801561227a5750600115156122768484611dc5565b1515145b61228357600080fd5b60006122db6001600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490506128b090919063ffffffff16565b90506000600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181146124f4576000600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002083815481106123b157fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020838154811061242957fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054809190600190036125469190612a80565b508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f82854a3ef36f2eb671d3d796a049df4c263e4aae926ac9a7cf483fc411f8e90d60405160405180910390a35050505050565b6000600280549050905090565b60011515600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515141561261357600080fd5b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f473b736fe95295e8fbc851ca8acdc12a750976edad27a92f666b3d888eb895d360405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156127f2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180612ad26026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006128f283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506128fa565b905092915050565b60008383111582906129a7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561296c578082015181840152602081019050612951565b50505050905090810190601f1680156129995780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106129fb57803560ff1916838001178555612a29565b82800160010185558215612a29579182015b82811115612a28578235825591602001919060010190612a0d565b5b509050612a369190612aac565b5090565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b815481835581811115612aa757818360005260206000209182019101612aa69190612aac565b5b505050565b612ace91905b80821115612aca576000816000905550600101612ab2565b5090565b9056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a165627a7a72305820f93a3d36a79da34a808b148b1e3083074d77b18535ca44a03a5cb3fbfd77ab5a0029";
//# sourceMappingURL=PFPs__factory.js.map