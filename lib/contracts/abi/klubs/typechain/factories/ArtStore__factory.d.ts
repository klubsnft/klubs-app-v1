import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ArtStore } from "../ArtStore";
export declare class ArtStore__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_artists: string, _arts: string, _mix: string, _mileage: string, overrides?: Overrides): Promise<ArtStore>;
    getDeployTransaction(_artists: string, _arts: string, _mix: string, _mileage: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): ArtStore;
    connect(signer: Signer): ArtStore__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ArtStore;
}
//# sourceMappingURL=ArtStore__factory.d.ts.map