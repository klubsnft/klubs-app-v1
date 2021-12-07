"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Artists_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/Artists.sol/Artists.json"));
const Contract_1 = __importDefault(require("./Contract"));
class ArtistsContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Artists, Artists_json_1.default.abi);
    }
    async added(addr) {
        return await this.runMethod("added", addr);
    }
    async add() {
        await this.runWalletMethod("add");
    }
    async getAddrCount() {
        return ethers_1.BigNumber.from(await this.runMethod("addrCount"));
    }
    async addrs(index) {
        return await this.runMethod("addrs", index);
    }
    async extras(addr) {
        return await this.runMethod("extras", addr);
    }
    async banned(addr) {
        return await this.runMethod("banned", addr);
    }
    async setExtra(manager) {
        await this.runWalletMethod("setExtra", manager);
    }
    async baseRoyalty(addr) {
        return ethers_1.BigNumber.from(await this.runMethod("baseRoyalty", addr));
    }
    async setBaseRoyalty(royalty) {
        await this.runWalletMethod("setBaseRoyalty", royalty);
    }
}
exports.default = new ArtistsContract();
//# sourceMappingURL=ArtistsContract.js.map