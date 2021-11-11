import { DomNode, el, Popup } from "@hanul/skynode";

export default class OfferPopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(this.content = el(".popup.offer-popup",
            el("h2", "가격 제시"),
            el(".preview"),
            el("input", "100 MIX"),
            el("a", "제시 완료"),
        ));
    }
}
