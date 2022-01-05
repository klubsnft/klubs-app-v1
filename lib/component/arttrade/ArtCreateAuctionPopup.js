"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const Config_1 = __importDefault(require("../../Config"));
const ArtsContract_1 = __importDefault(require("../../contracts/ArtsContract"));
const ArtStoreContract_1 = __importDefault(require("../../contracts/ArtStoreContract"));
const Klaytn_1 = __importDefault(require("../../klaytn/Klaytn"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class ArtCreateAuctionPopup extends skynode_1.Popup {
    constructor(id) {
        super(".popup-background");
        this.id = id;
        this.append(this.content = (0, skynode_1.el)(".popup.art-create-auction-popup", (0, skynode_1.el)("h2", "경매 시작하기"), (0, skynode_1.el)("p", "보유중인 NFT의 경매를 시작합니다. 최초 경매 시작시에는 2번의 트랜잭션이 발생합니다. 한번은 NFT 사용 허락을 위한 것이며, 다른 하나는 실제 경매 시작을 위한 것입니다."), this.loading = new Loading_1.default(), this.info = (0, skynode_1.el)(".info"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", "경매 시작", {
            click: async () => {
                if (this.startPriceInput !== undefined && this.endBlockInput !== undefined) {
                    const startPrice = ethers_1.utils.parseEther(this.startPriceInput.domElement.value);
                    const endBlock = this.endBlockInput.domElement.value;
                    await ArtStoreContract_1.default.createAuction(id, startPrice, endBlock);
                    this.delete();
                    ViewUtil_1.default.waitTransactionAndRefresh();
                }
            },
        }), (0, skynode_1.el)("button", "취소", {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        const result = await superagent_1.default.get(`https://api.klu.bs/arts/${this.id}`);
        const data = result.body;
        const royalty = await ArtsContract_1.default.royalties(this.id);
        const currentBlock = await Klaytn_1.default.loadBlockNumber();
        const img = data.image;
        this.info.append((0, skynode_1.el)(".name", data.name), img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)("label", (0, skynode_1.el)("span", `경매 시작 가격 (원작자 2차 판매 수수료: ${royalty.toNumber() / 100}%, Klubs 수수료 ${Config_1.default.fee}% 포함)`), this.startPriceInput = (0, skynode_1.el)("input", { placeholder: "경매 시작 가격 (MIX)" })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", `경매 종료 블록 (현재 블록: ${currentBlock})`), (0, skynode_1.el)("p.warning", (0, skynode_1.el)("i.fas.fa-exclamation-triangle"), "클레이튼의 블록 타임은 대략 1초입니다. 종료 시간 계산에 유의해주시기 바랍니다."), this.endBlockInput = (0, skynode_1.el)("input", { placeholder: "경매 종료 블록" })));
        this.loading.delete();
    }
}
exports.default = ArtCreateAuctionPopup;
//# sourceMappingURL=ArtCreateAuctionPopup.js.map