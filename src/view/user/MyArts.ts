import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import ArtNFTCard from "../../component/ArtNFTCard";
import Loading from "../../component/loading/Loading";
import ArtsContract from "../../contracts/ArtsContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";

export default class MyArts implements View {

    private container: DomNode;

    private artistArtsLoading: Loading;
    private artistArtsList: DomNode;

    constructor() {
        Layout.current.title = "내 Arts";
        Layout.current.content.append(this.container = el(".user-my-arts-view",
            el("header", el("h1", "내 Arts 정보")),
            el("section",
                el("h2", "내가 등록한 작품들"),
                this.artistArtsLoading = new Loading(),
                this.artistArtsList = el(".list"),
            ),
        ));
        this.load();
    }

    private async load() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.loadArtistArts(address);
        }
    }

    private async loadArtistArts(address: string) {

        this.artistArtsList.empty();
        const count = (await ArtsContract.artistArtCount(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const id = await ArtsContract.artistArts(address, index);
                if (await ArtsContract.exists(id) === true && this.container.deleted !== true) {
                    new ArtNFTCard(id.toNumber()).appendTo(this.artistArtsList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (this.container.deleted !== true) {
            this.artistArtsLoading.delete();
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
