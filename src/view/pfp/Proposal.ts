import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Proposal implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "등록을 기다리는 PFP 정보";
        Layout.current.content.append(this.container = el(".pfp-proposal-view",
            el("h1", "등록을 기다리는 PFP 정보"),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
