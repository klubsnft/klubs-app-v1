import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class AddByMinter implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "Minter로부터 PFP 등록";
        Layout.current.content.append(this.container = el(".add-pfp-by-minter-view",
            el("h1", "Minter로부터 PFP 등록"),
            el("p", "반드시 KIP17Mintable을 상속한 PFP여야만 합니다. 그리고 등록자는 Minter중 하나여야 합니다."),
            el(".form",
                el("label",
                    el("span", "계약 주소"),
                    el("input", { placeholder: "계약 주소" }),
                ),
                el("a", "등록하기"),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
