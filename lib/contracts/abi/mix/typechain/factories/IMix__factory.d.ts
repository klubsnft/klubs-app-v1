import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMix, IMixInterface } from "../IMix";
export declare class IMix__factory {
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
    static createInterface(): IMixInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMix;
}
//# sourceMappingURL=IMix__factory.d.ts.map