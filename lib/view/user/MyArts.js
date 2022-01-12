"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const ArtNFTCard_1 = __importDefault(require("../../component/ArtNFTCard"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const ArtsContract_1 = __importDefault(require("../../contracts/ArtsContract"));
const ArtStoreContract_1 = __importDefault(require("../../contracts/ArtStoreContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class MyArts {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("MY_ARTS_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".user-my-arts-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("MY_ARTS_TITLE"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_ADD_ARTS_TITLE")), this.artistArtsLoading = new Loading_1.default(), this.artistArtsList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_SELLING_ARTS_TITLE")), this.sellingLoading = new Loading_1.default(), this.sellingList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_BIDDING_ARTS_TITLE")), this.auctionLoading = new Loading_1.default(), this.auctionList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_OFFER_ARTS_TITLE")), this.offeringLoading = new Loading_1.default(), this.offeringList = (0, skynode_1.el)(".list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MY_ARTS_LIST_TITLE")), this.myNFTLoading = new Loading_1.default(), this.myNFTList = (0, skynode_1.el)(".list"))));
        this.load();
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.loadArtistArts(address);
            this.loadSelling(address);
            this.loadAuctions(address);
            this.loadOffering(address);
            this.loadMyNFTs(address);
        }
    }
    async loadArtistArts(address) {
        this.artistArtsList.empty();
        const count = (await ArtsContract_1.default.artistArtCount(address)).toNumber();
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index) => {
                const id = await ArtsContract_1.default.artistArts(address, index);
                if (await ArtsContract_1.default.exists(id) === true && this.container.deleted !== true) {
                    new ArtNFTCard_1.default(id.toNumber()).appendTo(this.artistArtsList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        if (this.container.deleted !== true) {
            this.artistArtsLoading.delete();
        }
    }
    async loadSelling(address) {
        this.sellingList.empty();
        const count = (await ArtStoreContract_1.default.userSellInfoLength(address)).toNumber();
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index) => {
                const info = await ArtStoreContract_1.default.userSellInfo(address, index);
                if (this.container.deleted !== true) {
                    new ArtNFTCard_1.default(info.id).appendTo(this.sellingList);
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
        const count = (await ArtStoreContract_1.default.userAuctionInfoLength(address)).toNumber();
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index) => {
                const info = await ArtStoreContract_1.default.userAuctionInfo(address, index);
                if (this.container.deleted !== true) {
                    new ArtNFTCard_1.default(info.id).appendTo(this.auctionList);
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
        const count = (await ArtStoreContract_1.default.userOfferInfoLength(address)).toNumber();
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index) => {
                const info = await ArtStoreContract_1.default.userOfferInfo(address, index);
                if (this.container.deleted !== true) {
                    new ArtNFTCard_1.default(info.id).appendTo(this.offeringList);
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
        const ids = [];
        const totalSupply = (await ArtsContract_1.default.balanceOf(address)).toNumber();
        const promises = [];
        for (let i = 0; i < totalSupply; i += 1) {
            const promise = async (index) => {
                try {
                    const id = (await ArtsContract_1.default.tokenOfOwnerByIndex(address, index)).toNumber();
                    ids.push(id);
                }
                catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        ids.sort((a, b) => a - b);
        for (const id of ids) {
            new ArtNFTCard_1.default(id).appendTo(this.myNFTList);
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
exports.default = MyArts;
//# sourceMappingURL=MyArts.js.map