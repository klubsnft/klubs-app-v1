import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { PFPStore } from "../PFPStore";
export declare class PFPStore__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_pfps: string, _mix: string, overrides?: Overrides): Promise<PFPStore>;
    getDeployTransaction(_pfps: string, _mix: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): PFPStore;
    connect(signer: Signer): PFPStore__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): PFPStore;
}
//# sourceMappingURL=PFPStore__factory.d.ts.map