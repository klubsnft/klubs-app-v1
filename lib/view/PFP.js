"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PFPCard_1 = __importDefault(require("../component/PFPCard"));
const PFPsContract_1 = __importDefault(require("../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class PFP {
    constructor() {
        Layout_1.default.current.title = "PFP Projects";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-view", (0, skynode_1.el)("header.head", (0, skynode_1.el)("p.slogan", "PFP는 프로필 이미지 NFT로,\nNFT를 소유한 사람들 끼리 커뮤니티를 이루어 소통하는 목적을 띠고 있습니다."), (0, skynode_1.el)("button.button-contained", "프로젝트 등록", {
            click: () => ViewUtil_1.default.go("/pfp/add"),
        })), (0, skynode_1.el)(".content", (0, skynode_1.el)("h6", "프로젝트 목록"), this.pfpList = (0, skynode_1.el)("ul"))));
        this.load();
    }
    async load() {
        const addrCount = await PFPsContract_1.default.getAddrCount();
        console.log(addrCount.toNumber());
        const promises = [];
        for (let i = 0; i < addrCount.toNumber(); i += 1) {
            const promise = async (index) => {
                const addr = await PFPsContract_1.default.addrs(index);
                const extras = await PFPsContract_1.default.extras(addr);
                const totalSupply = await PFPsContract_1.default.getTotalSupply(addr);
                console.log(totalSupply.toNumber());
                let data = {};
                try {
                    console.log(extras);
                    data = JSON.parse(extras);
                }
                catch (e) {
                }
                new PFPCard_1.default(addr, data.banner, data.icon, data.name, data.description).appendTo(this.pfpList);
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = PFP;
//# sourceMappingURL=PFP.js.map