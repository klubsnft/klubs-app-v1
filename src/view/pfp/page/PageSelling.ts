import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import superagent from "superagent";
import Loading from "../../../component/loading/Loading";
import PFPNFTCard from "../../../component/PFPNFTCard";
import MultiplePFPSelector from "../../../component/pfppage/MultiplePFPSelector";
import PFPFilter from "../../../component/pfppage/PFPFilter";
import PFPPageTabs from "../../../component/pfppage/PFPPageTabs";
import PFPPagination from "../../../component/pfppage/PFPPagination";
import PFPSortor from "../../../component/pfppage/PFPSortor";
import PFPStoreContract from "../../../contracts/PFPStoreContract";
import PageLayout from "./PageLayout";
import PFPPage from "./PFPPage";

export default class PageSelling implements View, PFPPage {

    private container: DomNode;

    private sortor!: PFPSortor;
    private filter!: PFPFilter;
    private pagination1!: PFPPagination;
    private pagination2!: PFPPagination;

    private nftLoading!: Loading;
    private nftList!: DomNode;

    private addr!: string;
    private page: number = 1;

    private multipleSelector: MultiplePFPSelector | undefined;

    constructor(params: ViewParams) {
        PageLayout.current.content.append(this.container = el(".pfp-page-view.pfp-page-selling-view"));
        this.load(params.addr, params.page);
    }

    private async load(addr: string, _page: string | undefined) {

        this.addr = addr;
        this.page = _page === undefined ? 1 : parseInt(_page, 10);

        this.container.append(
            el("header",
                el("h2", "NFT 목록"),
                new PFPPageTabs(addr, "selling"),
                this.sortor = new PFPSortor(this, "buy"),
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
        this.loadNFTs();

        this.sortor.on("multiple-buy", () => {
            if (this.multipleSelector !== undefined) {
                this.multipleSelector.delete();
            } else {
                this.multipleSelector = new MultiplePFPSelector(this.addr, "buy").appendTo(this.container);
                this.multipleSelector.on("delete", () => {
                    this.multipleSelector = undefined;
                    if (this.nftList.deleted !== true) {
                        for (const card of this.nftList.children) {
                            if (card instanceof PFPNFTCard) {
                                card.mode = "view";
                            }
                        }
                    }
                });
                for (const card of this.nftList.children) {
                    if (card instanceof PFPNFTCard) {
                        card.mode = "select";
                    }
                }
            }
        });
    }

    private createCard(id: number) {
        const card = new PFPNFTCard(this.addr, id, this.multipleSelector?.selecting(id)).appendTo(this.nftList);
        if (this.multipleSelector !== undefined) {
            card.mode = "select";
        }
        card.on("select", (id) => this.multipleSelector?.select(id));
        card.on("deselect", (id) => this.multipleSelector?.deselect(id));
    }

    public async loadNFTs() {

        this.nftLoading.show();
        this.nftList.empty();

        let totalSupply;

        // id로 검색
        if (this.filter.idQuery !== undefined) {
            totalSupply = 1;
        } else {
            totalSupply = (await PFPStoreContract.onSalesCount(this.addr)).toNumber();
        }

        const lastPage = totalSupply === 0 ? 1 : Math.ceil(totalSupply / 50);
        if (this.page > lastPage) {
            this.page = lastPage;
        }

        this.pagination1.update(this.page, lastPage);
        this.pagination2.update(this.page, lastPage);

        // id로 검색
        if (this.filter.idQuery !== undefined) {
            this.createCard(this.filter.idQuery);
        } else {

            const start = (this.page - 1) * 50;
            let limit = this.page * 50;
            if (limit > totalSupply) {
                limit = totalSupply;
            }

            if (this.sortor.sortType === "price-asc") {
                const result = await superagent.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/asc`);
                const dataSet = result.body;
                for (let i = start; i < limit; i += 1) {
                    this.createCard(dataSet[i].nftId);
                }
            }

            else if (this.sortor.sortType === "price-desc") {
                const result = await superagent.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/desc`);
                const dataSet = result.body;
                for (let i = start; i < limit; i += 1) {
                    this.createCard(dataSet[i].nftId);
                }
            }

            else {
                const promises: Promise<void>[] = [];
                for (let i = start; i < limit; i += 1) {
                    const promise = async (index: number) => {
                        try {
                            const id = (await PFPStoreContract.onSales(this.addr, index)).toNumber();
                            if (this.container.deleted !== true) {
                                this.createCard(id);
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    promises.push(promise(i));
                }
                await Promise.all(promises);
            }
        }

        this.nftLoading.hide();
    }

    public goPage(page: number) {
        SkyRouter.go(`/pfp/${this.addr}/selling/${page}`);
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
