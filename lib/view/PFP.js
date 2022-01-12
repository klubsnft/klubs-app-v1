"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Loading_1 = __importDefault(require("../component/loading/Loading"));
const PFPCard_1 = __importDefault(require("../component/PFPCard"));
const PFPsContract_1 = __importDefault(require("../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class PFP {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("PFP_PROJECTS_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", (0, msg_js_1.default)("PFP_PROJECTS_DESC")), (0, skynode_1.el)("a", (0, msg_js_1.default)("PFP_PROJECT_ADD_BUTTON"), {
            click: () => ViewUtil_1.default.go("/pfp/add"),
        })), (0, skynode_1.el)(".content", (0, skynode_1.el)("h2", (0, msg_js_1.default)("PFP_PROJECT_LIST")), this.pfpLoading = new Loading_1.default(), this.pfpList = (0, skynode_1.el)(".pfp-list"))));
        this.load();
    }
    async load() {
        this.pfpList.empty();
        const count = await PFPsContract_1.default.getAddrCount();
        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);
        const promises = [];
        for (const i of array) {
            const promise = async (index) => {
                const addr = await PFPsContract_1.default.addrs(index);
                if (await PFPsContract_1.default.banned(addr) !== true) {
                    const extras = await PFPsContract_1.default.extras(addr);
                    if (extras.trim() !== "") {
                        let data = {};
                        try {
                            data = JSON.parse(extras);
                        }
                        catch (e) { }
                        if (data.name !== "" && data.hiding !== true && this.container.deleted !== true) {
                            new PFPCard_1.default(addr, data).appendTo(this.pfpList);
                        }
                    }
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        this.pfpLoading.delete();
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = PFP;
//# sourceMappingURL=PFP.js.map