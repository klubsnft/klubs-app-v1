"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Rankings {
    constructor() {
        Layout_1.default.current.title = "PFP 랭킹";
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".pfp-ranking-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "PFP 랭킹"), (0, skynode_1.el)("span", "Klubs의 상위 PFP는 거래량에 따라서 집계되었습니다.")), (0, skynode_1.el)("table", (0, skynode_1.el)("thead", (0, skynode_1.el)("tr", (0, skynode_1.el)("td", "PFP", { colspan: "3" }), (0, skynode_1.el)("td", "총 거래량"), (0, skynode_1.el)("td.mobile", "30일 거래량"), (0, skynode_1.el)("td.mobile", "7일 거래량"), (0, skynode_1.el)("td.mobile", "24시간 거래량"))), this.list = (0, skynode_1.el)("tbody")), this.loading = new Loading_1.default())));
        this.load();
    }
    async load() {
        const result = await superagent_1.default.get("https://api.klu.bs/v2/volumes");
        result.body.sort((a, b) => {
            return b.total - a.total;
        });
        const promises = [];
        let realIndex = 0;
        for (const [, _info] of result.body.entries()) {
            const promise = async (info) => {
                if (await PFPsContract_1.default.banned(info.id) !== true) {
                    const extras = await PFPsContract_1.default.extras(info.id);
                    if (extras.trim() !== "") {
                        let data = {};
                        try {
                            data = JSON.parse(extras);
                        }
                        catch (e) { }
                        if (data.name !== "" && data.hiding !== true && this.container.deleted !== true) {
                            let src;
                            if (data.icon === undefined || data.icon.trim() === "") {
                                src = "/images/placeholder.svg";
                            }
                            else {
                                src = data.icon;
                            }
                            this.list.append((0, skynode_1.el)("tr", (0, skynode_1.el)("td", String(realIndex + 1)), (0, skynode_1.el)("td", (0, skynode_1.el)("img", { src, height: "40" })), (0, skynode_1.el)("td", (0, skynode_1.el)("a", data.name, { click: () => ViewUtil_1.default.go(`/pfp/${info.id}`) })), (0, skynode_1.el)("td", CommonUtil_1.default.numberWithCommas(String(info.total)), " MIX"), (0, skynode_1.el)("td.mobile", CommonUtil_1.default.numberWithCommas(String(info.volume30d)), " MIX"), (0, skynode_1.el)("td.mobile", CommonUtil_1.default.numberWithCommas(String(info.volume7d)), " MIX"), (0, skynode_1.el)("td.mobile", CommonUtil_1.default.numberWithCommas(String(info.volume24h)), " MIX")));
                            realIndex += 1;
                        }
                    }
                }
            };
            promises.push(promise(_info));
        }
        await Promise.all(promises);
        this.loading.delete();
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Rankings;
//# sourceMappingURL=Rankings.js.map