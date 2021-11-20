"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
class ProxyUtil {
    imageSRC(src) {
        return src.indexOf("ipfs://") === 0 ? `https://api.klu.bs/ipfsimage/${src.substring(7)}` : src;
    }
    async loadURL(url) {
        let result;
        try {
            result = await superagent_1.default.get(url);
        }
        catch (e) {
            result = await superagent_1.default.get("https://api.klu.bs/pfp/proxy").query({ url });
        }
        return result.body;
    }
}
exports.default = new ProxyUtil();
//# sourceMappingURL=ProxyUtil%20copy.js.map