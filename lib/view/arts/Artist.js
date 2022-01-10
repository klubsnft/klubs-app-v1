"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const ArtNFTCard_1 = __importDefault(require("../../component/ArtNFTCard"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const ArtistsContract_1 = __importDefault(require("../../contracts/ArtistsContract"));
const ArtsContract_1 = __importDefault(require("../../contracts/ArtsContract"));
const Layout_1 = __importDefault(require("../Layout"));
class Artist {
    constructor(params) {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".artist-view"));
        this.load(params.address);
    }
    async load(address) {
        const extras = await ArtistsContract_1.default.extras(address);
        let data = {};
        try {
            data = JSON.parse(extras);
        }
        catch (e) {
            console.log(e);
        }
        const artistName = data.name !== undefined ? data.name : CommonUtil_1.default.shortenAddress(address);
        Layout_1.default.current.title = artistName;
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".artist-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("ARTIST")), (0, skynode_1.el)("p", artistName)), (0, skynode_1.el)(".content", (0, skynode_1.el)("h2", (0, msg_js_1.default)("ARTIST_ART_LIST")), (0, skynode_1.el)(".list-container", this.nftLoading = new Loading_1.default(), this.nftList = (0, skynode_1.el)(".list")))));
        this.nftLoading.show();
        this.nftList.empty();
        const ids = [];
        const totalSupply = (await ArtsContract_1.default.artistArtCount(address)).toNumber();
        const promises = [];
        for (let i = 0; i < totalSupply; i += 1) {
            const promise = async (index) => {
                try {
                    const id = (await ArtsContract_1.default.artistArts(address, index)).toNumber();
                    ids.push(id);
                }
                catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        for (const id of ids) {
            new ArtNFTCard_1.default(id).appendTo(this.nftList);
        }
        this.nftLoading.hide();
    }
    changeParams(params, uri) {
        this.load(params.address);
    }
    close() {
        this.container.delete();
    }
}
exports.default = Artist;
//# sourceMappingURL=Artist.js.map