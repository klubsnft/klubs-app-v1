"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const ArtNFTCard_1 = __importDefault(require("../component/ArtNFTCard"));
const Loading_1 = __importDefault(require("../component/loading/Loading"));
const PFPCard_1 = __importDefault(require("../component/PFPCard"));
const ArtsContract_1 = __importDefault(require("../contracts/ArtsContract"));
const PFPsContract_1 = __importDefault(require("../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Home {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("HOME_TITLE");
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".home-view", (0, skynode_1.el)(".kollections", (0, skynode_1.el)("h1", "KLUBS 👉 Kollections로 리브랜딩 및 기술 이전"), (0, skynode_1.el)("p", `안녕하세요 KLUBS 디렉터 심영재입니다.
KLUBS는 DSC의 MIX 토큰을 사용한 NFT 거래소를 시작으로,
이후에는 다양한 프로젝트를 지원하기 위해 노력해왔습니다.

시장이 성숙함에 따라 많은 거래소가 출시되었고, 새로운 거래소들이 더 나은 UX와 사용자풀을 갖추게 됐습니다.
이러한 훌륭한 경쟁자들의 출현과, MIX 토큰의 가격 하락, NFT 시장 악화가 겹쳐, 현재 KLUBS 거래소의 경우 거래가 거의 이루어지지 않고 있습니다.

이제 KLUBS는 거래 기능을 종료하고 다양한 프로젝트를 지원하는 생태계에 기여하는 역할만을 남기고자, 브랜드를 교체하게 됐습니다.
거래 기능 종료일: 12월 19일

앞으로 KLUBS는 Kollections라는 이름으로 재탄생하게 되며,
국내의 다양한 NFT 콜렉션들을 서포트하는 비영리 프로젝트로 변경됩니다.

기존의 거래소 관련 코드와 기술은 DSC Label에 모두 이전합니다.
DSC Label에서는 MIX 토큰의 가치 재고에 많은 노력을 기울이고 있으며, 이후 MIX를 활용한 새로운 거래 시스템 또한 갖추게 될 예정입니다.

그동안 많은 관심과 사랑을 주셔서 감사드리며, 앞으로도 시장에 긍정적인 영향을 드릴 수 있도록 노력하겠습니다.

편안한 연말 보내시기 바랍니다.
감사합니다.

디렉터 심영재 드림`)), (0, skynode_1.el)("header", (0, skynode_1.el)("a", (0, msg_js_1.default)("HOME_KLUBS_INTRO_BUTTON"), {
            href: "https://medium.com/klubs/klubs-klaytn-based-nft-marketplace-with-mix-2c93d3a9e014",
            target: "_blank",
        })), (0, skynode_1.el)(".content", (0, skynode_1.el)(".slide", (0, skynode_1.el)("header", (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOME_PFP")), (0, skynode_1.el)("a", (0, msg_js_1.default)("HOME_PFP_ALL_BUTTON"), { click: () => ViewUtil_1.default.go("/pfp") })), this.pfpLoading = new Loading_1.default(), (0, skynode_1.el)(".pfp-list-container", this.pfpList = (0, skynode_1.el)(".pfp-list"))), (0, skynode_1.el)(".slide", (0, skynode_1.el)("header", (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOME_ARTS")), (0, skynode_1.el)("a", (0, msg_js_1.default)("HOME_ARTS_ALL_BUTTON"), { click: () => ViewUtil_1.default.go("/arts") })), this.artsLoading = new Loading_1.default(), (0, skynode_1.el)(".arts-list-container", this.artsList = (0, skynode_1.el)(".arts-list")))))));
        this.loadPFPs();
        this.loadArts();
    }
    async loadPFPs() {
        this.pfpList.empty();
        const count = await PFPsContract_1.default.getAddrCount();
        let realCount = 0;
        this.pfpList.style({ width: 25 * 316 });
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
                            if (realCount < 25) {
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
        this.artsList.style({ width: 25 * 216 });
        const totalSupply = (await ArtsContract_1.default.totalSupply()).toNumber();
        const ids = new Array(totalSupply).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);
        if (this.container.deleted !== true) {
            let count = 0;
            for (const id of ids) {
                new ArtNFTCard_1.default(id).appendTo(this.artsList);
                count += 1;
                if (count === 25) {
                    break;
                }
            }
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