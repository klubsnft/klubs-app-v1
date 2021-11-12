"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PFPNFTCard_1 = __importDefault(require("../../component/PFPNFTCard"));
const Layout_1 = __importDefault(require("../Layout"));
class Detail {
    constructor() {
        Layout_1.default.current.title = "PFP 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-detail-view", (0, skynode_1.el)(".head", (0, skynode_1.el)("img.thumbnail", { src: "/images/galaxies.png" }), (0, skynode_1.el)(".body", (0, skynode_1.el)("p", "도지사운드클럽은 NFT를 이용한 거버넌스로 운영되는 NFT 수집가들의 사교 모임입니다. MATES를 이용해서 클럽에 가입하고 투표할 수 있습니다."), (0, skynode_1.el)(".social", (0, skynode_1.el)("button.button-contained", "트위터"), (0, skynode_1.el)("button.button-contained", "오픈 카카오톡"), (0, skynode_1.el)(".update-container", (0, skynode_1.el)("button.button-contained", "정보 수정"))))), (0, skynode_1.el)(".main", (0, skynode_1.el)(".header", (0, skynode_1.el)("h4", "NFT 목록"), (0, skynode_1.el)(".filter", (0, skynode_1.el)("button.button-contained", "희소 점수 보기"), (0, skynode_1.el)("select", (0, skynode_1.el)("option", "이름순")))), (0, skynode_1.el)(".content", (0, skynode_1.el)(".search-box", (0, skynode_1.el)("input", { placeholder: "ID로 검색" }), (0, skynode_1.el)("select", (0, skynode_1.el)("option", "Face")), (0, skynode_1.el)("select", (0, skynode_1.el)("option", "Mouth"))), (0, skynode_1.el)(".list", new PFPNFTCard_1.default("img1", "name1", "description1", 12), new PFPNFTCard_1.default("img2", "name2", "description2", 15))))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map