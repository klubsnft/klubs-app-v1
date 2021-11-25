/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TurntableKIP17Listeners,
  TurntableKIP17ListenersInterface,
} from "../TurntableKIP17Listeners";

const _abi = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "shares",
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
    name: "mixEmitter",
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
        name: "turntableId",
        type: "uint256",
      },
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
    constant: true,
    inputs: [],
    name: "turntables",
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
        name: "turntableId",
        type: "uint256",
      },
      {
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "unlisten",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalShares",
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
        type: "uint256",
      },
    ],
    name: "listening",
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
    name: "nft",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "turntableId",
        type: "uint256",
      },
      {
        name: "id",
        type: "uint256",
      },
    ],
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
    constant: false,
    inputs: [
      {
        name: "fee",
        type: "uint256",
      },
    ],
    name: "setTurntableFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "turntableId",
        type: "uint256",
      },
    ],
    name: "listenerCount",
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
        name: "turntableId",
        type: "uint256",
      },
      {
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "claim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "turntableId",
        type: "uint256",
      },
      {
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "listen",
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
    name: "listeningTo",
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
    inputs: [],
    name: "turntableFee",
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
        type: "uint256",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "listeners",
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
        name: "turntableId",
        type: "uint256",
      },
      {
        name: "id",
        type: "uint256",
      },
    ],
    name: "realClaimedOf",
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
    inputs: [
      {
        name: "_mixEmitter",
        type: "address",
      },
      {
        name: "_pid",
        type: "uint256",
      },
      {
        name: "_turntables",
        type: "address",
      },
      {
        name: "_nft",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
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
        name: "turntableId",
        type: "uint256",
      },
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
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "turntableId",
        type: "uint256",
      },
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "id",
        type: "uint256",
      },
    ],
    name: "Listen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "turntableId",
        type: "uint256",
      },
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "id",
        type: "uint256",
      },
    ],
    name: "Unlisten",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "fee",
        type: "uint256",
      },
    ],
    name: "SetTurntableFee",
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

