"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMixEmitter__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "pid",
                type: "uint256",
            },
        ],
        name: "poolInfo",
        outputs: [
            {
                name: "to",
                type: "address",
            },
            {
                name: "allocPoint",
                type: "uint256",
            },
            {
                name: "lastEmitBlock",
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
        name: "totalAllocPoint",
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
        name: "started",
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
                name: "pid",
                type: "uint256",
            },
        ],
        name: "updatePool",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
        inputs: [
            {
                name: "pid",
                type: "uint256",
            },
        ],
        name: "pendingMix",
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
        name: "emissionPerBlock",
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
        name: "poolCount",
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
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                name: "allocPoint",
                type: "uint256",
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
                name: "pid",
                type: "uint256",
            },
            {
                indexed: false,
                name: "allocPoint",
                type: "uint256",
            },
        ],
        name: "Set",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "emissionPerBlock",
                type: "uint256",
            },
        ],
        name: "SetEmissionPerBlock",
        type: "event",
    },
];
class IMixEmitter__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IMixEmitter__factory = IMixEmitter__factory;
IMixEmitter__factory.abi = _abi;
//# sourceMappingURL=IMixEmitter__factory.js.map