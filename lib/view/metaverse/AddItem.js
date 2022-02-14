"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const MetaversesContract_1 = __importDefault(require("../../contracts/MetaversesContract"));
const Layout_1 = __importDefault(require("../Layout"));
class AddItem {
    constructor(params) {
        Layout_1.default.current.title = (0, msg_js_1.default)("ADD_METAVERSE_ITEM_TITLE");
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".add-metaverse-item-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("ADD_METAVERSE_ITEM_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("ADD_METAVERSE_ITEM_DESCRIPTION"))), (0, skynode_1.el)("main", (0, skynode_1.el)("label", (0, skynode_1.el)("h6", (0, msg_js_1.default)("CONTRACT_ADDRESS_INPUT")), this.input = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("CONTRACT_ADDRESS_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h6", (0, msg_js_1.default)("METAVERSE_ITEM_TYPE_SELECT")), this.select = (0, skynode_1.el)("select", (0, skynode_1.el)("option", "KIP-37", { value: "0" }), (0, skynode_1.el)("option", "KIP-17", { value: "1" }))), (0, skynode_1.el)("button", (0, msg_js_1.default)("REGISTER_BUTTON"), {
            click: async () => {
                const addr = this.input.domElement.value;
                const added = await MetaversesContract_1.default.itemAdded(params.id, addr);
                if (added === true) {
                    new Alert_1.default((0, msg_js_1.default)("FAIL_ADD_INFO_TITLE"), (0, msg_js_1.default)("ALREADY_REGISTER_INFO_DESCRIPTION"));
                }
                else {
                    await MetaversesContract_1.default.addItem(params.id, addr, parseInt(this.select.domElement.value, 10), "");
                    setTimeout(() => new Alert_1.default((0, msg_js_1.default)("SUCCESS_ADD_INFO_TITLE"), (0, msg_js_1.default)("SUCCESS_ADD_INFO_DESCRIPTION")), 2000);
                }
            },
        })))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = AddItem;
//# sourceMappingURL=AddItem.js.map