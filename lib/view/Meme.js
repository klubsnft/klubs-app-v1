"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Meme {
    constructor() {
        Layout_1.default.current.title = "Meme";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".meme-view", (0, skynode_1.el)(".title", "Klubs Meme는 인터넷 밈이나 패러디 등의 NFT를 거래할 수 있는 공간입니다.\nKlubs Items 출시 후 출시됩니다.")));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Meme;
//# sourceMappingURL=Meme.js.map