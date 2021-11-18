"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const PFPStoreContract_1 = __importDefault(require("../contracts/PFPStoreContract"));
const KIP17Contract_1 = __importDefault(require("../contracts/standard/KIP17Contract"));
const ProxyUtil_1 = __importDefault(require("../ProxyUtil"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class BuyPopup extends skynode_1.Popup {
    constructor(addr, ids) {
        super(".popup-background");
        this.addr = addr;
        this.ids = ids;
        this.append(this.content = (0, skynode_1.el)(".popup.buy-popup", (0, skynode_1.el)("h2", "구매하기"), (0, skynode_1.el)("p", "NFT를 구매합니다. 최초 구매시에는 2번의 트랜잭션이 발생합니다. 한번은 MIX 사용 허락을 위한 것이며, 다른 하나는 실제 구매를 위한 것입니다."), this.loading = (0, skynode_1.el)(".loading", "Loading..."), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", "구매 진행", {
            click: async () => {
                await PFPStoreContract_1.default.buy(addr, ids);
                this.delete();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button", "취소", {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        for (const [index, addr] of this.addr.entries()) {
            const id = this.ids[index];
            const url = await new KIP17Contract_1.default(addr).tokenURI(id);
            const data = await ProxyUtil_1.default.loadURL(url);
            const img = data.image;
            const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
            this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : (0, skynode_1.el)("img", { src: ProxyUtil_1.default.imageSRC(img) }), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "판매 가격"), saleInfo.price.eq(0) === true ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(saleInfo.price))))))));
        }
        this.loading.delete();
    }
}
exports.default = BuyPopup;
//# sourceMappingURL=BuyPopup.js.map