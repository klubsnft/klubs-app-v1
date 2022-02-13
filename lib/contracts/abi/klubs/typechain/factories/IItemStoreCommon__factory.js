"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IItemStoreCommon__factory = void 0;
const ethers_1 = require("ethers");
class IItemStoreCommon__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IItemStoreCommon__factory = IItemStoreCommon__factory;
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
        inputs: [
            {
                name: "user",
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
];
//# sourceMappingURL=IItemStoreCommon__factory.js.map