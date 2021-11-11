"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        this.connectHandler = () => {
            this.loadAddress();
        };
        Layout.current = this;
        skynode_1.BodyNode.append((this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header.navbar", (0, skynode_1.el)("a", (0, skynode_1.el)(".logo", "Klubs"), { click: () => ViewUtil_1.default.go("/") }), (0, skynode_1.el)(".menu", (0, skynode_1.el)("a.menu-item", "PFP", { click: () => ViewUtil_1.default.go("/pfp") }), (0, skynode_1.el)("a.menu-item", "Art", { click: () => ViewUtil_1.default.go("/art") }), this.connectWalletButton = (0, skynode_1.el)("button.connect-wallet", "CONNECT WALLET", {
            click: () => Wallet_1.default.connect(),
        }), this.addressDisplay = (0, skynode_1.el)(".wallet-address"))), (0, skynode_1.el)("main", (this.content = (0, skynode_1.el)(".content"))), (0, skynode_1.el)("footer", "Copyright © 2021 Klubs. All rights reserved."))));
        Wallet_1.default.on("connect", this.connectHandler);
        this.addressDisplay.style({ display: "none" });
    }
    async loadAddress() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            if (this.connectWalletButton.deleted !== true) {
                this.connectWalletButton.delete();
            }
            this.addressDisplay.style({ display: "block" });
            this.addressDisplay.empty().appendText(CommonUtil_1.default.shortenAddress(address));
        }
    }
    set title(title) {
        document.title = `Klubs - ${title}`;
    }
    changeParams(params, uri) { }
    close() {
        Wallet_1.default.off("connect", this.connectHandler);
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map