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
        super(".PFPCard");

        this.append(
            el("img.banner", { src: banner, onerror: "this.src='/images/noImage.png'" }),
            el("img.icon", { src: icon, onerror: "this.src='/images/noImage.png'" }),
            el(".name", name),
            el(".description", description)
        );

        this.onDom("click", () => ViewUtil.go(`/pfp/${addr}`));
    }
}
