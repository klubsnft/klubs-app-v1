import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import PFPCard from "../component/PFPCard";
import PFPsContract from "../contracts/PFPsContract";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class PFP implements View {

    private container: DomNode;
    private pfpLoading: DomNode;
    private pfpList: DomNode;

    constructor() {
        Layout.current.title = "PFP Projects";
        Layout.current.content.append(
            this.container = el(".pfp-view",
                el("header",
                    el("p",
                        "PFP는 프로필 이미지 NFT로,\nNFT를 소유한 사람들 끼리 커뮤니티를 이루어 소통하는 목적을 띠고 있습니다."
                    ),
                    el("a", "프로젝트 등록", {
                        click: () => ViewUtil.go("/pfp/add"),
                    }),
                ),
                el(".content",
                    el("h2", "프로젝트 목록"),
                    this.pfpLoading = el(".loading", "Loading..."),
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
                const extras = await PFPsContract.extras(addr);
                if (extras.trim() !== "") {
                    let data: any = {};
                    try { data = JSON.parse(extras); } catch (e) { }
                    new PFPCard(addr, data.banner, data.icon, data.name, data.description).appendTo(this.pfpList);
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
