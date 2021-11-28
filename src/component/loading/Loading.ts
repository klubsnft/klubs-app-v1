import { DomNode, el } from "@hanul/skynode";
import Lottie from "lottie-web";

export default class Loading extends DomNode {

    constructor() {
        super(".loading");
        const lottie = el(".lottie").appendTo(this);
        Lottie.loadAnimation({
            container: lottie.domElement,
            loop: true,
            autoplay: true,
            animationData: require("./loading.json"),
        });
        lottie.style({ width: 200, height: 200, marginTop: -75 });
        this.style({
            display: "inline-block",
            width: 200,
            height: 50,
            overflow: "hidden",
        });
    }

    public hide() {
        this.style({ display: "none" });
    }

    public show() {
        this.style({ display: "block" });
    }
}
