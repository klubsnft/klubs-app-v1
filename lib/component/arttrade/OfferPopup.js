"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const Loader_1 = __importDefault(require("../../Loader"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class OfferPopup extends skynode_1.Popup {
    constructor(addr, id) {
        super(".popup-background");
        this.addr = addr;
        this.id = id;
        this.inputs = [];
        this.append(this.content = (0, skynode_1.el)(".popup.offer-popup", (0, skynode_1.el)("h2", "가격 제안"), (0, skynode_1.el)("p", "NFT의 가격을 제안합니다. 최초 제안시에는 2번의 트랜잭션이 발생합니다. 한번은 MIX 사용 허락을 위한 것이며, 다른 하나는 실제 제안를 위한 것입니다. 소유자가 수락하는 즉시 거래가 완료됩니다."), this.loading = new Loading_1.default(), this.list = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", "제안하기", {
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
        const data = await Loader_1.default.loadMetadata(this.addr, this.id);
        const img = data.image;
        this.list.append((0, skynode_1.el)("section", img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "제안 가격"), input = (0, skynode_1.el)("input", { placeholder: "제안 가격 (MIX)" })))));
        this.inputs.push(input);
        this.loading.delete();
    }
}
exports.default = OfferPopup;
//# sourceMappingURL=OfferPopup.js.map