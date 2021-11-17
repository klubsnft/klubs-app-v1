import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { FactoryLike, FactoryLikeInterface } from "../FactoryLike";
export declare class FactoryLike__factory {
    static readonly abi: {
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): FactoryLikeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): FactoryLike;
}
//# sourceMappingURL=FactoryLike__factory.d.ts.map