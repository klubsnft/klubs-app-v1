"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class Propose {
    constructor() {
        Layout_1.default.current.title = "PFP 등록 신청";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-propose-view", (0, skynode_1.el)("h1", "PFP 등록 신청"), (0, skynode_1.el)("p", "반드시 KIP17Mintable나 Ownable을 상속하지 않은 PFP여야만 합니다."), (0, skynode_1.el)(".form", (0, skynode_1.el)("label", (0, skynode_1.el)("span", "계약 주소"), (0, skynode_1.el)("input", { placeholder: "계약 주소" })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "관리자 지갑 주소"), (0, skynode_1.el)("input", { placeholder: "관리자 지갑 주소" })), (0, skynode_1.el)("a", "등록 신청하기"))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Propose;
//# sourceMappingURL=Propose.js.map