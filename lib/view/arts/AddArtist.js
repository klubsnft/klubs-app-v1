"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const ArtistsContract_1 = __importDefault(require("../../contracts/ArtistsContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class AddArtist {
    constructor() {
        Layout_1.default.current.title = "Klubs Arts 작가 등록";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".add-artist-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "Klubs Arts 작가 등록"), (0, skynode_1.el)("p", "Klubs Arts 작가로 등록합니다.")), (0, skynode_1.el)("main", (0, skynode_1.el)("label", (0, skynode_1.el)("h6", "지갑 주소"), this.input = (0, skynode_1.el)("input", { placeholder: "지갑 주소", readonly: "readonly" })), (0, skynode_1.el)("button", "등록하기", {
            click: async () => {
                const address = await Wallet_1.default.loadAddress();
                if (address !== undefined) {
                    const added = await ArtistsContract_1.default.added(address);
                    if (added === true) {
                        new Alert_1.default("작가 등록 실패", "해당 지갑은 이미 작가로 등록되어있습니다.");
                    }
                    else {
                        await ArtistsContract_1.default.add();
                        setTimeout(() => {
                            new Alert_1.default("작가 등록 완료", "작가 등록이 완료되었습니다.\n작가들의 의견에 귀를 기울이겠습니다.\nKlubs에 오신 것을 환영합니다.");
                            ViewUtil_1.default.go("/arts/artists/update");
                        }, 2000);
                    }
                }
            },
        })))));
        this.loadAddress();
    }
    async loadAddress() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.input.domElement.value = address;
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = AddArtist;
//# sourceMappingURL=AddArtist.js.map