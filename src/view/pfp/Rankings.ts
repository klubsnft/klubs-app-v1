import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import Loading from "../../component/loading/Loading";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Rankings implements View {

    private container: DomNode;

    private loading: DomNode;
    private list: DomNode;

    constructor() {
        Layout.current.title = msg("PFP_RANKING");
        Layout.current.content.append(
            (this.container = el(".pfp-ranking-view",
                el("header",
                    el("h1", msg("PFP_RANKING")),
                    el("span", msg("PFP_RANKIN_DESC1"))
                ),
                el("table",
                    el("thead",
                        el("tr",
                            el("td", "PFP", { colspan: "3" }),
                            el("td", msg("TOTAL_TRADING_VOLUME")),
                            el("td.mobile", msg("30DAYS_TRADING_VOLUME")),
                            el("td.mobile", msg("7DAYS_TRADING_VOLUME")),
                            el("td.mobile", msg("24HOURS_TRADING_VOLUME")),
                        ),
                    ),
                    this.list = el("tbody"),
                ),
                this.loading = new Loading(),
            )),
        );
        this.load();
    }

    private async load() {

        const result = await superagent.get("https://api.klu.bs/v2/volumes");
        result.body.sort((a: any, b: any) => {
            return b.total - a.total;
        });

        const promises: Promise<void>[] = [];
        for (const [index, _info] of result.body.entries()) {
            const promise = async (index: number, info: any) => {
                const tr = el("tr").appendTo(this.list);
                if (await PFPsContract.banned(info.id) !== true) {
                    const extras = await PFPsContract.extras(info.id);
                    if (extras.trim() !== "") {
                        let data: any = {};
                        try { data = JSON.parse(extras); } catch (e) { }
                        if (data.name !== "" && data.hiding !== true && this.container.deleted !== true) {

                            let src;
                            if (data.icon === undefined || data.icon.trim() === "") {
                                src = "/images/placeholder.svg";
                            } else {
                                src = data.icon;
                            }

                            tr.append(
                                el("td", String(index + 1)),
                                el("td", el("img", { src, height: "40" })),
                                el("td", el("a", data.name, { click: () => ViewUtil.go(`/pfp/${info.id}`) })),
                                el("td", CommonUtil.numberWithCommas(String(info.total)), " MIX"),
                                el("td.mobile", CommonUtil.numberWithCommas(String(info.volume30d)), " MIX"),
                                el("td.mobile", CommonUtil.numberWithCommas(String(info.volume7d)), " MIX"),
                                el("td.mobile", CommonUtil.numberWithCommas(String(info.volume24h)), " MIX"),
                            );
                        }
                    }
                } else {
                    tr.delete();
                }
            };
            promises.push(promise(index, _info));
        }
        await Promise.all(promises);

        this.loading.delete();
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
