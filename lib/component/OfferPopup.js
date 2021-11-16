"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class OfferPopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".popup.offer-popup", (0, skynode_1.el)("h4", "가격 제안"), (0, skynode_1.el)("hr.divider"), (0, skynode_1.el)(".preview"), (0, skynode_1.el)(".warning", "제안 가격을 꼭 확인하세요."), (0, skynode_1.el)(".label", "제안 가격"), (0, skynode_1.el)("input", { placeholder: "... MIX" }), (0, skynode_1.el)("button", "제안하기"), (0, skynode_1.el)("button", "취소", {
            click: () => this.delete(),
        })));
    }
}
exports.default = OfferPopup;
//# sourceMappingURL=OfferPopup.js.map