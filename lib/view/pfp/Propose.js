"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("../Layout"));
class Propose {
    constructor() {
        Layout_1.default.current.title = "PFP 등록 신청";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".pfp-propose-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1.title", "PFP 등록 신청"), (0, skynode_1.el)("p.subtitle", "둘 다 상속하지 않은 PFP 등록")), (0, skynode_1.el)(".content", (0, skynode_1.el)("ul", (0, skynode_1.el)(".form", (0, skynode_1.el)(".label", (0, skynode_1.el)("span", "계약 주소"), this.input = (0, skynode_1.el)("input", { placeholder: "계약 주소" })), (0, skynode_1.el)("button.button-contained", "등록 신청하기", {
            click: async () => {
                const addr = this.input.domElement.value;
                const added = await PFPsContract_1.default.added(addr);
                if (added === true) {
                    alert("해당 계약은 이미 정보가 등록되어있습니다.");
                }
                else {
                    await PFPsContract_1.default.propose(addr);
                    setTimeout(() => alert("계약 정보 등록이 완료되었습니다.\n11일부터 해당 NFT는 거래를 할 수 있게됩니다.\nKlubs에 오신 것을 환영합니다."), 2000);
                }
            },
        })), (0, skynode_1.el)("p.danger-caption", "반드시 KIP17Mintable나 Ownable을 상속하지 않은 PFP여야만 하며, 계약 배포자만 신청하실 수 있습니다."))))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Propose;
//# sourceMappingURL=Propose.js.map