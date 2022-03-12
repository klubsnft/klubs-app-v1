import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import DiscordUserInfo from "../DiscordUserInfo";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";

export default class LinkWalletToDiscord implements View {

    private container: DomNode;

    public discordUser: DiscordUserInfo | undefined;

    constructor() {
        Layout.current.title = msg("HOME_TITLE");
        Layout.current.content.append(
            this.container = el(".link-wallet-to-discord-view",
                el("header",
                    el("h1", msg("HOLDER_CHECK_TITLE")),
                    el("h2", msg("HOLDER_CHECK_DESC"))
                ),
                el("article",
                    el("img", { src: "/images/logo.png" }),
                    el("a.discord-login-button", msg("HOLDER_CHECK_BUTTON"), {
                        href: `https://discord.com/api/oauth2/authorize?client_id=950261991921041408&redirect_uri=${encodeURIComponent("https://klu.bs/link-wallet-to-discord")}&response_type=code&scope=identify`,
                    }),
                ),
            ));
        this.checkDiscordLogin();
    }

    private async checkDiscordLogin() {

        let code: string | undefined = new URLSearchParams(window.location.search).get("code")!;
        if (code !== null) {
            try {
                await superagent.get("https://api.klu.bs/discord/token").query({
                    code,
                    redirect_uri: `${window.location.protocol}//${window.location.host}/link-wallet-to-discord`,
                });
            } catch (error) {
                console.error(error);
                code = undefined;
            }
        } else {
            code = undefined;
        }

        if (code !== undefined) {
            try {
                const result = await superagent.get("https://api.klu.bs/discord/me").query({ code });
                this.discordUser = result.body;
                this.checkWalletConnected(code);
            } catch (error) {
                console.error(error);
            }
        }
    }

    private async checkWalletConnected(code: string) {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const address = await Wallet.loadAddress();
        if (address !== undefined) {

            const message = "Link Wallet to Discord";
            const signResult = await Wallet.signMessage(message);

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
                    alert(msg("HOLDER_CHECK_SUCCESS_DESC"));
                } else {
                    alert(msg("HOLDER_CHECK_FAIL_DESC"));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
