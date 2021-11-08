"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("../Layout"));
class AddByPFPOwner {
    constructor() {
        Layout_1.default.current.title = "Owner로부터 PFP 등록";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".add-pfp-by-owner-view", (0, skynode_1.el)("header.head", (0, skynode_1.el)("p.title", "PFP 프로젝트 등록"), (0, skynode_1.el)("p.subtitle", "Ownable을 상속한 PFP등록")), (0, skynode_1.el)(".content", (0, skynode_1.el)("ul", (0, skynode_1.el)("li", (0, skynode_1.el)(".form", (0, skynode_1.el)("label", (0, skynode_1.el)("h6", "계약 주소"), this.input = (0, skynode_1.el)("input", { placeholder: "계약 주소" })), (0, skynode_1.el)("button", "등록하기", {
            click: async () => {
                const addr = this.input.domElement.value;
                const added = await PFPsContract_1.default.added(addr);
                if (added === true) {
                    alert("해당 계약은 이미 정보가 등록되어있습니다.");
                }
                else {
                    await PFPsContract_1.default.addByPFPOwner(addr);
                    setTimeout(() => alert("계약 정보 등록이 완료되었습니다.\n11일부터 해당 NFT는 거래를 할 수 있게됩니다.\nKlubs에 오신 것을 환영합니다."), 2000);
                }
            },
        })), (0, skynode_1.el)("p.danger", "반드시 Ownable을 상속한 PFP여야만 합니다. 그리고 등록자는 반드시 Owner여야 합니다.")))))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = AddByPFPOwner;
//# sourceMappingURL=AddByPFPOwner.js.map