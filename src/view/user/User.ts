import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Layout from "../Layout";

export default class User implements View {

    private container: DomNode;

    constructor(params: ViewParams) {
        Layout.current.title = msg("USER_INFO");
        Layout.current.content.append(this.container = el(".user-view",
            el("header",
                el("p",
                    msg("USER_INFO")
                ),
            ),
            el("main",
                el("label",
                    el("h3", msg("WALLET_ADDRESS")),
                    el("span", params.address),
                ),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
