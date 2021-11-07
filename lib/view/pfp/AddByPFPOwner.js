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
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".add-pfp-by-pfp-owner-view", (0, skynode_1.el)("h1", "Owner로부터 PFP 등록"), (0, skynode_1.el)("p", "반드시 Ownable을 상속한 PFP여야만 합니다. 그리고 등록자는 반드시 Owner여야 합니다."), (0, skynode_1.el)(".form", (0, skynode_1.el)("label", (0, skynode_1.el)("span", "계약 주소"), (0, skynode_1.el)("input", { placeholder: "계약 주소" })), (0, skynode_1.el)("a", "등록하기"))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = AddByPFPOwner;
//# sourceMappingURL=AddByPFPOwner.js.map