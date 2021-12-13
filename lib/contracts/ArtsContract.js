"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const Config_1 = __importDefault(require("../Config"));
const Arts_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/Arts.sol/Arts.json"));
const KIP17Contract_1 = __importDefault(require("./standard/KIP17Contract"));
class ArtsContract extends KIP17Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Arts, Arts_json_1.default.abi);
    }
    async totalSupply() {
        return bignumber_1.BigNumber.from(await this.runMethod("totalSupply"));
    }
    async royalties(id) {
        return bignumber_1.BigNumber.from(await this.runMethod("royalties", id));
    }
    async exceptionalRoyalties(id) {
        return bignumber_1.BigNumber.from(await this.runMethod("exceptionalRoyalties", id));
    }
    async setExceptionalRoyalties(ids, royalties) {
        await this.runWalletMethod("setExceptionalRoyalties", ids, royalties);
    }
    async mint() {
        await this.runWalletMethod("mint");
    }
    async artistArtCount(artist) {
        return bignumber_1.BigNumber.from(await this.runMethod("artistArtCount", artist));
    }
    async artToArtist(id) {
        return await this.runMethod("artToArtist", id);
    }
    async artistArts(artist, id) {
        return bignumber_1.BigNumber.from(await this.runMethod("artistArts", artist, id));
    }
    async burn(id) {
        await this.runWalletMethod("burn", id);
    }
    async exists(id) {
        return await this.runMethod("exists", id);
    }
}
exports.default = new ArtsContract();
//# sourceMappingURL=ArtsContract.js.map