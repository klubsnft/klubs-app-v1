import { DomNode, el, Popup } from "@hanul/skynode";

export default class OfferPopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(this.content = el(".popup.offer-popup",
            el("h4", "가격 제시"),
            el("hr.divider"),
            el(".preview"),
            el(".label", "제시 가격"),
            el("input", { placeholder: "... MIX" }),
            el(".danger", "제시 가격을 꼭 확인하세요."),
            el("button", "가격 제시"),
        ));
    }
}
