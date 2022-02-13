"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const msg_js_1 = __importDefault(require("msg.js"));
const xss_1 = __importDefault(require("xss"));
const ItemCard_1 = __importDefault(require("../../component/ItemCard"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const MetaversesContract_1 = __importDefault(require("../../contracts/MetaversesContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Metaverse {
    constructor(params) {
        Layout_1.default.current.title = (0, msg_js_1.default)("METAVERSE_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".metaverse-view", this.header = (0, skynode_1.el)("header", this.iconDisplay = (0, skynode_1.el)("img"), (0, skynode_1.el)(".body", this.nameDisplay = (0, skynode_1.el)("h1"), this.descriptionDisplay = (0, skynode_1.el)("p"), this.socialList = (0, skynode_1.el)(".social"))), (0, skynode_1.el)(".content", (0, skynode_1.el)("h2", (0, msg_js_1.default)("METAVERSE_ITEM_LIST")), this.itemLoading = new Loading_1.default(), this.itemList = (0, skynode_1.el)(".item-list"))));
        this.load(parseInt(params.id, 10));
        this.loadItems(parseInt(params.id, 10));
    }
    load(id) {
        if (id !== this.currentId) {
            this.loadInfo(id);
            this.loadUpdateButton(id);
            this.currentId = id;
        }
    }
    async loadInfo(id) {
        const extras = await MetaversesContract_1.default.extras(id);
        try {
            const data = JSON.parse(extras);
            if (data.icon === undefined || data.icon.trim() === "") {
                this.iconDisplay.domElement.src = "/images/placeholder.svg";
            }
            else {
                this.iconDisplay.domElement.src = data.icon;
            }
            if (data.name !== undefined) {
                Layout_1.default.current.title = data.name;
                this.nameDisplay.empty().appendText(data.name);
            }
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(data.description));
            }
            this.socialList.empty();
            if (data.twitter !== undefined && data.twitter.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/twitter.svg", height: 24 }), { href: data.twitter, target: "_blank" }));
            }
            if (data.linktree !== undefined && data.linktree.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/linktree.svg", height: 24 }), { href: data.linktree, target: "_blank" }));
            }
            if (data.homepage !== undefined && data.homepage.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/homepage.svg", height: 24 }), { href: data.homepage, target: "_blank" }));
            }
            if (data.discord !== undefined && data.discord.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/discord.svg", height: 24 }), { href: data.discord, target: "_blank" }));
            }
            if (data.telegram !== undefined && data.telegram.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/telegram.svg", height: 24 }), { href: data.telegram, target: "_blank" }));
            }
            if (data.kakaotalk !== undefined && data.kakaotalk.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/kakao-talk.svg", height: 24 }), { href: data.kakaotalk, target: "_blank" }));
            }
            if (data.kakaotalk2 !== undefined && data.kakaotalk2.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/kakao-talk.svg", height: 24 }), { href: data.kakaotalk2, target: "_blank" }));
            }
            if (data.kakaotalk3 !== undefined && data.kakaotalk3.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/kakao-talk.svg", height: 24 }), { href: data.kakaotalk3, target: "_blank" }));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async loadUpdateButton(id) {
        try {
            const address = await Wallet_1.default.loadAddress();
            if (address !== undefined && await MetaversesContract_1.default.existsManager(id, address) === true) {
                this.header.append((0, skynode_1.el)(".button-container", (0, skynode_1.el)("button.update-button", (0, msg_js_1.default)("UPDATE_METAVERSE_BUTTON"), {
                    click: () => ViewUtil_1.default.go(`/metaverse/${id}/update`),
                }), (0, skynode_1.el)("button", (0, msg_js_1.default)("ADD_METAVERSE_ITEM_BUTTON"), {
                    click: () => ViewUtil_1.default.go(`/metaverse/${id}/additem`),
                })));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async loadItems(id) {
        this.itemList.empty();
        const count = await MetaversesContract_1.default.getItemAddrCount(id);
        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i);
        const promises = [];
        for (const i of array) {
            const promise = async (index) => {
                const addr = await MetaversesContract_1.default.itemAddrs(id, index);
                const extras = await MetaversesContract_1.default.itemExtras(id, addr);
                let data = {};
                try {
                    data = JSON.parse(extras);
                }
                catch (e) { }
                if (data.hiding !== true && this.container.deleted !== true) {
                    new ItemCard_1.default(id, addr, data).appendTo(this.itemList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        this.itemLoading.delete();
    }
    changeParams(params, uri) {
        this.load(parseInt(params.id, 10));
    }
    close() {
        this.container.delete();
    }
}
exports.default = Metaverse;
//# sourceMappingURL=Metaverse.js.map