import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { PolygonMix } from "../PolygonMix";
export declare class PolygonMix__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_signer: string, overrides?: Overrides): Promise<PolygonMix>;
    getDeployTransaction(_signer: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): PolygonMix;
    connect(signer: Signer): PolygonMix__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): PolygonMix;
}
//# sourceMappingURL=PolygonMix__factory.d.ts.map