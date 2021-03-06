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
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IKlayswapAirdropPoolInterface extends ethers.utils.Interface {
  functions: {
    "withdraw(address)": FunctionFragment;
    "operator()": FunctionFragment;
    "changeNextOwner(address)": FunctionFragment;
    "changeOwner()": FunctionFragment;
    "createDistribution(uint256,uint256,uint256)": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "forward()": FunctionFragment;
    "refixBlockAmount(uint256)": FunctionFragment;
    "getAirdropStat()": FunctionFragment;
    "pid()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "withdraw", values: [string]): string;
  encodeFunctionData(functionFragment: "operator", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "changeNextOwner",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "changeOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createDistribution",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "forward", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "refixBlockAmount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAirdropStat",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "pid", values?: undefined): string;

  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "operator", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeNextOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createDistribution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "forward", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "refixBlockAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirdropStat",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pid", data: BytesLike): Result;

  events: {
    "SetOperator(address)": EventFragment;
    "SetKeeper(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SetOperator"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetKeeper"): EventFragment;
}

export type SetOperatorEvent = TypedEvent<[string] & { operator: string }>;

export type SetKeeperEvent = TypedEvent<[string] & { keeper: string }>;

export class IKlayswapAirdropPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IKlayswapAirdropPoolInterface;

  functions: {
    withdraw(
      tokenAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    operator(overrides?: CallOverrides): Promise<[string]>;

    changeNextOwner(
      _nextOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeOwner(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createDistribution(
      totalAmount: BigNumberish,
      blockAmount: BigNumberish,
      startBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    forward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    refixBlockAmount(
      blockAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAirdropStat(
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string[],
        BigNumber[]
      ] & {
        distributionContract: string;
        totalAmount: BigNumber;
        blockAmount: BigNumber;
        distributableBlock: BigNumber;
        endBlock: BigNumber;
        distributed: BigNumber;
        remain: BigNumber;
        targetCount: BigNumber;
        targets: string[];
        rates: BigNumber[];
      }
    >;

    pid(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  withdraw(
    tokenAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  operator(overrides?: CallOverrides): Promise<string>;

  changeNextOwner(
    _nextOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeOwner(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createDistribution(
    totalAmount: BigNumberish,
    blockAmount: BigNumberish,
    startBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  forward(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  refixBlockAmount(
    blockAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAirdropStat(
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      string[],
      BigNumber[]
    ] & {
      distributionContract: string;
      totalAmount: BigNumber;
      blockAmount: BigNumber;
      distributableBlock: BigNumber;
      endBlock: BigNumber;
      distributed: BigNumber;
      remain: BigNumber;
      targetCount: BigNumber;
      targets: string[];
      rates: BigNumber[];
    }
  >;

  pid(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    withdraw(tokenAddr: string, overrides?: CallOverrides): Promise<void>;

    operator(overrides?: CallOverrides): Promise<string>;

    changeNextOwner(
      _nextOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    changeOwner(overrides?: CallOverrides): Promise<void>;

    createDistribution(
      totalAmount: BigNumberish,
      blockAmount: BigNumberish,
      startBlock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    forward(overrides?: CallOverrides): Promise<void>;

    refixBlockAmount(
      blockAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getAirdropStat(
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string[],
        BigNumber[]
      ] & {
        distributionContract: string;
        totalAmount: BigNumber;
        blockAmount: BigNumber;
        distributableBlock: BigNumber;
        endBlock: BigNumber;
        distributed: BigNumber;
        remain: BigNumber;
        targetCount: BigNumber;
        targets: string[];
        rates: BigNumber[];
      }
    >;

    pid(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "SetOperator(address)"(
      operator?: string | null
    ): TypedEventFilter<[string], { operator: string }>;

    SetOperator(
      operator?: string | null
    ): TypedEventFilter<[string], { operator: string }>;

    "SetKeeper(address)"(
      keeper?: string | null
    ): TypedEventFilter<[string], { keeper: string }>;

    SetKeeper(
      keeper?: string | null
    ): TypedEventFilter<[string], { keeper: string }>;
  };

  estimateGas: {
    withdraw(
      tokenAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    operator(overrides?: CallOverrides): Promise<BigNumber>;

    changeNextOwner(
      _nextOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeOwner(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createDistribution(
      totalAmount: BigNumberish,
      blockAmount: BigNumberish,
      startBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    forward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    refixBlockAmount(
      blockAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAirdropStat(overrides?: CallOverrides): Promise<BigNumber>;

    pid(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    withdraw(
      tokenAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    operator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    changeNextOwner(
      _nextOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeOwner(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createDistribution(
      totalAmount: BigNumberish,
      blockAmount: BigNumberish,
      startBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    forward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    refixBlockAmount(
      blockAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAirdropStat(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pid(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
