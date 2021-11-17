import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class MyPFPs implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "내 PFP";
        Layout.current.content.append(this.container = el(".user-my-pfps-view",
            el("header", el("h1", "내 PFP 정보")),
            el("p", "내 PFP 정보는 곧 준비됩니다. :)"),
            /*el("section",
                el("h2", "내가 관리하는 PFP"),
            ),
            el("section",
                el("h2", "내가 판매중인 PFP"),
            ),
            el("section",
                el("h2", "내가 Offer를 건 PFP"),
            ),
            el("section",
                el("h2", "내 PFP 목록"),
            ),*/
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
