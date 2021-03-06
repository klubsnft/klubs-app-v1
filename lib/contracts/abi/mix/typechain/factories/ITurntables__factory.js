"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITurntables__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: true,
        inputs: [],
        name: "turntableLength",
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
                name: "turntableId",
                type: "uint256",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "charge",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "claimedOf",
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
                name: "price",
                type: "uint256",
            },
            {
                name: "destroyReturn",
                type: "uint256",
            },
            {
                name: "volume",
                type: "uint256",
            },
            {
                name: "lifetime",
                type: "uint256",
            },
        ],
        name: "addType",
        outputs: [
            {
                name: "typeId",
                type: "uint256",
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
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "exists",
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
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "claimableOf",
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
        name: "totalVolume",
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
        name: "typeCount",
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
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
                name: "turntableIds",
                type: "uint256[]",
            },
        ],
        name: "claim",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "typeId",
                type: "uint256",
            },
        ],
        name: "allowType",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "accumulativeOf",
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
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "destroy",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "typeId",
                type: "uint256",
            },
        ],
        name: "denyType",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "typeId",
                type: "uint256",
            },
        ],
        name: "types",
        outputs: [
            {
                name: "price",
                type: "uint256",
            },
            {
                name: "destroyReturn",
                type: "uint256",
            },
            {
                name: "volume",
                type: "uint256",
            },
            {
                name: "lifetime",
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
                name: "typeId",
                type: "uint256",
            },
        ],
        name: "buy",
        outputs: [
            {
                name: "turntableId",
                type: "uint256",
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
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "turntables",
        outputs: [
            {
                name: "owner",
                type: "address",
            },
            {
                name: "typeId",
                type: "uint256",
            },
            {
                name: "endBlock",
                type: "uint256",
            },
            {
                name: "lastClaimedBlock",
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
        name: "pid",
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
                indexed: false,
                name: "price",
                type: "uint256",
            },
            {
                indexed: false,
                name: "destroyReturn",
                type: "uint256",
            },
            {
                indexed: false,
                name: "volume",
                type: "uint256",
            },
            {
                indexed: false,
                name: "lifetime",
                type: "uint256",
            },
        ],
        name: "AddType",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "typeId",
                type: "uint256",
            },
        ],
        name: "AllowType",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "typeId",
                type: "uint256",
            },
        ],
        name: "DenyType",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "value",
                type: "uint256",
            },
        ],
        name: "ChangeChargingEfficiency",
        type: "event",
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
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "Buy",
        type: "event",
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
                name: "turntableId",
                type: "uint256",
            },
            {
                indexed: false,
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Charge",
        type: "event",
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
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "Destroy",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "by",
                type: "address",
            },
            {
                indexed: false,
                name: "distributed",
                type: "uint256",
            },
        ],
        name: "Distribute",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "turntableId",
                type: "uint256",
            },
            {
                indexed: false,
                name: "claimed",
                type: "uint256",
            },
        ],
        name: "Claim",
        type: "event",
    },
];
class ITurntables__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ITurntables__factory = ITurntables__factory;
ITurntables__factory.abi = _abi;
//# sourceMappingURL=ITurntables__factory.js.map