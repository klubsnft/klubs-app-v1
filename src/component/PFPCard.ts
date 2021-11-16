import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import xss from "xss";
import ViewUtil from "../view/ViewUtil";

export default class PFPCard extends DomNode {

    private bannerDisplay: DomNode<HTMLImageElement>;
    private iconDisplay: DomNode<HTMLImageElement>;
    private descriptionDisplay: DomNode<HTMLImageElement>;

    constructor(
        addr: string,
        banner: string | undefined,
        icon: string | undefined,
        name: string | undefined,
        description: string | undefined,
    ) {
        super(".pfp-card");

        this.append(
            this.bannerDisplay = el("img.banner"),
            this.iconDisplay = el("img.icon"),
            el(".info",
                el(".name", name),
                this.descriptionDisplay = el(".description"),
            ),
        );

        const markdown = description === undefined ? "" : (
            description.length > 200 ? `${description.substring(0, 197)}...` : description
        );

        this.descriptionDisplay.domElement.innerHTML = xss(marked(markdown));

        if (banner === undefined || banner.trim() === "") {
            this.bannerDisplay.domElement.src = "/images/placeholder.svg";
        } else {
            this.bannerDisplay.domElement.src = banner;
        }
        this.bannerDisplay.onDom("error", () => {
            this.bannerDisplay.domElement.src = "/images/placeholder.svg";
        });

        if (icon === undefined || icon.trim() === "") {
            this.iconDisplay.domElement.src = "/images/placeholder.svg";
        } else {
            this.iconDisplay.domElement.src = icon;
        }
        this.iconDisplay.onDom("error", () => {
            this.iconDisplay.domElement.src = "/images/placeholder.svg";
        });

        this.onDom("click", () => ViewUtil.go(`/pfp/${addr}`));
    }
}
