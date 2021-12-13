"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Config_1 = __importDefault(require("../../Config"));
const ArtsContract_1 = __importDefault(require("../../contracts/ArtsContract"));
const ArtStoreContract_1 = __importDefault(require("../../contracts/ArtStoreContract"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class AcceptOfferPopup extends skynode_1.Popup {
    constructor(id, offerId) {
        super(".popup-background");
        this.id = id;
        this.offerId = offerId;
        this.append(this.content = (0, skynode_1.el)(".popup.art-accept-offer-popup", (0, skynode_1.el)("h2", "제안 수락하기"), (0, skynode_1.el)("p", "보유중인 NFT에 제안된 가격을 수락합니다. 최초 수락시에는 2번의 트랜잭션이 발생합니다. 한번은 NFT 사용 허락을 위한 것이며, 다른 하나는 실제 수락을 위한 것입니다. 수락하는 즉시 거래가 완료됩니다."), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", "제안 수락", {
            click: async () => {
                await ArtStoreContract_1.default.acceptOffer(id, offerId);
                this.delete();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button", "취소", {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        const result = await superagent_1.default.get(`https://api.klu.bs/arts/${this.id}`);
        const data = result.body;
        const img = data.image;
        const offerInfo = await ArtStoreContract_1.default.offers(this.id, this.offerId);
        const royalty = await ArtsContract_1.default.royalties(this.id);
        this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", `제안 가격 (원작자 2차 판매 수수료: ${royalty.toNumber() / 100}%, Klubs 수수료 ${Config_1.default.fee}% 포함)`), offerInfo.price.eq(0) === true ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(offerInfo.price))))))));
        this.loading.delete();
    }
}
exports.default = AcceptOfferPopup;
//# sourceMappingURL=ArtAcceptOfferPopup.js.map