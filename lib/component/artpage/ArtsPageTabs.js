"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ArtsContract_1 = __importDefault(require("../../contracts/ArtsContract"));
const ArtStoreContract_1 = __importDefault(require("../../contracts/ArtStoreContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class ArtsPageTabs extends skynode_1.DomNode {
    constructor(type) {
        super(".arts-page-tabs");
        this.append((0, skynode_1.el)(`a.tab${type === "all" ? ".on" : ""}`, "전체", {
            click: () => ViewUtil_1.default.go(`/arts`),
        }), this.mineTab = (0, skynode_1.el)(`a.tab${type === "mine" ? ".on" : ""}`, "내 NFT", {
            click: () => ViewUtil_1.default.go(`/arts/mine`),
        }), this.saleTab = (0, skynode_1.el)(`a.tab${type === "selling" ? ".on" : ""}`, "판매중", {
            click: () => ViewUtil_1.default.go(`/arts/selling`),
        }));
        this.load();
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const balance = (await ArtsContract_1.default.balanceOf(address)).toNumber();
            this.mineTab.empty().appendText(`내 NFT (${balance})`);
        }
        const onSalesCount = (await ArtStoreContract_1.default.onSalesCount()).toNumber();
        this.saleTab.empty().appendText(`판매중 (${onSalesCount})`);
    }
}
exports.default = ArtsPageTabs;
//# sourceMappingURL=ArtsPageTabs.js.map