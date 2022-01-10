"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Add {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("PFP_REGISTER");
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".add-pfp-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("ADD_PFP_PROJECT"))), (0, skynode_1.el)("main", (0, skynode_1.el)("section", { click: () => ViewUtil_1.default.go("/pfp/add-by-minter") }, (0, skynode_1.el)("h2", (0, msg_js_1.default)("ADD_KIP17_MINTABLE_PFP")), (0, skynode_1.el)("p", (0, msg_js_1.default)("ADD_KIP17_MINTABLE_PFP_DESC1"))), (0, skynode_1.el)("section", { click: () => ViewUtil_1.default.go("/pfp/add-by-pfp-owner") }, (0, skynode_1.el)("h2", (0, msg_js_1.default)("ADD_OWNABLE_PFP")), (0, skynode_1.el)("p", (0, msg_js_1.default)("ADD_OWNABLE_PFP_DESC1"))), (0, skynode_1.el)("section", { click: () => ViewUtil_1.default.go("/pfp/propose") }, (0, skynode_1.el)("h2", (0, msg_js_1.default)("ADD_WITHOUT_INHERITANCE_PFP")), (0, skynode_1.el)("p", (0, msg_js_1.default)("ADD_WITHOUT_INHERITANCE_PFP_DESC1")))))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Add;
//# sourceMappingURL=Add.js.map