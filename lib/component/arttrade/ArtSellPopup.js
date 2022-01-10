"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const superagent_1 = __importDefault(require("superagent"));
const Config_1 = __importDefault(require("../../Config"));
const ArtsContract_1 = __importDefault(require("../../contracts/ArtsContract"));
const ArtStoreContract_1 = __importDefault(require("../../contracts/ArtStoreContract"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class SellPopup extends skynode_1.Popup {
    constructor(ids) {
        super(".popup-background");
        this.ids = ids;
        this.inputs = [];
        this.append(this.content = (0, skynode_1.el)(".popup.art-sell-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("SELL_IT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("SELL_POPUP_DESC1")), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", (0, msg_js_1.default)("START_SELL"), {
            click: async () => {
                const prices = [];
                for (const input of this.inputs) {
                    prices.push(ethers_1.utils.parseEther(input.domElement.value));
                }
                await ArtStoreContract_1.default.sell(ids, prices);
                this.delete();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button", (0, msg_js_1.default)("CANCEL"), {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        for (const id of this.ids) {
            let input;
            const result = await superagent_1.default.get(`https://api.klu.bs/arts/${id}`);
            const data = result.body;
            const royalty = await ArtsContract_1.default.royalties(id);
            const img = data.image;
            this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", `${(0, msg_js_1.default)("SELL_POPUP_DESC2")} ${royalty.toNumber() / 100}${(0, msg_js_1.default)("SELL_POPUP_DESC3")} ${Config_1.default.fee}${(0, msg_js_1.default)("SELL_POPUP_DESC4")}`), input = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("PRICE_SELL_MIX") })))));
            this.inputs.push(input);
        }
        this.loading.delete();
    }
}
exports.default = SellPopup;
//# sourceMappingURL=ArtSellPopup.js.map