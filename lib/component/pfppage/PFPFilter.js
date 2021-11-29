"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class PFPFilter extends skynode_1.DomNode {
    constructor(pageView) {
        super(".pfp-filter");
        this.pageView = pageView;
        this.filtered = {};
        this.append(this.idInput = (0, skynode_1.el)("input", {
            placeholder: "ID로 검색",
            change: () => pageView.loadNFTs(),
        }));
    }
    createFilters(rarity) {
        this.append(...Object.entries(rarity.traits).map(([trait, values]) => {
            const none = values[""];
            return (0, skynode_1.el)("select", {
                placeholder: trait,
                change: (event, select) => {
                    const value = select.domElement.value;
                    if (value === "All") {
                        delete this.filtered[trait];
                    }
                    else {
                        Object.assign(this.filtered, { [trait]: values[value].ids });
                    }
                    this.pageView.loadNFTs();
                },
            }, (0, skynode_1.el)("option", trait, { value: "All" }), (0, skynode_1.el)("option", `None (${none.count})`, { value: "" }), ...Object.entries(values).map(([value, r]) => {
                if (value !== "") {
                    return (0, skynode_1.el)("option", `${value} (${r.count})`, { value });
                }
            }));
        }), (0, skynode_1.el)("a.reset-button", "필터 초기화", {
            click: () => {
                this.filtered = {};
                this.pageView.loadNFTs();
            },
        }));
    }
    get filteredIds() {
        const id = parseInt(this.idInput.domElement.value);
        if (isNaN(id) !== true) {
            return [id];
        }
        else if (Object.values(this.filtered).length > 0) {
            let result = undefined;
            for (const ids of Object.values(this.filtered)) {
                if (result === undefined) {
                    result = ids;
                }
                else {
                    result = result.filter(x => ids.includes(x));
                }
            }
            return result;
        }
    }
}
exports.default = PFPFilter;
//# sourceMappingURL=PFPFilter.js.map