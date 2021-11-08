import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Mix } from "../Mix";
export declare class Mix__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<Mix>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): Mix;
    connect(signer: Signer): Mix__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Mix;
}
//# sourceMappingURL=Mix__factory.d.ts.map