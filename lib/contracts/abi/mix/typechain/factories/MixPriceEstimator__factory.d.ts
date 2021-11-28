import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MixPriceEstimator, MixPriceEstimatorInterface } from "../MixPriceEstimator";
export declare class MixPriceEstimator__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MixPriceEstimator>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MixPriceEstimator;
    connect(signer: Signer): MixPriceEstimator__factory;
    static readonly bytecode = "0x6080604052600080546001600160a01b03191673c6a2ad8cc6e4a7e08fc37cc5954be07d499e765417905534801561003657600080fd5b506101bb806100466000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806321d9589114610030575b600080fd5b61004d6004803603602081101561004657600080fd5b503561005f565b60408051918252519081900360200190f35b6000805460408051600160e01b63fd435cb902815273dd483a970a7a7fef2b223c3510fac852799a88bf600482015260248101849052905183926001600160a01b03169163fd435cb9916044808301926020929190829003018186803b1580156100c857600080fd5b505afa1580156100dc573d6000803e3d6000fd5b505050506040513d60208110156100f257600080fd5b505160408051600160e01b63e416118102815273dd483a970a7a7fef2b223c3510fac852799a88bf60048201526024810186905290519192506001600160a01b0383169163e416118191604480820192602092909190829003018186803b15801561015c57600080fd5b505afa158015610170573d6000803e3d6000fd5b505050506040513d602081101561018657600080fd5b5051939250505056fea165627a7a72305820339dced5ce7eaf8c8385665094ca1a02467ae50ef408e6406073435b31161d770029";
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
    static createInterface(): MixPriceEstimatorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MixPriceEstimator;
}
//# sourceMappingURL=MixPriceEstimator__factory.d.ts.map