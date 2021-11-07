import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Update implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "PFP 정보 수정";
        Layout.current.content.append(this.container = el(".pfp-update-view",

        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
