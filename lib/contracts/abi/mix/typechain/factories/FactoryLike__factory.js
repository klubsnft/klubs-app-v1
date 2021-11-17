"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryLike__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "address",
            },
        ],
        name: "poolExist",
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
];
class FactoryLike__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.FactoryLike__factory = FactoryLike__factory;
FactoryLike__factory.abi = _abi;
//# sourceMappingURL=FactoryLike__factory.js.map