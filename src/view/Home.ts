import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import PFPCard from "../component/PFPCard";
import PFPsContract from "../contracts/PFPsContract";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;
    private pfpLoading: DomNode;
    private pfpList: DomNode;

    constructor() {
        Layout.current.title = "Klaytn based NFT marketplace with MIX";
        Layout.current.content.append(
            (this.container = el(".home-view",
                el("header",
                    el("p", "Klubs는 클레이튼 기반 NFT 마켓플레이스입니다. MIX를 사용합니다."),
                    el("a", "Klubs 소개", {
                        href: "https://medium.com/klubs/klubs-klaytn-based-nft-marketplace-with-mix-2c93d3a9e014",
                        target: "_blank",
                    }),
                ),
                el(".content",
                    el(".slide",
                        el("h2", "PFP"),
                        this.pfpLoading = el(".loading", "Loading..."),
                        el(".pfp-list-container",
                            this.pfpList = el(".pfp-list"),
                        ),
                    ),
                    el(".slide",
                        el("h2", "Art"),
                        el("p", "Art는 출시 준비중입니다."),
                    ),
                ),
            )),
        );
        this.load();
    }

    private async load() {

        this.pfpList.empty();
        const count = await PFPsContract.getAddrCount();
        let realCount = 0;
        this.pfpList.style({ width: count.toNumber() * 316 });

        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);

        const promises: Promise<void>[] = [];
        for (const i of array) {
            const promise = async (index: number) => {
                const addr = await PFPsContract.addrs(index);
                const extras = await PFPsContract.extras(addr);
                if (extras.trim() !== "") {
                    realCount += 1;
                    let data: any = {};
                    try { data = JSON.parse(extras); } catch (e) { }
                    if (this.container.deleted !== true) {
                        new PFPCard(addr, data.banner, data.icon, data.name, data.description).appendTo(this.pfpList);
                    }
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (this.container.deleted !== true) {
            this.pfpList.style({ width: realCount * 316 });
            this.pfpLoading.delete();
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
