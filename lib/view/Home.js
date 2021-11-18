"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Loading_1 = __importDefault(require("../component/loading/Loading"));
const PFPCard_1 = __importDefault(require("../component/PFPCard"));
const PFPsContract_1 = __importDefault(require("../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("./Layout"));
class Home {
    constructor() {
        Layout_1.default.current.title = "Klaytn based NFT marketplace with MIX";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".home-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", "Klubs는 클레이튼 기반 NFT 마켓플레이스입니다. MIX를 사용합니다."), (0, skynode_1.el)("a", "Klubs 소개", {
            href: "https://medium.com/klubs/klubs-klaytn-based-nft-marketplace-with-mix-2c93d3a9e014",
            target: "_blank",
        })), (0, skynode_1.el)(".content", (0, skynode_1.el)(".slide", (0, skynode_1.el)("h2", "PFP"), this.pfpLoading = new Loading_1.default(), (0, skynode_1.el)(".pfp-list-container", this.pfpList = (0, skynode_1.el)(".pfp-list"))), (0, skynode_1.el)(".slide", (0, skynode_1.el)("h2", "Art"), (0, skynode_1.el)("p", "Art는 출시 준비중입니다."))))));
        this.load();
    }
    async load() {
        this.pfpList.empty();
        const count = await PFPsContract_1.default.getAddrCount();
        let realCount = 0;
        this.pfpList.style({ width: count.toNumber() * 316 });
        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);
        const promises = [];
        for (const i of array) {
            const promise = async (index) => {
                const addr = await PFPsContract_1.default.addrs(index);
                const extras = await PFPsContract_1.default.extras(addr);
                if (extras.trim() !== "") {
                    realCount += 1;
                    let data = {};
                    try {
                        data = JSON.parse(extras);
                    }
                    catch (e) { }
                    if (this.container.deleted !== true) {
                        new PFPCard_1.default(addr, data).appendTo(this.pfpList);
                    }
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        if (this.container.deleted !== true) {
            this.pfpList.style({ width: realCount * 316 });
            this.pfpLoading.delete();
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map