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
                el(".kollections",
                    el("h1", "KLUBS 👉 Kollections로 리브랜딩 및 기술 이전"),
                    el("p", `안녕하세요 KLUBS 디렉터 심영재입니다.
KLUBS는 DSC의 MIX 토큰을 사용한 NFT 거래소를 시작으로,
이후에는 다양한 프로젝트를 지원하기 위해 노력해왔습니다.

시장이 성숙함에 따라 많은 거래소가 출시되었고, 새로운 거래소들이 더 나은 UX와 사용자풀을 갖추게 됐습니다.
이러한 훌륭한 경쟁자들의 출현과, MIX 토큰의 가격 하락, NFT 시장 악화가 겹쳐, 현재 KLUBS 거래소의 경우 거래가 거의 이루어지지 않고 있습니다.

이제 KLUBS는 거래 기능을 종료하고 다양한 프로젝트를 지원하는 생태계에 기여하는 역할만을 남기고자, 브랜드를 교체하게 됐습니다.
거래 기능 종료일: 12월 19일

앞으로 KLUBS는 Kollections라는 이름으로 재탄생하게 되며,
국내의 다양한 NFT 콜렉션들을 서포트하는 비영리 프로젝트로 변경됩니다.

기존의 거래소 관련 코드와 기술은 DSC Label에 모두 이전합니다.
DSC Label에서는 MIX 토큰의 가치 재고에 많은 노력을 기울이고 있으며, 이후 MIX를 활용한 새로운 거래 시스템 또한 갖추게 될 예정입니다.

그동안 많은 관심과 사랑을 주셔서 감사드리며, 앞으로도 시장에 긍정적인 영향을 드릴 수 있도록 노력하겠습니다.

편안한 연말 보내시기 바랍니다.
감사합니다.

디렉터 심영재 드림`),
                ),
                el("header",
                    // el("p", msg("HOME_KLUBS_INTRO_DESCRIPTION")),
                    el("a", msg("HOME_KLUBS_INTRO_BUTTON"), {
                        href: "https://medium.com/klubs/klubs-klaytn-based-nft-marketplace-with-mix-2c93d3a9e014",
                        target: "_blank",
                    }),
                ),
                el(".content",
                    el(".slide",
                        el("header",
                            el("h2", msg("HOME_PFP")),
                            el("a", msg("HOME_PFP_ALL_BUTTON"), { click: () => ViewUtil.go("/pfp") }),
                        ),
                        this.pfpLoading = new Loading(),
                        el(".pfp-list-container",
                            this.pfpList = el(".pfp-list"),
                        ),
                    ),
                    el(".slide",
                        el("header",
                            el("h2", msg("HOME_ARTS")),
                            el("a", msg("HOME_ARTS_ALL_BUTTON"), { click: () => ViewUtil.go("/arts") }),
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
