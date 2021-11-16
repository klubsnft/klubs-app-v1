"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const xss_1 = __importDefault(require("xss"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class PFPCard extends skynode_1.DomNode {
    constructor(addr, banner, icon, name, description) {
        super(".pfp-card");
        this.append(this.bannerDisplay = (0, skynode_1.el)("img.banner"), this.iconDisplay = (0, skynode_1.el)("img.icon"), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", name), this.descriptionDisplay = (0, skynode_1.el)(".description")));
        const markdown = description === undefined ? "" : (description.length > 200 ? `${description.substring(0, 197)}...` : description);
        this.descriptionDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(markdown));
        if (banner === undefined || banner.trim() === "") {
            this.bannerDisplay.domElement.src = "/images/placeholder.svg";
        }
        else {
            this.bannerDisplay.domElement.src = banner;
        }
        this.bannerDisplay.onDom("error", () => {
            this.bannerDisplay.domElement.src = "/images/placeholder.svg";
        });
        if (icon === undefined || icon.trim() === "") {
            this.iconDisplay.domElement.src = "/images/placeholder.svg";
        }
        else {
            this.iconDisplay.domElement.src = icon;
        }
        this.iconDisplay.onDom("error", () => {
            this.iconDisplay.domElement.src = "/images/placeholder.svg";
        });
        this.onDom("click", () => ViewUtil_1.default.go(`/pfp/${addr}`));
    }
}
exports.default = PFPCard;
//# sourceMappingURL=PFPCard.js.map