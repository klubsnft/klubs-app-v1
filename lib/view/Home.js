"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Home {
    constructor() {
        Layout_1.default.current.title = "Klaytn based NFT marketplace with MIX";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".home-view", (0, skynode_1.el)("header.head", (0, skynode_1.el)("p.slogan", "Klubs는 클레이튼 기반 NFT 마켓플레이스입니다."), (0, skynode_1.el)("button", "Klubs 소개", {
            click: () => open("https://medium.com/klubs/klubs-klaytn-based-nft-marketplace-with-mix-2c93d3a9e014"),
        })), (0, skynode_1.el)(".content", (0, skynode_1.el)("h6", "🗂 이 프로젝트는 어때요?"), (0, skynode_1.el)("p", "오픈 준비 중 입니다."), (0, skynode_1.el)("h6", "🎨 이 작품은 어때요?"), (0, skynode_1.el)("p", "오픈 준비 중 입니다.")))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map