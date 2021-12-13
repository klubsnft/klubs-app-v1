"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ArtNFTCard_1 = __importDefault(require("../../../component/ArtNFTCard"));
const ArtsPageTabs_1 = __importDefault(require("../../../component/artpage/ArtsPageTabs"));
const Loading_1 = __importDefault(require("../../../component/loading/Loading"));
const ArtsContract_1 = __importDefault(require("../../../contracts/ArtsContract"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
const PageLayout_1 = __importDefault(require("./PageLayout"));
class PageMine {
    constructor() {
        PageLayout_1.default.current.content.append(this.container = (0, skynode_1.el)(".arts-page-view.arts-page-mine-view"));
        this.load();
    }
    async load() {
        this.container.append((0, skynode_1.el)("header", (0, skynode_1.el)("h2", "NFT 목록"), new ArtsPageTabs_1.default("mine")), (0, skynode_1.el)(".content", (0, skynode_1.el)(".list-container", this.nftLoading = new Loading_1.default(), this.nftList = (0, skynode_1.el)(".list"))));
        this.loadNFTs();
    }
    async loadNFTs() {
        this.nftLoading.show();
        this.nftList.empty();
        const address = await Wallet_1.default.loadAddress();
        const ids = [];
        if (address !== undefined) {
            const totalSupply = (await ArtsContract_1.default.balanceOf(address)).toNumber();
            const promises = [];
            for (let i = 0; i < totalSupply; i += 1) {
                const promise = async (index) => {
                    try {
                        const id = (await ArtsContract_1.default.tokenOfOwnerByIndex(address, index)).toNumber();
                        ids.push(id);
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            ids.sort((a, b) => a - b);
            for (const id of ids) {
                new ArtNFTCard_1.default(id).appendTo(this.nftList);
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
exports.default = PageMine;
//# sourceMappingURL=PageMine.js.map