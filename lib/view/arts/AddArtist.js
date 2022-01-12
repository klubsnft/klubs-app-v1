"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const ArtistsContract_1 = __importDefault(require("../../contracts/ArtistsContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class AddArtist {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("ADD_KLUBS_ARTISTS_TITLE");
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".add-artist-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("ADD_KLUBS_ARTISTS_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("ADD_KLUBS_ARTISTS_DESCRIPTION"))), (0, skynode_1.el)("main", (0, skynode_1.el)("label", (0, skynode_1.el)("h6", (0, msg_js_1.default)("WALLET_ADDRESS")), this.input = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("WALLET_ADDRESS"), readonly: "readonly" })), (0, skynode_1.el)("button", (0, msg_js_1.default)("REGISTER_BUTTON"), {
            click: async () => {
                const address = await Wallet_1.default.loadAddress();
                if (address !== undefined) {
                    const added = await ArtistsContract_1.default.added(address);
                    if (added === true) {
                        new Alert_1.default((0, msg_js_1.default)("FAIL_ARTIST_REGISTER_TITLE"), (0, msg_js_1.default)("FAIL_ARTIST_REGISTER_DESCRIPTION"));
                    }
                    else {
                        await ArtistsContract_1.default.add();
                        setTimeout(() => {
                            new Alert_1.default((0, msg_js_1.default)("SUCCESS_ARTIST_REGISTER_TITLE"), (0, msg_js_1.default)("SUCCESS_ARTIST_REGISTER_DESCRIPTION"));
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