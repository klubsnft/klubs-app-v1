"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append(this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header", (0, skynode_1.el)("a", (0, skynode_1.el)(".logo", "Klubs"), { click: () => ViewUtil_1.default.go("/") }), (0, skynode_1.el)("a", "PFP", { click: () => ViewUtil_1.default.go("/pfp") }), (0, skynode_1.el)("a", "Art", { click: () => ViewUtil_1.default.go("/art") })), (0, skynode_1.el)("main", this.content = (0, skynode_1.el)(".content")), (0, skynode_1.el)("footer", "© Klubs")));
    }
    set title(title) {
        document.title = `Klubs - ${title}`;
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map