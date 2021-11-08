import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { PFPs } from "../PFPs";
export declare class PFPs__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<PFPs>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): PFPs;
    connect(signer: Signer): PFPs__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): PFPs;
}
//# sourceMappingURL=PFPs__factory.d.ts.map