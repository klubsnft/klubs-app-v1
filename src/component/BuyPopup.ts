import { DomNode, el, Popup } from "@hanul/skynode";

export default class BuyPopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(this.content = el(".popup.buy-popup",
            el("h4", "구매하기"),
            el("hr.divider"),
            el(".preview"),
            el(".label", "구매 가격"),
            el(".price", "100 MIX"),
            el(".danger", "구매 가격을 꼭 확인하세요."),
            el("button", "구매 진행"),
        ));
    }
}
