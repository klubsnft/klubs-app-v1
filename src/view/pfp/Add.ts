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
                el("header", el("h1", "PFP 프로젝트 등록")),
                el("main",
                    el("section",
                        { click: () => ViewUtil.go("/pfp/add-by-minter") },
                        el("h2", "KIP17Mintable을 상속한 PFP 등록"),
                        el("p",
                            "KIP17Mintable를 상속한 PFP 프로젝트인 경우에 선택하는 메뉴입니다.",
                        ),
                    ),
                    el("section",
                        { click: () => ViewUtil.go("/pfp/add-by-pfp-owner") },
                        el("h2", "Ownable을 상속한 PFP 등록"),
                        el("p",
                            "Ownable을 상속한 PFP 프로젝트인 경우에 선택하는 메뉴입니다.",
                        ),
                    ),
                    el("section",
                        { click: () => ViewUtil.go("/pfp/propose") },
                        el("h2", "둘 다 상속하지 않은 PFP 등록"),
                        el("p",
                            "KIP17Mintable나 Ownable을 상속하지 않은 경우에 선택하는 메뉴입니다. 만약 둘 중 하나라도 상속을 했다면 다른 메뉴를 선택해주시기 바랍니다.",
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
