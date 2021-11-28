import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IKLAYSwap, IKLAYSwapInterface } from "../IKLAYSwap";
export declare class IKLAYSwap__factory {
    static readonly abi: {
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IKLAYSwapInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IKLAYSwap;
}
//# sourceMappingURL=IKLAYSwap__factory.d.ts.map