"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const msg_js_1 = __importDefault(require("msg.js"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const Prompt_1 = __importDefault(require("../component/dialogue/Prompt"));
const KlayswapContract_1 = __importDefault(require("../contracts/KlayswapContract"));
const Layout_1 = __importDefault(require("./Layout"));
class Mix {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("MIX");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mix-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("MIX")), (0, skynode_1.el)("img", { src: "/images/mix.png", height: "200" }), (0, skynode_1.el)(".price", (0, skynode_1.el)("span", "1 MIX = "), this.priceDisplay = (0, skynode_1.el)("span"), (0, skynode_1.el)("span", "원")), (0, skynode_1.el)("a.buy-mix-button", (0, msg_js_1.default)("BUYING_MIX_BUTTON"), {
            click: () => new Prompt_1.default((0, msg_js_1.default)("BUY_MIX_TITLE"), (0, msg_js_1.default)("HOW_TO_BUY_MIX_DESCRIPTION"), (0, msg_js_1.default)("BUY_MIX_CONFIRM"), async (amount) => {
                const mix = ethers_1.utils.parseEther(amount);
                await KlayswapContract_1.default.buyMix(mix);
            }),
        }), (0, skynode_1.el)("p", (0, msg_js_1.default)("MIX_DESCRIPTION")), (0, skynode_1.el)("a.whitepaper-button", (0, msg_js_1.default)("MIX_WHITEPAPER_BUTTON"), { href: "https://medium.com/dogesoundclub/dsc-mix-nft-%ED%97%88%EB%B8%8C%EB%A5%BC-%EC%9C%84%ED%95%9C-%ED%86%A0%ED%81%B0-3299dd3a8d1d", target: "_blank" })));
        this.loadPrice();
    }
    async loadPrice() {
        const result = await superagent_1.default.get("https://api.klu.bs/mix/price");
        this.priceDisplay.empty().append(CommonUtil_1.default.numberWithCommas(result.text));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Mix;
//# sourceMappingURL=Mix.js.map