
import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Sell implements View {
    private container: DomNode;

    constructor() {
        Layout.current.title = "PFP 판매";
        Layout.current.content.append(
            (this.container = el(
                ".sell-pfp-view",
                el(".image-view", el("img.pfp-image", { src: "/images/galaxies.png" }), el("h1.project", "Doge Sound Clubs"),
                    el(".pfp", "Robot Hoodie #9748"),
                    el(".pfp-info", el(".owner", "소유자는", el(".owner-by", "dilrong")), el(".viewer", el("img.viewer-icon", { src: "/images/icon/visibility.svg", height: 24 }), "1", " 명 감상"))),
                el(".sell-view", el(".title", "PFP 판매 등록"), el(".label", "가격"), el("input", { placeholder: "...MIX" }), el(".label", "등록 기간"), el("input", { placeholder: "...Months", type: "date" }), el("button.button-contained", "판매 등록"))
            ))
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
