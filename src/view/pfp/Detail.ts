import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import xss from "xss";
import Alert from "../../component/dialogue/Alert";
import Loading from "../../component/loading/Loading";
import PFPNFTCard from "../../component/PFPNFTCard";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import KIP17Contract from "../../contracts/standard/KIP17Contract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Detail implements View {

    private contract: KIP17Contract;

    private container: DomNode;

    private header: DomNode;
    private iconDisplay: DomNode<HTMLImageElement>;
    private nameDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private miningInfoDisplay: DomNode;
    private socialList: DomNode;

    private totalTab: DomNode;
    private mineTab: DomNode;
    private saleTab: DomNode;

    private idQueryInput: DomNode<HTMLInputElement>;
    private nftLoading: DomNode;
    private nftList: DomNode;

    private prevButton: DomNode;
    private nextButton: DomNode;

    private totalSupply = 0;
    private idQuery = "";
    private page = 0;
    private listType = "all";
    private sort: string = "";

    constructor(params: ViewParams) {

        const addr = params.addr;
        this.contract = new KIP17Contract(addr);

        Layout.current.title = "PFP 상세정보";
        Layout.current.content.append(this.container = el(".pfp-detail-view",
            this.header = el("header",
                this.iconDisplay = el("img"),
                el(".body",
                    this.nameDisplay = el("h1"),
                    this.descriptionDisplay = el("p"),
                    this.miningInfoDisplay = el("p"),
                    this.socialList = el(".social"),
                ),
            ),
            el("main",
                el("header",
                    el("h2", "NFT 목록"),
                    el(".tab-container",
                        this.totalTab = el("a.tab", "전체", {
                            click: () => {
                                this.listType = "all";
                                this.loadNFTs(addr);
                            },
                        }),
                        this.mineTab = el("a.tab", "내 NFT", {
                            click: () => {
                                this.listType = "mine";
                                this.loadNFTs(addr);
                            },
                        }),
                        this.saleTab = el("a.tab", "판매중", {
                            click: () => {
                                this.listType = "onSale";
                                this.loadNFTs(addr);
                            },
                        }),
                    ),
                    //el(".filter", el("button.button-contained", "희소 점수 보기"),
                    el("select",
                        el("option", "기본 정렬", { value: "" }),
                        el("option", "최저가순", { value: "price-asc" }),
                        el("option", "최고가순", { value: "price-desc" }),
                        {
                            change: (event, select) => {
                                this.sort = (select as DomNode<HTMLSelectElement>).domElement.value;
                                this.loadNFTs(addr);
                            },
                        },
                    ),
                ),
                el(".content",
                    el(".search-box",
                        this.idQueryInput = el("input", {
                            placeholder: "ID로 검색",
                            change: () => {
                                this.idQuery = this.idQueryInput.domElement.value;
                                this.loadNFTs(addr);
                            },
                        }),
                        /*el("select",
                            el("option", "Face"),
                        ),
                        el("select",
                            el("option", "Mouth"),
                        ),*/
                    ),
                    el(".list-container",
                        this.nftLoading = new Loading(),
                        this.nftList = el(".list"),
                        el(".pagination",
                            this.prevButton = el("a.prev", el("i.fas.fa-arrow-left"), {
                                click: () => {
                                    if (this.page > 0) {
                                        this.page -= 1;
                                        this.loadNFTs(addr);
                                    } else {
                                        new Alert("안내", "첫 페이지입니다.");
                                    }
                                },
                            }),
                            this.nextButton = el("a.next", el("i.fas.fa-arrow-right"), {
                                click: () => {
                                    if (this.page < Math.ceil(this.totalSupply / 50) - 1) {
                                        this.page += 1;
                                        this.loadNFTs(addr);
                                    } else {
                                        new Alert("안내", "마지막 페이지입니다.");
                                    }
                                },
                            }),
                        ),
                    ),
                ),
            ),
        ));
        this.loadInfo(addr);
        this.loadUpdateButton(addr);
        this.loadNFTs(addr);
    }

    private async loadInfo(addr: string) {
        const extras = await PFPsContract.extras(addr);
        try {
            const data: any = JSON.parse(extras);
            if (data.icon === undefined || data.icon.trim() === "") {
                this.iconDisplay.domElement.src = "/images/placeholder.svg";
            } else {
                this.iconDisplay.domElement.src = data.icon;
            }
            if (data.name !== undefined) {
                Layout.current.title = data.name;
                this.nameDisplay.empty().appendText(data.name);
            }
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = xss(marked(data.description));
            }
            if (data.mineable === true) {
                this.miningInfoDisplay.empty().append(
                    el("a.mining",
                        el("img", { src: "/images/icon/mining.png", height: "14" }),
                        el("span", "채굴 가능"),
                        {
                            title: "채굴 가능한 PFP입니다. 클릭하시면 자세한 정보를 확인하실 수 있습니다.",
                            href: data.miningInfoURL,
                            target: "_blank",
                            click: (event: MouseEvent) => event.stopPropagation(),
                        },
                    ),
                );
            }
            this.socialList.empty();
            if (data.twitter !== undefined && data.twitter.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/twitter.svg", height: 24 }),
                        { href: data.twitter, target: "_blank" },
                    ),
                );
            }
            if (data.kakaotalk !== undefined && data.kakaotalk.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/kakao-talk.svg", height: 24 }),
                        { href: data.kakaotalk, target: "_blank" },
                    ),
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    private async loadUpdateButton(addr: string) {
        try {
            const address = await Wallet.loadAddress();
            if (address !== undefined && await PFPsContract.existsManager(addr, address) === true) {
                el("button.update-button", "정보 수정", {
                    click: () => ViewUtil.go(`/pfp/${addr}/update`),
                }).appendTo(this.header);
            }
        } catch (e) {
            console.log(e);
        }
    }

    private order = 0;

    private async loadNFTs(addr: string) {

        this.nftLoading.style({ display: "block" });
        this.totalSupply = (await PFPsContract.getTotalSupply(addr)).toNumber();

        if (this.page === 0) {
            this.prevButton.addClass("disable");
        }

        if (this.page === Math.ceil(this.totalSupply / 50) - 1) {
            this.nextButton.addClass("disable");
        }

        this.nftList.empty();

        this.order += 1;
        const currentOrder = this.order;

        const address = await Wallet.loadAddress();
        let balance = 0;
        if (address !== undefined) {
            balance = (await this.contract.balanceOf(address)).toNumber();
            this.mineTab.empty().appendText(`내 NFT (${balance})`);
        }

        const onSalesCount = (await PFPStoreContract.onSalesCount(addr)).toNumber();
        this.saleTab.empty().appendText(`판매중 (${onSalesCount})`);

        // id로 검색
        if (this.idQuery.trim() !== "") {
            this.totalTab.addClass("on");
            this.mineTab.deleteClass("on");
            this.saleTab.deleteClass("on");
            new PFPNFTCard(addr, parseInt(this.idQuery.trim(), 10)).appendTo(this.nftList);
        }

        // 정렬된 것 보기
        else if (
            this.sort === "price-asc" ||
            this.sort === "price-desc"
        ) {
            this.totalTab.deleteClass("on");
            this.mineTab.deleteClass("on");
            this.saleTab.addClass("on");

            const result = await superagent.get(`https://api.klu.bs/v2/pfp/${addr}/sales/${this.sort === "price-asc" ? "asc" : "desc"}`);
            const dataSet = result.body;

            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > dataSet.length) {
                limit = dataSet.length;
            }

            for (let i = start; i < limit; i += 1) {
                new PFPNFTCard(addr, dataSet[i].nftId).appendTo(this.nftList);
            }
        }

        // 내 것만 보기
        else if (this.listType === "mine") {
            this.totalTab.deleteClass("on");
            this.mineTab.addClass("on");
            this.saleTab.deleteClass("on");

            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > balance) {
                limit = balance;
            }

            const enumerable = await PFPsContract.enumerables(addr);
            if (enumerable === true && address !== undefined) {
                const promises: Promise<void>[] = [];
                for (let i = start; i < limit; i += 1) {
                    const promise = async (index: number) => {
                        try {
                            const id = (await this.contract.tokenOfOwnerByIndex(address, index)).toNumber();
                            if (currentOrder === this.order) {
                                new PFPNFTCard(addr, id).appendTo(this.nftList);
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

        // 판매중인 것만 보기
        else if (this.listType === "onSale") {
            this.totalTab.deleteClass("on");
            this.mineTab.deleteClass("on");
            this.saleTab.addClass("on");

            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > onSalesCount) {
                limit = onSalesCount;
            }

            const promises: Promise<void>[] = [];
            for (let i = start; i < limit; i += 1) {
                const promise = async (index: number) => {
                    try {
                        const id = (await PFPStoreContract.onSales(addr, index)).toNumber();
                        if (currentOrder === this.order) {
                            new PFPNFTCard(addr, id).appendTo(this.nftList);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
        }

        // 전체보기
        else {
            this.totalTab.addClass("on");
            this.mineTab.deleteClass("on");
            this.saleTab.deleteClass("on");

            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > this.totalSupply) {
                limit = this.totalSupply;
            }

            for (let id = start; id < limit; id += 1) {
                new PFPNFTCard(addr, id).appendTo(this.nftList);
            }
        }

        this.nftLoading.style({ display: "none" });
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
