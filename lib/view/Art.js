"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Art {
    constructor() {
        Layout_1.default.current.title = "Art";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".art-view", (0, skynode_1.el)(".title", "Art는 준비 중 입니다."), (0, skynode_1.el)(".subtitle", "2021년 11월 29일 오픈 예정입니다.")));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Art;
//# sourceMappingURL=Art.js.map