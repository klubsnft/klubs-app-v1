"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IArtists__factory = void 0;
const ethers_1 = require("ethers");
class IArtists__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IArtists__factory = IArtists__factory;
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "artist",
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
        constant: false,
        inputs: [
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
        inputs: [],
        name: "add",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "artist",
                type: "address",
            },
        ],
        name: "addedBlocks",
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
                name: "artist",
                type: "address",
            },
        ],
        name: "onlyKlubsMembership",
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
                name: "artist",
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
        constant: true,
        inputs: [
            {
                name: "artist",
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
        constant: true,
        inputs: [
            {
                name: "artist",
                type: "address",
            },
        ],
        name: "baseRoyalty",
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
                name: "_baseRoyalty",
                type: "uint256",
            },
        ],
        name: "setBaseRoyalty",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "artistCount",
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
                name: "index",
                type: "uint256",
            },
        ],
        name: "artists",
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
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "artist",
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
                name: "artist",
                type: "address",
            },
            {
                indexed: false,
                name: "baseRoyalty",
                type: "uint256",
            },
        ],
        name: "SetBaseRoyalty",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "artist",
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
                name: "artist",
                type: "address",
            },
        ],
        name: "JoinOnlyKlubsMembership",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "artist",
                type: "address",
            },
        ],
        name: "ExitOnlyKlubsMembership",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "artist",
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
                name: "artist",
                type: "address",
            },
        ],
        name: "Unban",
        type: "event",
    },
];
//# sourceMappingURL=IArtists__factory.js.map