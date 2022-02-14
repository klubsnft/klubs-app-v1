"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const marked_1 = __importDefault(require("marked"));
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const xss_1 = __importDefault(require("xss"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const NFTDisplay_1 = __importDefault(require("../../component/NFTDisplay"));
const BuyPopup_1 = __importDefault(require("../../component/pfptrade/BuyPopup"));
const SellPopup_1 = __importDefault(require("../../component/pfptrade/SellPopup"));
const MetaversesContract_1 = __importDefault(require("../../contracts/MetaversesContract"));
const KIP37Contract_1 = __importDefault(require("../../contracts/standard/KIP37Contract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Loader_1 = __importDefault(require("../../Loader"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class ItemDetail {
    constructor(params) {
        const metaverseId = parseInt(params.metaverseId, 10);
        const addr = params.addr;
        const id = parseInt(params.id, 10);
        this.contract = new KIP37Contract_1.default(addr);
        Layout_1.default.current.title = (0, msg_js_1.default)("NFT_DETAIL_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".metaverse-item-detail-view", this.nftDisplayContainer = (0, skynode_1.el)(".nft-display-container"), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("BASE_INFO_TITLE")), (0, skynode_1.el)(".info", this.pfpDisplay = (0, skynode_1.el)("a.pfp", {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}`),
        }), this.nameDisplay = (0, skynode_1.el)(".name"), this.ownerDisplay = (0, skynode_1.el)(".owner"), this.descriptionDisplay = (0, skynode_1.el)(".description"), this.sendButtonContainer = (0, skynode_1.el)(".send-button-container"), (0, skynode_1.el)("a.refresh-button", (0, msg_js_1.default)("REFRESH_METADATA_BUTTON"), {
            click: async () => {
                await Loader_1.default.cachePFPMetadata(addr, id);
                skyrouter_1.SkyRouter.refresh();
            },
        }))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("PROPERTY_TITLE")), this.attributesDisplay = (0, skynode_1.el)(".attributes")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("DEAL_TITLE")), this.tradeForm = (0, skynode_1.el)(".trade-form"))));
        this.loadPFP(metaverseId, addr);
        this.loadInfo(addr, id);
        this.loadTrade(addr, id);
    }
    async loadPFP(metaverseId, addr) {
        const extras = await MetaversesContract_1.default.itemExtras(metaverseId, addr);
        try {
            const data = JSON.parse(extras);
            if (data.name !== undefined) {
                Layout_1.default.current.title = data.name;
                this.pfpDisplay.empty().appendText(data.name);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async loadTrade(addr, id) {
        const address = await Wallet_1.default.loadAddress();
        this.loadSale(address, owner, addr, id);
    }
    async loadInfo(addr, id) {
        try {
            const data = await Loader_1.default.loadPFPMetadata(addr, id);
            this.nftDisplayContainer.empty();
            if (data.image !== undefined) {
                this.nftDisplayContainer.append(new NFTDisplay_1.default(data.image));
            }
            this.nameDisplay.empty().appendText(data.name !== undefined ? data.name : `#${id}`);
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(data.description));
            }
            if (data.attributes !== undefined) {
                this.attributesDisplay.empty();
                for (const attribute of data.attributes) {
                    (0, skynode_1.el)(".attribute", (0, skynode_1.el)(".trait", attribute.trait_type), (0, skynode_1.el)(".value", String(attribute.value))).appendTo(this.attributesDisplay);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async loadSale(walletAddress, owner, addr, id) {
        this.tradeForm.empty();
        const saleInfo = await PFPStoreContract.sales(addr, id);
        const priceDispay = (0, skynode_1.el)(".price-container").appendTo(this.tradeForm);
        if (saleInfo.price.gt(0)) {
            priceDispay.append((0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "48" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(saleInfo.price)))));
            const result = await superagent_1.default.get("https://api.klu.bs/mix/price");
            const wonPrice = Math.floor(parseFloat(ethers_1.utils.formatEther(saleInfo.price)) * parseFloat(result.text));
            priceDispay.append((0, skynode_1.el)(".won-price", "(₩ ", CommonUtil_1.default.numberWithCommas(wonPrice.toString()), ")"));
        }
        else {
            priceDispay.appendText((0, msg_js_1.default)("NOT_SELLING_DESCRIPTION"));
        }
        if (walletAddress === owner) {
            this.tradeForm.append((0, skynode_1.el)("a.sell-button", (0, msg_js_1.default)("SELL_IT_BUTTON"), {
                click: () => new SellPopup_1.default([addr], [id]),
            }));
        }
        else if (saleInfo.seller === walletAddress) {
            this.tradeForm.append((0, skynode_1.el)("a.cancel-sell-button", (0, msg_js_1.default)("CANCEL_SELL_BUTTON"), {
                click: async () => {
                    await PFPStoreContract.cancelSale([addr], [id]);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                },
            }));
        }
        else if (saleInfo.price.gt(0)) {
            this.tradeForm.append((0, skynode_1.el)("a.buy-button", (0, msg_js_1.default)("BUY_IT_BUTTON"), {
                click: () => new BuyPopup_1.default([addr], [id]),
            }));
        }
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.refreshInterval);
        this.container.delete();
    }
}
exports.default = ItemDetail;
//# sourceMappingURL=ItemDetail.js.map