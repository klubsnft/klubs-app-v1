"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const xss_1 = __importDefault(require("xss"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const PFPNFTCard_1 = __importDefault(require("../../component/PFPNFTCard"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const KIP17Contract_1 = __importDefault(require("../../contracts/standard/KIP17Contract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Loader_1 = __importDefault(require("../../Loader"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Detail {
    constructor(params) {
        this.totalSupply = 0;
        this.idQuery = "";
        this.page = 0;
        this.listType = "all";
        this.order = 0;
        const addr = params.addr;
        this.contract = new KIP17Contract_1.default(addr);
        Layout_1.default.current.title = "PFP 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-detail-view", this.header = (0, skynode_1.el)("header", this.iconDisplay = (0, skynode_1.el)("img"), (0, skynode_1.el)(".body", this.nameDisplay = (0, skynode_1.el)("h1"), this.descriptionDisplay = (0, skynode_1.el)("p"), this.miningInfoDisplay = (0, skynode_1.el)("p"), this.socialList = (0, skynode_1.el)(".social"))), (0, skynode_1.el)("main", (0, skynode_1.el)("header", (0, skynode_1.el)("h2", "NFT 목록"), (0, skynode_1.el)(".tab-container", this.totalTab = (0, skynode_1.el)("a.tab", "전체", {
            click: () => {
                this.listType = "all";
                this.loadNFTs(addr);
            },
        }), this.mineTab = (0, skynode_1.el)("a.tab", "내 NFT", {
            click: () => {
                this.listType = "mine";
                this.loadNFTs(addr);
            },
        }), this.saleTab = (0, skynode_1.el)("a.tab", "판매중", {
            click: () => {
                this.listType = "onSale";
                this.loadNFTs(addr);
            },
        }))), (0, skynode_1.el)(".content", (0, skynode_1.el)(".search-box", this.idQueryInput = (0, skynode_1.el)("input", {
            placeholder: "ID로 검색",
            change: () => {
                this.idQuery = this.idQueryInput.domElement.value;
                this.loadNFTs(addr);
            },
        })), (0, skynode_1.el)(".list-container", this.nftLoading = new Loading_1.default(), this.nftList = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".pagination", this.prevButton = (0, skynode_1.el)("a.prev", (0, skynode_1.el)("i.fas.fa-arrow-left"), {
            click: () => {
                if (this.page > 0) {
                    this.page -= 1;
                    this.loadNFTs(addr);
                }
                else {
                    new Alert_1.default("안내", "첫 페이지입니다.");
                }
            },
        }), this.nextButton = (0, skynode_1.el)("a.next", (0, skynode_1.el)("i.fas.fa-arrow-right"), {
            click: () => {
                if (this.page < Math.ceil(this.totalSupply / 50) - 1) {
                    this.page += 1;
                    this.loadNFTs(addr);
                }
                else {
                    new Alert_1.default("안내", "마지막 페이지입니다.");
                }
            },
        })))))));
        this.loadInfo(addr);
        this.loadUpdateButton(addr);
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
            if (data.mineable === true) {
                this.miningInfoDisplay.empty().append((0, skynode_1.el)("a.mining", (0, skynode_1.el)("img", { src: "/images/icon/mining.png", height: "14" }), (0, skynode_1.el)("span", "채굴 가능"), {
                    title: "채굴 가능한 PFP입니다. 클릭하시면 자세한 정보를 확인하실 수 있습니다.",
                    href: data.miningInfoURL,
                    target: "_blank",
                    click: (event) => event.stopPropagation(),
                }));
            }
            this.socialList.empty();
            if (data.twitter !== undefined && data.twitter.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/twitter.svg", height: 24 }), { href: data.twitter, target: "_blank" }));
            }
            if (data.kakaotalk !== undefined && data.kakaotalk.trim() !== "") {
                this.socialList.append((0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/icon/kakao-talk.svg", height: 24 }), { href: data.kakaotalk, target: "_blank" }));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async loadUpdateButton(addr) {
        try {
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
        this.order += 1;
        const currentOrder = this.order;
        const address = await Wallet_1.default.loadAddress();
        let balance = 0;
        if (address !== undefined) {
            balance = (await this.contract.balanceOf(address)).toNumber();
            this.mineTab.empty().appendText(`내 NFT (${balance})`);
        }
        const onSalesCount = (await PFPStoreContract_1.default.onSalesCount(addr)).toNumber();
        this.saleTab.empty().appendText(`판매중 (${onSalesCount})`);
        if (this.idQuery.trim() !== "") {
            this.totalTab.addClass("on");
            this.mineTab.deleteClass("on");
            this.saleTab.deleteClass("on");
            try {
                const id = parseInt(this.idQuery.trim(), 10);
                const data = await Loader_1.default.loadMetadata(addr, id);
                const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
                if (currentOrder === this.order) {
                    new PFPNFTCard_1.default(addr, id, data.image, data.name, saleInfo.price).appendTo(this.nftList);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        else if (this.listType === "mine") {
            this.totalTab.deleteClass("on");
            this.mineTab.addClass("on");
            this.saleTab.deleteClass("on");
            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > balance) {
                limit = balance;
            }
            const enumerable = await PFPsContract_1.default.enumerables(addr);
            if (enumerable === true && address !== undefined) {
                const promises = [];
                for (let i = start; i < limit; i += 1) {
                    const promise = async (index) => {
                        try {
                            const id = (await this.contract.tokenOfOwnerByIndex(address, index)).toNumber();
                            if (currentOrder === this.order) {
                                const data = await Loader_1.default.loadMetadata(addr, id);
                                const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
                                if (currentOrder === this.order) {
                                    new PFPNFTCard_1.default(addr, id, data.image, data.name, saleInfo.price).appendTo(this.nftList);
                                }
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
        else if (this.listType === "onSale") {
            this.totalTab.deleteClass("on");
            this.mineTab.deleteClass("on");
            this.saleTab.addClass("on");
            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > onSalesCount) {
                limit = onSalesCount;
            }
            const promises = [];
            for (let i = start; i < limit; i += 1) {
                const promise = async (index) => {
                    try {
                        const id = (await PFPStoreContract_1.default.onSales(addr, index)).toNumber();
                        if (currentOrder === this.order) {
                            const data = await Loader_1.default.loadMetadata(addr, id);
                            const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
                            if (currentOrder === this.order) {
                                new PFPNFTCard_1.default(addr, id, data.image, data.name, saleInfo.price).appendTo(this.nftList);
                            }
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
        else {
            this.totalTab.addClass("on");
            this.mineTab.deleteClass("on");
            this.saleTab.deleteClass("on");
            const start = this.page * 50;
            let limit = (this.page + 1) * 50;
            if (limit > this.totalSupply) {
                limit = this.totalSupply;
            }
            const promises = [];
            for (let i = start; i < limit; i += 1) {
                const promise = async (id) => {
                    try {
                        const data = await Loader_1.default.loadMetadata(addr, id);
                        const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
                        if (currentOrder === this.order) {
                            new PFPNFTCard_1.default(addr, id, data.image, data.name, saleInfo.price).appendTo(this.nftList);
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
        this.nftLoading.style({ display: "none" });
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map