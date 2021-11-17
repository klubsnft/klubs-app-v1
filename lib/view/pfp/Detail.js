"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const PFPNFTCard_1 = __importDefault(require("../../component/PFPNFTCard"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const KIP17Contract_1 = __importDefault(require("../../contracts/standard/KIP17Contract"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Detail {
    constructor(params) {
        this.totalSupply = 0;
        this.idQuery = "";
        this.page = 0;
        const addr = params.addr;
        this.contract = new KIP17Contract_1.default(addr);
        Layout_1.default.current.title = "PFP 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-detail-view", (0, skynode_1.el)("header", this.iconDisplay = (0, skynode_1.el)("img"), (0, skynode_1.el)(".body", this.nameDisplay = (0, skynode_1.el)("h1"), this.descriptionDisplay = (0, skynode_1.el)("p"), this.socialList = (0, skynode_1.el)(".social")), (0, skynode_1.el)("button.update-button", "정보 수정", {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}/update`),
        })), (0, skynode_1.el)("main", (0, skynode_1.el)("header", (0, skynode_1.el)("h2", "NFT 목록")), (0, skynode_1.el)(".content", (0, skynode_1.el)(".search-box", this.idQueryInput = (0, skynode_1.el)("input", {
            placeholder: "ID로 검색",
            change: () => {
                this.idQuery = this.idQueryInput.domElement.value;
                this.loadNFTs(addr);
            },
        })), this.nftLoading = (0, skynode_1.el)(".loading", "Loading..."), this.nftList = (0, skynode_1.el)(".list")), (0, skynode_1.el)(".pagination", this.prevButton = (0, skynode_1.el)("a.prev", {
            click: () => {
                if (this.page > 0) {
                    this.page -= 1;
                    this.loadNFTs(addr);
                }
            },
        }), this.nextButton = (0, skynode_1.el)("a.next", {
            click: () => {
                if (this.page < Math.ceil(this.totalSupply / 200) - 1) {
                    this.page += 1;
                    this.loadNFTs(addr);
                }
            },
        })))));
        this.loadInfo(addr);
        this.loadNFTs(addr);
    }
    async loadInfo(addr) {
        const extras = await PFPsContract_1.default.extras(addr);
        try {
            const data = JSON.parse(extras);
            if (data.icon === undefined || data.icon.trim() === "") {
                this.iconDisplay.domElement.src = "/images/placeholder.svg";
            }
            else {
                this.iconDisplay.domElement.src = data.icon;
            }
            if (data.name !== undefined) {
                this.nameDisplay.empty().appendText(data.name);
            }
            if (data.description !== undefined) {
                this.descriptionDisplay.empty().appendText(data.description);
            }
            this.socialList.empty();
            if (data.twitter !== undefined && data.twitter.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/twitter.svg", height: 24 }), { href: data.twitter, target: "_blank" }));
            }
            if (data.kakaotalk !== undefined && data.kakaotalk.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/kakaotalk.svg", height: 24 }), { href: data.kakaotalk, target: "_blank" }));
            }
        }
        catch (e) {
        }
    }
    async loadNFTs(addr) {
        this.nftLoading.style({ display: "block" });
        this.totalSupply = (await PFPsContract_1.default.getTotalSupply(addr)).toNumber();
        if (this.page === 0) {
            this.prevButton.addClass("disable");
        }
        if (this.page === Math.ceil(this.totalSupply / 200) - 1) {
            this.nextButton.addClass("disable");
        }
        const start = this.page * 200;
        let limit = (this.page + 1) * 200;
        if (limit > this.totalSupply) {
            limit = this.totalSupply;
        }
        this.nftList.empty();
        const promises = [];
        for (let i = start; i < limit; i += 1) {
            const promise = async (id) => {
                try {
                    const result = await superagent_1.default.get(`https://api.klu.bs/pfp/${addr}/${id}/proxy`);
                    const saleInfo = await PFPStoreContract_1.default.sales(addr, i);
                    new PFPNFTCard_1.default(addr, id, result.body.image, result.body.name, saleInfo.price).appendTo(this.nftList);
                }
                catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        this.nftLoading.style({ display: "none" });
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map