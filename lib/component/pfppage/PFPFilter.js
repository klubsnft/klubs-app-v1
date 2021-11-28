"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class PFPFilter extends skynode_1.DomNode {
    constructor(pageView) {
        super(".pfp-filter");
        this.append(this.idInput = (0, skynode_1.el)("input", {
            placeholder: "ID로 검색",
            change: () => {
                pageView.loadNFTs();
            },
        }));
    }
    get idQuery() {
        const id = parseInt(this.idInput.domElement.value);
        return isNaN(id) === true ? undefined : id;
    }
}
exports.default = PFPFilter;
//# sourceMappingURL=PFPFilter.js.map