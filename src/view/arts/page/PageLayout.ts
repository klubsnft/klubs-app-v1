import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Confirm from "../../../component/dialogue/Confirm";
import ArtistsContract from "../../../contracts/ArtistsContract";
import ArtsContract from "../../../contracts/ArtsContract";
import Wallet from "../../../klaytn/Wallet";
import Layout from "../../Layout";
import ViewUtil from "../../ViewUtil";

export default class PageLayout implements View {

    public static current: PageLayout;

    private container: DomNode;
    private controller: DomNode;
    public content: DomNode;

    constructor() {
        PageLayout.current = this;
        Layout.current.title = "Klubs Arts";
        Layout.current.content.append(this.container = el(".arts-page-layout",
            el("header",
                el("p",
                    msg("ARTS_DESC1")
                ),
                this.controller = el(".controller"),
            ),
            this.content = el("main"),
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
                    el("a", msg("REVISION_ARTIST"), {
                        click: () => ViewUtil.go("/arts/artists/update"),
                    }),
                    el("a", msg("ADD_ART"), {
                        click: async () => {
                            new Confirm(msg("ADD_ART"), msg("ADD_ART_CONFIRM"), msg("CREATE_IT"), async () => {
                                await ArtsContract.mint();
                                const artCount = await ArtsContract.artistArtCount(address);
                                const id = await ArtsContract.artistArts(address, artCount.toNumber() - 1);
                                ViewUtil.go(`/arts/${id}/update`);
                            });
                        },
                    }),
                );
            } else {
                this.controller.empty().append(el("a", msg("ADD_CREATOR"), {
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
