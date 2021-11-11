import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import PFPCard from "../component/PFPCard";
import PFPsContract from "../contracts/PFPsContract";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class PFP implements View {

    private container: DomNode;
    private pfpList: DomNode;

    constructor() {
        Layout.current.title = "PFP Projects";
        Layout.current.content.append(
            this.container = el(".pfp-view",
                el("header.head",
                    el("p.slogan",
                        "PFP는 프로필 이미지 NFT로,\nNFT를 소유한 사람들 끼리 커뮤니티를 이루어 소통하는 목적을 띠고 있습니다."
                    ),
                    el("button.button-contained", "프로젝트 등록", {
                        click: () => ViewUtil.go("/pfp/add"),
                    })
                ),
                el(".content",
                    el("h6", "프로젝트 목록"),
                    this.pfpList = el("ul"),
                ),
            ),
        );
        this.load();
    }

    private async load() {
        const addrCount = await PFPsContract.getAddrCount();
        const promises: Promise<void>[] = [];
        for (let i = 0; i < addrCount.toNumber(); i += 1) {
            const promise = async (index: number) => {
                const addr = await PFPsContract.addrs(index);
                const extras = await PFPsContract.extras(addr);
                let data: any = {};
                try {
                    data = JSON.parse(extras);
                } catch (e) {
                    //ignore.
                }
                new PFPCard(
                    addr,
                    data.banner,
                    data.icon,
                    data.name,
                    data.description,
                ).appendTo(this.pfpList);
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
