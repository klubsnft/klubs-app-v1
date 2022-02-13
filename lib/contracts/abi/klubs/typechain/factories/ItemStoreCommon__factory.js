"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemStoreCommon__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class ItemStoreCommon__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_metaverses, _mix, _mileage, overrides) {
        return super.deploy(_metaverses, _mix, _mileage, overrides || {});
    }
    getDeployTransaction(_metaverses, _mix, _mileage, overrides) {
        return super.getDeployTransaction(_metaverses, _mix, _mileage, overrides || {});
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
exports.ItemStoreCommon__factory = ItemStoreCommon__factory;
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "user",
                type: "address",
            },
        ],
        name: "banUser",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "mileage",
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
                name: "metaverseIds",
                type: "uint256[]",
            },
            {
                name: "items",
                type: "address[]",
            },
            {
                name: "ids",
                type: "uint256[]",
            },
            {
                name: "to",
                type: "address[]",
            },
            {
                name: "amounts",
                type: "uint256[]",
            },
        ],
        name: "batchTransfer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "user",
                type: "address",
            },
        ],
        name: "unbanUser",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_fee",
                type: "uint256",
            },
        ],
        name: "setFee",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
                name: "interval",
                type: "uint256",
            },
        ],
        name: "setAuctionExtensionInterval",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_metaverses",
                type: "address",
            },
        ],
        name: "setMetaverses",
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
        name: "isBannedUser",
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
        name: "metaverses",
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
        name: "auctionExtensionInterval",
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
        name: "feeReceiver",
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
        name: "mix",
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
        name: "fee",
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
        inputs: [
            {
                name: "metaverseId",
                type: "uint256",
            },
        ],
        name: "isMetaverseWhitelisted",
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
                name: "_receiver",
                type: "address",
            },
        ],
        name: "setFeeReceiver",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
                name: "metaverseId",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
        ],
        name: "isItemWhitelisted",
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
        inputs: [
            {
                name: "_metaverses",
                type: "address",
            },
            {
                name: "_mix",
                type: "address",
            },
            {
                name: "_mileage",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "user",
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
                name: "user",
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
const _bytecode = "0x608060405260fa60015561012c60035534801561001b57600080fd5b50604051606080610f9f8339810180604052606081101561003b57600080fd5b5080516020820151604092830151600080546001600160a01b031916331780825594519394929391926001600160a01b0316917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3600280546001600160a01b03199081163317909155600480546001600160a01b03958616908316179055600580549385169382169390931790925560068054919093169116179055610eb5806100ea6000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c80638fb74ae9116100ad578063ddca3f4311610071578063ddca3f4314610435578063e1dd31741461043d578063efdcd9741461045a578063f2fde38b14610480578063ff7433a4146104a65761012c565b80638fb74ae9146103dd578063977803b714610403578063a914607c1461040b578063b3f0067414610425578063be32cf8d1461042d5761012c565b8063715018a6116100f4578063715018a61461036e57806382223202146103765780638480d841146103935780638da5cb5b146103b95780638f32d59b146103c15761012c565b806310d86b1f1461013157806315585289146101595780633e87c3a11461017d5780634d12b6951461032b57806369fe0e2d14610351575b600080fd5b6101576004803603602081101561014757600080fd5b50356001600160a01b03166104d2565b005b610161610568565b604080516001600160a01b039092168252519081900360200190f35b610157600480360360a081101561019357600080fd5b810190602081018135600160201b8111156101ad57600080fd5b8201836020820111156101bf57600080fd5b803590602001918460208302840111600160201b831117156101e057600080fd5b919390929091602081019035600160201b8111156101fd57600080fd5b82018360208201111561020f57600080fd5b803590602001918460208302840111600160201b8311171561023057600080fd5b919390929091602081019035600160201b81111561024d57600080fd5b82018360208201111561025f57600080fd5b803590602001918460208302840111600160201b8311171561028057600080fd5b919390929091602081019035600160201b81111561029d57600080fd5b8201836020820111156102af57600080fd5b803590602001918460208302840111600160201b831117156102d057600080fd5b919390929091602081019035600160201b8111156102ed57600080fd5b8201836020820111156102ff57600080fd5b803590602001918460208302840111600160201b8311171561032057600080fd5b509092509050610577565b6101576004803603602081101561034157600080fd5b50356001600160a01b03166106bf565b6101576004803603602081101561036757600080fd5b5035610752565b6101576107af565b6101576004803603602081101561038c57600080fd5b5035610843565b610157600480360360208110156103a957600080fd5b50356001600160a01b0316610892565b6101616108fe565b6103c961090d565b604080519115158252519081900360200190f35b6103c9600480360360208110156103f357600080fd5b50356001600160a01b031661091e565b610161610933565b610413610942565b60408051918252519081900360200190f35b610161610948565b610161610957565b610413610966565b6103c96004803603602081101561045357600080fd5b503561096c565b6101576004803603602081101561047057600080fd5b50356001600160a01b0316610a72565b6101576004803603602081101561049657600080fd5b50356001600160a01b0316610ade565b6103c9600480360360408110156104bc57600080fd5b50803590602001356001600160a01b0316610b34565b6104da61090d565b61051c5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020610e6a833981519152604482015290519081900360640190fd5b6001600160a01b038116600081815260076020526040808220805460ff19166001179055517f9a4e757235705bd178419abc9fa645392c5c7dce5b09940a81ef76794b84bd689190a250565b6006546001600160a01b031681565b888714801561058557508885145b801561059057508883145b801561059b57508881145b6105a457600080fd5b3360009081526007602052604090205460ff16156105c157600080fd5b60005b898110156106b2576106038b8b838181106105db57fe5b905060200201358a8a848181106105ee57fe5b905060200201356001600160a01b0316610b34565b61060c57600080fd5b6004546106aa906001600160a01b03168c8c8481811061062857fe5b9050602002013589898581811061063b57fe5b9050602002013586868681811061064e57fe5b90506020020135338a8a8881811061066257fe5b905060200201356001600160a01b03168f8f8981811061067e57fe5b905060200201356001600160a01b03166001600160a01b0316610bcf909695949392919063ffffffff16565b6001016105c4565b5050505050505050505050565b6106c761090d565b6107095760408051600160e51b62461bcd0281526020600482018190526024820152600080516020610e6a833981519152604482015290519081900360640190fd5b6001600160a01b038116600081815260076020526040808220805460ff19169055517f866c4c4c778f85c380f911e6c43d125e57865fec38a5ccf53b62b74a8473ed169190a250565b61075a61090d565b61079c5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020610e6a833981519152604482015290519081900360640190fd5b61232881106107aa57600080fd5b600155565b6107b761090d565b6107f95760408051600160e51b62461bcd0281526020600482018190526024820152600080516020610e6a833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b61084b61090d565b61088d5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020610e6a833981519152604482015290519081900360640190fd5b600355565b61089a61090d565b6108dc5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020610e6a833981519152604482015290519081900360640190fd5b600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031690565b6000546001600160a01b0316331490565b60076020526000908152604090205460ff1681565b6004546001600160a01b031681565b60035481565b6002546001600160a01b031681565b6005546001600160a01b031681565b60015481565b6000600460009054906101000a90046001600160a01b03166001600160a01b031663472415756040518163ffffffff1660e01b815260040160206040518083038186803b1580156109bc57600080fd5b505afa1580156109d0573d6000803e3d6000fd5b505050506040513d60208110156109e657600080fd5b505182108015610a6c57506004805460408051600160e01b63c86352f3028152928301859052516001600160a01b039091169163c86352f3916024808301926020929190829003018186803b158015610a3e57600080fd5b505afa158015610a52573d6000803e3d6000fd5b505050506040513d6020811015610a6857600080fd5b5051155b92915050565b610a7a61090d565b610abc5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020610e6a833981519152604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b0392909216919091179055565b610ae661090d565b610b285760408051600160e51b62461bcd0281526020600482018190526024820152600080516020610e6a833981519152604482015290519081900360640190fd5b610b3181610cff565b50565b6000610b3f8361096c565b8015610bc857506004805460408051600160e01b63b2c9d1890281529283018690526001600160a01b038581166024850152905191169163b2c9d189916044808301926020929190829003018186803b158015610b9b57600080fd5b505afa158015610baf573d6000803e3d6000fd5b505050506040513d6020811015610bc557600080fd5b50515b9392505050565b610bda878787610da2565b15610c785760008311610bec57600080fd5b60408051600160e11b63792121950281526001600160a01b0384811660048301528381166024830152604482018790526064820186905260a06084830152600060a483018190529251908a169263f242432a9260e4808201939182900301818387803b158015610c5b57600080fd5b505af1158015610c6f573d6000803e3d6000fd5b50505050610cf6565b82600114610c8557600080fd5b60408051600160e01b6323b872dd0281526001600160a01b0384811660048301528381166024830152604482018790529151918916916323b872dd9160648082019260009290919082900301818387803b158015610ce257600080fd5b505af11580156106b2573d6000803e3d6000fd5b50505050505050565b6001600160a01b038116610d4757604051600160e51b62461bcd028152600401808060200182810382526026815260200180610e446026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600080836001600160a01b03166349d1834a84876040518363ffffffff1660e01b815260040180838152602001826001600160a01b03166001600160a01b031681526020019250505060206040518083038186803b158015610e0357600080fd5b505afa158015610e17573d6000803e3d6000fd5b505050506040513d6020811015610e2d57600080fd5b50516001811115610e3a57fe5b1494935050505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a165627a7a72305820769c5b244b449227143f4208dcebe96a98c834131e8a99410669117894c361cd0029";
//# sourceMappingURL=ItemStoreCommon__factory.js.map