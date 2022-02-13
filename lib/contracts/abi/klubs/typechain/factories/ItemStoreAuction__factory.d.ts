import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ItemStoreAuction } from "../ItemStoreAuction";
export declare class ItemStoreAuction__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_commonData: string, overrides?: Overrides): Promise<ItemStoreAuction>;
    getDeployTransaction(_commonData: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): ItemStoreAuction;
    connect(signer: Signer): ItemStoreAuction__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ItemStoreAuction;
}
//# sourceMappingURL=ItemStoreAuction__factory.d.ts.map