import { DomNode, el } from "@hanul/skynode";

export default class PFPNFTCard extends DomNode {

    constructor(
        img: string | undefined,
        name: string | undefined,
        description: string | undefined,
        price: number | undefined,
    ) {
        super(".card-view");

        this.append(
            el("img", { src: img, width: "200", height: "200" }),
            el(".name", name),
            el(".description", description),
            price === undefined ? undefined : el(".price", `${price} MIX`)
        );
    }
}
