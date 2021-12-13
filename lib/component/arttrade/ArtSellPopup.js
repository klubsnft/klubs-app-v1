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
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class SellPopup extends skynode_1.Popup {
    constructor(ids) {
        super(".popup-background");
        this.ids = ids;
        this.inputs = [];
        this.append(this.content = (0, skynode_1.el)(".popup.art-sell-popup", (0, skynode_1.el)("h2", "판매하기"), (0, skynode_1.el)("p", "보유중인 NFT를 판매합니다. 최초 판매시에는 2번의 트랜잭션이 발생합니다. 한번은 NFT 사용 허락을 위한 것이며, 다른 하나는 실제 판매를 위한 것입니다."), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", "판매 시작", {
            click: async () => {
                const prices = [];
                for (const input of this.inputs) {
                    prices.push(ethers_1.utils.parseEther(input.domElement.value));
                }
                await ArtStoreContract_1.default.sell(ids, prices);
                this.delete();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button", "취소", {
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
            this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", `판매 가격 (원작자 2차 판매 수수료: ${royalty.toNumber() / 100}%, Klubs 수수료 ${Config_1.default.fee}% 포함)`), input = (0, skynode_1.el)("input", { placeholder: "판매 가격 (MIX)" })))));
            this.inputs.push(input);
        }
        this.loading.delete();
    }
}
exports.default = SellPopup;
//# sourceMappingURL=ArtSellPopup.js.map