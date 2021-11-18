"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const ProxyUtil_1 = __importDefault(require("../ProxyUtil"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class PFPNFTCard extends skynode_1.DomNode {
    constructor(addr, id, img, name, price, showingOffer) {
        super(".pfp-nft-card");
        this.append(img === undefined ? undefined : (0, skynode_1.el)("img", { src: ProxyUtil_1.default.imageSRC(img) }), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", name), price.eq(0) === true ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(price))))));
        this.onDom("click", () => ViewUtil_1.default.go(`/pfp/${addr}/${id}`));
        if (showingOffer === true) {
            this.addClass("offers");
            this.loadOffers();
        }
    }
    async loadOffers() {
    }
}
exports.default = PFPNFTCard;
//# sourceMappingURL=PFPNFTCard.js.map