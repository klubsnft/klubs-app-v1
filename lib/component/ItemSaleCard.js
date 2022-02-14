"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const ItemStoreSaleContract_1 = __importDefault(require("../contracts/ItemStoreSaleContract"));
const Loader_1 = __importDefault(require("../Loader"));
const BuyPopup_1 = __importDefault(require("./itemtrade/BuyPopup"));
const NFTDisplay_1 = __importDefault(require("./NFTDisplay"));
class ItemSaleCard extends skynode_1.DomNode {
    constructor(metaverseId, addr, saleIndex) {
        super(".metaverse-item-nft-card");
        this.metaverseId = metaverseId;
        this.addr = addr;
        this.saleIndex = saleIndex;
        this.load();
    }
    async load() {
        try {
            const verificationID = await ItemStoreSaleContract_1.default.onSales(this.addr, this.saleIndex);
            const saleInfo = await ItemStoreSaleContract_1.default.getSaleInfo(verificationID);
            const data = await Loader_1.default.loadMetaverseItemMetadata(saleInfo.item, saleInfo.id.toNumber());
            const sale = await ItemStoreSaleContract_1.default.sales(saleInfo.item, saleInfo.id.toNumber(), saleInfo.saleId.toNumber());
            if (this.deleted !== true) {
                this.append(data.image === undefined ? undefined : new NFTDisplay_1.default(data.image, true), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), sale.unitPrice.eq(0) === true ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(sale.unitPrice))))), (0, skynode_1.el)(".count", `판매 수량: ${sale.amount}`), (0, skynode_1.el)(".seller", `판매자: ${CommonUtil_1.default.shortenAddress(sale.seller)}`), (0, skynode_1.el)("a", "구매하기", {
                    click: () => {
                        new BuyPopup_1.default(this.metaverseId, this.addr, saleInfo.id.toNumber(), sale.unitPrice, verificationID);
                    },
                }));
            }
        }
        catch (e) {
            console.error(e);
            if (this.deleted !== true) {
                this.delete();
            }
        }
    }
}
exports.default = ItemSaleCard;
//# sourceMappingURL=ItemSaleCard.js.map