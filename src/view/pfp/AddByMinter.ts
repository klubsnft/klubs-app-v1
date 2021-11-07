import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class AddByMinter implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "Minter로부터 PFP 등록";
        Layout.current.content.append(this.container = el(".add-pfp-by-minter-view",

        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}