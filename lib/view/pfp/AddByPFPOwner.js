"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("../Layout"));
class AddByPFPOwner {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("ADD_OWNER_PFP");
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".add-pfp-by-pfp-owner-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("ADD_PFP_PROJECT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("ADD_OWNABLE_PFP"))), (0, skynode_1.el)("main", (0, skynode_1.el)("p.warning", (0, skynode_1.el)("i.fas.fa-exclamation-triangle"), (0, msg_js_1.default)("ADD_OWNABLE_PFP_DESC2")), (0, skynode_1.el)("label", (0, skynode_1.el)("h6", (0, msg_js_1.default)("CONTRACT_ADDRESS")), this.input = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("CONTRACT_ADDRESS") })), (0, skynode_1.el)("button", (0, msg_js_1.default)("REGISTER"), {
            click: async () => {
                const addr = this.input.domElement.value;
                const added = await PFPsContract_1.default.added(addr);
                if (added === true) {
                    new Alert_1.default((0, msg_js_1.default)("FAIL_ADD_INFO"), (0, msg_js_1.default)("ALREADY_REGISTER_INFO"));
                }
                else {
                    await PFPsContract_1.default.addByPFPOwner(addr);
                    setTimeout(() => new Alert_1.default((0, msg_js_1.default)("SUCCESS_ADD_INFO"), (0, msg_js_1.default)("SUCCESS_ADD_INFO_DESC1")), 2000);
                }
            },
        })))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = AddByPFPOwner;
//# sourceMappingURL=AddByPFPOwner.js.map