import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Mileage } from "../Mileage";
export declare class Mileage__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_mix: string, overrides?: Overrides): Promise<Mileage>;
    getDeployTransaction(_mix: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): Mileage;
    connect(signer: Signer): Mileage__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Mileage;
}
//# sourceMappingURL=Mileage__factory.d.ts.map