"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Store_1 = __importDefault(require("../../Store"));
class ItemFilter extends skynode_1.DomNode {
    constructor(pageView) {
        super(".metaverse-item-filter");
        this.pageView = pageView;
        this.filterData = {};
        this.filtered = {};
        this.store = new Store_1.default("filter-store");
        this.append(this.idInput = (0, skynode_1.el)("input", {
            placeholder: (0, msg_js_1.default)("SEARCH_ID_INPUT_PLACEHOLDER"),
            change: () => pageView.loadNFTs(),
        }));
        const saved = this.store.get(`${this.pageView.addr}-filter`);
        if (saved !== undefined) {
            this.filterData = saved;
        }
    }
    createFilters(rarity) {
        const selects = [];
        this.append(...Object.entries(rarity.traits).map(([trait, values]) => {
            const none = values[""];
            const select = (0, skynode_1.el)("select", {
                placeholder: trait,
                change: (event, select) => {
                    const value = select.domElement.value;
                    if (value === "All") {
                        delete this.filtered[trait];
                    }
                    else {
                        Object.assign(this.filtered, { [trait]: values[value].ids });
                    }
                    this.filterData[trait] = value;
                    this.store.set(`${this.pageView.addr}-filter`, this.filterData);
                    this.pageView.loadNFTs();
                },
            }, (0, skynode_1.el)("option", trait, { value: "All" }), (0, skynode_1.el)("option", `None (${none.count})`, { value: "" }), ...Object.entries(values).sort((a, b) => a[1].count - b[1].count).map(([value, r]) => {
                if (value !== "") {
                    return (0, skynode_1.el)("option", `${value} (${r.count})`, { value });
                }
            }));
            const value = this.filterData[trait];
            if (value !== undefined) {
                select.domElement.value = value;
                if (value === "All") {
                    delete this.filtered[trait];
                }
                else {
                    Object.assign(this.filtered, { [trait]: values[value].ids });
                }
            }
            selects.push(select);
            return select;
        }), (0, skynode_1.el)("a.reset-button", (0, msg_js_1.default)("INIT_FILLETER_BUTTON"), {
            click: () => {
                this.filterData = {};
                this.store.set(`${this.pageView.addr}-filter`, this.filterData);
                this.filtered = {};
                for (const select of selects) {
                    select.domElement.value = "All";
                }
                this.pageView.loadNFTs();
            },
        }));
        if (Object.keys(this.filtered).length > 0) {
            this.pageView.loadNFTs();
        }
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
exports.default = ItemFilter;
//# sourceMappingURL=ItemFilter.js.map