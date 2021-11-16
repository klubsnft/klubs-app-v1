import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import PFPNFTCard from "../../component/PFPNFTCard";
import PFPsContract from "../../contracts/PFPsContract";
import KIP17Contract from "../../contracts/standard/KIP17Contract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Detail implements View {

    private contract: KIP17Contract;

    private container: DomNode;
    private nameDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private socialList: DomNode;

    private idQueryInput: DomNode<HTMLInputElement>;
    private nftList: DomNode;

    private idQuery = "";
    private page = 0;

    constructor(params: ViewParams) {

        const addr = params.addr;
        this.contract = new KIP17Contract(addr);

        Layout.current.title = "PFP 상세정보";
        Layout.current.content.append(this.container = el(".pfp-detail-view",
            el("header",
                // PFP 대표 이미지
                el("img.thumbnail", { src: "/images/galaxies.png" }),
                el(".body",
                    this.nameDisplay = el("h1", "Test"),
                    this.descriptionDisplay = el("p", "test1111"),
                    this.socialList = el(".social",
                        el("button.button-text", el("img", { src: "/images/icon/twitter.svg", height: 24 })),
                        el("button.button-text", el("img", { src: "/images/icon/kakaoTalk.svg", height: 24 })),
                        el(".update-container", el("button.button-text", "정보 수정", {
                            click: () => ViewUtil.go(`/pfp/${addr}/update`),
                        })),
                    ),
                ),
            ),
            el(".main",
                el(".head",
                    el("h2", "NFT 목록"),
                    el(".filter", el("button.button-contained", "희소 점수 보기"),
                        el("select",
                            el("option", "이름순"),
                        ))
                ),
                el(".content",
                    el(".search-box",
                        this.idQueryInput = el("input", { placeholder: "ID로 검색" }),
                        /*el("select",
                            el("option", "Face"),
                        ),
                        el("select",
                            el("option", "Mouth"),
                        ),*/
                    ),
                    this.nftList = el(".list"),
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
            if (data.name !== undefined) {
                this.nameDisplay.empty().appendText(data.name);
            }
        } catch (e) {
            // ignore.
        }
    }

    private async loadNFTs(addr: string) {

        const totalSupply = (await PFPsContract.getTotalSupply(addr)).toNumber();
        const start = this.page * 200;
        let limit = (this.page + 1) * 200;
        if (limit > totalSupply) {
            limit = totalSupply;
        }

        const promises: Promise<void>[] = [];
        for (let i = start; i < limit; i += 1) {
            const promise = async (id: number) => {
                try {
                    const result = await superagent.get(`https://api.klu.bs/pfp/${addr}/${id}/proxy`);
                    new PFPNFTCard(
                        addr,
                        id,
                        result.body.image,
                        result.body.name,
                        result.body.description,
                        12,
                    ).appendTo(this.nftList);
                } catch (e) { }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
