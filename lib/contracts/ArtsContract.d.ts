import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import KIP17Contract from "./standard/KIP17Contract";
declare class ArtsContract extends KIP17Contract {
    constructor();
    royalties(id: BigNumberish): Promise<BigNumber>;
    exceptionalRoyalties(id: BigNumberish): Promise<BigNumber>;
    setExceptionalRoyalties(ids: BigNumberish[], royalties: BigNumberish[]): Promise<void>;
    mint(): Promise<void>;
    artistArtCount(artist: string): Promise<BigNumber>;
    artistArts(artist: string, id: BigNumberish): Promise<BigNumber>;
    burn(id: BigNumberish): Promise<void>;
    exists(id: BigNumberish): Promise<boolean>;
}
declare const _default: ArtsContract;
export default _default;
//# sourceMappingURL=ArtsContract.d.ts.map