"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasuryLike__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "uint256",
            },
            {
                name: "",
                type: "uint256",
            },
            {
                name: "",
                type: "uint256",
            },
            {
                name: "",
                type: "address[]",
            },
            {
                name: "",
                type: "uint256[]",
            },
        ],
        name: "createTokenDistribution",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "address[]",
            },
            {
                name: "",
                type: "uint256[]",
            },
        ],
        name: "refixDistributionRate",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
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
        name: "depositToken",
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
                type: "address",
            },
        ],
        name: "distributions",
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
                name: "",
                type: "uint256",
            },
            {
                name: "",
                type: "uint256",
            },
            {
                name: "",
                type: "address[]",
            },
            {
                name: "",
                type: "uint256[]",
            },
        ],
        name: "createKlayDistribution",
        outputs: [],
        payable: true,
        stateMutability: "payable",
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
        name: "validOperator",
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
        constant: false,
        inputs: [],
        name: "depositKlay",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: false,
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
        name: "refixBlockAmount",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
class TreasuryLike__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.TreasuryLike__factory = TreasuryLike__factory;
TreasuryLike__factory.abi = _abi;
//# sourceMappingURL=TreasuryLike__factory.js.map