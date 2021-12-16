"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const ArtStoreContract_1 = __importDefault(require("../contracts/ArtStoreContract"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
const NFTDisplay_1 = __importDefault(require("./NFTDisplay"));
class ArtNFTCard extends skynode_1.DomNode {
    constructor(id, showingOffer, showingForce) {
        super(".art-nft-card");
        this.id = id;
        this.showingForce = showingForce;
        this.onDom("click", () => ViewUtil_1.default.go(`/arts/${id}`));
        this.load();
        if (showingOffer === true) {
            this.addClass("offers");
            this.loadOffers();
        }
    }
    async load() {
        try {
            const result = await superagent_1.default.get(`https://api.klu.bs/arts/${this.id}`);
            const data = result.body;
            if (data.image === undefined && this.showingForce !== true) {
                this.delete();
            }
            else {
                const saleInfo = await ArtStoreContract_1.default.sales(this.id);
                if (this.deleted !== true) {
                    this.append(data.image === undefined ? undefined : new NFTDisplay_1.default(data.image, true), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name === undefined ? "제목 없음" : data.name), saleInfo.price.eq(0) === true ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(saleInfo.price))))));
                }
            }
        }
        catch (e) {
            console.error(e);
            if (this.deleted !== true) {
                this.delete();
            }
        }
    }
    async loadOffers() {
    }
}
exports.default = ArtNFTCard;
//# sourceMappingURL=ArtNFTCard.js.map