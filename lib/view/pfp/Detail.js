"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PFPNFTCard_1 = __importDefault(require("../../component/PFPNFTCard"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Detail {
    constructor(params) {
        this.idQuery = "";
        this.page = 0;
        const addr = params.addr;
        Layout_1.default.current.title = "PFP 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-detail-view", (0, skynode_1.el)("header", (0, skynode_1.el)("img.thumbnail", { src: "/images/galaxies.png" }), (0, skynode_1.el)(".body", this.nameDisplay = (0, skynode_1.el)("h1", "Test"), this.descriptionDisplay = (0, skynode_1.el)("p", "test1111"), this.socialList = (0, skynode_1.el)(".social", (0, skynode_1.el)("button.button-text", (0, skynode_1.el)("img", { src: "/images/icon/twitter.svg", height: 24 })), (0, skynode_1.el)("button.button-text", (0, skynode_1.el)("img", { src: "/images/icon/kakaoTalk.svg", height: 24 })), (0, skynode_1.el)(".update-container", (0, skynode_1.el)("button.button-text", (0, skynode_1.el)("img", { src: "/images/icon/edit.svg", height: 24 }), {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}/update`),
        }))))), (0, skynode_1.el)(".main", (0, skynode_1.el)(".head", (0, skynode_1.el)("h2", "NFT 목록"), (0, skynode_1.el)(".filter", (0, skynode_1.el)("button.button-contained", "희소 점수 보기"), (0, skynode_1.el)("select", (0, skynode_1.el)("option", "이름순")))), (0, skynode_1.el)(".content", (0, skynode_1.el)(".search-box", this.idQueryInput = (0, skynode_1.el)("input", { placeholder: "ID로 검색" })), this.nftList = (0, skynode_1.el)(".list", new PFPNFTCard_1.default(addr, 1, "img1", "name1", "description1", 12), new PFPNFTCard_1.default(addr, 1, "img2", "name2", "description2", 15))))));
        this.loadInfo(addr);
        this.loadNFTs();
    }
    async loadInfo(addr) {
        const extras = await PFPsContract_1.default.extras(addr);
        try {
            const data = JSON.parse(extras);
            if (data.name !== undefined) {
                this.nameDisplay.empty().appendText(data.name);
            }
        }
        catch (e) {
        }
    }
    async loadNFTs() {
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map