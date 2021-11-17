"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const PFPStoreContract_1 = __importDefault(require("../contracts/PFPStoreContract"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class OfferPopup extends skynode_1.Popup {
    constructor(addr, id) {
        super(".popup-background");
        this.addr = addr;
        this.id = id;
        this.inputs = [];
        this.append(this.content = (0, skynode_1.el)(".popup.offer-popup", (0, skynode_1.el)("h2", "가격 제안"), (0, skynode_1.el)("p", "NFT의 가격을 제안합니다. 최초 제안시에는 2번의 트랜잭션이 발생합니다. 한번은 MIX 사용 허락을 위한 것이며, 다른 하나는 실제 제안를 위한 것입니다. 소유자가 수락하는 즉시 거래가 완료됩니다."), this.loading = (0, skynode_1.el)(".loading", "Loading..."), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", "제안하기", {
            click: async () => {
                const prices = [];
                for (const input of this.inputs) {
                    prices.push(ethers_1.utils.parseEther(input.domElement.value));
                }
                await PFPStoreContract_1.default.makeOffer(addr, id, prices[0]);
                this.delete();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button", "취소", {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        let input;
        const result = await superagent_1.default.get(`https://api.klu.bs/pfp/${this.addr}/${this.id}/proxy`);
        const img = result.body.image;
        this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : (0, skynode_1.el)("img", {
            src: img.indexOf("ipfs://") === 0 ? `https://api.klu.bs/ipfsimage/${img.substring(7)}` : img,
        }), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", result.body.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "제안 가격"), input = (0, skynode_1.el)("input", { placeholder: "제안 가격 (MIX)" })))));
        this.inputs.push(input);
        this.loading.delete();
    }
}
exports.default = OfferPopup;
//# sourceMappingURL=OfferPopup.js.map