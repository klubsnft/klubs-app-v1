import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Alert from "../../component/dialogue/Alert";
import ArtistsContract from "../../contracts/ArtistsContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class AddArtist implements View {

    private container: DomNode;
    private input: DomNode<HTMLInputElement>;

    constructor() {
        Layout.current.title = msg("ADD_KLUBS_ARTISTS_TITLE");
        Layout.current.content.append(
            (this.container = el(".add-artist-view",
                el("header",
                    el("h1", msg("ADD_KLUBS_ARTISTS_TITLE")),
                    el("p", msg("ADD_KLUBS_ARTISTS_DESCRIPTION")),
                ),
                el("main",
                    el("label",
                        el("h6", msg("WALLET_ADDRESS")),
                        this.input = el("input", { placeholder: msg("WALLET_ADDRESS"), readonly: "readonly" }),
                    ),
                    el("button", msg("REGISTER_BUTTON"), {
                        click: async () => {
                            const address = await Wallet.loadAddress();
                            if (address !== undefined) {
                                const added = await ArtistsContract.added(address);
                                if (added === true) {
                                    new Alert(msg("FAIL_ARTIST_REGISTER_TITLE"), msg("FAIL_ARTIST_REGISTER_DESCRIPTION"));
                                } else {
                                    await ArtistsContract.add();
                                    setTimeout(() => {
                                        new Alert(msg("SUCCESS_ARTIST_REGISTER_TITLE"), msg("SUCCESS_ARTIST_REGISTER_DESCRIPTION"));
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
