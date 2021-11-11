import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../CommonUtil";
import Wallet from "../klaytn/Wallet";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {
    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    private connectWalletButton: DomNode;
    private addressDisplay: DomNode;

    constructor() {
        Layout.current = this;
        BodyNode.append(
            (this.container = el(".layout",
                el("header.navbar",
                    el("a", el(".logo", el("img", { src: "/images/logo.png", height: "34" })), { click: () => ViewUtil.go("/") }),
                    el(".menu",
                        el("a.menu-item", "PFP", { click: () => ViewUtil.go("/pfp") }),
                        el("a.menu-item", "Art", { click: () => ViewUtil.go("/art") }),
                        this.connectWalletButton = el("button.connect-wallet", "CONNECT WALLET", {
                            click: () => Wallet.connect(),
                        }),
                        this.addressDisplay = el(".wallet-address")
                    ),
                ),
                el("main", (this.content = el(".content"))),
                el("footer", "Copyright © 2021 Klubs. All rights reserved.")
            ))
        );
        Wallet.on("connect", this.connectHandler);
        this.addressDisplay.style({ display: "none" });
    }

    private connectHandler = () => {
        this.loadAddress();
    };

    private async loadAddress() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            if (this.connectWalletButton.deleted !== true) {
                this.connectWalletButton.delete();
            }
            this.addressDisplay.style({ display: "block" });
            this.addressDisplay.empty().appendText(CommonUtil.shortenAddress(address));
        }
    }

    public set title(title: string) {
        document.title = `Klubs - ${title}`;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        Wallet.off("connect", this.connectHandler);
        this.container.delete();
    }
}
