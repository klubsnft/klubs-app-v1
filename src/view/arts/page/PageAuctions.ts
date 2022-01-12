import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import ArtNFTCard from "../../../component/ArtNFTCard";
import ArtsPageTabs from "../../../component/artpage/ArtsPageTabs";
import Loading from "../../../component/loading/Loading";
import ArtStoreContract from "../../../contracts/ArtStoreContract";
import PageLayout from "./PageLayout";

export default class PageAuctions implements View {

    private container: DomNode;

    private nftLoading!: Loading;
    private nftList!: DomNode;

    constructor() {
        PageLayout.current.content.append(this.container = el(".arts-page-view.arts-page-auctions-view"));
        this.load();
    }

    private async load() {

        this.container.append(
            el("header",
                el("h2", msg("NFT_LIST_TITLE")),
                new ArtsPageTabs("auctions"),
            ),
            el(".content",
                el(".list-container",
                    this.nftLoading = new Loading(),
                    this.nftList = el(".list"),
                ),
            ),
        );

        this.loadNFTs();
    }

    public async loadNFTs() {

        this.nftLoading.show();
        this.nftList.empty();

        const ids: number[] = [];

        const totalSupply = (await ArtStoreContract.onAuctionsCount()).toNumber();
        const promises: Promise<void>[] = [];
        for (let i = 0; i < totalSupply; i += 1) {
            const promise = async (index: number) => {
                try {
                    const id = (await ArtStoreContract.onAuctions(index)).toNumber();
                    ids.push(id);
                } catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        for (const id of ids) {
            new ArtNFTCard(id).appendTo(this.nftList);
        }

        this.nftLoading.hide();
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        if (this.container.deleted !== true) {
            this.container.delete();
        }
    }
}
