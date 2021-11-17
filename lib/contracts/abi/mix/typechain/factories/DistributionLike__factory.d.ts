import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { DistributionLike, DistributionLikeInterface } from "../DistributionLike";
export declare class DistributionLike__factory {
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
    static createInterface(): DistributionLikeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DistributionLike;
}
//# sourceMappingURL=DistributionLike__factory.d.ts.map