"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PFPsV2__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class PFPsV2__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.PFPsV2__factory = PFPsV2__factory;
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "propose",
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
                type: "uint256",
            },
        ],
        name: "proposals",
        outputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "manager",
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
                name: "",
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
                name: "addr",
                type: "address",
            },
        ],
        name: "exitOnlyKlubsMembership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "mileageOff",
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
                type: "uint256",
            },
        ],
        name: "addrs",
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
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "uint256",
            },
        ],
        name: "managerPFPs",
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
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "address",
            },
        ],
        name: "managersIndex",
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
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
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
                name: "addr",
                type: "address",
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
                name: "",
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
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "addByPFPOwner",
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
        constant: true,
        inputs: [
            {
                name: "",
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
                name: "addr",
                type: "address",
            },
        ],
        name: "getTotalSupply",
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
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "address",
            },
        ],
        name: "managerPFPsIndex",
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
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "totalSupply",
                type: "uint256",
            },
        ],
        name: "setTotalSupply",
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
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
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
                name: "addr",
                type: "address",
            },
        ],
        name: "addByMinter",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
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
                name: "addr",
                type: "address",
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
        constant: true,
        inputs: [],
        name: "isOwner",
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
                name: "",
                type: "address",
            },
        ],
        name: "enumerables",
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
                name: "",
                type: "address",
            },
        ],
        name: "totalSupplies",
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
                name: "addr",
                type: "address",
            },
        ],
        name: "ban",
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
                name: "proposalId",
                type: "uint256",
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
                name: "",
                type: "address",
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
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
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
                name: "",
                type: "address",
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
                name: "addr",
                type: "address",
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
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "unban",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "joinOnlyKlubsMembership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
        name: "managerPFPCount",
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
                name: "addr",
                type: "address",
            },
            {
                name: "manager",
                type: "address",
            },
        ],
        name: "addByOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "proposalCount",
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
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "enumerable",
                type: "bool",
            },
        ],
        name: "setEnumerable",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
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
        constant: true,
        inputs: [],
        name: "addrCount",
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
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "manager",
                type: "address",
            },
        ],
        name: "Propose",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
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
                name: "addr",
                type: "address",
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
                name: "addr",
                type: "address",
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
                name: "addr",
                type: "address",
            },
            {
                indexed: false,
                name: "enumerable",
                type: "bool",
            },
        ],
        name: "SetEnumerable",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: false,
                name: "totalSupply",
                type: "uint256",
            },
        ],
        name: "SetTotalSupply",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
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
                name: "addr",
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
                name: "addr",
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
                name: "addr",
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
                name: "addr",
                type: "address",
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
                name: "addr",
                type: "address",
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
                name: "addr",
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
                name: "addr",
                type: "address",
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
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
];
const _bytecode = "0x60806040819052600080546001600160a01b03191633178082556001600160a01b0316917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a361200f806100576000396000f3fe608060405234801561001057600080fd5b50600436106102695760003560e01c80638af5d0d211610151578063a2179329116100c3578063d7ef5f3111610087578063d7ef5f311461090c578063da35c6641461093a578063f2fde38b14610942578063f4c8119714610968578063f85771b214610996578063f9dabeff146109c457610269565b8063a217932914610846578063b16f0f881461086c578063b9f145571461089a578063c48d2c6c146108c0578063cfa63367146108e657610269565b80639782e821116101155780639782e8211461074857806397c3ccd81461076e5780639c8d83bb146107945780639c93e166146107ba5780639fa6b4a0146107d7578063a1486b5f1461082057610269565b80638af5d0d2146106c65780638da5cb5b146106ec5780638f127322146106f45780638f32d59b1461071a578063970aa34e1461072257610269565b806355c338aa116101ea57806368da10ae116101ae57806368da10ae146105ea5780636fe8f6b414610610578063715018a61461063e57806379ba7f39146106465780637f440103146106725780638513c6191461069857610269565b806355c338aa146105025780635db218e1146105385780636024828c1461055e57806362c855ac14610584578063664bc0fa146105b057610269565b8063371eb66911610231578063371eb669146103c05780633c39e3a1146103f95780633f790146146104255780634ce4e6c71461046557806354f053971461048257610269565b8063012679511461026e578063013cf08b146102965780630a1ffba3146102d9578063113326a014610374578063116b0d7d1461039a575b600080fd5b6102946004803603602081101561028457600080fd5b50356001600160a01b03166109cc565b005b6102b3600480360360208110156102ac57600080fd5b5035610a96565b604080516001600160a01b03938416815291909216602082015281519081900390910190f35b6102ff600480360360208110156102ef57600080fd5b50356001600160a01b0316610acc565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610339578181015183820152602001610321565b50505050905090810190601f1680156103665780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102946004803603602081101561038a57600080fd5b50356001600160a01b0316610b67565b610294600480360360208110156103b057600080fd5b50356001600160a01b0316610bfa565b6103dd600480360360208110156103d657600080fd5b5035610c71565b604080516001600160a01b039092168252519081900360200190f35b6103dd6004803603604081101561040f57600080fd5b506001600160a01b038135169060200135610c98565b6104536004803603604081101561043b57600080fd5b506001600160a01b0381358116916020013516610ccd565b60408051918252519081900360200190f35b6102946004803603602081101561047b57600080fd5b5035610cea565b6102946004803603604081101561049857600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156104c357600080fd5b8201836020820111156104d557600080fd5b803590602001918460018302840111640100000000831117156104f757600080fd5b509092509050610d70565b6102946004803603606081101561051857600080fd5b506001600160a01b03813581169160208101359091169060400135610e31565b6104536004803603602081101561054e57600080fd5b50356001600160a01b0316610ef8565b6102946004803603602081101561057457600080fd5b50356001600160a01b0316610f0a565b6103dd6004803603604081101561059a57600080fd5b506001600160a01b038135169060200135610f99565b6105d6600480360360208110156105c657600080fd5b50356001600160a01b0316610fb2565b604080519115158252519081900360200190f35b6104536004803603602081101561060057600080fd5b50356001600160a01b0316610fc7565b6104536004803603604081101561062657600080fd5b506001600160a01b0381358116916020013516611079565b610294611096565b6102946004803603604081101561065c57600080fd5b506001600160a01b03813516906020013561112a565b6105d66004803603602081101561068857600080fd5b50356001600160a01b03166111dd565b610294600480360360408110156106ae57600080fd5b506001600160a01b03813581169160200135166111f2565b610294600480360360208110156106dc57600080fd5b50356001600160a01b03166112ef565b6103dd611372565b6104536004803603602081101561070a57600080fd5b50356001600160a01b0316611382565b6105d661139d565b6105d66004803603602081101561073857600080fd5b50356001600160a01b03166113ae565b6104536004803603602081101561075e57600080fd5b50356001600160a01b03166113c3565b6102946004803603602081101561078457600080fd5b50356001600160a01b03166113d5565b6105d6600480360360208110156107aa57600080fd5b50356001600160a01b031661146b565b610294600480360360208110156107d057600080fd5b5035611480565b6107fd600480360360208110156107ed57600080fd5b50356001600160a01b0316611560565b604080516001600160a01b03909316835260208301919091528051918290030190f35b6102946004803603602081101561083657600080fd5b50356001600160a01b0316611585565b6105d66004803603602081101561085c57600080fd5b50356001600160a01b03166115ff565b6105d66004803603604081101561088257600080fd5b506001600160a01b0381358116916020013516611614565b610294600480360360208110156108b057600080fd5b50356001600160a01b031661166e565b610294600480360360208110156108d657600080fd5b50356001600160a01b0316611701565b610453600480360360208110156108fc57600080fd5b50356001600160a01b0316611797565b6102946004803603604081101561092257600080fd5b506001600160a01b03813581169160200135166117b2565b61045361180a565b6102946004803603602081101561095857600080fd5b50356001600160a01b0316611810565b6102946004803603604081101561097e57600080fd5b506001600160a01b0381351690602001351515611863565b610294600480360360408110156109ac57600080fd5b506001600160a01b03813581169160200135166118f1565b610453611c18565b6040805180820182526001600160a01b0380841680835233602084018181526001805480820182556000918252955160029096027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6810180549787166001600160a01b031998891617905591517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf7909201805492909516919095161790925592519092917f84877e6a47b1faeeabf9d4ac0d4c83816c6e6e69a69919bd28b31868999221f891a350565b60018181548110610aa357fe5b6000918252602090912060029091020180546001909101546001600160a01b0391821692501682565b600c6020908152600091825260409182902080548351601f600260001961010060018616150201909316929092049182018490048402810184019094528084529091830182828015610b5f5780601f10610b3457610100808354040283529160200191610b5f565b820191906000526020600020905b815481529060010190602001808311610b4257829003601f168201915b505050505081565b610b6f61139d565b610bb15760408051600160e51b62461bcd0281526020600482018190526024820152600080516020611fc4833981519152604482015290519081900360640190fd5b6001600160a01b0381166000818152600d6020526040808220805460ff19169055517fa615a95795e27d8c40a3fe76611bec5fc90955c7536169cb3ccbe211ef0238699190a250565b80610c0361139d565b151560011480610c1e5750610c188133611614565b15156001145b610c2757600080fd5b6001600160a01b0382166000818152600e6020526040808220805460ff19169055517f06c2fc1a89b32d044c11cd91b55f2d2d7238edd16acf23dc5cde28bcb09afd5f9190a25050565b60028181548110610c7e57fe5b6000918252602090912001546001600160a01b0316905081565b60076020528160005260406000208181548110610cb157fe5b6000918252602090912001546001600160a01b03169150829050565b600660209081526000928352604080842090915290825290205481565b610cf261139d565b610d345760408051600160e51b62461bcd0281526020600482018190526024820152600080516020611fc4833981519152604482015290519081900360640190fd5b60018181548110610d4157fe5b6000918252602090912060029091020180546001600160a01b0319908116825560019091018054909116905550565b82610d7961139d565b151560011480610d945750610d8e8133611614565b15156001145b610d9d57600080fd5b6001600160a01b0384166000908152600c60205260409020610dc0908484611ec5565b50836001600160a01b03167f8bddafc1afbb5ffb7978ef140ddf8afae8c1d786c5d32b73f8da2d0c813bc10e848460405180806020018281038252848482818152602001925080828437600083820152604051601f909101601f19169092018290039550909350505050a250505050565b82610e3a61139d565b151560011480610e555750610e4f8133611614565b15156001145b610e5e57600080fd5b6103e8821115610e6d57600080fd5b6040805180820182526001600160a01b0385811680835260208084018781528984166000818152600b8452879020955186546001600160a01b0319169516949094178555516001909401939093558351908152918201859052825190927fb6b61d78ac5372b51940cf3b322ea21839c456cade69acdf1b9fb9a6f79d6ff7928290030190a250505050565b60046020526000908152604090205481565b336001600160a01b0316816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610f4d57600080fd5b505afa158015610f61573d6000803e3d6000fd5b505050506040513d6020811015610f7757600080fd5b50516001600160a01b031614610f8c57600080fd5b610f968133611c1e565b50565b60056020528160005260406000208181548110610cb157fe5b600d6020526000908152604090205460ff1681565b6001600160a01b03811660009081526009602052604081205460ff1615156001141561105957816001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561102657600080fd5b505afa15801561103a573d6000803e3d6000fd5b505050506040513d602081101561105057600080fd5b50519050611074565b506001600160a01b0381166000908152600a60205260409020545b919050565b600860209081526000928352604080842090915290825290205481565b61109e61139d565b6110e05760408051600160e51b62461bcd0281526020600482018190526024820152600080516020611fc4833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b8161113361139d565b15156001148061114e57506111488133611614565b15156001145b61115757600080fd5b6001600160a01b03831660009081526009602052604090205460ff1615156001141561118857611188836000611863565b6001600160a01b0383166000818152600a6020908152604091829020859055815185815291517f39d2a73d35776663391b17495b1604c7f03a3ea88e0eaf24f5a9ab3bdb3205df9281900390910190a2505050565b60036020526000908152604090205460ff1681565b816111fb61139d565b15156001148061121657506112108133611614565b15156001145b61121f57600080fd5b6112298383611614565b15156001141561123857600080fd5b6001600160a01b038084166000818152600560209081526040808320805460068452828520968916808652968452828520819055600180820183559185528385200180546001600160a01b031990811688179091558685526007808552838620805460088752858820898952875285882081905591865292810183559185529284200180549092168417909155517f80dc3d87a7a642c46b6272b119f53d4db8aef58e5984b633f1055308b77dce6d9190a3505050565b60408051600160e11b6355138f0d02815233600482015290516001600160a01b0383169163aa271e1a916024808301926020929190829003018186803b15801561133857600080fd5b505afa15801561134c573d6000803e3d6000fd5b505050506040513d602081101561136257600080fd5b50511515600114610f8c57600080fd5b6000546001600160a01b03165b90565b6001600160a01b031660009081526005602052604090205490565b6000546001600160a01b0316331490565b60096020526000908152604090205460ff1681565b600a6020526000908152604090205481565b6113dd61139d565b61141f5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020611fc4833981519152604482015290519081900360640190fd5b6001600160a01b0381166000818152600f6020526040808220805460ff19166001179055517f9a4e757235705bd178419abc9fa645392c5c7dce5b09940a81ef76794b84bd689190a250565b600f6020526000908152604090205460ff1681565b61148861139d565b6114ca5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020611fc4833981519152604482015290519081900360640190fd5b6114d2611f43565b600182815481106114df57fe5b60009182526020918290206040805180820190915260029092020180546001600160a01b039081168084526001909201541692820183905290925061152391611c1e565b6001828154811061153057fe5b6000918252602090912060029091020180546001600160a01b031990811682556001909101805490911690555050565b600b60205260009081526040902080546001909101546001600160a01b039091169082565b8061158e61139d565b1515600114806115a957506115a38133611614565b15156001145b6115b257600080fd5b6001600160a01b0382166000818152600e6020526040808220805460ff19166001179055517ffb463d4da887fd72c96853cf0ebfd546dfff9205162f017d0ab170cf831375f19190a25050565b600e6020526000908152604090205460ff1681565b6001600160a01b03828116600090815260056020908152604080832060068352818420948616808552949092528220548154929392811061165157fe5b6000918252602090912001546001600160a01b0316149392505050565b61167661139d565b6116b85760408051600160e51b62461bcd0281526020600482018190526024820152600080516020611fc4833981519152604482015290519081900360640190fd5b6001600160a01b0381166000818152600f6020526040808220805460ff19169055517f866c4c4c778f85c380f911e6c43d125e57865fec38a5ccf53b62b74a8473ed169190a250565b61170961139d565b61174b5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020611fc4833981519152604482015290519081900360640190fd5b6001600160a01b0381166000818152600d6020526040808220805460ff19166001179055517f4d64f1b94080522b8b79d8aa9fca27d246fef4e3ca2dad8303646f4a12fd81f69190a250565b6001600160a01b031660009081526007602052604090205490565b6117ba61139d565b6117fc5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020611fc4833981519152604482015290519081900360640190fd5b6118068282611c1e565b5050565b60015490565b61181861139d565b61185a5760408051600160e51b62461bcd0281526020600482018190526024820152600080516020611fc4833981519152604482015290519081900360640190fd5b610f9681611d3f565b8161186c61139d565b15156001148061188757506118818133611614565b15156001145b61189057600080fd5b6001600160a01b038316600081815260096020908152604091829020805460ff1916861515908117909155825190815291517fe54e1d877db9d59fb8b6055f09c39b9cf6e4ef0e7423d71bd06b2d86496ba51c9281900390910190a2505050565b816118fa61139d565b151560011480611915575061190f8133611614565b15156001145b61191e57600080fd5b6001600160a01b0382163314801590611942575061193c8383611614565b15156001145b61194b57600080fd5b6001600160a01b03831660009081526005602052604081205461197590600163ffffffff611de216565b90508061198157600080fd5b6001600160a01b03808516600090815260066020908152604080832093871683529290522054818114611a52576001600160a01b03851660009081526005602052604081208054849081106119d257fe5b60009182526020808320909101546001600160a01b03898116845260059092526040909220805491909216925082919084908110611a0c57fe5b600091825260208083209190910180546001600160a01b0319166001600160a01b0394851617905588831682526006815260408083209490931682529290925290208190555b6001600160a01b0385166000908152600560205260409020805490611a7b906000198301611f5a565b506001600160a01b0380861660009081526006602090815260408083209388168352928152828220829055600790522054611abd90600163ffffffff611de216565b6001600160a01b038086166000908152600860209081526040808320938a16835292905220549092509050808214611b93576001600160a01b0384166000908152600760205260408120805484908110611b1357fe5b60009182526020808320909101546001600160a01b03888116845260079092526040909220805491909216925082919084908110611b4d57fe5b600091825260208083209190910180546001600160a01b0319166001600160a01b0394851617905587831682526008815260408083209490931682529290925290208190555b6001600160a01b0384166000908152600760205260409020805490611bbc906000198301611f5a565b506001600160a01b038085166000818152600860209081526040808320948a1680845294909152808220829055519192917f82854a3ef36f2eb671d3d796a049df4c263e4aae926ac9a7cf483fc411f8e90d9190a35050505050565b60025490565b6001600160a01b03821660009081526003602052604090205460ff16151560011415611c4957600080fd5b6002805460018181019092557f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0180546001600160a01b038086166001600160a01b031992831681179093556000838152600360209081526040808320805460ff191688179055600482528083204390556005825280832080548089018255908452828420018054948916948616851790558383526007808352818420805460088552838620898752855283862081905591845297810188559683529082209095018054909316841790925592517f473b736fe95295e8fbc851ca8acdc12a750976edad27a92f666b3d888eb895d39190a35050565b6001600160a01b038116611d8757604051600160e51b62461bcd028152600401808060200182810382526026815260200180611f9e6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000611e2483836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611e2b565b9392505050565b60008184841115611ebd57604051600160e51b62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611e82578181015183820152602001611e6a565b50505050905090810190601f168015611eaf5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611f065782800160ff19823516178555611f33565b82800160010185558215611f33579182015b82811115611f33578235825591602001919060010190611f18565b50611f3f929150611f83565b5090565b604080518082019091526000808252602082015290565b815481835581811115611f7e57600083815260209020611f7e918101908301611f83565b505050565b61137f91905b80821115611f3f5760008155600101611f8956fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a165627a7a72305820252c34bfb81fc305644e3b75c3edc7e839154c8c58de8bd22d7e01acace7c4880029";
//# sourceMappingURL=PFPsV2__factory.js.map