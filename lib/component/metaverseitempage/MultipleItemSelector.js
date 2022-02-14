"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const skyutil_1 = __importDefault(require("skyutil"));
const BuyPopup_1 = __importDefault(require("../pfptrade/BuyPopup"));
const SellPopup_1 = __importDefault(require("../pfptrade/SellPopup"));
class MultipleItemSelector extends skynode_1.DomNode {
    constructor(addr, multiple) {
        super(".multiple-pfp-selector");
        this.selectedIds = [];
        this.append(this.selectedCount = (0, skynode_1.el)("p", (0, msg_js_1.default)("SELECTED_DESCRIPTION").replace(/{n}/, "0")), (0, skynode_1.el)("a", multiple === "sell" ? (0, msg_js_1.default)("SELL_IT_BUTTON") : (0, msg_js_1.default)("BUY_IT_BUTTON"), {
            click: () => {
                const addrs = [];
                skyutil_1.default.repeat(this.selectedIds.length, () => {
                    addrs.push(addr);
                });
                if (multiple === "sell") {
                    new SellPopup_1.default(addrs, this.selectedIds);
                }
                else {
                    new BuyPopup_1.default(addrs, this.selectedIds);
                }
            },
        }), (0, skynode_1.el)("a", (0, msg_js_1.default)("CANCEL_BUTTON"), { click: () => this.delete() }));
    }
    select(id) {
        if (this.selecting(id) !== true) {
            this.selectedIds.push(id);
            this.update();
        }
    }
    selecting(id) {
        return this.selectedIds.includes(id);
    }
    deselect(id) {
        skyutil_1.default.pull(this.selectedIds, id);
        this.update();
    }
    update() {
        this.selectedCount.empty().appendText((0, msg_js_1.default)("SELECTED_DESCRIPTION").replace(/{n}/, String(this.selectedIds.length)));
    }
}
exports.default = MultipleItemSelector;
//# sourceMappingURL=MultipleItemSelector.js.map