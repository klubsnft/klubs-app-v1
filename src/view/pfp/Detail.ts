import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import PFPNFTCard from "../../component/PFPNFTCard";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import KIP17Contract from "../../contracts/standard/KIP17Contract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Detail implements View {

    private contract: KIP17Contract;

    private container: DomNode;
    private iconDisplay: DomNode<HTMLImageElement>;
    private nameDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private socialList: DomNode;

    private idQueryInput: DomNode<HTMLInputElement>;
    private nftLoading: DomNode;
    private nftList: DomNode;

    private prevButton: DomNode;
    private nextButton: DomNode;

    private totalSupply = 0;
    private idQuery = "";
    private page = 0;

    constructor(params: ViewParams) {

        const addr = params.addr;
        this.contract = new KIP17Contract(addr);

        Layout.current.title = "PFP 상세정보";
        Layout.current.content.append(this.container = el(".pfp-detail-view",
            el("header",
                this.iconDisplay = el("img"),
                el(".body",
                    this.nameDisplay = el("h1"),
                    this.descriptionDisplay = el("p"),
                    this.socialList = el(".social"),
                ),
                el("button.update-button", "정보 수정", {
                    click: () => ViewUtil.go(`/pfp/${addr}/update`),
                }),
            ),
            el("main",
                el("header",
                    el("h2", "NFT 목록"),
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
                    this.nftLoading = el(".loading", "Loading..."),
                    this.nftList = el(".list"),
                ),
                el(".pagination",
                    this.prevButton = el("a.prev", {
                        click: () => {
                            if (this.page > 0) {
                                this.page -= 1;
                                this.loadNFTs(addr);
                            }
                        },
                    }),
                    this.nextButton = el("a.next", {
                        click: () => {
                            if (this.page < Math.ceil(this.totalSupply / 200) - 1) {
                                this.page += 1;
                                this.loadNFTs(addr);
                            }
                        },
                    }),
                ),
            ),
        ));
        this.loadInfo(addr);
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
                this.nameDisplay.empty().appendText(data.name);
            }
            if (data.description !== undefined) {
                this.descriptionDisplay.empty().appendText(data.description);
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
                        el("img", { src: "/images/icon/kakaotalk.svg", height: 24 }),
                        { href: data.kakaotalk, target: "_blank" },
                    ),
                );
            }

        } catch (e) {
            // ignore.
        }
    }

    private async loadNFTs(addr: string) {

        this.nftLoading.style({ display: "block" });
        this.totalSupply = (await PFPsContract.getTotalSupply(addr)).toNumber();

        if (this.page === 0) {
            this.prevButton.addClass("disable");
        }

        if (this.page === Math.ceil(this.totalSupply / 200) - 1) {
            this.nextButton.addClass("disable");
        }

        const start = this.page * 200;
        let limit = (this.page + 1) * 200;
        if (limit > this.totalSupply) {
            limit = this.totalSupply;
        }

        this.nftList.empty();
        const promises: Promise<void>[] = [];
        for (let i = start; i < limit; i += 1) {
            const promise = async (id: number) => {
                try {
                    const result = await superagent.get(`https://api.klu.bs/pfp/${addr}/${id}/proxy`);
                    const saleInfo = await PFPStoreContract.sales(addr, i);
                    new PFPNFTCard(
                        addr,
                        id,
                        result.body.image,
                        result.body.name,
                        saleInfo.price,
                    ).appendTo(this.nftList);
                } catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        this.nftLoading.style({ display: "none" });
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
