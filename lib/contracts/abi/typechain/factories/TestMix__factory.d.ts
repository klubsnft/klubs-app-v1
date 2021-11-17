import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TestMix } from "../TestMix";
export declare class TestMix__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<TestMix>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): TestMix;
    connect(signer: Signer): TestMix__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TestMix;
}
//# sourceMappingURL=TestMix__factory.d.ts.map