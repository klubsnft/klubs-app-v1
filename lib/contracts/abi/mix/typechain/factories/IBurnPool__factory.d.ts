import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IBurnPool, IBurnPoolInterface } from "../IBurnPool";
export declare class IBurnPool__factory {
    static readonly abi: {
        constant: boolean;
        inputs: never[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IBurnPoolInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IBurnPool;
}
//# sourceMappingURL=IBurnPool__factory.d.ts.map