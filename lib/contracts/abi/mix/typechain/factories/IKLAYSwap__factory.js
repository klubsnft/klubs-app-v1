"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IKLAYSwap__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "token",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
            {
                name: "path",
                type: "address[]",
            },
        ],
        name: "exchangeKlayPos",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "tokenA",
                type: "address",
            },
            {
                name: "amountA",
                type: "uint256",
            },
            {
                name: "tokenB",
                type: "address",
            },
            {
                name: "amountB",
                type: "uint256",
            },
            {
                name: "path",
                type: "address[]",
            },
        ],
        name: "exchangeKctPos",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IKLAYSwap__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IKLAYSwap__factory = IKLAYSwap__factory;
IKLAYSwap__factory.abi = _abi;
//# sourceMappingURL=IKLAYSwap__factory.js.map