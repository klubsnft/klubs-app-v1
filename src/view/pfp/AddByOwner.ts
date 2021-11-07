import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class AddByOwner implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "관리자 PFP 등록";
        Layout.current.content.append(this.container = el(".add-pfp-by-owner-view",
            el("h1", "관리자 PFP 등록"),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
