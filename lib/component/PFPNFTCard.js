"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class PFPNFTCard extends skynode_1.DomNode {
    constructor(addr, id, img, name, description, price) {
        super(".pfp-nft-card");
        this.append(img === undefined ? undefined : (0, skynode_1.el)("img", {
            src: img.indexOf("ipfs://") === 0 ? `https://api.klu.bs/ipfsimage/${img.substring(7)}` : img,
            width: "200",
            height: "200",
        }), (0, skynode_1.el)(".name", name), (0, skynode_1.el)(".description", description), price === undefined ? undefined : (0, skynode_1.el)(".price", `${price} MIX`));
        this.onDom("click", () => ViewUtil_1.default.go(`/pfp/${addr}/${id}`));
    }
}
exports.default = PFPNFTCard;
//# sourceMappingURL=PFPNFTCard.js.map