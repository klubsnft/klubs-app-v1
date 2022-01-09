import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import ArtNFTCard from "../component/ArtNFTCard";
import Loading from "../component/loading/Loading";
import PFPCard from "../component/PFPCard";
import ArtsContract from "../contracts/ArtsContract";
import PFPsContract from "../contracts/PFPsContract";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Home implements View {

    private container: DomNode;
    private pfpLoading: DomNode;
    private pfpList: DomNode;
    private artsLoading: DomNode;
    private artsList: DomNode;

    constructor() {
        Layout.current.title = msg("HOME_TITLE");
        Layout.current.content.append(
            (this.container = el(".home-view",
                el("header",
                    el("p", msg("KLUBS_PRESENT2")),
                    el("a", msg("KLUBS_PRESENT1"), {
                        href: "https://medium.com/klubs/klubs-klaytn-based-nft-marketplace-with-mix-2c93d3a9e014",
                        target: "_blank",
                    }),
                ),
                el(".content",
                    el(".slide",
                        el("header",
                            el("h2", msg("PFP")),
                            el("a", msg("PFP_ALL"), { click: () => ViewUtil.go("/pfp") }),
                        ),
                        this.pfpLoading = new Loading(),
                        el(".pfp-list-container",
                            this.pfpList = el(".pfp-list"),
                        ),
                    ),
                    el(".slide",
                        el("header",
                            el("h2", msg("ARTS")),
                            el("a", msg("ARTS_ALL"), { click: () => ViewUtil.go("/arts") }),
                        ),
                        this.artsLoading = new Loading(),
                        el(".arts-list-container",
                            this.artsList = el(".arts-list"),
                        ),
                    ),
                ),
            )),
        );
        this.loadPFPs();
        this.loadArts();
    }

    private async loadPFPs() {

        this.pfpList.empty();
        const count = await PFPsContract.getAddrCount();
        let realCount = 0;
        this.pfpList.style({ width: 25 * 316 });

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
                            if (realCount < 25) {
                                new PFPCard(addr, data).appendTo(this.pfpList);
                                realCount += 1;
                            }
                        }
                    }
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (this.container.deleted !== true) {
            this.pfpLoading.delete();
        }
    }

    private async loadArts() {

        this.artsList.empty();
        this.artsList.style({ width: 25 * 216 });

        const totalSupply = (await ArtsContract.totalSupply()).toNumber();
        const ids = new Array(totalSupply).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);

        if (this.container.deleted !== true) {
            let count = 0;
            for (const id of ids) {
                new ArtNFTCard(id).appendTo(this.artsList);
                count += 1;
                if (count === 25) {
                    break;
                }
            }
            this.artsLoading.delete();
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
