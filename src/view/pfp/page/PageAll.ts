import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import superagent from "superagent";
import Loading from "../../../component/loading/Loading";
import PFPNFTCard from "../../../component/PFPNFTCard";
import PFPFilter from "../../../component/pfppage/PFPFilter";
import PFPPageTabs from "../../../component/pfppage/PFPPageTabs";
import PFPPagination from "../../../component/pfppage/PFPPagination";
import PFPSortor from "../../../component/pfppage/PFPSortor";
import PFPsContract from "../../../contracts/PFPsContract";
import RarityInfo from "../../../RarityInfo";
import PageLayout from "./PageLayout";
import PFPPage from "./PFPPage";

export default class PageAll implements View, PFPPage {

    private container: DomNode;

    private sortor!: PFPSortor;
    private filter!: PFPFilter;
    private pagination1!: PFPPagination;
    private pagination2!: PFPPagination;

    private nftLoading!: Loading;
    private nftList!: DomNode;

    public addr!: string;
    private page: number = 1;

    private rarity: RarityInfo | undefined;
    private rarityMode = false;

    constructor(params: ViewParams) {
        PageLayout.current.content.append(this.container = el(".pfp-page-view.pfp-page-all-view"));
        this.load(params.addr, params.page);
    }

    private async load(addr: string, _page: string | undefined) {

        this.addr = addr;
        this.page = _page === undefined ? 1 : parseInt(_page, 10);

        this.container.append(
            el("header",
                el("h2", "NFT 목록"),
                new PFPPageTabs(addr, "all"),
                this.sortor = new PFPSortor(this),
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

    private loadCount = 0;

    private createCard(currentLoadCount: number, id: number) {
        if (this.loadCount === currentLoadCount) {
            const card = new PFPNFTCard(this.addr, id).appendTo(this.nftList);
            if (this.rarityMode === true && this.rarity !== undefined) {
                card.showRarity(this.rarity);
            }
        }
    }

    public async loadNFTs() {

        this.loadCount += 1;
        const currentLoadCount = this.loadCount;

        this.nftLoading.show();
        this.nftList.empty();

        let ids: number[] = [];
        let totalSupply;

        if (this.filter.filteredIds !== undefined) {
            ids = this.filter.filteredIds;
            totalSupply = ids.length;
        } else {
            let zeroExists = true;
            try {
                await PageLayout.current.contract.ownerOf(0);
            } catch (e) {
                zeroExists = false;
            }
            totalSupply = (await PFPsContract.getTotalSupply(this.addr)).toNumber();
            for (let id = 0; id < totalSupply; id += 1) {
                ids.push(zeroExists === true ? id : id + 1);
            }
        }

        const lastPage = totalSupply === 0 ? 1 : Math.ceil(totalSupply / 50);
        if (this.page > lastPage) {
            this.page = lastPage;
        }

        this.pagination1.update(this.page, lastPage);
        this.pagination2.update(this.page, lastPage);

        if (this.sortor.sortType === "price-asc") {
            const result = await superagent.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/asc`);
            const dataSet = result.body;
            const orders: { [id: number]: number } = {};
            for (const [index, data] of dataSet.entries()) {
                orders[data.nftId] = index;
            }
            ids.sort((a, b) => (orders[a] === undefined ? Infinity : orders[a]) - (orders[b] === undefined ? Infinity : orders[b]));
        } else if (this.sortor.sortType === "price-desc") {
            const result = await superagent.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/desc`);
            const dataSet = result.body;
            const orders: { [id: number]: number } = {};
            for (const [index, data] of dataSet.entries()) {
                orders[data.nftId] = index;
            }
            ids.sort((a, b) => (orders[a] === undefined ? Infinity : orders[a]) - (orders[b] === undefined ? Infinity : orders[b]));
        } else if (this.sortor.sortType === "rarity-desc") {
            if (this.rarity !== undefined) {
                const orders = this.rarity.rankings;
                ids.sort((a, b) => (orders[a] === undefined ? Infinity : orders[a]) - (orders[b] === undefined ? Infinity : orders[b]));
            }
        }

        const start = (this.page - 1) * 50;
        let limit = this.page * 50;
        if (limit > totalSupply) {
            limit = totalSupply;
        }

        for (let i = start; i < limit; i += 1) {
            this.createCard(currentLoadCount, ids[i]);
        }

        this.nftLoading.hide();
    }

    public goPage(page: number) {
        SkyRouter.go(`/pfp/${this.addr}/page/${page}`);
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
