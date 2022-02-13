import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ItemStore } from "../ItemStore";
export declare class ItemStore__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_metaverses: string, _mix: string, _mileage: string, overrides?: Overrides): Promise<ItemStore>;
    getDeployTransaction(_metaverses: string, _mix: string, _mileage: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): ItemStore;
    connect(signer: Signer): ItemStore__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ItemStore;
}
//# sourceMappingURL=ItemStore__factory.d.ts.map