"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ArtNFTCard_1 = __importDefault(require("../component/ArtNFTCard"));
const Loading_1 = __importDefault(require("../component/loading/Loading"));
const PFPCard_1 = __importDefault(require("../component/PFPCard"));
const ArtsContract_1 = __importDefault(require("../contracts/ArtsContract"));
const PFPsContract_1 = __importDefault(require("../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Home {
    constructor() {
        Layout_1.default.current.title = "Klaytn based NFT marketplace with MIX";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".home-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", "Klubs는 클레이튼 기반 NFT 마켓플레이스입니다. 100% On-Chain으로 구동되며 MIX를 사용합니다."), (0, skynode_1.el)("a", "Klubs 소개", {
            href: "https://medium.com/klubs/klubs-klaytn-based-nft-marketplace-with-mix-2c93d3a9e014",
            target: "_blank",
        })), (0, skynode_1.el)(".content", (0, skynode_1.el)(".slide", (0, skynode_1.el)("header", (0, skynode_1.el)("h2", "PFP"), (0, skynode_1.el)("a", "PFP 전체 보기", { click: () => ViewUtil_1.default.go("/pfp") })), this.pfpLoading = new Loading_1.default(), (0, skynode_1.el)(".pfp-list-container", this.pfpList = (0, skynode_1.el)(".pfp-list"))), (0, skynode_1.el)(".slide", (0, skynode_1.el)("header", (0, skynode_1.el)("h2", "Arts"), (0, skynode_1.el)("a", "Arts 전체 보기", { click: () => ViewUtil_1.default.go("/arts") })), this.artsLoading = new Loading_1.default(), (0, skynode_1.el)(".arts-list-container", this.artsList = (0, skynode_1.el)(".arts-list")))))));
        this.loadPFPs();
        this.loadArts();
    }
    async loadPFPs() {
        this.pfpList.empty();
        const count = await PFPsContract_1.default.getAddrCount();
        let realCount = 0;
        this.pfpList.style({ width: 100 * 316 });
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
                            if (realCount < 100) {
                                new PFPCard_1.default(addr, data).appendTo(this.pfpList);
                                realCount += 1;
                            }
                        }
                    }
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        if (this.container.deleted !== true) {
            this.pfpLoading.delete();
        }
    }
    async loadArts() {
        this.artsList.empty();
        this.artsList.style({ width: 50 * 216 });
        const totalSupply = (await ArtsContract_1.default.totalSupply()).toNumber();
        const ids = new Array(totalSupply).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);
        let count = 0;
        for (const id of ids) {
            new ArtNFTCard_1.default(id).appendTo(this.artsList);
            count += 1;
            if (count === 50) {
                break;
            }
        }
        if (this.container.deleted !== true) {
            this.artsLoading.delete();
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map