"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class OfferPopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".popup.offer-popup", (0, skynode_1.el)("h2", "가격 제시"), (0, skynode_1.el)(".preview"), (0, skynode_1.el)("input", "100 MIX"), (0, skynode_1.el)("a", "제시 완료")));
    }
}
exports.default = OfferPopup;
//# sourceMappingURL=OfferPopup.js.map