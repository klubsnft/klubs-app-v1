"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const superagent_1 = __importDefault(require("superagent"));
const xss_1 = __importDefault(require("xss"));
const PFPNFTCard_1 = __importDefault(require("../../component/PFPNFTCard"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Detail {
    constructor(params) {
        this.totalSupply = 0;
        this.idQuery = "";
        this.page = 0;
        this.onlySale = true;
        const addr = params.addr;
        Layout_1.default.current.title = "PFP 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-detail-view", this.header = (0, skynode_1.el)("header", this.iconDisplay = (0, skynode_1.el)("img"), (0, skynode_1.el)(".body", this.nameDisplay = (0, skynode_1.el)("h1"), this.descriptionDisplay = (0, skynode_1.el)("p"), this.socialList = (0, skynode_1.el)(".social"))), (0, skynode_1.el)("main", (0, skynode_1.el)("header", (0, skynode_1.el)("h2", "NFT 목록"), (0, skynode_1.el)(".tab-container", this.saleTab = (0, skynode_1.el)("a.tab", "판매중", {
            click: () => {
                this.onlySale = true;
                this.loadNFTs(addr);
            },
        }), this.totalTab = (0, skynode_1.el)("a.tab", "전체", {
            click: () => {
                this.onlySale = false;
                this.loadNFTs(addr);
            },
        }))), (0, skynode_1.el)(".content", (0, skynode_1.el)(".search-box", this.idQueryInput = (0, skynode_1.el)("input", {
            placeholder: "ID로 검색",
            change: () => {
                this.idQuery = this.idQueryInput.domElement.value;
                this.loadNFTs(addr);
            },
        })), (0, skynode_1.el)(".list-container", this.nftLoading = (0, skynode_1.el)(".loading", "Loading..."), this.nftList = (0, skynode_1.el)(".list"))), (0, skynode_1.el)(".pagination", this.prevButton = (0, skynode_1.el)("a.prev", {
            click: () => {
                if (this.page > 0) {
                    this.page -= 1;
                    this.loadNFTs(addr);
                }
            },
        }), this.nextButton = (0, skynode_1.el)("a.next", {
            click: () => {
                if (this.page < Math.ceil(this.totalSupply / 50) - 1) {
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
                Layout_1.default.current.title = data.name;
                this.nameDisplay.empty().appendText(data.name);
            }
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(data.description));
            }
            this.socialList.empty();
            if (data.twitter !== undefined && data.twitter.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/twitter.svg", height: 24 }), { href: data.twitter, target: "_blank" }));
            }
            if (data.kakaotalk !== undefined && data.kakaotalk.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/kakaotalk.svg", height: 24 }), { href: data.kakaotalk, target: "_blank" }));
            }
            const address = await Wallet_1.default.loadAddress();
            if (address !== undefined && await PFPsContract_1.default.existsManager(addr, address) === true) {
                (0, skynode_1.el)("button.update-button", "정보 수정", {
                    click: () => ViewUtil_1.default.go(`/pfp/${addr}/update`),
                }).appendTo(this.header);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async loadNFTs(addr) {
        this.nftLoading.style({ display: "block" });
        this.totalSupply = (await PFPsContract_1.default.getTotalSupply(addr)).toNumber();
        if (this.page === 0) {
            this.prevButton.addClass("disable");
        }
        if (this.page === Math.ceil(this.totalSupply / 50) - 1) {
            this.nextButton.addClass("disable");
        }
        this.nftList.empty();
        if (this.onlySale === true) {
            this.saleTab.addClass("on");
            this.totalTab.deleteClass("on");
            const count = (await PFPStoreContract_1.default.onSalesCount(addr)).toNumber();
            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > count) {
                limit = count;
            }
            const promises = [];
            for (let i = start; i < limit; i += 1) {
                const promise = async (index) => {
                    try {
                        const id = (await PFPStoreContract_1.default.onSales(addr, index)).toNumber();
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
        }
        else {
            this.saleTab.deleteClass("on");
            this.totalTab.addClass("on");
            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > this.totalSupply) {
                limit = this.totalSupply;
            }
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
        }
        this.nftLoading.style({ display: "none" });
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map