import { DomNode, el, Popup } from "@hanul/skynode";

export default class OfferPopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(this.content = el(".popup.offer-popup",
            el("h4", "가격 제안"),
            el("hr.divider"),
            el(".preview"),
            el(".warning", "제안 가격을 꼭 확인하세요."),
            el(".label", "제안 가격"),
            el("input", { placeholder: "... MIX" }),
            el("button", "제안하기"),
            el("button", "취소", {
                click: () => this.delete(),
            }),
        ));
    }
}
