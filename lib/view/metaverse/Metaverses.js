"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const MetaverseCard_1 = __importDefault(require("../../component/MetaverseCard"));
const MetaversesContract_1 = __importDefault(require("../../contracts/MetaversesContract"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Metaverses {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("METAVERSES_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".metaverses-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", (0, msg_js_1.default)("METAVERSES_DESCRIPTION")), (0, skynode_1.el)("a", (0, msg_js_1.default)("METAVERSES_ADD_BUTTON"), {
            click: () => ViewUtil_1.default.go("/metaverse/add"),
        })), (0, skynode_1.el)(".content", (0, skynode_1.el)("h2", (0, msg_js_1.default)("METAVERSE_LIST")), this.metaverseLoading = new Loading_1.default(), this.metaverseList = (0, skynode_1.el)(".metaverse-list"))));
        this.load();
    }
    async load() {
        this.metaverseList.empty();
        const count = await MetaversesContract_1.default.getMetaverseCount();
        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);
        const promises = [];
        for (const i of array) {
            const promise = async (id) => {
                if (await MetaversesContract_1.default.banned(id) !== true) {
                    const extras = await MetaversesContract_1.default.extras(id);
                    if (extras.trim() !== "") {
                        let data = {};
                        try {
                            data = JSON.parse(extras);
                        }
                        catch (e) { }
                        if (data.name !== "" && data.hiding !== true && this.container.deleted !== true) {
                            new MetaverseCard_1.default(id, data).appendTo(this.metaverseList);
                        }
                    }
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        this.metaverseLoading.delete();
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Metaverses;
//# sourceMappingURL=Metaverses.js.map