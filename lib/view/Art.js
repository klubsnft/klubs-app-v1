"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Art {
    constructor() {
        Layout_1.default.current.title = "Arts";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".arts-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", "Klubs Arts는 NFT 작가들과 함께 만들어나가는 공간입니다."), (0, skynode_1.el)("a", "프로젝트 등록", {
            click: () => ViewUtil_1.default.go("/arts/artists/add"),
        })), (0, skynode_1.el)(".content", (0, skynode_1.el)("p", "Klubs Arts 거래 기능은 12월 13일 출시됩니다."))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Art;
//# sourceMappingURL=Art.js.map