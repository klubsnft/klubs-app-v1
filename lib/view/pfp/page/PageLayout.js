"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const xss_1 = __importDefault(require("xss"));
const PFPsContract_1 = __importDefault(require("../../../contracts/PFPsContract"));
const KIP17Contract_1 = __importDefault(require("../../../contracts/standard/KIP17Contract"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
const Loader_1 = __importDefault(require("../../../Loader"));
const Layout_1 = __importDefault(require("../../Layout"));
const ViewUtil_1 = __importDefault(require("../../ViewUtil"));
class PageLayout {
    constructor(params) {
        PageLayout.current = this;
        Layout_1.default.current.title = "PFP 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-page-layout", this.header = (0, skynode_1.el)("header", this.iconDisplay = (0, skynode_1.el)("img"), (0, skynode_1.el)(".body", this.nameDisplay = (0, skynode_1.el)("h1"), this.descriptionDisplay = (0, skynode_1.el)("p"), this.miningInfoDisplay = (0, skynode_1.el)("p"), this.socialList = (0, skynode_1.el)(".social"))), this.content = (0, skynode_1.el)("main")));
        this.load(params.addr);
    }
    static async loadRarity(addr) {
        if (this.rarities[addr] === undefined) {
            const rarity = await Loader_1.default.loadRarity(addr);
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
    load(addr) {
        if (addr !== this.currentAddr) {
            this.contract = new KIP17Contract_1.default(addr);
            this.loadInfo(addr);
            this.loadUpdateButton(addr);
            this.currentAddr = addr;
        }
    }
    async loadInfo(addr) {
        const extras = await PFPsContract_1.default.extras(addr);
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
                this.miningInfoDisplay.empty().append((0, skynode_1.el)("a.mining", (0, skynode_1.el)("img", { src: "/images/icon/mining.png", height: "14" }), (0, skynode_1.el)("span", "채굴 가능"), {
                    title: "채굴 가능한 PFP입니다. 클릭하시면 자세한 정보를 확인하실 수 있습니다.",
                    href: data.miningInfoURL,
                    target: "_blank",
                    click: (event) => event.stopPropagation(),
                }));
            }
            this.socialList.empty();
            if (data.twitter !== undefined && data.twitter.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/twitter.svg", height: 24 }), { href: data.twitter, target: "_blank" }));
            }
            if (data.kakaotalk !== undefined && data.kakaotalk.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/kakao-talk.svg", height: 24 }), { href: data.kakaotalk, target: "_blank" }));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async loadUpdateButton(addr) {
        try {
            const address = await Wallet_1.default.loadAddress();
            if (address !== undefined && await PFPsContract_1.default.existsManager(addr, address) === true) {
                (0, skynode_1.el)("button.update-button", "정보 수정", {
                    click: () => ViewUtil_1.default.go(`/pfp/${addr}/update`),
                }).appendTo(this.header);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    changeParams(params, uri) {
        this.load(params.addr);
    }
    close() {
        this.container.delete();
    }
}
exports.default = PageLayout;
PageLayout.rarities = {};
//# sourceMappingURL=PageLayout.js.map