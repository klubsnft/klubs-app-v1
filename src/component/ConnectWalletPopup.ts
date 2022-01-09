import { DomNode, el, Popup } from "@hanul/skynode";
import msg from "msg.js";
import Klip from "../klaytn/Klip";

export default class ConnectWalletPopup extends Popup {

    public content: DomNode;

    constructor(callback: () => void) {
        super(".popup-background");
        this.append(
            this.content = el(".connect-wallet-popup",
                el("h2", msg("CONNECT_WALLET")),
                el("p", msg("CONNECT_WALLET_DESC1")),
                el(".button-container",
                    el("button.connect-kaikas-button",
                        el("img", { src: "/images/icon/kaikas.svg" }),
                        msg("INSTALL_KAIKAS"),
                        { href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi", target: "_blank" },
                    ),
                    el("button.connect-klip-button",
                        el("img", { src: "/images/icon/klip.svg" }),
                        msg("CONNECT_KLIPS"),
                        {
                            click: async () => {
                                await Klip.connect();
                                callback();
                                this.delete();
                            },
                        },
                    ),
                    el("button.button.cancel-button", msg("NOT_CONNECT_AROUND"), {
                        click: () => this.delete(),
                    }),
                ),
            ),
        );
    }
}
