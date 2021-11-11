"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class PFPNFTCard extends skynode_1.DomNode {
    constructor(img, name, description, price) {
        super(".card-view");
        this.append((0, skynode_1.el)("img", { src: img, width: "200", height: "200" }), (0, skynode_1.el)(".name", name), (0, skynode_1.el)(".description", description), price === undefined ? undefined : (0, skynode_1.el)(".price", `${price} MIX`));
    }
}
exports.default = PFPNFTCard;
//# sourceMappingURL=PFPNFTCard.js.map