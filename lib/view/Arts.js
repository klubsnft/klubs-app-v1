"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Alert_1 = __importDefault(require("../component/dialogue/Alert"));
const ArtistsContract_1 = __importDefault(require("../contracts/ArtistsContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Arts {
    constructor() {
        Layout_1.default.current.title = "Arts";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".arts-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", "Klubs Arts는 NFT 작가들과 함께 만들어나가는 공간입니다."), this.controller = (0, skynode_1.el)(".controller")), (0, skynode_1.el)(".content", (0, skynode_1.el)("p", "Klubs Arts 작품 등록은 12월 9일에, 거래 기능은 12월 13일에 출시됩니다."))));
        this.load();
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const added = await ArtistsContract_1.default.added(address);
            if (added === true) {
                this.controller.append((0, skynode_1.el)("a", "작가 정보 수정", {
                    click: () => ViewUtil_1.default.go("/arts/artists/update"),
                }), (0, skynode_1.el)("a", "작품 등록", {
                    click: () => new Alert_1.default("작품 등록", "작품 등록은 12월 9일부터 시작됩니다. :)"),
                }));
            }
            else {
                this.controller.append((0, skynode_1.el)("a", "작가 등록", {
                    click: () => ViewUtil_1.default.go("/arts/artists/add"),
                }));
            }
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Arts;
//# sourceMappingURL=Arts.js.map