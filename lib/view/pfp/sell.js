"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class Sell {
    constructor() {
        Layout_1.default.current.title = "PFP 판매";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".sell-pfp-view", (0, skynode_1.el)(".image-view", (0, skynode_1.el)("img.pfp-image", { src: "/images/galaxies.png" }), (0, skynode_1.el)("a.project", "Doge Sound Clubs"), (0, skynode_1.el)(".pfp", "Robot Hoodie #9748"), (0, skynode_1.el)(".pfp-info", (0, skynode_1.el)(".owner", "소유자는", (0, skynode_1.el)(".owner-by", "dilrong")), (0, skynode_1.el)(".viewer", (0, skynode_1.el)("img.viewer-icon", { src: "/images/icon/visibility.png", height: 24 }), "1", " 명 감상"))), (0, skynode_1.el)(".sell-view", (0, skynode_1.el)(".title", "PFP 판매 등록"), (0, skynode_1.el)(".label", "가격"), (0, skynode_1.el)("input", { placeholder: "...MIX" }), (0, skynode_1.el)(".label", "등록 기간"), (0, skynode_1.el)("input", { placeholder: "...Months", type: "date" }), (0, skynode_1.el)("button.button-contained", "판매 등록")))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Sell;
//# sourceMappingURL=Sell.js.map