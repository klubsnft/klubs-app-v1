"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Art {
    constructor() {
        Layout_1.default.current.title = "Arts";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".art-view", (0, skynode_1.el)(".title", "Klubs Arts는 NFT 아티스트를 위한 공간입니다. 곧 출시됩니다.")));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Art;
//# sourceMappingURL=Art.js.map