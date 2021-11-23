import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Rankings implements View {

    private container: DomNode;
    private list: DomNode;

    constructor() {
        Layout.current.title = "PFP 랭킹";
        Layout.current.content.append(
            (this.container = el(".pfp-ranking-view",
                el("header",
                    el("h1", "PFP 랭킹"),
                ),
                el("table",
                    el("thead",
                        el("tr",
                            el("td", "PFP", { colspan: "3" }),
                            el("td", "총 거래량"),
                            el("td", "30일 거래량"),
                            el("td", "7일 거래량"),
                            el("td", "24시간 거래량"),
                        ),
                    ),
                    this.list = el("tbody"),
                ),
                /*el("header",
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
                    el("a.prev", "<"),
                    el("a", "1"),
                    el("a", "2"),
                    el("a", "3"),
                    el("a", "4"),
                    el("a", "5"),
                    el("a.next", ">"),
                ),*/
            )),
        );
        this.load();
    }

    private async load() {
        const result = await superagent.get("https://api.klu.bs/v2/volumes");
        result.body.sort((a: any, b: any) => {
            return b.total - a.total;
        });
        for (const [index, info] of result.body.entries()) {
            if (await PFPsContract.banned(info.id) !== true) {
                const extras = await PFPsContract.extras(info.id);
                if (extras.trim() !== "") {
                    let data: any = {};
                    try { data = JSON.parse(extras); } catch (e) { }
                    if (this.container.deleted !== true) {

                        let src;
                        if (data.icon === undefined || data.icon.trim() === "") {
                            src = "/images/placeholder.svg";
                        } else {
                            src = data.icon;
                        }

                        this.list.append(
                            el("tr",
                                el("td", String(index + 1)),
                                el("td", el("img", { src, height: "40" })),
                                el("td", el("a", data.name, { click: () => ViewUtil.go(`/pfp/${info.id}`) })),
                                el("td", CommonUtil.numberWithCommas(String(info.total)), " MIX"),
                                el("td", CommonUtil.numberWithCommas(String(info.volume30d)), " MIX"),
                                el("td", CommonUtil.numberWithCommas(String(info.volume7d)), " MIX"),
                                el("td", CommonUtil.numberWithCommas(String(info.volume24h)), " MIX"),
                            ),
                        );
                    }
                }
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
