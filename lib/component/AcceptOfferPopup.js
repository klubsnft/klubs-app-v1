"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const PFPsContract_1 = __importDefault(require("../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../contracts/PFPStoreContract"));
const KIP17Contract_1 = __importDefault(require("../contracts/standard/KIP17Contract"));
const ProxyUtil_1 = __importDefault(require("../ProxyUtil"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class AcceptOfferPopup extends skynode_1.Popup {
    constructor(addr, id, offerId) {
        super(".popup-background");
        this.addr = addr;
        this.id = id;
        this.offerId = offerId;
        this.append(this.content = (0, skynode_1.el)(".popup.accept-offer-popup", (0, skynode_1.el)("h2", "제안 수락하기"), (0, skynode_1.el)("p", "보유중인 NFT에 제안된 가격을 수락합니다. 최초 수락시에는 2번의 트랜잭션이 발생합니다. 한번은 NFT 사용 허락을 위한 것이며, 다른 하나는 실제 수락을 위한 것입니다. 수락하는 즉시 거래가 완료됩니다."), this.loading = (0, skynode_1.el)(".loading", "Loading..."), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", "제안 수락", {
            click: async () => {
                await PFPStoreContract_1.default.acceptOffer(addr, id, offerId);
                this.delete();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button", "취소", {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        const url = await new KIP17Contract_1.default(this.addr).tokenURI(this.id);
        const data = await ProxyUtil_1.default.loadURL(url);
        const img = data.image;
        const offerInfo = await PFPStoreContract_1.default.offers(this.addr, this.id, this.offerId);
        const royalty = await PFPsContract_1.default.royalties(this.addr);
        this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : (0, skynode_1.el)("img", { src: ProxyUtil_1.default.imageSRC(img) }), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", `제안 가격 (원작자 2차 판매 수수료: ${royalty.royalty / 100}%, Klubs 수수료 2.5% 포함)`), offerInfo.price.eq(0) === true ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(offerInfo.price))))))));
        this.loading.delete();
    }
}
exports.default = AcceptOfferPopup;
//# sourceMappingURL=AcceptOfferPopup.js.map