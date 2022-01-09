import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Layout from "../Layout";

export default class Me implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("MY_INFO");
        Layout.current.content.append(this.container = el(".user-me-view",

        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
