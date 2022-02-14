"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Loading_1 = __importDefault(require("../../../component/loading/Loading"));
const ItemPageTabs_1 = __importDefault(require("../../../component/metaverseitempage/ItemPageTabs"));
const MyItemCard_1 = __importDefault(require("../../../component/MyItemCard"));
const ItemStoreSaleContract_1 = __importDefault(require("../../../contracts/ItemStoreSaleContract"));
const MetaversesContract_1 = __importDefault(require("../../../contracts/MetaversesContract"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
const ItemPageLayout_1 = __importDefault(require("./ItemPageLayout"));
class ItemPageMine {
    constructor(params) {
        ItemPageLayout_1.default.current.content.append(this.container = (0, skynode_1.el)(".metaverse-item-page-view.metaverse-item-page-all-view"));
        this.load(parseInt(params.metaverseId, 10), params.addr);
    }
    async load(metaverseId, addr) {
        this.metaverseId = metaverseId;
        this.addr = addr;
        this.container.append((0, skynode_1.el)("header", (0, skynode_1.el)("h2", "아이템 목록"), new ItemPageTabs_1.default(metaverseId, addr, "mine")), (0, skynode_1.el)(".content", (0, skynode_1.el)(".list-container", this.nftLoading = new Loading_1.default(), this.nftList = (0, skynode_1.el)(".list"))));
        this.loadNFTs();
    }
    createCard(id, dataSet) {
        new MyItemCard_1.default(this.metaverseId, this.addr, id, dataSet).appendTo(this.nftList);
    }
    async loadNFTs() {
        this.nftLoading.show();
        this.nftList.empty();
        const dataSet = [];
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const length = (await ItemStoreSaleContract_1.default.userSellInfoLength(owner)).toNumber();
            const promises = [];
            for (let i = 0; i < length; i += 1) {
                const promise = async (index) => {
                    try {
                        const verificationID = await ItemStoreSaleContract_1.default.userSellInfo(owner, index);
                        const saleInfo = await ItemStoreSaleContract_1.default.getSaleInfo(verificationID);
                        dataSet.push({ verificationID, saleInfo });
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
        }
        const totalSupply = (await MetaversesContract_1.default.getItemTotalSupply(this.metaverseId, this.addr)).toNumber();
        for (let id = 0; id < totalSupply; id += 1) {
            this.createCard(id, dataSet);
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
exports.default = ItemPageMine;
//# sourceMappingURL=ItemPageMine.js.map