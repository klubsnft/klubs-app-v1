import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class MyPFPs implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "내 PFP";
        Layout.current.content.append(this.container = el(".user-my-pfps-view",

        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
