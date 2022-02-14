"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const Config_1 = __importDefault(require("../../Config"));
const ItemStoreSaleContract_1 = __importDefault(require("../../contracts/ItemStoreSaleContract"));
const MetaversesContract_1 = __importDefault(require("../../contracts/MetaversesContract"));
const Loader_1 = __importDefault(require("../../Loader"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class SellPopup extends skynode_1.Popup {
    constructor(metaverseId, addr, id) {
        super(".popup-background");
        this.metaverseId = metaverseId;
        this.addr = addr;
        this.id = id;
        this.append(this.content = (0, skynode_1.el)(".popup.metaverse-item-sell-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("SELL_IT_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("SELL_POPUP_DESCRIPTION")), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", (0, msg_js_1.default)("START_SELL_BUTTON"), {
            click: async () => {
                await ItemStoreSaleContract_1.default.sell([this.metaverseId], [this.addr], [this.id], [parseInt(this.countInput.domElement.value, 10)], [ethers_1.utils.parseEther(this.priceInput.domElement.value)], [true]);
                this.delete();
                setTimeout(() => ViewUtil_1.default.go(`/metaverse/${this.metaverseId}/item/${this.addr}`), 2000);
            },
        }), (0, skynode_1.el)("button", (0, msg_js_1.default)("CANCEL_BUTTON"), {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        const data = await Loader_1.default.loadMetaverseItemMetadata(this.addr, this.id);
        const royalty = await MetaversesContract_1.default.royalties(this.metaverseId);
        const img = data.image;
        this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "판매 개수"), this.countInput = (0, skynode_1.el)("input", { placeholder: "판매 개수 입력" })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", (0, msg_js_1.default)("SELL_POPUP_PRICE_DESCRIPTION").replace(/{royalty}/, String(royalty.royalty / 100)).replace(/{fee}/, String(Config_1.default.fee))), this.priceInput = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("PRICE_SELL_MIX_INPUT") })))));
        this.loading.delete();
    }
}
exports.default = SellPopup;
//# sourceMappingURL=SellPopup.js.map