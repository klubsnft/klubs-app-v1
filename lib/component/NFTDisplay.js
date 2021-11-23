"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CONTENT_TYPES_json_1 = __importDefault(require("./CONTENT_TYPES.json"));
class NFTDisplay extends skynode_1.DomNode {
    constructor(src) {
        super(".nft-display");
        const extname = src.substring(src.lastIndexOf(".") + 1);
        const contentType = CONTENT_TYPES_json_1.default[extname];
        if (contentType === undefined || contentType.indexOf("image") === 0) {
            this.append((0, skynode_1.el)("img", { src }));
        }
        else if (contentType.indexOf("video") === 0) {
            const video = (0, skynode_1.el)("video", { src }).appendTo(this);
            video.domElement.muted = true;
            video.domElement.loop = true;
            video.domElement.play();
        }
    }
}
exports.default = NFTDisplay;
//# sourceMappingURL=NFTDisplay.js.map