import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IKlayswapAirdropPool, IKlayswapAirdropPoolInterface } from "../IKlayswapAirdropPool";
export declare class IKlayswapAirdropPool__factory {
    static readonly abi: ({
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
        anonymous?: undefined;
    } | {
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
    static createInterface(): IKlayswapAirdropPoolInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IKlayswapAirdropPool;
}
//# sourceMappingURL=IKlayswapAirdropPool__factory.d.ts.map