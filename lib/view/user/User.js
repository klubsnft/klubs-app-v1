"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../Layout"));
class User {
    constructor(params) {
        Layout_1.default.current.title = (0, msg_js_1.default)("USER_INFO");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".user-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", (0, msg_js_1.default)("USER_INFO"))), (0, skynode_1.el)("main", (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("WALLET_ADDRESS")), (0, skynode_1.el)("span", params.address)))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map