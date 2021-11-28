"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const PFPCard_1 = __importDefault(require("../../component/PFPCard"));
const PFPNFTCard_1 = __importDefault(require("../../component/PFPNFTCard"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class MyPFPs {
    constructor() {
        this.page = 0;
        this.totalPage = 0;
        Layout_1.default.current.title = "내 PFP";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".user-my-pfps-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "내 PFP 정보")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 관리하는 PFP"), this.managingLoading = new Loading_1.default(), this.managingList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 판매중인 PFP"), this.sellingLoading = new Loading_1.default(), this.sellingList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 가격을 제시한 PFP"), this.offeringLoading = new Loading_1.default(), this.offeringList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내 PFP 목록"), this.myNFTLoading = new Loading_1.default(), this.myNFTList = (0, skynode_1.el)(".list"), (0, skynode_1.el)(".pagination", this.prevButton = (0, skynode_1.el)("a.prev", (0, skynode_1.el)("i.fas.fa-arrow-left"), {
            click: async () => {
                if (this.page > 0) {
                    this.page -= 1;
                    const address = await Wallet_1.default.loadAddress();
                    if (address !== undefined) {
                        this.loadMyNFTs(address);
                    }
                }
                else {
                    new Alert_1.default("안내", "첫 페이지입니다.");
                }
            },
        }), this.nextButton = (0, skynode_1.el)("a.next", (0, skynode_1.el)("i.fas.fa-arrow-right"), {
            click: async () => {
                if (this.page < this.totalPage - 1) {
                    this.page += 1;
                    const address = await Wallet_1.default.loadAddress();
                    if (address !== undefined) {
                        this.loadMyNFTs(address);
                    }
                }
                else {
                    new Alert_1.default("안내", "마지막 페이지입니다.");
                }
            },
        })))));
        this.load();
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.loadManaging(address);
            this.loadSelling(address);
            this.loadOffering(address);
            this.loadMyNFTs(address);
        }
    }
    async loadManaging(address) {
        this.managingList.empty();
        const count = (await PFPsContract_1.default.getManagerPFPCount(address)).toNumber();
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index) => {
                const addr = await PFPsContract_1.default.managerPFPs(address, index);
                const extras = await PFPsContract_1.default.extras(addr);
                let data = {};
                try {
                    data = JSON.parse(extras);
                }
                catch (e) { }
                if (this.container.deleted !== true) {
                    new PFPCard_1.default(addr, data).appendTo(this.managingList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        if (this.container.deleted !== true) {
            this.managingLoading.delete();
        }
    }
    async loadSelling(address) {
        this.sellingList.empty();
        const count = (await PFPStoreContract_1.default.userSellInfoLength(address)).toNumber();
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index) => {
                const info = await PFPStoreContract_1.default.userSellInfo(address, index);
                if (this.container.deleted !== true) {
                    new PFPNFTCard_1.default(info.pfp, info.id).appendTo(this.sellingList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        if (this.container.deleted !== true) {
            this.sellingLoading.delete();
        }
    }
    async loadOffering(address) {
        this.offeringList.empty();
        const count = (await PFPStoreContract_1.default.userOfferInfoLength(address)).toNumber();
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index) => {
                const info = await PFPStoreContract_1.default.userOfferInfo(address, index);
                if (this.container.deleted !== true) {
                    new PFPNFTCard_1.default(info.pfp, info.id).appendTo(this.offeringList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        if (this.container.deleted !== true) {
            this.offeringLoading.delete();
        }
    }
    async loadMyNFTs(address) {
        this.myNFTLoading.style({ display: "block" });
        this.myNFTList.empty();
        const result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/owned/${address}/${this.page}`);
        const info = result.body;
        this.totalPage = info.totalPage;
        if (this.page === 0) {
            this.prevButton.addClass("disable");
        }
        if (this.page === info.totalPage - 1) {
            this.nextButton.addClass("disable");
        }
        for (const data of info.dataSet) {
            new PFPNFTCard_1.default(data.addr, data.nftId).appendTo(this.myNFTList);
        }
        if (this.container.deleted !== true) {
            this.myNFTLoading.style({ display: "none" });
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MyPFPs;
//# sourceMappingURL=MyPFPs.js.map