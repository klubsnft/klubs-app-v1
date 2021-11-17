import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MixDividend } from "../MixDividend";
export declare class MixDividend__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_mixEmitter: string, _mix: string, _pid: BigNumberish, overrides?: Overrides): Promise<MixDividend>;
    getDeployTransaction(_mixEmitter: string, _mix: string, _pid: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): MixDividend;
    connect(signer: Signer): MixDividend__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MixDividend;
}
//# sourceMappingURL=MixDividend__factory.d.ts.map