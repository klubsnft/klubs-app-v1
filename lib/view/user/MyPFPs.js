"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class MyPFPs {
    constructor() {
        Layout_1.default.current.title = "내 PFP";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".user-my-pfps-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "내 PFP 정보")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 관리하는 PFP")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 판매중인 PFP")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 Offer를 건 PFP")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내 PFP 목록"))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MyPFPs;
//# sourceMappingURL=MyPFPs.js.map