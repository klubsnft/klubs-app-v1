import { DomNode, el } from "@hanul/skynode";
import CONTENT_TYPES from "./CONTENT_TYPES.json";

export default class NFTDisplay extends DomNode {

    constructor(src: string) {
        super(".nft-display");
        const extname = src.substring(src.lastIndexOf(".") + 1);
        const contentType = (CONTENT_TYPES as any)[extname];
        if (contentType === undefined || contentType.indexOf("image") === 0) {
            this.append(el("img", { src }));
        } else if (contentType.indexOf("video") === 0) {
            const video: DomNode<HTMLVideoElement> = el("video", { src }).appendTo(this) as any;
            video.domElement.muted = true;
            video.domElement.loop = true;
            video.domElement.play();
        }
    }
}