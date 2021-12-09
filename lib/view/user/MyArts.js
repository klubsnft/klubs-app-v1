"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ArtNFTCard_1 = __importDefault(require("../../component/ArtNFTCard"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const ArtsContract_1 = __importDefault(require("../../contracts/ArtsContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class MyArts {
    constructor() {
        Layout_1.default.current.title = "내 Arts";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".user-my-arts-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "내 Arts 정보")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 등록한 작품들"), this.artistArtsLoading = new Loading_1.default(), this.artistArtsList = (0, skynode_1.el)(".list"))));
        this.load();
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.loadArtistArts(address);
        }
    }
    async loadArtistArts(address) {
        this.artistArtsList.empty();
        const count = (await ArtsContract_1.default.artistArtCount(address)).toNumber();
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index) => {
                const id = await ArtsContract_1.default.artistArts(address, index);
                if (await ArtsContract_1.default.exists(id) === true && this.container.deleted !== true) {
                    new ArtNFTCard_1.default(id.toNumber()).appendTo(this.artistArtsList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        if (this.container.deleted !== true) {
            this.artistArtsLoading.delete();
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MyArts;
//# sourceMappingURL=MyArts.js.map