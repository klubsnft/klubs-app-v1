"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const Config_1 = __importDefault(require("../../Config"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const Loader_1 = __importDefault(require("../../Loader"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class SellPopup extends skynode_1.Popup {
    constructor(addr, ids) {
        super(".popup-background");
        this.addr = addr;
        this.ids = ids;
        this.inputs = [];
        this.append(this.content = (0, skynode_1.el)(".popup.pfp-sell-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("SELL_IT_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("SELL_POPUP_DESCRIPTION")), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", (0, msg_js_1.default)("START_SELL_BUTTON"), {
            click: async () => {
                const prices = [];
                for (const input of this.inputs) {
                    prices.push(ethers_1.utils.parseEther(input.domElement.value));
                }
                await PFPStoreContract_1.default.sell(addr, ids, prices);
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
            let input;
            const data = await Loader_1.default.loadPFPMetadata(addr, this.ids[index]);
            const royalty = await PFPsContract_1.default.royalties(addr);
            const img = data.image;
            this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", (0, msg_js_1.default)("SELL_POPUP_PRICE_DESCRIPTION").replace(/{royalty}/, String(royalty.royalty / 100)).replace(/{fee}/, String(Config_1.default.fee))), input = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("PRICE_SELL_MIX_INPUT") })))));
            this.inputs.push(input);
        }
        this.loading.delete();
    }
}
exports.default = SellPopup;
//# sourceMappingURL=SellPopup.js.map