"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class Rankings {
    constructor() {
        Layout_1.default.current.title = "PFP 랭킹";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".pfp-ranking-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "PFP 랭킹"), (0, skynode_1.el)(".filter", (0, skynode_1.el)("select", (0, skynode_1.el)("option", "최근 24시간"), (0, skynode_1.el)("option", "최근 7일"), (0, skynode_1.el)("option", "최근 30일"), (0, skynode_1.el)("option", "전체")))), (0, skynode_1.el)("table", (0, skynode_1.el)("thead", (0, skynode_1.el)("tr", (0, skynode_1.el)("td", "PFP", { colspan: 3 }), (0, skynode_1.el)("td", "거래량"), (0, skynode_1.el)("td", "24시간 %"), (0, skynode_1.el)("td", "7일 %"), (0, skynode_1.el)("td", "최저 가격"), (0, skynode_1.el)("td", "소유자"), (0, skynode_1.el)("td", "개수"))), (0, skynode_1.el)("tbody", (0, skynode_1.el)("tr", (0, skynode_1.el)("td", "1"), (0, skynode_1.el)("td", (0, skynode_1.el)("img", {})), (0, skynode_1.el)("td", "도지사운드클럽 메이트"), (0, skynode_1.el)("td", "12345 MIX"), (0, skynode_1.el)("td", "+39.21%"), (0, skynode_1.el)("td", "+19.21%"), (0, skynode_1.el)("td", "12 MIX"), (0, skynode_1.el)("td", "4.1K"), (0, skynode_1.el)("td", "10.0K")), (0, skynode_1.el)("tr", (0, skynode_1.el)("td", "1"), (0, skynode_1.el)("td", (0, skynode_1.el)("img", {})), (0, skynode_1.el)("td", "도지사운드클럽 메이트"), (0, skynode_1.el)("td", "12345 MIX"), (0, skynode_1.el)("td", "+39.21%"), (0, skynode_1.el)("td", "+19.21%"), (0, skynode_1.el)("td", "12 MIX"), (0, skynode_1.el)("td", "4.1K"), (0, skynode_1.el)("td", "10.0K")))), (0, skynode_1.el)(".pagination", (0, skynode_1.el)(".prev", "1-100"), (0, skynode_1.el)(".next", "101-200")))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Rankings;
//# sourceMappingURL=Rankings.js.map