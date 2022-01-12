import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Layout from "../Layout";

export default class Proposal implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("WAITING_PFP_INFO_TITLE");
        Layout.current.content.append(this.container = el(".pfp-proposal-view",
            el("h1", msg("WAITING_PFP_INFO_TITLE")),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
