import { DomNode, el, Popup } from "@hanul/skynode";

export default class SellPopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(this.content = el(".popup.sell-popup",
            el("h4", "판매하기"),
            el("hr.divider"),
            el(".preview"),
            el(".label", "판매 가격"),
            el(".price", "100 MIX"),
            el(".danger-caption", "판매 가격을 꼭 확인하세요."),
            el("button", "판매 시작"),
            el("button", "취소", {
                click: () => this.delete(),
            }),
        ));
    }
}
