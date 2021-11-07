import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Propose implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "PFP 등록하기";
        Layout.current.content.append(this.container = el(".pfp-propose-view",

        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
