import { DomNode, el } from "@hanul/skynode";

export default class CardView extends DomNode {
    constructor(img: string, title: string, body: string, price: number) {
        super(".card-view");

        this.append(
            el("img", { src: img, width: "200", height: "200" }),
            el(".title", title),
            el(".body", body),
            el(".price", `${price} Mix`)
        );
    }
}
