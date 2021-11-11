"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class BuyPopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".popup.buy-popup", (0, skynode_1.el)("h2", "구매하기"), (0, skynode_1.el)(".preview"), (0, skynode_1.el)(".price", "100 MIX"), (0, skynode_1.el)("a", "구매 진행")));
    }
}
exports.default = BuyPopup;
//# sourceMappingURL=BuyPopup.js.map