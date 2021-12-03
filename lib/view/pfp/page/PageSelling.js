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
const MultiplePFPSelector_1 = __importDefault(require("../../../component/pfppage/MultiplePFPSelector"));
const PFPFilter_1 = __importDefault(require("../../../component/pfppage/PFPFilter"));
const PFPPageTabs_1 = __importDefault(require("../../../component/pfppage/PFPPageTabs"));
const PFPPagination_1 = __importDefault(require("../../../component/pfppage/PFPPagination"));
const PFPSortor_1 = __importDefault(require("../../../component/pfppage/PFPSortor"));
const PFPStoreContract_1 = __importDefault(require("../../../contracts/PFPStoreContract"));
const PageLayout_1 = __importDefault(require("./PageLayout"));
class PageSelling {
    constructor(params) {
        this.page = 1;
        this.rarityMode = false;
        PageLayout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-page-view.pfp-page-selling-view"));
        this.load(params.addr, params.page);
    }
    async load(addr, _page) {
        this.addr = addr;
        this.page = _page === undefined ? 1 : parseInt(_page, 10);
        this.container.append((0, skynode_1.el)("header", (0, skynode_1.el)("h2", "NFT 목록"), new PFPPageTabs_1.default(addr, "selling"), this.sortor = new PFPSortor_1.default(this, "buy")), (0, skynode_1.el)(".content", this.filter = new PFPFilter_1.default(this), (0, skynode_1.el)(".list-container", this.nftLoading = new Loading_1.default(), this.pagination1 = new PFPPagination_1.default(this, this.page), this.nftList = (0, skynode_1.el)(".list"), this.pagination2 = new PFPPagination_1.default(this, this.page))));
        this.loadRarity();
        this.loadNFTs();
        this.sortor.on("multiple-buy", () => {
            if (this.multipleSelector !== undefined) {
                this.multipleSelector.delete();
            }
            else {
                this.multipleSelector = new MultiplePFPSelector_1.default(this.addr, "buy").appendTo(this.container);
                this.multipleSelector.on("delete", () => {
                    this.multipleSelector = undefined;
                    if (this.nftList.deleted !== true) {
                        for (const card of this.nftList.children) {
                            if (card instanceof PFPNFTCard_1.default) {
                                card.mode = "view";
                            }
                        }
                    }
                });
                for (const card of this.nftList.children) {
                    if (card instanceof PFPNFTCard_1.default) {
                        card.mode = "select";
                    }
                }
            }
        });
    }
    async loadRarity() {
        this.rarity = await PageLayout_1.default.loadRarity(this.addr);
        if (this.rarity !== undefined) {
            this.filter.createFilters(this.rarity);
            if (this.rarityMode === true) {
                for (const card of this.nftList.children) {
                    if (card instanceof PFPNFTCard_1.default) {
                        card.showRarity(this.rarity);
                    }
                }
            }
        }
    }
    toggleRarityMode() {
        if (this.rarityMode !== true) {
            if (this.rarity !== undefined) {
                for (const card of this.nftList.children) {
                    if (card instanceof PFPNFTCard_1.default) {
                        card.showRarity(this.rarity);
                    }
                }
            }
        }
        else {
            for (const card of this.nftList.children) {
                if (card instanceof PFPNFTCard_1.default) {
                    card.hideRarity();
                }
            }
        }
        this.rarityMode = this.rarityMode !== true;
    }
    createCard(id) {
        const card = new PFPNFTCard_1.default(this.addr, id, this.multipleSelector?.selecting(id)).appendTo(this.nftList);
        if (this.rarityMode === true && this.rarity !== undefined) {
            card.showRarity(this.rarity);
        }
        if (this.multipleSelector !== undefined) {
            card.mode = "select";
        }
        card.on("select", (id) => this.multipleSelector?.select(id));
        card.on("deselect", (id) => this.multipleSelector?.deselect(id));
    }
    async loadNFTs() {
        this.nftLoading.show();
        this.nftList.empty();
        const ids = [];
        const filteredIds = this.filter.filteredIds;
        let totalSupply = 0;
        if (this.sortor.sortType === "price-asc") {
            const result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/asc`);
            const dataSet = result.body;
            for (const data of dataSet) {
                if (filteredIds === undefined || filteredIds.includes(data.nftId) === true) {
                    ids.push(data.nftId);
                    totalSupply += 1;
                }
            }
        }
        else if (this.sortor.sortType === "price-desc") {
            const result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/desc`);
            const dataSet = result.body;
            for (const data of dataSet) {
                if (filteredIds === undefined || filteredIds.includes(data.nftId) === true) {
                    ids.push(data.nftId);
                    totalSupply += 1;
                }
            }
        }
        else {
            const _totalSupply = (await PFPStoreContract_1.default.onSalesCount(this.addr)).toNumber();
            const promises = [];
            for (let i = 0; i < _totalSupply; i += 1) {
                const promise = async (index) => {
                    try {
                        const id = (await PFPStoreContract_1.default.onSales(this.addr, index)).toNumber();
                        if (filteredIds === undefined || filteredIds.includes(id) === true) {
                            ids.push(id);
                            totalSupply += 1;
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
        const lastPage = totalSupply === 0 ? 1 : Math.ceil(totalSupply / 50);
        if (this.page > lastPage) {
            this.page = lastPage;
        }
        this.pagination1.update(this.page, lastPage);
        this.pagination2.update(this.page, lastPage);
        const start = (this.page - 1) * 50;
        let limit = this.page * 50;
        if (limit > totalSupply) {
            limit = totalSupply;
        }
        for (let i = start; i < limit; i += 1) {
            this.createCard(ids[i]);
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