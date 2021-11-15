"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class Rankings {
    constructor() {
        Layout_1.default.current.title = "PFP 랭킹";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".pfp-ranking-view", (0, skynode_1.el)("p", "충분한 데이터가 축척된 이후 랭킹 페이지가 제공됩니다."))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Rankings;
//# sourceMappingURL=Rankings.js.map