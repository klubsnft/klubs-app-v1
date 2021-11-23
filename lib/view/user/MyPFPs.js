"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const PFPCard_1 = __importDefault(require("../../component/PFPCard"));
const PFPNFTCard_1 = __importDefault(require("../../component/PFPNFTCard"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const KIP17Contract_1 = __importDefault(require("../../contracts/standard/KIP17Contract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class MyPFPs {
    constructor() {
        Layout_1.default.current.title = "내 PFP";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".user-my-pfps-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "내 PFP 정보")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 관리하는 PFP"), this.managingLoading = new Loading_1.default(), this.managingList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 판매중인 PFP"), this.sellingLoading = new Loading_1.default(), this.sellingList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내가 가격을 제시한 PFP"), this.offeringLoading = new Loading_1.default(), this.offeringList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내 PFP 목록"), this.myNFTLoading = new Loading_1.default(), this.myNFTList = (0, skynode_1.el)(".list"))));
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
        this.myNFTList.empty();
        let totalCount = 0;
        const count = await PFPsContract_1.default.getAddrCount();
        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);
        const promises = [];
        for (const i of array) {
            const promise = async (index) => {
                const addr = await PFPsContract_1.default.addrs(index);
                const enumerable = await PFPsContract_1.default.enumerables(addr);
                if (enumerable === true) {
                    const contract = new KIP17Contract_1.default(addr);
                    const balance = (await contract.balanceOf(address)).toNumber();
                    totalCount += balance;
                    for (let j = 0; j < balance; j += 1) {
                        const id = (await contract.tokenOfOwnerByIndex(address, j)).toNumber();
                        if (this.container.deleted !== true) {
                            new PFPNFTCard_1.default(addr, id).appendTo(this.myNFTList);
                        }
                    }
                }
                else {
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        if (this.container.deleted !== true) {
            this.myNFTLoading.delete();
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MyPFPs;
//# sourceMappingURL=MyPFPs.js.map