import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IKlayswapAirdropOperator, IKlayswapAirdropOperatorInterface } from "../IKlayswapAirdropOperator";
export declare class IKlayswapAirdropOperator__factory {
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
    })[];
    static createInterface(): IKlayswapAirdropOperatorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IKlayswapAirdropOperator;
}
//# sourceMappingURL=IKlayswapAirdropOperator__factory.d.ts.map