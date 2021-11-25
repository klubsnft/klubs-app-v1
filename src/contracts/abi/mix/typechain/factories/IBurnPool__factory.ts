/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IBurnPool, IBurnPoolInterface } from "../IBurnPool";

const _abi = [
  {
    constant: false,
    inputs: [],
    name: "burn",
    outputs: [],
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
];

export class IBurnPool__factory {
  static readonly abi = _abi;
  static createInterface(): IBurnPoolInterface {
    return new utils.Interface(_abi) as IBurnPoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBurnPool {
    return new Contract(address, _abi, signerOrProvider) as IBurnPool;
  }
}