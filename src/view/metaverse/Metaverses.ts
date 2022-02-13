import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Loading from "../../component/loading/Loading";
import MetaverseCard from "../../component/MetaverseCard";
import MetaversesContract from "../../contracts/MetaversesContract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Metaverses implements View {

    private container: DomNode;
    private metaverseLoading: DomNode;
    private metaverseList: DomNode;

    constructor() {
        Layout.current.title = msg("METAVERSES_TITLE");
        Layout.current.content.append(
            this.container = el(".metaverses-view",
                el("header",
                    el("p",
                        msg("METAVERSES_DESCRIPTION")
                    ),
                    el("a", msg("METAVERSES_ADD_BUTTON"), {
                        click: () => ViewUtil.go("/metaverse/add"),
                    }),
                ),
                el(".content",
                    el("h2", msg("METAVERSE_LIST")),
                    this.metaverseLoading = new Loading(),
                    this.metaverseList = el(".metaverse-list"),
                ),
            ),
        );
        this.load();
    }

    private async load() {

        this.metaverseList.empty();
        const count = await MetaversesContract.getMetaverseCount();

        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);

        const promises: Promise<void>[] = [];
        for (const i of array) {
            const promise = async (id: number) => {
                if (await MetaversesContract.banned(id) !== true) {
                    const extras = await MetaversesContract.extras(id);
                    if (extras.trim() !== "") {
                        let data: any = {};
                        try { data = JSON.parse(extras); } catch (e) { }
                        if (data.name !== "" && data.hiding !== true && this.container.deleted !== true) {
                            new MetaverseCard(id, data).appendTo(this.metaverseList);
                        }
                    }
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        this.metaverseLoading.delete();
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
