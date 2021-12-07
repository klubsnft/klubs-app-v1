import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Arts } from "../Arts";
export declare class Arts__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_artists: string, overrides?: Overrides): Promise<Arts>;
    getDeployTransaction(_artists: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): Arts;
    connect(signer: Signer): Arts__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Arts;
}
//# sourceMappingURL=Arts__factory.d.ts.map