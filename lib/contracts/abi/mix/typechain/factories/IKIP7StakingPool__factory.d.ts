import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IKIP7StakingPool, IKIP7StakingPoolInterface } from "../IKIP7StakingPool";
export declare class IKIP7StakingPool__factory {
    static readonly abi: ({
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
        anonymous?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
    })[];
    static createInterface(): IKIP7StakingPoolInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IKIP7StakingPool;
}
//# sourceMappingURL=IKIP7StakingPool__factory.d.ts.map