"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const ArtStoreContract_1 = __importDefault(require("../../contracts/ArtStoreContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class ArtBidPopup extends skynode_1.Popup {
    constructor(id) {
        super(".popup-background");
        this.id = id;
        this.inputs = [];
        this.append(this.content = (0, skynode_1.el)(".popup.art-bid-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("BID_IT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("BID_POPUP_DESC1")), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", (0, msg_js_1.default)("BID_IT"), {
            click: async () => {
                if (await Wallet_1.default.connected() !== true) {
                    await Wallet_1.default.connect();
                }
                const prices = [];
                for (const input of this.inputs) {
                    prices.push(ethers_1.utils.parseEther(input.domElement.value));
                }
                await ArtStoreContract_1.default.bid(id, prices[0], 0);
                this.delete();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button", "취소", {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        let input;
        const result = await superagent_1.default.get(`https://api.klu.bs/arts/${this.id}`);
        const auction = await ArtStoreContract_1.default.auctions(this.id);
        const data = result.body;
        const img = data.image;
        this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", (0, msg_js_1.default)("BID_PRICE_MIX_POPUP_DESC1"), CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(auction.startPrice)), " MIX)"), input = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("BID_PRICE_MIX") })))));
        this.inputs.push(input);
        this.loading.delete();
    }
}
exports.default = ArtBidPopup;
//# sourceMappingURL=ArtBidPopup.js.map