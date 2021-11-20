import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import { View, ViewParams } from "skyrouter";
import xss from "xss";
import Alert from "../../component/dialogue/Alert";
import Loading from "../../component/loading/Loading";
import PFPNFTCard from "../../component/PFPNFTCard";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import KIP17Contract from "../../contracts/standard/KIP17Contract";
import Wallet from "../../klaytn/Wallet";
import Loader from "../../Loader";
import ProxyUtil from "../../ProxyUtil";
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

    private saleTab: DomNode;
    private totalTab: DomNode;

    private idQueryInput: DomNode<HTMLInputElement>;
    private nftLoading: DomNode;
    private nftList: DomNode;

    private prevButton: DomNode;
    private nextButton: DomNode;

    private totalSupply = 0;
    private idQuery = "";
    private page = 0;
    private onlySale = false;

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
                                this.onlySale = false;
                                this.loadNFTs(addr);
                            },
                        }),
                        this.saleTab = el("a.tab", "판매중", {
                            click: () => {
                                this.onlySale = true;
                                this.loadNFTs(addr);
                            },
                        }),
                    ),
                    //el(".filter", el("button.button-contained", "희소 점수 보기"),
                    /*el("select",
                        el("option", "이름순"),
                    ),*/
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

        const onSalesCount = (await PFPStoreContract.onSalesCount(addr)).toNumber();
        this.saleTab.empty().appendText(`판매중 (${onSalesCount})`);

        // id로 검색
        if (this.idQuery.trim() !== "") {
            try {
                const id = parseInt(this.idQuery.trim(), 10);
                const data = await Loader.loadMetadata(addr, id);
                const saleInfo = await PFPStoreContract.sales(addr, id);
                if (currentOrder === this.order) {
                    new PFPNFTCard(
                        addr,
                        id,
                        data.image,
                        data.name,
                        saleInfo.price,
                    ).appendTo(this.nftList);
                }
            } catch (e) {
                console.error(e);
            }
        }

        // 판매중인 것만 보기
        else if (this.onlySale === true) {
            this.saleTab.addClass("on");
            this.totalTab.deleteClass("on");

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
                            const data = await Loader.loadMetadata(addr, id);
                            const saleInfo = await PFPStoreContract.sales(addr, id);
                            if (currentOrder === this.order) {
                                new PFPNFTCard(
                                    addr,
                                    id,
                                    data.image,
                                    data.name,
                                    saleInfo.price,
                                ).appendTo(this.nftList);
                            }
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
            this.saleTab.deleteClass("on");
            this.totalTab.addClass("on");

            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > this.totalSupply) {
                limit = this.totalSupply;
            }

            const promises: Promise<void>[] = [];
            for (let i = start; i < limit; i += 1) {
                const promise = async (id: number) => {
                    try {
                        const data = await Loader.loadMetadata(addr, id);
                        const saleInfo = await PFPStoreContract.sales(addr, id);
                        if (currentOrder === this.order) {
                            new PFPNFTCard(
                                addr,
                                id,
                                data.image,
                                data.name,
                                saleInfo.price,
                            ).appendTo(this.nftList);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
        }

        this.nftLoading.style({ display: "none" });
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
