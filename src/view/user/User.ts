import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class User implements View {

    private container: DomNode;

    constructor(params: ViewParams) {
        Layout.current.title = "유저 정보";
        Layout.current.content.append(this.container = el(".user-view",
            el("header",
                el("p",
                    "유저 정보"
                ),
            ),
            el("main",
                el("label",
                    el("h3", "지갑 주소"),
                    el("span", params.address),
                ),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
