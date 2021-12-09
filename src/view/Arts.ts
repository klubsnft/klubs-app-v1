import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Confirm from "../component/dialogue/Confirm";
import ArtistsContract from "../contracts/ArtistsContract";
import ArtsContract from "../contracts/ArtsContract";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Arts implements View {

    private container: DomNode;
    private controller: DomNode;

    constructor() {
        Layout.current.title = "Arts";
        Layout.current.content.append(this.container = el(".arts-view",
            el("header",
                el("p",
                    "Klubs Arts는 NFT 작가들과 함께 만들어나가는 공간입니다."
                ),
                this.controller = el(".controller"),
            ),
            el(".content",
                el("p", "Klubs Arts 거래 기능은 12월 13일에 출시됩니다."),
            ),
        ));
        this.load();
        Wallet.on("connect", this.connectHandler);
    }

    private connectHandler = () => {
        this.load();
    };

    private async load() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const added = await ArtistsContract.added(address);
            if (added === true) {
                this.controller.empty().append(
                    el("a", "작가 정보 수정", {
                        click: () => ViewUtil.go("/arts/artists/update"),
                    }),
                    el("a", "작품 등록", {
                        click: async () => {
                            new Confirm("작품 등록", "작품 정보를 생성하시겠습니까?", "생성하기", async () => {
                                await ArtsContract.mint();
                                const artCount = await ArtsContract.artistArtCount(address);
                                const id = await ArtsContract.artistArts(address, artCount.toNumber() - 1);
                                ViewUtil.go(`/arts/${id}/update`);
                            });
                        },
                    }),
                );
            } else {
                this.controller.empty().append(el("a", "작가 등록", {
                    click: () => ViewUtil.go("/arts/artists/add"),
                }));
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        Wallet.off("connect", this.connectHandler);
        this.container.delete();
    }
}
