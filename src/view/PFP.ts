import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class PFP implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "PFP Projects";
        Layout.current.content.append(this.container = el(".pfp-view",

        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
