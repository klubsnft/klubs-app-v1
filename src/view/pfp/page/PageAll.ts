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

    private addr!: string;
    private page: number = 1;

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
        this.loadNFTs();
    }

    public async loadNFTs() {

        this.nftLoading.show();
        this.nftList.empty();

        let totalSupply;

        // id로 검색
        if (this.filter.idQuery !== undefined) {
            totalSupply = 1;
        } else {
            totalSupply = (await PFPsContract.getTotalSupply(this.addr)).toNumber();
        }

        const lastPage = Math.ceil(totalSupply / 50);
        if (this.page > lastPage) {
            this.page = lastPage;
        }

        this.pagination1.update(this.page, lastPage);
        this.pagination2.update(this.page, lastPage);

        // id로 검색
        if (this.filter.idQuery !== undefined) {
            new PFPNFTCard(this.addr, this.filter.idQuery).appendTo(this.nftList);
        } else {

            const ids: number[] = [];
            for (let id = 0; id < totalSupply; id += 1) {
                ids.push(id);
            }

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
            }

            const start = (this.page - 1) * 50;
            let limit = this.page * 50;
            if (limit > totalSupply) {
                limit = totalSupply;
            }

            for (let i = start; i < limit; i += 1) {
                new PFPNFTCard(this.addr, ids[i]).appendTo(this.nftList);
            }
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