const _bytecode =
  "0x60806040526000600655600060075561012c600b556000600e5534801561002557600080fd5b50604051608080611d7f8339810180604052608081101561004557600080fd5b5080516020820151604080840151606090940151600080546001600160a01b031916331780825592519495939491926001600160a01b0316917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3600180546001600160a01b0319166001600160a01b038616908117909155604080517fbe32cf8d000000000000000000000000000000000000000000000000000000008152905163be32cf8d91600480820192602092909190829003018186803b15801561011057600080fd5b505afa158015610124573d6000803e3d6000fd5b505050506040513d602081101561013a57600080fd5b5051600280546001600160a01b03199081166001600160a01b03938416179091556003949094556004805485169382169390931790925560058054909316911617905550611bf28061018d6000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c80638f32d59b116100c3578063be32cf8d1161007c578063be32cf8d14610410578063dffeef4e14610418578063e651967a14610420578063e81ada4b14610443578063f106845414610466578063f2fde38b1461046e5761014d565b80638f32d59b146102c357806397b5795c146102cb578063a7475c74146102e8578063b1b6665214610305578063b1f1d7af1461037c578063b3fe2e9b146103f35761014d565b80633a98ef39116101155780633a98ef39146102635780634610ac281461026b57806347ccca0214610288578063715018a614610290578063882cc567146102985780638da5cb5b146102bb5761014d565b806301bee1d6146101525780630ade3ac1146101895780631af26a7f146101ad57806320ff98ba146101e257806325ba1639146101ea575b600080fd5b6101756004803603604081101561016857600080fd5b5080359060200135610494565b604080519115158252519081900360200190f35b6101916104b4565b604080516001600160a01b039092168252519081900360200190f35b6101d0600480360360408110156101c357600080fd5b50803590602001356104c3565b60408051918252519081900360200190f35b61019161053a565b6102616004803603604081101561020057600080fd5b8135919081019060408101602082013564010000000081111561022257600080fd5b82018360208201111561023457600080fd5b8035906020019184602083028401116401000000008311171561025657600080fd5b509092509050610549565b005b6101d0610601565b6101756004803603602081101561028157600080fd5b5035610607565b61019161061c565b61026161062b565b6101d0600480360360408110156102ae57600080fd5b50803590602001356106d1565b6101916108ad565b6101756108bd565b610261600480360360208110156102e157600080fd5b50356108ce565b6101d0600480360360208110156102fe57600080fd5b5035610973565b6102616004803603604081101561031b57600080fd5b8135919081019060408101602082013564010000000081111561033d57600080fd5b82018360208201111561034f57600080fd5b8035906020019184602083028401116401000000008311171561037157600080fd5b509092509050610985565b6102616004803603604081101561039257600080fd5b813591908101906040810160208201356401000000008111156103b457600080fd5b8201836020820111156103c657600080fd5b803590602001918460208302840111640100000000831117156103e857600080fd5b509092509050610a41565b6101d06004803603602081101561040957600080fd5b5035610cfa565b610191610d0c565b6101d0610d1b565b6101d06004803603604081101561043657600080fd5b5080359060200135610d21565b6101d06004803603604081101561045957600080fd5b5080359060200135610d4f565b6101d0610d6c565b6102616004803603602081101561048457600080fd5b50356001600160a01b0316610d72565b600860209081526000928352604080842090915290825290205460ff1681565b6001546001600160a01b031681565b60006105316127106105256104e5600b54612710610dda90919063ffffffff16565b60008781526010602090815260408083208984529091529020546105199061050d89896106d1565b9063ffffffff610dda16565b9063ffffffff610e1c16565b9063ffffffff610e7816565b90505b92915050565b6004546001600160a01b031681565b610551610eba565b6007548190610566908263ffffffff610dda16565b60075560005b818110156105fa57600084848381811061058257fe5b602090810292909201356000818152600d9093526040909220549192505060ff1680156105bc57506000818152600c602052604090205486145b6105c557600080fd5b6105cf86826111b3565b6000908152600c60209081526040808320839055600d9091529020805460ff1916905560010161056c565b5050505050565b60075481565b600d6020526000908152604090205460ff1681565b6005546001600160a01b031681565b6106336108bd565b6106875760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600e5460075460009190156108a35760025460408051600160e01b6370a0823102815230600482015290516000926107eb926001600160a01b03909116916370a0823191602480820192602092909190829003018186803b15801561073557600080fd5b505afa158015610749573d6000803e3d6000fd5b505050506040513d602081101561075f57600080fd5b505160015460035460408051600160e01b63c341a6e50281526004810192909252516001600160a01b039092169163c341a6e591602480820192602092909190829003018186803b1580156107b357600080fd5b505afa1580156107c7573d6000803e3d6000fd5b505050506040513d60208110156107dd57600080fd5b50519063ffffffff61135a16565b9050600061080460065483610dda90919063ffffffff16565b9050801561083b576007546108389061082b9061052584600160801b63ffffffff610e1c16565b849063ffffffff61135a16565b92505b6000868152600f60209081526040808320888452825280832054898452600883528184208985529092529091205461089991600160801b91610525919060ff16151560011461088b57600061088d565b865b9063ffffffff6113b716565b9350505050610534565b5060009392505050565b6000546001600160a01b03165b90565b6000546001600160a01b0316331490565b6108d66108bd565b61092a5760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b612710811061093857600080fd5b600b8190556040805182815290517fbb7e6695f653805a4db27ebf977658390b7fcef234bc9e9f9f67ed343b98e52d9181900360200190a150565b60009081526009602052604090205490565b61098d610eba565b8060005b818110156109bd576109b5858585848181106109a957fe5b9050602002013561141f565b600101610991565b5060025460408051600160e01b6370a0823102815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b158015610a0c57600080fd5b505afa158015610a20573d6000803e3d6000fd5b505050506040513d6020811015610a3657600080fd5b505160065550505050565b6004805460408051600160e01b634f558e79028152928301869052516001600160a01b0390911691634f558e79916024808301926020929190829003018186803b158015610a8e57600080fd5b505afa158015610aa2573d6000803e3d6000fd5b505050506040513d6020811015610ab857600080fd5b5051610ac357600080fd5b610acb610eba565b6007548190610ae0908263ffffffff61135a16565b60075560005b818110156105fa576000848483818110610afc57fe5b60055460408051600160e11b6331a9108f0281526020938402959095013560048601819052905190955033946001600160a01b039092169350636352211e92602480840193919291829003018186803b158015610b5857600080fd5b505afa158015610b6c573d6000803e3d6000fd5b505050506040513d6020811015610b8257600080fd5b50516001600160a01b031614610b9757600080fd5b6000818152600d602052604090205460ff168015610bc357506000818152600c60205260409020548614155b15610bfd57600754610bdc90600163ffffffff610dda16565b6007556000818152600c6020526040902054610bf890826111b3565b610c19565b6000818152600d602052604090205460ff1615610c1957600080fd5b60008681526008602090815260408083208484528252808320805460ff19166001908117909155898452600983528184208054868652600a85528386208190559182018155845282842001849055600e54898452600f835281842085855290925290912054610c8d9163ffffffff61186f16565b6000878152600f60209081526040808320858452825280832093909355600c8152828220899055600d9052818120805460ff1916600117905590518291339189917f73a8b0f752679a82b700ed4a9a7bfad9c5ea1946677221a3d305855c1941502491a450600101610ae6565b600c6020526000908152604090205481565b6002546001600160a01b031681565b600b5481565b60096020528160005260406000208181548110610d3a57fe5b90600052602060002001600091509150505481565b600091825260116020908152604080842092845291905290205490565b60035481565b610d7a6108bd565b610dce5760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610dd7816118d7565b50565b600061053183836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061197a565b600082610e2b57506000610534565b82820282848281610e3857fe5b041461053157604051600160e51b62461bcd028152600401808060200182810382526021815260200180611b826021913960400191505060405180910390fd5b600061053183836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611a14565b6007541561103c5760015460035460408051600160e11b6328f582d30281526004810192909252516001600160a01b03909216916351eb05a69160248082019260009290919082900301818387803b158015610f1557600080fd5b505af1158015610f29573d6000803e3d6000fd5b505060025460408051600160e01b6370a082310281523060048201529051600094506001600160a01b0390921692506370a08231916024808301926020929190829003018186803b158015610f7d57600080fd5b505afa158015610f91573d6000803e3d6000fd5b505050506040513d6020811015610fa757600080fd5b5051600654909150600090610fc390839063ffffffff610dda16565b9050801561103357600754610ff990610fea9061052584600160801b63ffffffff610e1c16565b600e549063ffffffff61135a16565b600e5560408051828152905133917fc1d32ad5cca423e7dda2123dbf8c482f8e77d00b631c06e903a47f2cec1334df919081900360200190a25b506006556111b1565b60015460035460408051600160e11b6328f582d30281526004810192909252516001600160a01b03909216916351eb05a69160248082019260009290919082900301818387803b15801561108f57600080fd5b505af11580156110a3573d6000803e3d6000fd5b505060025460408051600160e01b6370a082310281523060048201529051600094506001600160a01b0390921692506370a08231916024808301926020929190829003018186803b1580156110f757600080fd5b505afa15801561110b573d6000803e3d6000fd5b505050506040513d602081101561112157600080fd5b505160065490915060009061113d90839063ffffffff610dda16565b905080156111ae5760025460408051600160e31b630852cd8d0281526004810184905290516001600160a01b03909216916342966c689160248082019260009290919082900301818387803b15801561119557600080fd5b505af11580156111a9573d6000803e3d6000fd5b505050505b50505b565b6000828152600960205260408120546111d390600163ffffffff610dda16565b6000838152600a602052604090205490915080821461125257600084815260096020526040812080548490811061120657fe5b906000526020600020015490508060096000878152602001908152602001600020838154811061123257fe5b6000918252602080832090910192909255918252600a9052604090208190555b6000848152600960205260409020805490611271906000198301611afd565b5061127c848461141f565b60008481526008602090815260408083208684528252808320805460ff19169055600e54878452600f8352818420878552909252909120546112c39163ffffffff6113b716565b6000858152600f602090815260408083208784529091528082209290925590518491339187917fa93819135dfc321df7b15c881ff13bf1c10807a2ac83a5a4f034214fbc72923f91a460025460408051600160e01b6370a0823102815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b158015610a0c57600080fd5b6000828201838110156105315760408051600160e51b62461bcd02815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60008282018183128015906113cc5750838112155b806113e157506000831280156113e157508381125b61053157604051600160e51b62461bcd028152600401808060200182810382526021815260200180611b616021913960400191505060405180910390fd5b60055460408051600160e11b6331a9108f02815260048101849052905133926001600160a01b031691636352211e916024808301926020929190829003018186803b15801561146d57600080fd5b505afa158015611481573d6000803e3d6000fd5b505050506040513d602081101561149757600080fd5b50516001600160a01b03161480156114bd57506000818152600d602052604090205460ff165b80156114d657506000818152600c602052604090205482145b6114df57600080fd5b60006114eb8383611a7c565b9050801561186a57600083815260106020908152604080832085845290915290205461151d908263ffffffff61135a16565b60008481526010602090815260408083208684528252918290209290925580518381529051849286927fe630ca519fedafd2bd9bd35ad65e198e08398f47c88ca063c406740992bcd1a4929081900390910190a3600061158e612710610525600b5485610e1c90919063ffffffff16565b6004805460408051600160e01b634f558e79028152928301889052519293506001600160a01b031691634f558e7991602480820192602092909190829003018186803b1580156115dd57600080fd5b505afa1580156115f1573d6000803e3d6000fd5b505050506040513d602081101561160757600080fd5b50511561170e576002546004805460408051600160e11b6331a9108f028152928301889052516001600160a01b039384169363a9059cbb93921691636352211e916024808301926020929190829003018186803b15801561166757600080fd5b505afa15801561167b573d6000803e3d6000fd5b505050506040513d602081101561169157600080fd5b50516040805163ffffffff841660e01b81526001600160a01b039092166004830152602482018590525160448083019260209291908290030181600087803b1580156116dc57600080fd5b505af11580156116f0573d6000803e3d6000fd5b505050506040513d602081101561170657600080fd5b506117779050565b60025460408051600160e31b630852cd8d0281526004810184905290516001600160a01b03909216916342966c689160248082019260009290919082900301818387803b15801561175e57600080fd5b505af1158015611772573d6000803e3d6000fd5b505050505b6002546001600160a01b031663a9059cbb33611799858563ffffffff610dda16565b6040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b1580156117e857600080fd5b505af11580156117fc573d6000803e3d6000fd5b505050506040513d602081101561181257600080fd5b5061184e9050611828838363ffffffff610dda16565b60008681526011602090815260408083208884529091529020549063ffffffff61135a16565b6000858152601160209081526040808320878452909152902055505b505050565b60008183038183128015906118845750838113155b80611899575060008312801561189957508381135b61053157604051600160e51b62461bcd028152600401808060200182810382526024815260200180611ba36024913960400191505060405180910390fd5b6001600160a01b03811661191f57604051600160e51b62461bcd028152600401808060200182810382526026815260200180611b3b6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60008184841115611a0c57604051600160e51b62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b838110156119d15781810151838201526020016119b9565b50505050905090810190601f1680156119fe5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60008183611a6657604051600160e51b62461bcd0281526020600482018181528351602484015283519092839260449091019190850190808383600083156119d15781810151838201526020016119b9565b506000838581611a7257fe5b0495945050505050565b60008281526010602090815260408083208484529091528120546105319061050d85856000828152600f602090815260408083208484528252808320548584526008835281842085855290925282205461053191600160801b91610525919060ff161515600114611aee57600061088d565b600e549063ffffffff6113b716565b81548183558181111561186a5760008381526020902061186a9181019083016108ba91905b80821115611b365760008155600101611b22565b509056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573735369676e6564536166654d6174683a206164646974696f6e206f766572666c6f77536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775369676e6564536166654d6174683a207375627472616374696f6e206f766572666c6f77a165627a7a723058201a46535b12a7ae28ec64a8fdc4210fd4b3eb0cb0af082c1efb02e5fc44b4073a0029";

export class TurntableKIP17Listeners__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _mixEmitter: string,
    _pid: BigNumberish,
    _turntables: string,
    _nft: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TurntableKIP17Listeners> {
    return super.deploy(
      _mixEmitter,
      _pid,
      _turntables,
      _nft,
      overrides || {}
    ) as Promise<TurntableKIP17Listeners>;
  }
  getDeployTransaction(
    _mixEmitter: string,
    _pid: BigNumberish,
    _turntables: string,
    _nft: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _mixEmitter,
      _pid,
      _turntables,
      _nft,
      overrides || {}
    );
  }
  attach(address: string): TurntableKIP17Listeners {
    return super.attach(address) as TurntableKIP17Listeners;
  }
  connect(signer: Signer): TurntableKIP17Listeners__factory {
    return super.connect(signer) as TurntableKIP17Listeners__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TurntableKIP17ListenersInterface {
    return new utils.Interface(_abi) as TurntableKIP17ListenersInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TurntableKIP17Listeners {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TurntableKIP17Listeners;
  }
}