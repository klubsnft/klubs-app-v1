"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const ArtNFTCard_1 = __importDefault(require("../../../component/ArtNFTCard"));
const ArtsPageTabs_1 = __importDefault(require("../../../component/artpage/ArtsPageTabs"));
const Loading_1 = __importDefault(require("../../../component/loading/Loading"));
const ArtsContract_1 = __importDefault(require("../../../contracts/ArtsContract"));
const PageLayout_1 = __importDefault(require("./PageLayout"));
class PageAll {
    constructor() {
        PageLayout_1.default.current.content.append(this.container = (0, skynode_1.el)(".arts-page-view.arts-page-all-view"));
        this.load();
    }
    async load() {
        this.container.append((0, skynode_1.el)("header", (0, skynode_1.el)("h2", (0, msg_js_1.default)("NFT_LIST_TITLE")), new ArtsPageTabs_1.default("all")), (0, skynode_1.el)(".content", (0, skynode_1.el)(".list-container", this.nftLoading = new Loading_1.default(), this.nftList = (0, skynode_1.el)(".list"))));
        this.loadNFTs();
    }
    async loadNFTs() {
        this.nftLoading.show();
        this.nftList.empty();
        const totalSupply = (await ArtsContract_1.default.totalSupply()).toNumber();
        const ids = new Array(totalSupply).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);
        let count = 0;
        for (const id of ids) {
            new ArtNFTCard_1.default(id).appendTo(this.nftList);
            count += 1;
            if (count === 100) {
                break;
            }
        }
        this.nftLoading.hide();
    }
    changeParams(params, uri) { }
    close() {
        if (this.container.deleted !== true) {
            this.container.delete();
        }
    }
}
exports.default = PageAll;
//# sourceMappingURL=PageAll.js.map