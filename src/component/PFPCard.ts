import { DomNode, el } from "@hanul/skynode";
import ViewUtil from "../view/ViewUtil";

export default class PFPCard extends DomNode {

    constructor(
        addr: string,
        banner: string | undefined,
        icon: string | undefined,
        name: string | undefined,
        description: string | undefined,
    ) {
        super(".card-view");

        this.append(
            el("img.banner", { src: banner, width: "200", height: "200" }),
            el("img.icon", { src: icon, width: "200", height: "200" }),
            el(".name", name),
            el(".description", description),
        );

        this.onDom("click", () => ViewUtil.go(`/pfp/${addr}`));
    }
}
