"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class AddByPFPOwner {
    constructor() {
        Layout_1.default.current.title = "Owner로부터 PFP 등록";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".add-pfp-by-pfp-owner-view"));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = AddByPFPOwner;
//# sourceMappingURL=AddByPFPOwner.js.map