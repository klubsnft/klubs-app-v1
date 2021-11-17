import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TestPFP } from "../TestPFP";
export declare class TestPFP__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<TestPFP>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): TestPFP;
    connect(signer: Signer): TestPFP__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TestPFP;
}
//# sourceMappingURL=TestPFP__factory.d.ts.map