import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MixSender } from "../MixSender";
export declare class MixSender__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_mix: string, _signer: string, overrides?: Overrides): Promise<MixSender>;
    getDeployTransaction(_mix: string, _signer: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): MixSender;
    connect(signer: Signer): MixSender__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MixSender;
}
//# sourceMappingURL=MixSender__factory.d.ts.map