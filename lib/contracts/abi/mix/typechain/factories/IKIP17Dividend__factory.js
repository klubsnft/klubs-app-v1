"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IKIP17Dividend__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: true,
        inputs: [],
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
                name: "id",
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
        constant: true,
        inputs: [
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
                name: "ids",
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
];
class IKIP17Dividend__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IKIP17Dividend__factory = IKIP17Dividend__factory;
IKIP17Dividend__factory.abi = _abi;
//# sourceMappingURL=IKIP17Dividend__factory.js.map