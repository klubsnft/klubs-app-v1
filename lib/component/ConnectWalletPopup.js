"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Klip_1 = __importDefault(require("../klaytn/Klip"));
class ConnectWalletPopup extends skynode_1.Popup {
    constructor(callback) {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".connect-wallet-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("CONNECT_WALLET")), (0, skynode_1.el)("p", (0, msg_js_1.default)("CONNECT_WALLET_DESC1")), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button.connect-kaikas-button", (0, skynode_1.el)("img", { src: "/images/icon/kaikas.svg" }), (0, msg_js_1.default)("INSTALL_KAIKAS"), { href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi", target: "_blank" }), (0, skynode_1.el)("button.connect-klip-button", (0, skynode_1.el)("img", { src: "/images/icon/klip.svg" }), (0, msg_js_1.default)("CONNECT_KLIPS"), {
            click: async () => {
                await Klip_1.default.connect();
                callback();
                this.delete();
            },
        }), (0, skynode_1.el)("button.button.cancel-button", (0, msg_js_1.default)("NOT_CONNECT_AROUND"), {
            click: () => this.delete(),
        }))));
    }
}
exports.default = ConnectWalletPopup;
//# sourceMappingURL=ConnectWalletPopup.js.map