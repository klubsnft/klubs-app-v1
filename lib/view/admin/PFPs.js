"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Prompt_1 = __importDefault(require("../../component/dialogue/Prompt"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("../Layout"));
class PFPs {
    constructor() {
        Layout_1.default.current.title = "PFP 정보들";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".admin-pfps-view", (0, skynode_1.el)("h1", "PFP 정보들")));
        this.load();
    }
    async load() {
        const count = await PFPsContract_1.default.getAddrCount();
        for (let index = count.toNumber() - 1; index >= 0; index -= 1) {
            const addr = await PFPsContract_1.default.addrs(index);
            const managerCount = await PFPsContract_1.default.getManagerCount(addr);
            const managers = [];
            for (let j = 0; j < managerCount.toNumber(); j += 1) {
                managers.push(await PFPsContract_1.default.managers(addr, j));
            }
            const extras = await PFPsContract_1.default.extras(addr);
            (0, skynode_1.el)(".pfp", addr, "\n", JSON.stringify(managers), "\n", extras, {
                style: { marginTop: 20 },
            }, (0, skynode_1.el)("a", "Extra 설정", {
                click: () => new Prompt_1.default("Extra 설정", "Extra 입력", "완료", async (extra) => {
                    await PFPsContract_1.default.setExtra(addr, extra);
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