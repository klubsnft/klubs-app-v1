import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import PFPNFTCard from "../../component/PFPNFTCard";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Detail implements View {

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

        Layout.current.title = "PFP 상세정보";
        Layout.current.content.append(this.container = el(".pfp-detail-view",
            el(".head",
                // PFP 대표 이미지
                el("img.thumbnail", { src: "/images/galaxies.png" }),
                this.nameDisplay = el("h2"),
                el(".body",
                    this.descriptionDisplay = el("p"),
                    this.socialList = el(".social",
                        el("button.button-contained", "트위터"),
                        el("button.button-contained", "오픈 카카오톡"),
                    ),
                    el(".update-container", el("button.button-contained", "정보 수정", {
                        click: () => ViewUtil.go(`/pfp/${addr}/update`),
                    })),
                ),
            ),
            el(".main",
                el(".header",
                    el("h4", "NFT 목록"),
                    el(".filter", el("button.button-contained", "희소 점수 보기"),
                        el("select",
                            el("option", "이름순"),
                        ))
                ),
                el(".content", el(".search-box",
                    this.idQueryInput = el("input", { placeholder: "ID로 검색" }),
                    /*el("select",
                        el("option", "Face"),
                    ),
                    el("select",
                        el("option", "Mouth"),
                    ),*/
                ),
                    this.nftList = el(".list",
                        new PFPNFTCard(
                            "img1",
                            "name1",
                            "description1",
                            12,
                        ),
                        new PFPNFTCard(
                            "img2",
                            "name2",
                            "description2",
                            15,
                        ),
                    ))
            ),
        ));
        this.loadInfo(addr);
        this.loadNFTs();
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

    private async loadNFTs() {

    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
