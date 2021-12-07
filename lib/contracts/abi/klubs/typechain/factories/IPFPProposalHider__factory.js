"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPFPProposalHider__factory = void 0;
const ethers_1 = require("ethers");
class IPFPProposalHider__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IPFPProposalHider__factory = IPFPProposalHider__factory;
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "proposalId",
                type: "uint256",
            },
        ],
        name: "hiding",
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
                name: "proposalId",
                type: "uint256",
            },
        ],
        name: "show",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "proposalId",
                type: "uint256",
            },
        ],
        name: "hide",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "proposalId",
                type: "uint256",
            },
        ],
        name: "Hide",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "proposalId",
                type: "uint256",
            },
        ],
        name: "Show",
        type: "event",
    },
];
//# sourceMappingURL=IPFPProposalHider__factory.js.map