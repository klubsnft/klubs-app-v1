import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITurntableKIP7Listeners, ITurntableKIP7ListenersInterface } from "../ITurntableKIP7Listeners";
export declare class ITurntableKIP7Listeners__factory {
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
    static createInterface(): ITurntableKIP7ListenersInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ITurntableKIP7Listeners;
}
//# sourceMappingURL=ITurntableKIP7Listeners__factory.d.ts.map