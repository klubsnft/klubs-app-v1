"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const superagent_1 = __importDefault(require("superagent"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class LinkWalletToDiscord {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("HOME_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".link-wallet-to-discord-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("HOLDER_CHECK_TITLE")), (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOLDER_CHECK_DESC"))), (0, skynode_1.el)("article", (0, skynode_1.el)("img", { src: "/images/logo.png" }), (0, skynode_1.el)("a.discord-login-button", (0, msg_js_1.default)("HOLDER_CHECK_BUTTON"), {
            href: `https://discord.com/api/oauth2/authorize?client_id=950261991921041408&redirect_uri=${encodeURIComponent("https://klu.bs/link-wallet-to-discord")}&response_type=code&scope=identify`,
        }))));
        this.checkDiscordLogin();
    }
    async checkDiscordLogin() {
        let code = new URLSearchParams(window.location.search).get("code");
        if (code !== null) {
            try {
                await superagent_1.default.get("https://api.klu.bs/discord/token").query({
                    code,
                    redirect_uri: `${window.location.protocol}//${window.location.host}/link-wallet-to-discord`,
                });
            }
            catch (error) {
                console.error(error);
                code = undefined;
            }
        }
        else {
            code = undefined;
        }
        if (code !== undefined) {
            try {
                const result = await superagent_1.default.get("https://api.klu.bs/discord/me").query({ code });
                this.discordUser = result.body;
                this.checkWalletConnected(code);
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    async checkWalletConnected(code) {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const message = "Link Wallet to Discord";
            const signResult = await Wallet_1.default.signMessage(message);
            try {
                const result = await fetch("https://api.klu.bs/link-wallet-to-discord", {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage: signResult.signedMessage,
                        klipAddress: signResult.klipAddress,
                        address,
                    }),
                });
                if ((await result.json()).linked === true) {
                    alert((0, msg_js_1.default)("HOLDER_CHECK_SUCCESS_DESC"));
                }
                else {
                    alert((0, msg_js_1.default)("HOLDER_CHECK_FAIL_DESC"));
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = LinkWalletToDiscord;
//# sourceMappingURL=LinkWalletToDiscord.js.map