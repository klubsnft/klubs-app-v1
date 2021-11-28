"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const Loading_1 = __importDefault(require("../../../component/loading/Loading"));
const PFPNFTCard_1 = __importDefault(require("../../../component/PFPNFTCard"));
const PFPFilter_1 = __importDefault(require("../../../component/pfppage/PFPFilter"));
const PFPPageTabs_1 = __importDefault(require("../../../component/pfppage/PFPPageTabs"));
const PFPPagination_1 = __importDefault(require("../../../component/pfppage/PFPPagination"));
const PFPSortor_1 = __importDefault(require("../../../component/pfppage/PFPSortor"));
const PFPStoreContract_1 = __importDefault(require("../../../contracts/PFPStoreContract"));
const PageLayout_1 = __importDefault(require("./PageLayout"));
class PageSelling {
    constructor(params) {
        this.page = 1;
        PageLayout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-page-view.pfp-page-selling-view"));
        this.load(params.addr, params.page);
    }
    async load(addr, _page) {
        this.addr = addr;
        this.page = _page === undefined ? 1 : parseInt(_page, 10);
        this.container.append((0, skynode_1.el)("header", (0, skynode_1.el)("h2", "NFT 목록"), new PFPPageTabs_1.default(addr, "selling"), this.sortor = new PFPSortor_1.default(this)), (0, skynode_1.el)(".content", this.filter = new PFPFilter_1.default(this), (0, skynode_1.el)(".list-container", this.nftLoading = new Loading_1.default(), this.pagination1 = new PFPPagination_1.default(this, this.page), this.nftList = (0, skynode_1.el)(".list"), this.pagination2 = new PFPPagination_1.default(this, this.page))));
        this.loadNFTs();
    }
    async loadNFTs() {
        this.nftLoading.show();
        this.nftList.empty();
        let totalSupply;
        if (this.filter.idQuery !== undefined) {
            totalSupply = 1;
        }
        else {
            totalSupply = (await PFPStoreContract_1.default.onSalesCount(this.addr)).toNumber();
        }
        const lastPage = Math.ceil(totalSupply / 50);
        if (this.page > lastPage) {
            this.page = lastPage;
        }
        this.pagination1.update(this.page, lastPage);
        this.pagination2.update(this.page, lastPage);
        if (this.filter.idQuery !== undefined) {
            new PFPNFTCard_1.default(this.addr, this.filter.idQuery).appendTo(this.nftList);
        }
        else {
            const start = (this.page - 1) * 50;
            let limit = this.page * 50;
            if (limit > totalSupply) {
                limit = totalSupply;
            }
            if (this.sortor.sortType === "price-asc") {
                const result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/asc`);
                const dataSet = result.body;
                for (let i = start; i < limit; i += 1) {
                    new PFPNFTCard_1.default(this.addr, dataSet[i].nftId).appendTo(this.nftList);
                }
            }
            else if (this.sortor.sortType === "price-desc") {
                const result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/desc`);
                const dataSet = result.body;
                for (let i = start; i < limit; i += 1) {
                    new PFPNFTCard_1.default(this.addr, dataSet[i].nftId).appendTo(this.nftList);
                }
            }
            else {
                const promises = [];
                for (let i = start; i < limit; i += 1) {
                    const promise = async (index) => {
                        try {
                            const id = (await PFPStoreContract_1.default.onSales(this.addr, index)).toNumber();
                            if (this.container.deleted !== true) {
                                new PFPNFTCard_1.default(this.addr, id).appendTo(this.nftList);
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                    };
                    promises.push(promise(i));
                }
                await Promise.all(promises);
            }
        }
        this.nftLoading.hide();
    }
    goPage(page) {
        skyrouter_1.SkyRouter.go(`/pfp/${this.addr}/selling/${page}`);
    }
    changeParams(params, uri) {
        this.page = params.page === undefined ? 1 : parseInt(params.page, 10);
        this.loadNFTs();
    }
    close() {
        if (this.container.deleted !== true) {
            this.container.delete();
        }
    }
}
exports.default = PageSelling;
//# sourceMappingURL=PageSelling.js.map