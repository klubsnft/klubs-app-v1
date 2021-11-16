"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class SellPopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".popup.sell-popup", (0, skynode_1.el)("h4", "판매하기"), (0, skynode_1.el)("hr.divider"), (0, skynode_1.el)(".preview"), (0, skynode_1.el)(".label", "판매 가격"), (0, skynode_1.el)(".price", "100 MIX"), (0, skynode_1.el)(".danger-caption", "판매 가격을 꼭 확인하세요."), (0, skynode_1.el)("button", "판매 시작"), (0, skynode_1.el)("button", "취소", {
            click: () => this.delete(),
        })));
    }
}
exports.default = SellPopup;
//# sourceMappingURL=SellPopup.js.map