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
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Loader_1 = __importDefault(require("../../Loader"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class BidPopup extends skynode_1.Popup {
    constructor(addr, id) {
        super(".popup-background");
        this.addr = addr;
        this.id = id;
        this.inputs = [];
        this.append(this.content = (0, skynode_1.el)(".popup.pfp-bid-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("BID_IT_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("BID_POPUP_DESCRIPTION")), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", (0, msg_js_1.default)("BID_IT_BUTTON"), {
            click: async () => {
                if (await Wallet_1.default.connected() !== true) {
                    await Wallet_1.default.connect();
                }
                const prices = [];
                for (const input of this.inputs) {
                    prices.push(ethers_1.utils.parseEther(input.domElement.value));
                }
                await PFPStoreContract_1.default.bid(addr, id, prices[0]);
                this.delete();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button", (0, msg_js_1.default)("CANCEL_BUTTON"), {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        let input;
        const data = await Loader_1.default.loadPFPMetadata(this.addr, this.id);
        const auction = await PFPStoreContract_1.default.auctions(this.addr, this.id);
        const img = data.image;
        this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", (0, msg_js_1.default)("BID_PRICE_MIX_POPUP_DESCRIPTION").substring(0, (0, msg_js_1.default)("BID_PRICE_MIX_POPUP_DESCRIPTION").indexOf("{mix}")), CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(auction.startPrice)), (0, msg_js_1.default)("BID_PRICE_MIX_POPUP_DESCRIPTION").substring((0, msg_js_1.default)("BID_PRICE_MIX_POPUP_DESCRIPTION").indexOf("{mix}") + 4)), input = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("BID_PRICE_MIX_INPUT") })))));
        this.inputs.push(input);
        this.loading.delete();
    }
}
exports.default = BidPopup;
//# sourceMappingURL=BidPopup.js.map