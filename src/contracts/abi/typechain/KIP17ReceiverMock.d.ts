/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface KIP17ReceiverMockInterface extends ethers.utils.Interface {
  functions: {
    "onKIP17Received(address,address,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "onKIP17Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "onKIP17Received",
    data: BytesLike
  ): Result;

  events: {
    "Received(address,address,uint256,bytes,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Received"): EventFragment;
}

export class KIP17ReceiverMock extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: KIP17ReceiverMockInterface;

  functions: {
    onKIP17Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "onKIP17Received(address,address,uint256,bytes)"(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  onKIP17Received(
    operator: string,
    from: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "onKIP17Received(address,address,uint256,bytes)"(
    operator: string,
    from: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    onKIP17Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onKIP17Received(address,address,uint256,bytes)"(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    Received(
      operator: null,
      from: null,
      tokenId: null,
      data: null,
      gas: null
    ): EventFilter;
  };

  estimateGas: {
    onKIP17Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "onKIP17Received(address,address,uint256,bytes)"(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    onKIP17Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "onKIP17Received(address,address,uint256,bytes)"(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}