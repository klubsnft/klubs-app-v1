"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const MetaversesContract_1 = __importDefault(require("../../contracts/MetaversesContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class ItemPageTabs extends skynode_1.DomNode {
    constructor(metaverseId, addr, type) {
        super(".metaverse-item-page-tabs");
        this.metaverseId = metaverseId;
        this.addr = addr;
        this.append((0, skynode_1.el)(`a.tab${type === "all" ? ".on" : ""}`, (0, msg_js_1.default)("SELLING_TAB"), {
            click: () => ViewUtil_1.default.go(`/metaverse/${metaverseId}/item/${addr}`),
        }), this.mineTab = (0, skynode_1.el)(`a.tab${type === "mine" ? ".on" : ""}`, "아이템", {
            click: () => ViewUtil_1.default.go(`/metaverse/${metaverseId}/item/${addr}/mine`),
        }));
        this.load();
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const totalSupply = (await MetaversesContract_1.default.getItemTotalSupply(this.metaverseId, this.addr)).toNumber();
            this.mineTab.empty().appendText(`아이템 (${totalSupply})`);
        }
    }
}
exports.default = ItemPageTabs;
//# sourceMappingURL=ItemPageTabs.js.map