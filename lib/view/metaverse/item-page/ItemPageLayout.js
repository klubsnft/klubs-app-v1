"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const msg_js_1 = __importDefault(require("msg.js"));
const xss_1 = __importDefault(require("xss"));
const MetaversesContract_1 = __importStar(require("../../../contracts/MetaversesContract"));
const KIP17Contract_1 = __importDefault(require("../../../contracts/standard/KIP17Contract"));
const KIP37Contract_1 = __importDefault(require("../../../contracts/standard/KIP37Contract"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
const Loader_1 = __importDefault(require("../../../Loader"));
const Layout_1 = __importDefault(require("../../Layout"));
const ViewUtil_1 = __importDefault(require("../../ViewUtil"));
class ItemPageLayout {
    constructor(params) {
        ItemPageLayout.current = this;
        Layout_1.default.current.title = (0, msg_js_1.default)("METAVERSE_ITEM_DETAIL_INFO_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".metaverse-item-page-layout", this.header = (0, skynode_1.el)("header", this.iconDisplay = (0, skynode_1.el)("img"), (0, skynode_1.el)(".body", this.nameDisplay = (0, skynode_1.el)("h1"), this.descriptionDisplay = (0, skynode_1.el)("p"), this.miningInfoDisplay = (0, skynode_1.el)("p"), this.socialList = (0, skynode_1.el)(".social"))), this.content = (0, skynode_1.el)("main")));
        this.load(parseInt(params.metaverseId, 10), params.addr);
    }
    static async loadRarity(addr) {
        if (this.rarities[addr] === undefined) {
            const rarity = await Loader_1.default.loadPFPRarity(addr);
            if (rarity !== null) {
                rarity.rankings = {};
                const all = Object.entries(rarity.scores);
                all.sort((a, b) => b[1] - a[1]);
                for (const [index, [id]] of all.entries()) {
                    rarity.rankings[parseInt(id, 10)] = index;
                }
                this.rarities[addr] = rarity;
            }
        }
        return this.rarities[addr];
    }
    async load(metaverseId, addr) {
        if (metaverseId !== this.currentMetaverseId || addr !== this.currentAddr) {
            const itemType = await MetaversesContract_1.default.itemTypes(metaverseId, addr);
            this.contract = itemType === MetaversesContract_1.ItemType.ERC721 ? new KIP17Contract_1.default(addr) : new KIP37Contract_1.default(addr);
            this.loadInfo(metaverseId, addr);
            this.loadUpdateButton(metaverseId, addr);
            this.currentMetaverseId = metaverseId;
            this.currentAddr = addr;
        }
    }
    async loadInfo(metaverseId, addr) {
        const extras = await MetaversesContract_1.default.itemExtras(metaverseId, addr);
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
            if (data.mineable === true) {
                this.miningInfoDisplay.empty().append((0, skynode_1.el)("a.mining", (0, skynode_1.el)("img", { src: "/images/icon/mining.png", height: "14" }), (0, skynode_1.el)("span", (0, msg_js_1.default)("MINING_METAVERSE_ITEM")), {
                    title: (0, msg_js_1.default)("MINING_METAVERSE_ITEM_DESCRIPTION"),
                    href: data.miningInfoURL,
                    target: "_blank",
                    click: (event) => event.stopPropagation(),
                }));
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
    async loadUpdateButton(metaverseId, addr) {
        try {
            const address = await Wallet_1.default.loadAddress();
            if (address !== undefined && await MetaversesContract_1.default.existsManager(metaverseId, address) === true) {
                (0, skynode_1.el)("button.update-button", (0, msg_js_1.default)("UPDATE_METAVERSE_ITEM_INFO_BUTTON"), {
                    click: () => ViewUtil_1.default.go(`/metaverse/${metaverseId}/item/${addr}/update`),
                }).appendTo(this.header);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    changeParams(params, uri) {
        this.load(parseInt(params.metaverseId, 10), params.addr);
    }
    close() {
        this.container.delete();
    }
}
exports.default = ItemPageLayout;
ItemPageLayout.rarities = {};
//# sourceMappingURL=ItemPageLayout.js.map