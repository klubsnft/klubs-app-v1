import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import PFPNFTCard from "../../component/PFPNFTCard";
import Layout from "../Layout";

export default class Detail implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "PFP 상세정보";
        Layout.current.content.append(this.container = el(".pfp-detail-view",
            el(".head",
                // PFP 대표 이미지
                el("img.thumbnail", { src: "/images/galaxies.png" }),
                el(".body", el("p", "도지사운드클럽은 NFT를 이용한 거버넌스로 운영되는 NFT 수집가들의 사교 모임입니다. MATES를 이용해서 클럽에 가입하고 투표할 수 있습니다."), el(".social",
                    el("button.button-contained", "트위터"),
                    el("button.button-contained", "오픈 카카오톡"),
                    el(".update-container", el("button.button-contained", "정보 수정"))
                ))
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
                    el("input", { placeholder: "ID로 검색" }),
                    el("select",
                        el("option", "Face"),
                    ),
                    el("select",
                        el("option", "Mouth"),
                    ),
                ),
                    el(".list",
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
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
