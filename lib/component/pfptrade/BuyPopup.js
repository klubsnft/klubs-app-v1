"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const Loader_1 = __importDefault(require("../../Loader"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class BuyPopup extends skynode_1.Popup {
    constructor(addr, ids) {
        super(".popup-background");
        this.addr = addr;
        this.ids = ids;
        this.append(this.content = (0, skynode_1.el)(".popup.pfp-buy-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("BUY_IT_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("BUY_POPUP_DESCRIPTION")), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", (0, msg_js_1.default)("BUY_PROCESS_BUTTON"), {
            click: async () => {
                await PFPStoreContract_1.default.buy(addr, ids);
                this.delete();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button", (0, msg_js_1.default)("CANCEL_BUTTON"), {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        for (const [index, addr] of this.addr.entries()) {
            const id = this.ids[index];
            const data = await Loader_1.default.loadMetadata(addr, id);
            const img = data.image;
            const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
            this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", (0, msg_js_1.default)("SELL_PRICE")), saleInfo.price.eq(0) === true ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(saleInfo.price))))))));
        }
        this.loading.delete();
    }
}
exports.default = BuyPopup;
//# sourceMappingURL=BuyPopup.js.map