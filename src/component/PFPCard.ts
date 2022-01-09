import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import msg from "msg.js";
import xss from "xss";
import PFPExtra from "../datamodel/PFPExtra";
import ViewUtil from "../view/ViewUtil";

export default class PFPCard extends DomNode {

    private bannerDisplay: DomNode<HTMLImageElement>;
    private iconDisplay: DomNode<HTMLImageElement>;
    private descriptionDisplay: DomNode<HTMLImageElement>;

    constructor(
        addr: string,
        extra: PFPExtra,
    ) {
        super(".pfp-card");

        this.append(
            this.bannerDisplay = el("img.banner"),
            this.iconDisplay = el("img.icon"),
            el(".info",
                el(".name", extra.name),
                extra.mineable !== true ? undefined : el("a.mineable",
                    el("img", { src: "/images/icon/mining.png", height: "14" }),
                    {
                        title: msg("IS_MINING_DESC2"),
                        href: extra.miningInfoURL,
                        target: "_blank",
                        click: (event: MouseEvent) => event.stopPropagation(),
                    },
                ),
                this.descriptionDisplay = el(".description"),
            ),
        );

        const markdown = extra.description === undefined ? "" : (
            extra.description.length > 200 ? `${extra.description.substring(0, 197)}...` : extra.description
        );

        this.descriptionDisplay.domElement.innerHTML = xss(marked(markdown));

        if (extra.banner === undefined || extra.banner.trim() === "") {
            this.bannerDisplay.domElement.src = "/images/placeholder.svg";
        } else {
            this.bannerDisplay.domElement.src = `https://api.klu.bs/thumbnail?url=${encodeURIComponent(extra.banner)}`;
        }
        this.bannerDisplay.onDom("error", () => {
            this.bannerDisplay.domElement.src = "/images/placeholder.svg";
        });

        if (extra.icon === undefined || extra.icon.trim() === "") {
            this.iconDisplay.domElement.src = "/images/placeholder.svg";
        } else {
            this.iconDisplay.domElement.src = `https://api.klu.bs/thumbnail?url=${encodeURIComponent(extra.icon)}`;
        }
        this.iconDisplay.onDom("error", () => {
            this.iconDisplay.domElement.src = "/images/placeholder.svg";
        });

        this.onDom("click", () => ViewUtil.go(`/pfp/${addr}`));
    }
}
