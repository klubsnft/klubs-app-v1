"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class CardView extends skynode_1.DomNode {
    constructor(img, title, subtitle, price) {
        super(".card-view");
        this.append((0, skynode_1.el)("img", { src: img, width: "200", height: "200" }), (0, skynode_1.el)(".card-title", title), (0, skynode_1.el)(".card-subtitle", subtitle), (0, skynode_1.el)(".card-price", `${price} Mix`));
    }
}
exports.default = CardView;
//# sourceMappingURL=CardView.js.map