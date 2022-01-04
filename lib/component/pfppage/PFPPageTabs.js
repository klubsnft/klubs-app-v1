"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const PageLayout_1 = __importDefault(require("../../view/pfp/page/PageLayout"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class PFPPageTabs extends skynode_1.DomNode {
    constructor(addr, type) {
        super(".pfp-page-tabs");
        this.addr = addr;
        this.append((0, skynode_1.el)(`a.tab${type === "all" ? ".on" : ""}`, "전체", {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}`),
        }), this.mineTab = (0, skynode_1.el)(`a.tab${type === "mine" ? ".on" : ""}`, "내 NFT", {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}/mine`),
        }), this.saleTab = (0, skynode_1.el)(`a.tab${type === "selling" ? ".on" : ""}`, "판매중", {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}/selling`),
        }), this.auctionTab = (0, skynode_1.el)(`a.tab${type === "auctions" ? ".on" : ""}`, "경매중", {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}/auctions`),
        }));
        this.load();
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const balance = (await PageLayout_1.default.current.contract.balanceOf(address)).toNumber();
            this.mineTab.empty().appendText(`내 NFT (${balance})`);
        }
        const onSalesCount = (await PFPStoreContract_1.default.onSalesCount(this.addr)).toNumber();
        this.saleTab.empty().appendText(`판매중 (${onSalesCount})`);
        const onAuctionsCount = (await PFPStoreContract_1.default.onAuctionsCount(this.addr)).toNumber();
        this.auctionTab.empty().appendText(`경매중 (${onAuctionsCount})`);
    }
}
exports.default = PFPPageTabs;
//# sourceMappingURL=PFPPageTabs.js.map