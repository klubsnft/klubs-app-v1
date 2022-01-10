"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const msg_js_1 = __importDefault(require("msg.js"));
const superagent_1 = __importDefault(require("superagent"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const PFPCard_1 = __importDefault(require("../../component/PFPCard"));
const PFPNFTCard_1 = __importDefault(require("../../component/PFPNFTCard"));
const PFPPagination_1 = __importDefault(require("../../component/pfppage/PFPPagination"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class MyPFPs {
    constructor(params) {
        this.addr = "";
        this.page = params.page === undefined ? 1 : parseInt(params.page, 10);
        Layout_1.default.current.title = (0, msg_js_1.default)("MY_INFO");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".user-my-pfps-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("MY_PFP_INFO"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_MANAGE_PFP")), this.managingLoading = new Loading_1.default(), this.managingList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_SELLING_PFP")), this.sellingLoading = new Loading_1.default(), this.sellingList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_BIDDING_PFP")), this.auctionLoading = new Loading_1.default(), this.auctionList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_OFFER_PFP")), this.offeringLoading = new Loading_1.default(), this.offeringList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_PFP_LIST")), (0, skynode_1.el)("p.warning", (0, skynode_1.el)("i.fas.fa-exclamation-triangle"), (0, msg_js_1.default)("MY_PFP_DESC1")), this.myNFTLoading = new Loading_1.default(), this.pagination1 = new PFPPagination_1.default(this, this.page), this.myNFTList = (0, skynode_1.el)(".list"), this.pagination2 = new PFPPagination_1.default(this, this.page))));
        this.load();
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.loadManaging(address);
            this.loadSelling(address);
            this.loadAuctions(address);
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
    async loadAuctions(address) {
        this.auctionList.empty();
        const count = (await PFPStoreContract_1.default.userAuctionInfoLength(address)).toNumber();
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index) => {
                const info = await PFPStoreContract_1.default.userAuctionInfo(address, index);
                if (this.container.deleted !== true) {
                    new PFPNFTCard_1.default(info.pfp, info.id).appendTo(this.auctionList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        if (this.container.deleted !== true) {
            this.auctionLoading.delete();
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
        const result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/owned/${address}/${this.page - 1}`);
        const info = result.body;
        if (this.page > info.totalPage) {
            this.page = info.totalPage;
        }
        this.pagination1.update(this.page, info.totalPage);
        this.pagination2.update(this.page, info.totalPage);
        for (const data of info.dataSet) {
            new PFPNFTCard_1.default(data.addr, data.nftId).appendTo(this.myNFTList);
        }
        if (this.container.deleted !== true) {
            this.myNFTLoading.style({ display: "none" });
        }
    }
    async loadNFTs() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.loadMyNFTs(address);
        }
    }
    goPage(page) {
        skyrouter_1.SkyRouter.go(`/user/my-pfps/${page}`);
    }
    toggleRarityMode() {
    }
    changeParams(params, uri) {
        this.page = params.page === undefined ? 1 : parseInt(params.page, 10);
        this.loadNFTs();
    }
    close() {
        this.container.delete();
    }
}
exports.default = MyPFPs;
//# sourceMappingURL=MyPFPs.js.map