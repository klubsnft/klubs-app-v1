import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Add implements View {
    private container: DomNode;

    constructor() {
        Layout.current.title = "PFP 등록";
        Layout.current.content.append(
            (this.container = el(".add-pfp-view",
                el("header", el("h1.title", "PFP 프로젝트 등록")),
                el(".content",
                    el("ul",
                        el("li", { click: () => ViewUtil.go("/pfp/add-by-minter") },
                            el("p", "KIP17Mintable을 상속한 PFP 등록"),
                        ),
                        el("li", {
                            click: () => ViewUtil.go("/pfp/add-by-pfp-owner"),
                        },
                            el("p", "Ownable을 상속한 PFP 등록"),
                        ),
                        el("li", {
                            click: () => ViewUtil.go("/pfp/propose"),
                        },
                            el("p", "둘 다 상속하지 않은 PFP 등록"),
                        ),
                    ),
                ),
            )),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
