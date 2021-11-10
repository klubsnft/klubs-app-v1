import { DomNode, el } from "@hanul/skynode";

export default class CardView extends DomNode {
  constructor(img: string, title: string, subtitle: string, price: number) {
    super(".card-view");

    this.append(
      el("img", { src: img, width: "200", height: "200" }),
      el(".card-title", title),
      el(".card-subtitle", subtitle),
      el(".card-price", `${price} Mix`)
    );
  }
}
