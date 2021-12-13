import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import ArtNFTCard from "../../../component/ArtNFTCard";
import ArtsPageTabs from "../../../component/artpage/ArtsPageTabs";
import Loading from "../../../component/loading/Loading";
import ArtsContract from "../../../contracts/ArtsContract";
import PageLayout from "./PageLayout";

export default class PageAll implements View {

    private container: DomNode;

    private nftLoading!: Loading;
    private nftList!: DomNode;

    constructor() {
        PageLayout.current.content.append(this.container = el(".arts-page-view.arts-page-all-view"));
        this.load();
    }

    private async load() {

        this.container.append(
            el("header",
                el("h2", "NFT 목록"),
                new ArtsPageTabs("all"),
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

        const totalSupply = (await ArtsContract.totalSupply()).toNumber();
        const ids = new Array(totalSupply).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);

        let count = 0;
        for (const id of ids) {
            new ArtNFTCard(id).appendTo(this.nftList);
            count += 1;
            if (count === 100) {
                break;
            }
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
