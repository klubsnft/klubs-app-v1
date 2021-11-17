"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITurntableKIP7Listeners__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: true,
        inputs: [],
        name: "totalShares",
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
        name: "listen",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
            {
                name: "owner",
                type: "address",
            },
        ],
        name: "shares",
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
        name: "unlisten",
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
            {
                name: "owner",
                type: "address",
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
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
            {
                name: "owner",
                type: "address",
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
        constant: true,
        inputs: [],
        name: "turntableFee",
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
            {
                name: "owner",
                type: "address",
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
                indexed: true,
                name: "to",
                type: "address",
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
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "turntableId",
                type: "uint256",
            },
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Listen",
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
                indexed: true,
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Unlisten",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "fee",
                type: "uint256",
            },
        ],
        name: "SetTurntableFee",
        type: "event",
    },
];
class ITurntableKIP7Listeners__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ITurntableKIP7Listeners__factory = ITurntableKIP7Listeners__factory;
ITurntableKIP7Listeners__factory.abi = _abi;
//# sourceMappingURL=ITurntableKIP7Listeners__factory.js.map