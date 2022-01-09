import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Layout from "../Layout";

export default class AddByOwner implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("ADD_MANAGER_PFP");
        Layout.current.content.append(this.container = el(".add-pfp-by-owner-view",
            el("h1", msg("ADD_MANAGER_PFP")),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
