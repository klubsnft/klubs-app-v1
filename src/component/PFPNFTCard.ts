import { DomNode, el } from "@hanul/skynode";
import ViewUtil from "../view/ViewUtil";

export default class PFPNFTCard extends DomNode {

    constructor(
        addr: string,
        id: number,
        img: string | undefined,
        name: string | undefined,
        description: string | undefined,
        price: number | undefined,
    ) {
        super(".pfp-nft-card");

        this.append(
            img === undefined ? undefined : el("img", {
                src: img.indexOf("ipfs://") === 0 ? `https://api.klu.bs/ipfsimage/${img.substring(7)}` : img,
                width: "200",
                height: "200",
            }),
            el(".name", name),
            el(".description", description),
            price === undefined ? undefined : el(".price", `${price} MIX`),
        );

        this.onDom("click", () => ViewUtil.go(`/pfp/${addr}/${id}`));
    }
}
