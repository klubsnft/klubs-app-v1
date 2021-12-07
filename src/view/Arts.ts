import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Alert from "../component/dialogue/Alert";
import ArtistsContract from "../contracts/ArtistsContract";
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
                el("p", "Klubs Arts 작품 등록은 12월 9일에, 거래 기능은 12월 13일에 출시됩니다."),
            ),
        ));
        this.load();
    }

    private async load() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const added = await ArtistsContract.added(address);
            if (added === true) {
                this.controller.append(
                    el("a", "작가 정보 수정", {
                        click: () => ViewUtil.go("/arts/artists/update"),
                    }),
                    el("a", "작품 등록", {
                        click: () => new Alert("작품 등록", "작품 등록은 12월 9일부터 시작됩니다. :)"),
                    }),
                );
            } else {
                this.controller.append(el("a", "작가 등록", {
                    click: () => ViewUtil.go("/arts/artists/add"),
                }));
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
