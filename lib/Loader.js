"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
class Loader {
    async loadPFPMetadata(addr, id) {
        let result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${addr}/${id}/metadata`);
        return result.body;
    }
    async cachePFPMetadata(addr, id) {
        let result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${addr}/${id}/metadata/cache`);
        return result.body;
    }
    async loadPFPRarity(addr) {
        let result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${addr}/rarity`);
        return result.body;
    }
    async loadMetaverseItemMetadata(addr, id) {
        let result = await superagent_1.default.get(`https://api.klu.bs/metaverseitem/${addr}/${id}/metadata`);
        return result.body;
    }
    async cacheMetaverseItemMetadata(addr, id) {
        let result = await superagent_1.default.get(`https://api.klu.bs/metaverseitem/${addr}/${id}/metadata/cache`);
        return result.body;
    }
}
exports.default = new Loader();
//# sourceMappingURL=Loader.js.map