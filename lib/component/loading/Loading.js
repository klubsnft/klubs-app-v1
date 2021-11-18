"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const lottie_web_1 = __importDefault(require("lottie-web"));
class Loading extends skynode_1.DomNode {
    constructor() {
        super(".loading");
        const lottie = (0, skynode_1.el)(".lottie").appendTo(this);
        lottie_web_1.default.loadAnimation({
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
}
exports.default = Loading;
//# sourceMappingURL=Loading.js.map