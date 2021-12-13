import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Config from "../Config";
import ArtsArtifact from "./abi/klubs/artifacts/contracts/Arts.sol/Arts.json";
import KIP17Contract from "./standard/KIP17Contract";

class ArtsContract extends KIP17Contract {

    constructor() {
        super(Config.contracts.Arts, ArtsArtifact.abi);
    }

    public async totalSupply(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("totalSupply"));
    }

    public async royalties(id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("royalties", id));
    }

    public async exceptionalRoyalties(id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("exceptionalRoyalties", id));
    }

    public async setExceptionalRoyalties(ids: BigNumberish[], royalties: BigNumberish[]): Promise<void> {
        await this.runWalletMethod("setExceptionalRoyalties", ids, royalties);
    }

    public async mint(): Promise<void> {
        await this.runWalletMethod("mint");
    }

    public async artistArtCount(artist: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("artistArtCount", artist));
    }

    public async artToArtist(id: BigNumberish): Promise<string> {
        return await this.runMethod("artToArtist", id);
    }

    public async artistArts(artist: string, id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("artistArts", artist, id));
    }

    public async burn(id: BigNumberish): Promise<void> {
        await this.runWalletMethod("burn", id);
    }

    public async exists(id: BigNumberish): Promise<boolean> {
        return await this.runMethod("exists", id);
    }
}

export default new ArtsContract();
