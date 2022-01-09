import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import msg from "msg.js";
import superagent from "superagent";
import Loading from "../../../component/loading/Loading";
import PFPNFTCard from "../../../component/PFPNFTCard";
import MultiplePFPSelector from "../../../component/pfppage/MultiplePFPSelector";
import PFPFilter from "../../../component/pfppage/PFPFilter";
import PFPPageTabs from "../../../component/pfppage/PFPPageTabs";
import PFPPagination from "../../../component/pfppage/PFPPagination";
import PFPSortor from "../../../component/pfppage/PFPSortor";
import PFPStoreContract from "../../../contracts/PFPStoreContract";
import RarityInfo from "../../../RarityInfo";
import PageLayout from "./PageLayout";
import PFPPage from "./PFPPage";

export default class PageAuctions implements View, PFPPage {

    private container: DomNode;

    private filter!: PFPFilter;
    private pagination1!: PFPPagination;
    private pagination2!: PFPPagination;

    private nftLoading!: Loading;
    private nftList!: DomNode;

    private addr!: string;
    private page: number = 1;

    private rarity: RarityInfo | undefined;
    private rarityMode = false;

    private multipleSelector: MultiplePFPSelector | undefined;

    constructor(params: ViewParams) {
        PageLayout.current.content.append(this.container = el(".pfp-page-view.pfp-page-auctions-view"));
        this.load(params.addr, params.page);
    }

    private async load(addr: string, _page: string | undefined) {

        this.addr = addr;
        this.page = _page === undefined ? 1 : parseInt(_page, 10);

        this.container.append(
            el("header",
                el("h2", msg("NFT_LIST")),
                new PFPPageTabs(addr, "auctions"),
            ),
            el(".content",
                this.filter = new PFPFilter(this),
                el(".list-container",
                    this.nftLoading = new Loading(),
                    this.pagination1 = new PFPPagination(this, this.page),
                    this.nftList = el(".list"),
                    this.pagination2 = new PFPPagination(this, this.page),
                ),
            ),
        );

        this.loadRarity();
        this.loadNFTs();
    }

    private async loadRarity() {
        this.rarity = await PageLayout.loadRarity(this.addr);
        if (this.rarity !== undefined) {
            this.filter.createFilters(this.rarity);
            if (this.rarityMode === true) {
                for (const card of this.nftList.children) {
                    if (card instanceof PFPNFTCard) {
                        card.showRarity(this.rarity);
                    }
                }
            }
        }
    }

    public toggleRarityMode() {
        if (this.rarityMode !== true) {
            if (this.rarity !== undefined) {
                for (const card of this.nftList.children) {
                    if (card instanceof PFPNFTCard) {
                        card.showRarity(this.rarity);
                    }
                }
            }
        } else {
            for (const card of this.nftList.children) {
                if (card instanceof PFPNFTCard) {
                    card.hideRarity();
                }
            }
        }
        this.rarityMode = this.rarityMode !== true;
    }

    private createCard(id: number) {
        const card = new PFPNFTCard(this.addr, id, this.multipleSelector?.selecting(id)).appendTo(this.nftList);
        if (this.rarityMode === true && this.rarity !== undefined) {
            card.showRarity(this.rarity);
        }
        if (this.multipleSelector !== undefined) {
            card.mode = "select";
        }
        card.on("select", (id) => this.multipleSelector?.select(id));
        card.on("deselect", (id) => this.multipleSelector?.deselect(id));
    }

    public async loadNFTs() {

        this.nftLoading.show();
        this.nftList.empty();

        const ids: number[] = [];
        const filteredIds = this.filter.filteredIds;
        let totalSupply = 0;

        const _totalSupply = (await PFPStoreContract.onAuctionsCount(this.addr)).toNumber();
        const promises: Promise<void>[] = [];
        for (let i = 0; i < _totalSupply; i += 1) {
            const promise = async (index: number) => {
                try {
                    const id = (await PFPStoreContract.onAuctions(this.addr, index)).toNumber();
                    if (filteredIds === undefined || filteredIds.includes(id) === true) {
                        ids.push(id);
                        totalSupply += 1;
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        const lastPage = totalSupply === 0 ? 1 : Math.ceil(totalSupply / 50);
        if (this.page > lastPage) {
            this.page = lastPage;
        }

        this.pagination1.update(this.page, lastPage);
        this.pagination2.update(this.page, lastPage);

        const start = (this.page - 1) * 50;
        let limit = this.page * 50;
        if (limit > totalSupply) {
            limit = totalSupply;
        }

        for (let i = start; i < limit; i += 1) {
            this.createCard(ids[i]);
        }

        this.nftLoading.hide();
    }

    public goPage(page: number) {
        SkyRouter.go(`/pfp/${this.addr}/auctions/${page}`);
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.page = params.page === undefined ? 1 : parseInt(params.page, 10);
        this.loadNFTs();
    }

    public close(): void {
        if (this.container.deleted !== true) {
            this.container.delete();
        }
    }
}
