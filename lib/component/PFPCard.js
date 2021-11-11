"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class PFPCard extends skynode_1.DomNode {
    constructor(addr, banner, icon, name, description) {
        super(".card-view");
        this.append((0, skynode_1.el)("img.banner", { src: banner, width: "200", height: "200" }), (0, skynode_1.el)("img.icon", { src: icon, width: "200", height: "200" }), (0, skynode_1.el)(".name", name), (0, skynode_1.el)(".description", description));
        this.onDom("click", () => ViewUtil_1.default.go(`/pfp/${addr}`));
    }
}
exports.default = PFPCard;
//# sourceMappingURL=PFPCard.js.map