"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class OfferPopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".popup.offer-popup", (0, skynode_1.el)("h4", "가격 제시"), (0, skynode_1.el)("hr.divider"), (0, skynode_1.el)(".preview"), (0, skynode_1.el)(".label", "제시 가격"), (0, skynode_1.el)("input", { placeholder: "... MIX" }), (0, skynode_1.el)(".danger", "제시 가격을 꼭 확인하세요."), (0, skynode_1.el)("button", "가격 제시")));
    }
}
exports.default = OfferPopup;
//# sourceMappingURL=OfferPopup.js.map