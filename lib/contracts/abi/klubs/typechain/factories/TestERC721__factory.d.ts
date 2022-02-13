import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TestERC721 } from "../TestERC721";
export declare class TestERC721__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<TestERC721>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): TestERC721;
    connect(signer: Signer): TestERC721__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TestERC721;
}
//# sourceMappingURL=TestERC721__factory.d.ts.map