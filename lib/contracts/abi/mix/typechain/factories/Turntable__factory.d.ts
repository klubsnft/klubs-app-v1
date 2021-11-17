import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Turntable } from "../Turntable";
export declare class Turntable__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<Turntable>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): Turntable;
    connect(signer: Signer): Turntable__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Turntable;
}
//# sourceMappingURL=Turntable__factory.d.ts.map