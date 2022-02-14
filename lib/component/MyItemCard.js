"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ItemStoreSaleContract_1 = __importDefault(require("../contracts/ItemStoreSaleContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Loader_1 = __importDefault(require("../Loader"));
const ItemPageLayout_1 = __importDefault(require("../view/metaverse/item-page/ItemPageLayout"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
const SellPopup_1 = __importDefault(require("./itemtrade/SellPopup"));
const NFTDisplay_1 = __importDefault(require("./NFTDisplay"));
class MyItemCard extends skynode_1.DomNode {
    constructor(metaverseId, addr, id, dataSet) {
        super(".metaverse-my-item-nft-card");
        this.metaverseId = metaverseId;
        this.addr = addr;
        this.id = id;
        this.dataSet = dataSet;
        this.load();
    }
    async load() {
        try {
            const data = await Loader_1.default.loadMetaverseItemMetadata(this.addr, this.id);
            if (this.deleted !== true) {
                let balance = 0;
                let amounts = 0;
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    balance = (await ItemPageLayout_1.default.current.contract.balanceOf(owner, this.id)).toNumber();
                    amounts = (await ItemStoreSaleContract_1.default.userOnSaleAmounts(owner, this.addr, this.id)).toNumber();
                }
                this.append(data.image === undefined ? undefined : new NFTDisplay_1.default(data.image, true), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)(".balance", `보유량: ${balance}`)), (0, skynode_1.el)(".count", `판매 수량: ${amounts}`), amounts === 0 ? (0, skynode_1.el)("a", "판매하기", {
                    click: () => {
                        new SellPopup_1.default(this.metaverseId, this.addr, this.id);
                    },
                }) : (0, skynode_1.el)("a", "판매 취소", {
                    click: async () => {
                        const data = this.dataSet.find((d) => d.saleInfo.item === this.addr && d.saleInfo.id.toNumber() === this.id);
                        if (data !== undefined) {
                            await ItemStoreSaleContract_1.default.cancelSale([data.verificationID]);
                            ViewUtil_1.default.waitTransactionAndRefresh();
                        }
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
exports.default = MyItemCard;
//# sourceMappingURL=MyItemCard.js.map