import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Rankings implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "PFP 랭킹";
        Layout.current.content.append(
            (this.container = el(".pfp-ranking-view",
                el("header",
                    el("h1", "PFP 랭킹"),
                    el(".filter",
                        el("select",
                            el("option", "최근 24시간"),
                            el("option", "최근 7일"),
                            el("option", "최근 30일"),
                            el("option", "전체"),
                        ),
                    ),
                ),
                el("table",
                    el("thead",
                        el("tr",
                            el("td", "PFP", { colspan: 3 }),
                            el("td", "거래량"),
                            el("td", "24시간 %"),
                            el("td", "7일 %"),
                            el("td", "최저 가격"),
                            el("td", "소유자"),
                            el("td", "개수"),
                        ),
                    ),
                    el("tbody",
                        el("tr",
                            el("td", "1"),
                            // icon
                            el("td", el("img", {})),
                            el("td", "도지사운드클럽 메이트"),
                            el("td", "12345 MIX"),
                            el("td", "+39.21%"),
                            el("td", "+19.21%"),
                            el("td", "12 MIX"),
                            el("td", "4.1K"),
                            el("td", "10.0K"),
                        ),
                        el("tr",
                            el("td", "1"),
                            // icon
                            el("td", el("img", {})),
                            el("td", "도지사운드클럽 메이트"),
                            el("td", "12345 MIX"),
                            el("td", "+39.21%"),
                            el("td", "+19.21%"),
                            el("td", "12 MIX"),
                            el("td", "4.1K"),
                            el("td", "10.0K"),
                        ),
                    ),
                ),
                el(".pagination",
                    el(".prev", "1-100"),
                    el(".next", "101-200"),
                ),
            )),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
