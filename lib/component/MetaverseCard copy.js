"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const xss_1 = __importDefault(require("xss"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class MetaverseCard extends skynode_1.DomNode {
    constructor(id, extra) {
        super(".metaverse-card");
        this.append(this.bannerDisplay = (0, skynode_1.el)("img.banner"), this.iconDisplay = (0, skynode_1.el)("img.icon"), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", extra.name), this.descriptionDisplay = (0, skynode_1.el)(".description")));
        const markdown = extra.description === undefined ? "" : (extra.description.length > 200 ? `${extra.description.substring(0, 197)}...` : extra.description);
        this.descriptionDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(markdown));
        if (extra.banner === undefined || extra.banner.trim() === "") {
            this.bannerDisplay.domElement.src = "/images/placeholder.svg";
        }
        else {
            this.bannerDisplay.domElement.src = `https://api.klu.bs/thumbnail?url=${encodeURIComponent(extra.banner)}`;
        }
        this.bannerDisplay.onDom("error", () => {
            this.bannerDisplay.domElement.src = "/images/placeholder.svg";
        });
        if (extra.icon === undefined || extra.icon.trim() === "") {
            this.iconDisplay.domElement.src = "/images/placeholder.svg";
        }
        else {
            this.iconDisplay.domElement.src = `https://api.klu.bs/thumbnail?url=${encodeURIComponent(extra.icon)}`;
        }
        this.iconDisplay.onDom("error", () => {
            this.iconDisplay.domElement.src = "/images/placeholder.svg";
        });
        this.onDom("click", () => ViewUtil_1.default.go(`/metaverse/${id}`));
    }
}
exports.default = MetaverseCard;
//# sourceMappingURL=MetaverseCard%20copy.js.map