import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Alert from "../../component/dialogue/Alert";
import ArtistsContract from "../../contracts/ArtistsContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class AddArtist implements View {

    private container: DomNode;
    private input: DomNode<HTMLInputElement>;

    constructor() {
        Layout.current.title = "Klubs Arts 작가 등록";
        Layout.current.content.append(
            (this.container = el(".add-artist-view",
                el("header",
                    el("h1", "Klubs Arts 작가 등록"),
                    el("p", "Klubs Arts 작가로 등록합니다."),
                ),
                el("main",
                    el("label",
                        el("h6", "지갑 주소"),
                        this.input = el("input", { placeholder: "지갑 주소", readonly: "readonly" }),
                    ),
                    el("button", "등록하기", {
                        click: async () => {
                            const address = await Wallet.loadAddress();
                            if (address !== undefined) {
                                const added = await ArtistsContract.added(address);
                                if (added === true) {
                                    new Alert("작가 등록 실패", "해당 지갑은 이미 작가로 등록되어있습니다.");
                                } else {
                                    await ArtistsContract.add();
                                    setTimeout(() => {
                                        new Alert("작가 등록 완료", "작가 등록이 완료되었습니다.\n작가들의 의견에 귀를 기울이겠습니다.\nKlubs에 오신 것을 환영합니다.");
                                        ViewUtil.go("/arts/artists/update");
                                    }, 2000);
                                }
                            }
                        },
                    }),
                ),
            )),
        );
        this.loadAddress();
    }

    private async loadAddress() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.input.domElement.value = address;
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
