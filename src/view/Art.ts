import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Art implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "Art";
        Layout.current.content.append(this.container = el(".art-view",
            el(".title", "Art는 준비 중 입니다."),
            el(".subtitle", "2021년 11월 29일 오픈 예정입니다."),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
