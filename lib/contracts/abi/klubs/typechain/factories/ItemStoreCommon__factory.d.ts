import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ItemStoreCommon } from "../ItemStoreCommon";
export declare class ItemStoreCommon__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_metaverses: string, _mix: string, _mileage: string, overrides?: Overrides): Promise<ItemStoreCommon>;
    getDeployTransaction(_metaverses: string, _mix: string, _mileage: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): ItemStoreCommon;
    connect(signer: Signer): ItemStoreCommon__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ItemStoreCommon;
}
//# sourceMappingURL=ItemStoreCommon__factory.d.ts.map