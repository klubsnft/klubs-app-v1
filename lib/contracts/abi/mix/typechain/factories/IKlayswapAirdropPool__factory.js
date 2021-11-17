"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IKlayswapAirdropPool__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "tokenAddr",
                type: "address",
            },
        ],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "operator",
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
                name: "_nextOwner",
                type: "address",
            },
        ],
        name: "changeNextOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "changeOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "totalAmount",
                type: "uint256",
            },
            {
                name: "blockAmount",
                type: "uint256",
            },
            {
                name: "startBlock",
                type: "uint256",
            },
        ],
        name: "createDistribution",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "deposit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "forward",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "blockAmount",
                type: "uint256",
            },
        ],
        name: "refixBlockAmount",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "getAirdropStat",
        outputs: [
            {
                name: "distributionContract",
                type: "address",
            },
            {
                name: "totalAmount",
                type: "uint256",
            },
            {
                name: "blockAmount",
                type: "uint256",
            },
            {
                name: "distributableBlock",
                type: "uint256",
            },
            {
                name: "endBlock",
                type: "uint256",
            },
            {
                name: "distributed",
                type: "uint256",
            },
            {
                name: "remain",
                type: "uint256",
            },
            {
                name: "targetCount",
                type: "uint256",
            },
            {
                name: "targets",
                type: "address[]",
            },
            {
                name: "rates",
                type: "uint256[]",
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
                indexed: true,
                name: "operator",
                type: "address",
            },
        ],
        name: "SetOperator",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "keeper",
                type: "address",
            },
        ],
        name: "SetKeeper",
        type: "event",
    },
];
class IKlayswapAirdropPool__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IKlayswapAirdropPool__factory = IKlayswapAirdropPool__factory;
IKlayswapAirdropPool__factory.abi = _abi;
//# sourceMappingURL=IKlayswapAirdropPool__factory.js.map