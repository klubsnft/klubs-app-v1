"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Item {
    constructor() {
        Layout_1.default.current.title = "Items";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".item-view", (0, skynode_1.el)(".title", "Klubs Items는 게임 및 메타버스에서 사용되는 아이템을 거래할 수 있습니다.\nKlubs Arts 출시 후 출시됩니다.")));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Item;
//# sourceMappingURL=Item.js.map