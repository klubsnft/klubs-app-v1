/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IKlayswapAirdropPool,
  IKlayswapAirdropPoolInterface,
} from "../IKlayswapAirdropPool";

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

export class IKlayswapAirdropPool__factory {
  static readonly abi = _abi;
  static createInterface(): IKlayswapAirdropPoolInterface {
    return new utils.Interface(_abi) as IKlayswapAirdropPoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IKlayswapAirdropPool {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IKlayswapAirdropPool;
  }
}