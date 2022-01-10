"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Prompt_1 = __importDefault(require("../../component/dialogue/Prompt"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("../Layout"));
class PFPs {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("PFP_INFOS");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".admin-pfps-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("PFP_INFOS"))));
        this.load();
    }
    async load() {
        const count = await PFPsContract_1.default.getAddrCount();
        for (let index = count.toNumber() - 1; index >= 0; index -= 1) {
            const addr = await PFPsContract_1.default.addrs(index);
            const royalty = await PFPsContract_1.default.royalties(addr);
            const managerCount = await PFPsContract_1.default.getManagerCount(addr);
            const managers = [];
            for (let j = 0; j < managerCount.toNumber(); j += 1) {
                managers.push(await PFPsContract_1.default.managers(addr, j));
            }
            const extras = await PFPsContract_1.default.extras(addr);
            (0, skynode_1.el)(".pfp", { style: { marginTop: 20 }, }, addr, "\n", JSON.stringify(managers), "\n", extras, "\n", (0, skynode_1.el)("a", (0, msg_js_1.default)("SETTING_EXTRA"), {
                click: () => new Prompt_1.default((0, msg_js_1.default)("SETTING_EXTRA"), (0, msg_js_1.default)("INPUT_EXTRA"), (0, msg_js_1.default)("DONE"), async (extra) => {
                    await PFPsContract_1.default.setExtra(addr, extra);
                }),
            }), "\n", royalty.royalty.toString(), "\n", (0, skynode_1.el)("a", (0, msg_js_1.default)("SETTING_ROYALTY"), {
                click: () => new Prompt_1.default((0, msg_js_1.default)("SETTING_ROYALTY"), (0, msg_js_1.default)("로열티 입력"), (0, msg_js_1.default)("DONE"), async (r) => {
                    await PFPsContract_1.default.setRoyalty(addr, royalty.receiver, r);
                }),
            })).appendTo(this.container);
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = PFPs;
//# sourceMappingURL=PFPs.js.map