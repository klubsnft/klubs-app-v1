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
import PFPsContract from "../../../contracts/PFPsContract";
import Wallet from "../../../klaytn/Wallet";
import PageLayout from "./PageLayout";
import PFPPage from "./PFPPage";

export default class PageMine implements View, PFPPage {

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
        PageLayout.current.content.append(this.container = el(".pfp-page-view.pfp-page-mine-view"));
        this.load(params.addr, params.page);
    }

    private async load(addr: string, _page: string | undefined) {

        this.addr = addr;
        this.page = _page === undefined ? 1 : parseInt(_page, 10);

        this.container.append(
            el("header",
                el("h2", "NFT 목록"),
                new PFPPageTabs(addr, "mine"),
                this.sortor = new PFPSortor(this, "sell"),
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

        this.sortor.on("multiple-sell", () => {
            if (this.multipleSelector !== undefined) {
                this.multipleSelector.delete();
            } else {
                this.multipleSelector = new MultiplePFPSelector(this.addr, "sell").appendTo(this.container);
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

        const address = await Wallet.loadAddress();

        let totalSupply = 0;

        // id로 검색
        if (this.filter.idQuery !== undefined) {
            totalSupply = 1;
        } else if (address !== undefined) {
            totalSupply = (await PageLayout.current.contract.balanceOf(address)).toNumber();
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
        } else if (address !== undefined) {

            const ids: number[] = [];

            const enumerable = await PFPsContract.enumerables(this.addr);
            if (enumerable === true) {
                const promises: Promise<void>[] = [];
                for (let i = 0; i < totalSupply; i += 1) {
                    const promise = async (index: number) => {
                        try {
                            const id = (await PageLayout.current.contract.tokenOfOwnerByIndex(address, index)).toNumber();
                            ids.push(id);
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    promises.push(promise(i));
                }
                await Promise.all(promises);
                ids.sort((a, b) => a - b);
            }

            else {
                const result = await superagent.get(`https://api.klu.bs/v2/pfp/${this.addr}/owned/${address}`);
                const dataSet = result.body;
                for (const data of dataSet) {
                    ids.push(data.nftId);
                }
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
                this.createCard(ids[i]);
            }
        }

        this.nftLoading.hide();
    }

    public goPage(page: number) {
        SkyRouter.go(`/pfp/${this.addr}/mine/${page}`);
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
