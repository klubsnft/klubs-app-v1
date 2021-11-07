import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Add implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "PFP 등록";
        Layout.current.content.append(this.container = el(".add-pfp-view",
            el("a", "KIP17Mintable을 상속한 PFP 등록", { click: () => ViewUtil.go("/pfp/add-by-minter") }),
            el("a", "Ownable을 상속한 PFP 등록", { click: () => ViewUtil.go("/pfp/add-by-pfp-owner") }),
            el("a", "둘 다 상속하지 않은 PFP 등록", { click: () => ViewUtil.go("/pfp/propose") }),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}