import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TestERC1155 } from "../TestERC1155";
export declare class TestERC1155__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<TestERC1155>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): TestERC1155;
    connect(signer: Signer): TestERC1155__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TestERC1155;
}
//# sourceMappingURL=TestERC1155__factory.d.ts.map