"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITurntableKIP17Listeners__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
            {
                name: "id",
                type: "uint256",
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
        constant: true,
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
            {
                name: "id",
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
        constant: false,
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
            {
                name: "ids",
                type: "uint256[]",
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
                name: "id",
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
        constant: true,
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "listenerCount",
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
                name: "ids",
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
        constant: false,
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
            {
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "listen",
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
                name: "index",
                type: "uint256",
            },
        ],
        name: "listeners",
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
                name: "id",
                type: "uint256",
            },
        ],
        name: "realClaimedOf",
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
                name: "id",
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
                indexed: true,
                name: "id",
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
                indexed: true,
                name: "id",
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
class ITurntableKIP17Listeners__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ITurntableKIP17Listeners__factory = ITurntableKIP17Listeners__factory;
ITurntableKIP17Listeners__factory.abi = _abi;
//# sourceMappingURL=ITurntableKIP17Listeners__factory.js.map