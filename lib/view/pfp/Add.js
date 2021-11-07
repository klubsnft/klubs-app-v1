"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Add {
    constructor() {
        Layout_1.default.current.title = "PFP 등록";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".add-pfp-view", (0, skynode_1.el)("a", "KIP17Mintable을 상속한 PFP 등록", { click: () => ViewUtil_1.default.go("/pfp/add-by-minter") }), (0, skynode_1.el)("a", "Ownable을 상속한 PFP 등록", { click: () => ViewUtil_1.default.go("/pfp/add-by-pfp-owner") }), (0, skynode_1.el)("a", "둘 다 상속하지 않은 PFP 등록", { click: () => ViewUtil_1.default.go("/pfp/propose") })));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Add;
//# sourceMappingURL=Add.js.map