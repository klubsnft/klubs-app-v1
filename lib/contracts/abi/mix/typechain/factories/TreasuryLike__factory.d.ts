import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { TreasuryLike, TreasuryLikeInterface } from "../TreasuryLike";
export declare class TreasuryLike__factory {
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
    static createInterface(): TreasuryLikeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TreasuryLike;
}
//# sourceMappingURL=TreasuryLike__factory.d.ts.map