"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const ItemStoreSaleContract_1 = __importDefault(require("../../contracts/ItemStoreSaleContract"));
const Loader_1 = __importDefault(require("../../Loader"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class BuyPopup extends skynode_1.Popup {
    constructor(metaverseId, addr, id, price, verificationID) {
        super(".popup-background");
        this.metaverseId = metaverseId;
        this.addr = addr;
        this.id = id;
        this.price = price;
        this.append(this.content = (0, skynode_1.el)(".popup.metaverse-item-buy-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("BUY_IT_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("BUY_POPUP_DESCRIPTION")), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", (0, msg_js_1.default)("BUY_PROCESS_BUTTON"), {
            click: async () => {
                await ItemStoreSaleContract_1.default.buy([verificationID], [this.countInput.domElement.value], [this.price], [0]);
                this.delete();
                setTimeout(() => ViewUtil_1.default.go(`/metaverse/${this.metaverseId}/item/${this.addr}/mine`), 2000);
            },
        }), (0, skynode_1.el)("button", (0, msg_js_1.default)("CANCEL_BUTTON"), {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        const data = await Loader_1.default.loadMetaverseItemMetadata(this.addr, this.id);
        const img = data.image;
        this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "구매 개수"), this.countInput = (0, skynode_1.el)("input", { placeholder: "구매 개수 입력" })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", (0, msg_js_1.default)("SELL_PRICE")), this.price.eq(0) === true ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(this.price))))))));
        this.loading.delete();
    }
}
exports.default = BuyPopup;
//# sourceMappingURL=BuyPopup.js.map