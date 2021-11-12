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
            el("h1", "PFP 정보 수정"),
            el(".form",
                el(".banner-preview"),
                el("label",
                    "배너 업로드",
                    this.bannerInput = el("input", { type: "file" }),
                ),
                el(".icon-preview"),
                el("label",
                    "아이콘 업로드",
                    this.iconInput = el("input", { type: "file" }),
                ),
                el("label",
                    "이름",
                    this.nameInput = el("input", { type: "file" }),
                ),
                el("label",
                    "소개글",
                    this.descriptionInput = el("input", { type: "file" }),
                ),
                el("label",
                    "오픈 카카오톡",
                    this.kakaotalkInput = el("input", { type: "file" }),
                ),
                el("label",
                    "트위터",
                    this.twitterInput = el("input", { type: "file" }),
                ),
                el("a", "정보 저장"),
            ),
            el(".manage-managers",
                el("h2", "매니저 관리"),
                el("ul",
                    el("li",
                        el("span", "매니저 1"),
                        el("a", "삭제"),
                    ),
                    el("li",
                        el("span", "매니저 2"),
                        el("a", "삭제"),
                    ),
                ),
                el("a", "매니저 추가"),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
