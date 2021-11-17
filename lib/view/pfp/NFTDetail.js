"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const superagent_1 = __importDefault(require("superagent"));
const xss_1 = __importDefault(require("xss"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const KIP17Contract_1 = __importDefault(require("../../contracts/standard/KIP17Contract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class NFTDetail {
    constructor(params) {
        const addr = params.addr;
        const id = parseInt(params.id, 10);
        this.contract = new KIP17Contract_1.default(addr);
        Layout_1.default.current.title = "NFT 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-nft-detail-view", this.imageDisplay = (0, skynode_1.el)("img.nft-image"), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "기본 정보"), this.pfpDisplay = (0, skynode_1.el)(".pfp"), this.nameDisplay = (0, skynode_1.el)(".name"), this.ownerDisplay = (0, skynode_1.el)(".owner"), this.descriptionDisplay = (0, skynode_1.el)(".description")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "속성"), this.attributesDisplay = (0, skynode_1.el)(".attributes")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "거래하기"), this.tradeForm = (0, skynode_1.el)(".trade-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "가격 제안"), this.offerForm = (0, skynode_1.el)(".offer-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "경매"), (0, skynode_1.el)("p", "경매 기능은 추후 제공됩니다."))));
        this.loadPFP(addr);
        this.loadInfo(addr, id);
        this.loadTrade(addr, id);
    }
    async loadPFP(addr) {
        const extras = await PFPsContract_1.default.extras(addr);
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
        const owner = await this.contract.ownerOf(id);
        this.ownerDisplay.empty().appendText("소유자 ");
        this.ownerDisplay.append((0, skynode_1.el)("span", CommonUtil_1.default.shortenAddress(owner)));
        const address = await Wallet_1.default.loadAddress();
        this.loadSale(address === owner, addr, id);
        this.loadOffers(address === owner, addr, id);
    }
    async loadInfo(addr, id) {
        try {
            const result = await superagent_1.default.get(`https://api.klu.bs/pfp/${addr}/${id}/proxy`);
            this.imageDisplay.domElement.src = result.body.image;
            this.nameDisplay.empty().appendText(result.body.name !== undefined ? result.body.name : `#${id}`);
            if (result.body.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(result.body.description));
            }
            if (result.body.attributes !== undefined) {
                this.attributesDisplay.empty();
                for (const attribute of result.body.attributes) {
                    (0, skynode_1.el)(".attribute", (0, skynode_1.el)(".trait", attribute.trait_type), (0, skynode_1.el)(".value", String(attribute.value))).appendTo(this.attributesDisplay);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async loadSale(isOwner, addr, id) {
        this.tradeForm.empty();
        if (isOwner === true) {
            this.tradeForm.append((0, skynode_1.el)("a.sell-button", "판매하기", {}));
        }
    }
    async loadOffers(isOwner, addr, id) {
        this.offerForm.empty();
        if (isOwner !== true) {
            this.tradeForm.append((0, skynode_1.el)("a.offer-button", "가격 제안하기", {}));
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = NFTDetail;
//# sourceMappingURL=NFTDetail.js.map