"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class CardView extends skynode_1.DomNode {
    constructor(img, title, body, price) {
        super(".card-view");
        this.append((0, skynode_1.el)("img", { src: img, width: "200", height: "200" }), (0, skynode_1.el)(".title", title), (0, skynode_1.el)(".body", body), price === undefined ? undefined : (0, skynode_1.el)(".price", `${price} Mix`));
    }
}
exports.default = CardView;
//# sourceMappingURL=CardView.js.map