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
const PFPsContract_1 = __importDefault(require("../../../contracts/PFPsContract"));
const PageLayout_1 = __importDefault(require("./PageLayout"));
class PageAll {
    constructor(params) {
        this.page = 1;
        this.rarityMode = false;
        this.loadCount = 0;
        PageLayout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-page-view.pfp-page-all-view"));
        this.load(params.addr, params.page);
    }
    async load(addr, _page) {
        this.addr = addr;
        this.page = _page === undefined ? 1 : parseInt(_page, 10);
        this.container.append((0, skynode_1.el)("header", (0, skynode_1.el)("h2", "NFT 목록"), new PFPPageTabs_1.default(addr, "all"), this.sortor = new PFPSortor_1.default(this)), (0, skynode_1.el)(".content", this.filter = new PFPFilter_1.default(this), (0, skynode_1.el)(".list-container", this.nftLoading = new Loading_1.default(), this.pagination1 = new PFPPagination_1.default(this, this.page), this.nftList = (0, skynode_1.el)(".list"), this.pagination2 = new PFPPagination_1.default(this, this.page))));
        this.loadRarity();
        this.loadNFTs();
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
    createCard(currentLoadCount, id) {
        if (this.loadCount === currentLoadCount) {
            const card = new PFPNFTCard_1.default(this.addr, id).appendTo(this.nftList);
            if (this.rarityMode === true && this.rarity !== undefined) {
                card.showRarity(this.rarity);
            }
        }
    }
    async loadNFTs() {
        this.loadCount += 1;
        const currentLoadCount = this.loadCount;
        this.nftLoading.show();
        this.nftList.empty();
        let ids = [];
        let totalSupply;
        if (this.filter.filteredIds !== undefined) {
            ids = this.filter.filteredIds;
            totalSupply = ids.length;
        }
        else {
            let zeroExists = true;
            try {
                await PageLayout_1.default.current.contract.ownerOf(0);
            }
            catch (e) {
                zeroExists = false;
            }
            totalSupply = (await PFPsContract_1.default.getTotalSupply(this.addr)).toNumber();
            for (let id = 0; id < totalSupply; id += 1) {
                ids.push(zeroExists === true ? id : id + 1);
            }
        }
        const lastPage = totalSupply === 0 ? 1 : Math.ceil(totalSupply / 50);
        if (this.page > lastPage) {
            this.page = lastPage;
        }
        this.pagination1.update(this.page, lastPage);
        this.pagination2.update(this.page, lastPage);
        if (this.sortor.sortType === "price-asc") {
            const result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/asc`);
            const dataSet = result.body;
            const orders = {};
            for (const [index, data] of dataSet.entries()) {
                orders[data.nftId] = index;
            }
            ids.sort((a, b) => (orders[a] === undefined ? Infinity : orders[a]) - (orders[b] === undefined ? Infinity : orders[b]));
        }
        else if (this.sortor.sortType === "price-desc") {
            const result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${this.addr}/sales/desc`);
            const dataSet = result.body;
            const orders = {};
            for (const [index, data] of dataSet.entries()) {
                orders[data.nftId] = index;
            }
            ids.sort((a, b) => (orders[a] === undefined ? Infinity : orders[a]) - (orders[b] === undefined ? Infinity : orders[b]));
        }
        else if (this.sortor.sortType === "rarity-desc") {
            if (this.rarity !== undefined) {
                const orders = this.rarity.rankings;
                ids.sort((a, b) => (orders[a] === undefined ? Infinity : orders[a]) - (orders[b] === undefined ? Infinity : orders[b]));
            }
        }
        const start = (this.page - 1) * 50;
        let limit = this.page * 50;
        if (limit > totalSupply) {
            limit = totalSupply;
        }
        for (let i = start; i < limit; i += 1) {
            this.createCard(currentLoadCount, ids[i]);
        }
        this.nftLoading.hide();
    }
    goPage(page) {
        skyrouter_1.SkyRouter.go(`/pfp/${this.addr}/page/${page}`);
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
exports.default = PageAll;
//# sourceMappingURL=PageAll.js.map