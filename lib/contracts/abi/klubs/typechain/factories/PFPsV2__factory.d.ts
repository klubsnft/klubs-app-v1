import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { PFPsV2 } from "../PFPsV2";
export declare class PFPsV2__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<PFPsV2>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): PFPsV2;
    connect(signer: Signer): PFPsV2__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): PFPsV2;
}
//# sourceMappingURL=PFPsV2__factory.d.ts.map