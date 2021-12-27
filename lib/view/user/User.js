"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class User {
    constructor(params) {
        Layout_1.default.current.title = "유저 정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".user-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", "유저 정보")), (0, skynode_1.el)("main", (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "지갑 주소"), (0, skynode_1.el)("span", params.address)))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map