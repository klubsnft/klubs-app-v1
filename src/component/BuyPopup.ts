import { DomNode, el, Popup } from "@hanul/skynode";

export default class BuyPopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(this.content = el(".popup.buy-popup",
            el("h2", "구매하기"),
            el(".preview"),
            el(".price", "100 MIX"),
            el("a", "구매 진행"),
        ));
    }
}
