"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../Layout"));
class Add {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("PFP_REGISTER_TITLE");
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".add-pfp-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("ADD_PFP_PROJECT_TITLE"))), (0, skynode_1.el)("main", (0, skynode_1.el)("h6", "현재 v2가 준비중이므로 PFP추가가 불가능합니다.")))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Add;
//# sourceMappingURL=Add.js.map