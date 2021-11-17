"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const PFPsContract_1 = __importDefault(require("../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../contracts/PFPStoreContract"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class AcceptOfferPopup extends skynode_1.Popup {
    constructor(addr, ids) {
        super(".popup-background");
        this.addr = addr;
        this.ids = ids;
        this.inputs = [];
        this.append(this.content = (0, skynode_1.el)(".popup.accept-offer-popup", (0, skynode_1.el)("h2", "판매하기"), (0, skynode_1.el)("p", "보유중인 NFT를 판매합니다. 최초 판매시에는 2번의 트랜잭션이 발생합니다. 한번은 NFT 사용 허락을 위한 것이며, 다른 하나는 실제 판매를 위한 것입니다."), this.loading = (0, skynode_1.el)(".loading", "Loading..."), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", "판매 시작", {
            click: async () => {
                const prices = [];
                for (const input of this.inputs) {
                    prices.push(ethers_1.utils.parseEther(input.domElement.value));
                }
                await PFPStoreContract_1.default.sell(addr, ids, prices);
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
            let input;
            const result = await superagent_1.default.get(`https://api.klu.bs/pfp/${addr}/${this.ids[index]}/proxy`);
            const royalty = await PFPsContract_1.default.royalties(addr);
            const img = result.body.image;
            this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : (0, skynode_1.el)("img", {
                src: img.indexOf("ipfs://") === 0 ? `https://api.klu.bs/ipfsimage/${img.substring(7)}` : img,
            }), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", result.body.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", `판매 가격 (원작자 2차 판매 수수료: ${royalty.royalty / 100}%, Klubs 수수료 2.5% 포함)`), input = (0, skynode_1.el)("input", { placeholder: "판매 가격 (MIX)" })))));
            this.inputs.push(input);
        }
        this.loading.delete();
    }
}
exports.default = AcceptOfferPopup;
//# sourceMappingURL=AcceptOfferPopup.js.map