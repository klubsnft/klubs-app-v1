import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Metaverses } from "../Metaverses";
export declare class Metaverses__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<Metaverses>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): Metaverses;
    connect(signer: Signer): Metaverses__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Metaverses;
}
//# sourceMappingURL=Metaverses__factory.d.ts.map