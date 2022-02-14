"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ItemSaleCard_1 = __importDefault(require("../../../component/ItemSaleCard"));
const Loading_1 = __importDefault(require("../../../component/loading/Loading"));
const ItemPageTabs_1 = __importDefault(require("../../../component/metaverseitempage/ItemPageTabs"));
const ItemStoreSaleContract_1 = __importDefault(require("../../../contracts/ItemStoreSaleContract"));
const ItemPageLayout_1 = __importDefault(require("./ItemPageLayout"));
class ItemPageAll {
    constructor(params) {
        ItemPageLayout_1.default.current.content.append(this.container = (0, skynode_1.el)(".metaverse-item-page-view.metaverse-item-page-all-view"));
        this.load(parseInt(params.metaverseId, 10), params.addr);
    }
    async load(metaverseId, addr) {
        this.metaverseId = metaverseId;
        this.addr = addr;
        this.container.append((0, skynode_1.el)("header", (0, skynode_1.el)("h2", "판매중 아이템 목록"), new ItemPageTabs_1.default(metaverseId, addr, "all")), (0, skynode_1.el)(".content", (0, skynode_1.el)(".list-container", this.nftLoading = new Loading_1.default(), this.nftList = (0, skynode_1.el)(".list"))));
        this.loadNFTs();
    }
    createCard(saleIndex) {
        new ItemSaleCard_1.default(this.metaverseId, this.addr, saleIndex).appendTo(this.nftList);
    }
    async loadNFTs() {
        this.nftLoading.show();
        this.nftList.empty();
        const saleCount = (await ItemStoreSaleContract_1.default.onSalesCount(this.addr)).toNumber();
        for (let i = 0; i < saleCount; i += 1) {
            this.createCard(i);
        }
        this.nftLoading.hide();
    }
    changeParams(params, uri) {
        this.loadNFTs();
    }
    close() {
        if (this.container.deleted !== true) {
            this.container.delete();
        }
    }
}
exports.default = ItemPageAll;
//# sourceMappingURL=ItemPageAll.js.map