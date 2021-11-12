import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Update implements View {

    private container: DomNode;
    private bannerInput: DomNode<HTMLInputElement>;
    private iconInput: DomNode<HTMLInputElement>;
    private nameInput: DomNode<HTMLInputElement>;
    private descriptionInput: DomNode<HTMLInputElement>;
    private twitterInput: DomNode<HTMLInputElement>;
    private kakaotalkInput: DomNode<HTMLInputElement>;

    constructor() {
        Layout.current.title = "PFP 정보 수정";
        Layout.current.content.append(this.container = el(".pfp-update-view",
            el("header.head", el("p.title", "PFP 정보 수정")),
            el(".content", el(".form",
                el(".banner-preview"),
                el(".file-container", el(".label",
                    "배너 업로드"),
                    this.bannerInput = el("input.file-input", { type: "file" }),
                ),
                el(".icon-preview"),
                el(".file-container", el(".label",
                    "아이콘 업로드"),
                    this.iconInput = el("input.file-input", { type: "file" }),
                ),
                el(".input-container", el(".label",
                    "이름"),
                    this.nameInput = el("input", { type: "text", placeholder: "PFP 이름" }),
                ),
                el(".input-container", el(".label",
                    "소개글"),
                    this.descriptionInput = el("input", { type: "text", placeholder: "PFP 소개" }),
                ),
                el(".input-container", el(".label",
                    "오픈 카카오톡"),
                    this.kakaotalkInput = el("input", { type: "url", placeholder: "오픈 카카오톡 주소" }),
                ),
                el(".input-container", el(".label",
                    "트위터"),
                    this.twitterInput = el("input", { type: "url", placeholder: "트위터 주소" }),
                ),
                el("button.button-contained", "정보 저장"),
            ),
                el(".manage-managers",
                    el("h4", "매니저 관리"),
                    el("ul",
                        el("li",
                            el("span.item", "매니저 1"),
                            el("button.button-text", "삭제"),
                        ),
                        el("li",
                            el("span.item", "매니저 2"),
                            el("button.button-text", "삭제"),
                        ),
                    ),
                    el("button.button-contained", "매니저 추가"),
                ))
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
