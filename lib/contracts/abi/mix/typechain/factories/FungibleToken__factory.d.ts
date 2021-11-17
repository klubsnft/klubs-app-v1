import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { FungibleToken } from "../FungibleToken";
export declare class FungibleToken__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(name: string, symbol: string, _version: string, overrides?: Overrides): Promise<FungibleToken>;
    getDeployTransaction(name: string, symbol: string, _version: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): FungibleToken;
    connect(signer: Signer): FungibleToken__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): FungibleToken;
}
//# sourceMappingURL=FungibleToken__factory.d.ts.map