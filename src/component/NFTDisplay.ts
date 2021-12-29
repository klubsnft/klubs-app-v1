import { DomNode, el } from "@hanul/skynode";
import CONTENT_TYPES from "./CONTENT_TYPES.json";

export default class NFTDisplay extends DomNode {

    constructor(src: string, thumbnail?: boolean) {
        super(".nft-display");
        const extname = src.substring(src.lastIndexOf(".") + 1);
        const contentType = (CONTENT_TYPES as any)[extname];
        if (contentType === undefined || (
            contentType.indexOf("image") === 0 &&
            contentType.indexOf("image/svg") === -1
        )) {
            this.append(el("img", { src: thumbnail === true ? `https://api.klu.bs/thumbnail?url=${encodeURIComponent(src)}` : src }));
        } else if (contentType.indexOf("image/svg") === 0) {
            this.append(el("img", { src }));
        } else if (contentType.indexOf("video") === 0) {
            if (thumbnail === true) {
                el("video", { src }).appendTo(this);
            } else {
                const video: DomNode<HTMLVideoElement> = el("video", { src }).appendTo(this) as any;
                video.domElement.muted = true;
                video.domElement.loop = true;
                video.domElement.play();
            }
        }
    }
}
