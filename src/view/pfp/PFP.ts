import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Loading from "../../component/loading/Loading";
import PFPCard from "../../component/PFPCard";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class PFP implements View {

    private container: DomNode;
    private pfpLoading: DomNode;
    private pfpList: DomNode;

    constructor() {
        Layout.current.title = msg("PFP_PROJECTS_TITLE");
        Layout.current.content.append(
            this.container = el(".pfp-view",
                el("header",
                    el("p",
                        // msg("PFP_PROJECTS_DESCRIPTION")
                    ),
                    el("a", msg("PFP_PROJECT_ADD_BUTTON"), {
                        click: () => ViewUtil.go("/pfp/add"),
                    }),
                ),
                el(".content",
                    el("h2", msg("PFP_PROJECT_LIST")),
                    this.pfpLoading = new Loading(),
                    this.pfpList = el(".pfp-list"),
                ),
            ),
        );
        this.load();
    }

    private async load() {

        this.pfpList.empty();
        const count = await PFPsContract.getAddrCount();

        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);

        const promises: Promise<void>[] = [];
        for (const i of array) {
            const promise = async (index: number) => {
                const addr = await PFPsContract.addrs(index);
                if (await PFPsContract.banned(addr) !== true) {
                    const extras = await PFPsContract.extras(addr);
                    if (extras.trim() !== "") {
                        let data: any = {};
                        try { data = JSON.parse(extras); } catch (e) { }
                        if (data.name !== "" && data.hiding !== true && this.container.deleted !== true) {
                            new PFPCard(addr, data).appendTo(this.pfpList);
                        }
                    }
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        this.pfpLoading.delete();
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
