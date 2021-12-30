"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Confirm_1 = __importDefault(require("../../../component/dialogue/Confirm"));
const ArtistsContract_1 = __importDefault(require("../../../contracts/ArtistsContract"));
const ArtsContract_1 = __importDefault(require("../../../contracts/ArtsContract"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../../Layout"));
const ViewUtil_1 = __importDefault(require("../../ViewUtil"));
class PageLayout {
    constructor() {
        this.connectHandler = () => {
            this.load();
        };
        PageLayout.current = this;
        Layout_1.default.current.title = "Klubs Arts";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".arts-page-layout", (0, skynode_1.el)("header", (0, skynode_1.el)("p", "Klubs Arts는 NFT 작가들과 함께 만들어나가는 공간입니다."), this.controller = (0, skynode_1.el)(".controller")), this.content = (0, skynode_1.el)("main")));
        this.load();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const added = await ArtistsContract_1.default.added(address);
            if (added === true) {
                this.controller.empty().append((0, skynode_1.el)("a", "작가 정보 수정", {
                    click: () => ViewUtil_1.default.go("/arts/artists/update"),
                }), (0, skynode_1.el)("a", "작품 등록", {
                    click: async () => {
                        new Confirm_1.default("작품 등록", "작품 정보를 생성하시겠습니까?", "생성하기", async () => {
                            await ArtsContract_1.default.mint();
                            const artCount = await ArtsContract_1.default.artistArtCount(address);
                            const id = await ArtsContract_1.default.artistArts(address, artCount.toNumber() - 1);
                            ViewUtil_1.default.go(`/arts/${id}/update`);
                        });
                    },
                }));
            }
            else {
                this.controller.empty().append((0, skynode_1.el)("a", "작가 등록", {
                    click: () => ViewUtil_1.default.go("/arts/artists/add"),
                }));
            }
        }
    }
    changeParams(params, uri) { }
    close() {
        Wallet_1.default.off("connect", this.connectHandler);
        this.container.delete();
    }
}
exports.default = PageLayout;
//# sourceMappingURL=PageLayout.js.map