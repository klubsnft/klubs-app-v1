import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ItemStoreSale } from "../ItemStoreSale";
export declare class ItemStoreSale__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_commonData: string, overrides?: Overrides): Promise<ItemStoreSale>;
    getDeployTransaction(_commonData: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): ItemStoreSale;
    connect(signer: Signer): ItemStoreSale__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ItemStoreSale;
}
//# sourceMappingURL=ItemStoreSale__factory.d.ts.map