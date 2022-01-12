import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import ArtNFTCard from "../../../component/ArtNFTCard";
import ArtsPageTabs from "../../../component/artpage/ArtsPageTabs";
import Loading from "../../../component/loading/Loading";
import ArtsContract from "../../../contracts/ArtsContract";
import Wallet from "../../../klaytn/Wallet";
import PageLayout from "./PageLayout";

export default class PageMine implements View {

    private container: DomNode;

    private nftLoading!: Loading;
    private nftList!: DomNode;

    constructor() {
        PageLayout.current.content.append(this.container = el(".arts-page-view.arts-page-mine-view"));
        this.load();
    }

    private async load() {

        this.container.append(
            el("header",
                el("h2", msg("NFT_LIST_TITLE")),
                new ArtsPageTabs("mine"),
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

        const address = await Wallet.loadAddress();

        const ids: number[] = [];

        if (address !== undefined) {
            const totalSupply = (await ArtsContract.balanceOf(address)).toNumber();

            const promises: Promise<void>[] = [];
            for (let i = 0; i < totalSupply; i += 1) {
                const promise = async (index: number) => {
                    try {
                        const id = (await ArtsContract.tokenOfOwnerByIndex(address, index)).toNumber();
                        ids.push(id);
                    } catch (e) {
                        console.error(e);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            ids.sort((a, b) => a - b);

            for (const id of ids) {
                new ArtNFTCard(id, false, true).appendTo(this.nftList);
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
