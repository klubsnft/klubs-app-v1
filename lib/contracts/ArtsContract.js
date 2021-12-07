"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Arts_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/Arts.sol/Arts.json"));
const KIP17Contract_1 = __importDefault(require("./standard/KIP17Contract"));
class ArtsContract extends KIP17Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Arts, Arts_json_1.default.abi);
    }
    async royalties(id) {
        return await this.runMethod("royalties", id);
    }
    async setExceptionalRoyalties(ids, royalties) {
        await this.runWalletMethod("setExceptionalRoyalties", ids, royalties);
    }
}
exports.default = new ArtsContract();
//# sourceMappingURL=ArtsContract.js.map