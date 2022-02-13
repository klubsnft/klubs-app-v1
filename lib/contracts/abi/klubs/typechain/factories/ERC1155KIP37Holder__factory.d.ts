import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ERC1155KIP37Holder } from "../ERC1155KIP37Holder";
export declare class ERC1155KIP37Holder__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<ERC1155KIP37Holder>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): ERC1155KIP37Holder;
    connect(signer: Signer): ERC1155KIP37Holder__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC1155KIP37Holder;
}
//# sourceMappingURL=ERC1155KIP37Holder__factory.d.ts.map