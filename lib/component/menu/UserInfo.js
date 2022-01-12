"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Klip_1 = __importDefault(require("../../klaytn/Klip"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class UserInfo extends skynode_1.DomNode {
    constructor(mobile) {
        super(".user-menu");
        this.mobile = mobile;
        this.connectHandler = () => {
            this.loadAddress();
        };
        this.append(this.connectWalletButton = (0, skynode_1.el)("a.connect-wallet", (0, msg_js_1.default)("CONNECT_WALLET_BUTTON"), {
            click: () => Wallet_1.default.connect(),
        }), this.addressDisplay = (0, skynode_1.el)(".wallet-address"));
        this.addressDisplay.style({ display: "none" });
        Wallet_1.default.on("connect", this.connectHandler);
        this.loadAddress();
    }
    async loadAddress() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            if (this.connectWalletButton.deleted !== true) {
                this.connectWalletButton.delete();
            }
            this.addressDisplay.style({ display: "block" });
            this.addressDisplay.empty().appendText(CommonUtil_1.default.shortenAddress(address));
            (this.mobile === true ? this : this.addressDisplay).append((0, skynode_1.el)("ul", (0, skynode_1.el)("li", (0, skynode_1.el)("a", (0, msg_js_1.default)("MY_PFP_BUTTON"), {
                click: () => ViewUtil_1.default.go("/user/my-pfps"),
            })), (0, skynode_1.el)("li", (0, skynode_1.el)("a", (0, msg_js_1.default)("MY_ARTS_BUTTON"), {
                click: () => ViewUtil_1.default.go("/user/my-arts"),
            })), Klip_1.default.connected !== true ? undefined : (0, skynode_1.el)("li", (0, skynode_1.el)("a", (0, msg_js_1.default)("LOGOUT_BUTTON"), {
                click: () => Klip_1.default.disconnect(),
            }))));
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        super.delete();
    }
}
exports.default = UserInfo;
//# sourceMappingURL=UserInfo.js.map