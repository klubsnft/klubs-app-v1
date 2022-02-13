"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMetaverses__factory = void 0;
const ethers_1 = require("ethers");
class IMetaverses__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IMetaverses__factory = IMetaverses__factory;
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "manager",
                type: "address",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "managerMetaverses",
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
        name: "itemProposalCount",
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
                name: "id",
                type: "uint256",
            },
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
        inputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "manager",
                type: "address",
            },
        ],
        name: "addManager",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
        name: "addMetaverse",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
        name: "itemProposals",
        outputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
            {
                name: "itemType",
                type: "uint8",
            },
            {
                name: "proposer",
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
                name: "id",
                type: "uint256",
            },
        ],
        name: "mileageOff",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
            {
                name: "totalSupply",
                type: "uint256",
            },
        ],
        name: "setItemTotalSupply",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "metaverseCount",
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
            {
                name: "item",
                type: "address",
            },
        ],
        name: "itemTypes",
        outputs: [
            {
                name: "",
                type: "uint8",
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
        name: "removeProposal",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
                name: "id",
                type: "uint256",
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
                name: "id",
                type: "uint256",
            },
            {
                name: "manager",
                type: "address",
            },
        ],
        name: "removeManager",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
            {
                name: "itemType",
                type: "uint8",
            },
        ],
        name: "proposeItem",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
        ],
        name: "itemEnumerables",
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
                name: "id",
                type: "uint256",
            },
            {
                name: "receiver",
                type: "address",
            },
            {
                name: "royalty",
                type: "uint256",
            },
        ],
        name: "setRoyalty",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
        name: "royalties",
        outputs: [
            {
                name: "receiver",
                type: "address",
            },
            {
                name: "royalty",
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
                name: "manager",
                type: "address",
            },
        ],
        name: "managerMetaversesCount",
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
            {
                name: "item",
                type: "address",
            },
        ],
        name: "itemAddedBlocks",
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
            {
                name: "item",
                type: "address",
            },
        ],
        name: "itemTotalSupplies",
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
        name: "managerCount",
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
                name: "id",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
            {
                name: "enumerable",
                type: "bool",
            },
        ],
        name: "setItemEnumerable",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
        name: "mileageMode",
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
                name: "id",
                type: "uint256",
            },
            {
                name: "manager",
                type: "address",
            },
        ],
        name: "existsManager",
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
                name: "id",
                type: "uint256",
            },
        ],
        name: "itemAddrCount",
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
            {
                name: "item",
                type: "address",
            },
        ],
        name: "itemAdded",
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
                name: "id",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
            {
                name: "extra",
                type: "string",
            },
        ],
        name: "setItemExtra",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
        ],
        name: "itemExtras",
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
                name: "proposalId",
                type: "uint256",
            },
            {
                name: "extra",
                type: "string",
            },
        ],
        name: "passProposal",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "itemAddrs",
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
                name: "id",
                type: "uint256",
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
        constant: false,
        inputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
            {
                name: "itemType",
                type: "uint8",
            },
            {
                name: "extra",
                type: "string",
            },
        ],
        name: "addItem",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "managers",
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
                name: "id",
                type: "uint256",
            },
        ],
        name: "mileageOn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "item",
                type: "address",
            },
        ],
        name: "getItemTotalSupply",
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
                name: "manager",
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
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "manager",
                type: "address",
            },
        ],
        name: "AddManager",
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
                indexed: true,
                name: "manager",
                type: "address",
            },
        ],
        name: "RemoveManager",
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
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                name: "royalty",
                type: "uint256",
            },
        ],
        name: "SetRoyalty",
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
        ],
        name: "JoinOnlyKlubsMembership",
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
        ],
        name: "ExitOnlyKlubsMembership",
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
        ],
        name: "MileageOn",
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
        ],
        name: "MileageOff",
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
        ],
        name: "Ban",
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
        ],
        name: "Unban",
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
                indexed: true,
                name: "item",
                type: "address",
            },
            {
                indexed: false,
                name: "itemType",
                type: "uint8",
            },
            {
                indexed: true,
                name: "proposer",
                type: "address",
            },
        ],
        name: "ProposeItem",
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
                indexed: true,
                name: "item",
                type: "address",
            },
            {
                indexed: false,
                name: "itemType",
                type: "uint8",
            },
        ],
        name: "AddItem",
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
                indexed: true,
                name: "item",
                type: "address",
            },
            {
                indexed: false,
                name: "enumerable",
                type: "bool",
            },
        ],
        name: "SetItemEnumerable",
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
                indexed: true,
                name: "item",
                type: "address",
            },
            {
                indexed: false,
                name: "totalSupply",
                type: "uint256",
            },
        ],
        name: "SetItemTotalSupply",
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
                indexed: true,
                name: "item",
                type: "address",
            },
            {
                indexed: false,
                name: "extra",
                type: "string",
            },
        ],
        name: "SetItemExtra",
        type: "event",
    },
];
//# sourceMappingURL=IMetaverses__factory.js.map