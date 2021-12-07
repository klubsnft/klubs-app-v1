import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Artists } from "../Artists";
export declare class Artists__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<Artists>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): Artists;
    connect(signer: Signer): Artists__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Artists;
}
//# sourceMappingURL=Artists__factory.d.ts.map