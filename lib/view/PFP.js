"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class PFP {
    constructor() {
        Layout_1.default.current.title = "PFP Projects";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", "PFP는 프로필 이미지 NFT로,\nNFT를 소유한 사람들 끼리 커뮤니티를 이루어 소통하는 목적을 띠고 있습니다."), (0, skynode_1.el)("a", "프로젝트 등록", { click: () => ViewUtil_1.default.go("/pfp/add") }))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = PFP;
//# sourceMappingURL=PFP.js.map