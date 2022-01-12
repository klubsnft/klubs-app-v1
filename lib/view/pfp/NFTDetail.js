"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const marked_1 = __importDefault(require("marked"));
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const xss_1 = __importDefault(require("xss"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Prompt_1 = __importDefault(require("../../component/dialogue/Prompt"));
const NFTDisplay_1 = __importDefault(require("../../component/NFTDisplay"));
const AcceptOfferPopup_1 = __importDefault(require("../../component/pfptrade/AcceptOfferPopup"));
const BidPopup_1 = __importDefault(require("../../component/pfptrade/BidPopup"));
const BuyPopup_1 = __importDefault(require("../../component/pfptrade/BuyPopup"));
const CreateAuctionPopup_1 = __importDefault(require("../../component/pfptrade/CreateAuctionPopup"));
const OfferPopup_1 = __importDefault(require("../../component/pfptrade/OfferPopup"));
const SellPopup_1 = __importDefault(require("../../component/pfptrade/SellPopup"));
const Config_1 = __importDefault(require("../../Config"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const KIP17Contract_1 = __importDefault(require("../../contracts/standard/KIP17Contract"));
const Klaytn_1 = __importDefault(require("../../klaytn/Klaytn"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Loader_1 = __importDefault(require("../../Loader"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class NFTDetail {
    constructor(params) {
        const addr = params.addr;
        const id = parseInt(params.id, 10);
        this.contract = new KIP17Contract_1.default(addr);
        Layout_1.default.current.title = (0, msg_js_1.default)("NFT_DETAIL_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-nft-detail-view", this.nftDisplayContainer = (0, skynode_1.el)(".nft-display-container"), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("BASE_INFO_TITLE")), (0, skynode_1.el)(".info", this.pfpDisplay = (0, skynode_1.el)("a.pfp", {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}`),
        }), this.nameDisplay = (0, skynode_1.el)(".name"), this.ownerDisplay = (0, skynode_1.el)(".owner"), this.descriptionDisplay = (0, skynode_1.el)(".description"), this.sendButtonContainer = (0, skynode_1.el)(".send-button-container"), (0, skynode_1.el)("a.refresh-button", (0, msg_js_1.default)("REFRESH_METADATA_BUTTON"), {
            click: async () => {
                await Loader_1.default.cacheMetadata(addr, id);
                skyrouter_1.SkyRouter.refresh();
            },
        }))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("PROPERTY_TITLE")), this.attributesDisplay = (0, skynode_1.el)(".attributes")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("DEAL_TITLE")), this.tradeForm = (0, skynode_1.el)(".trade-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("OFFER_PRICE_TITLE")), this.offerForm = (0, skynode_1.el)(".offer-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("AUCTION_TITLE")), this.auctionForm = (0, skynode_1.el)(".auction-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("TRANSACTION_HISTORY")), this.activity = (0, skynode_1.el)(".activity"))));
        this.loadPFP(addr);
        this.loadInfo(addr, id);
        this.loadTrade(addr, id);
    }
    async loadPFP(addr) {
        const extras = await PFPsContract_1.default.extras(addr);
        try {
            const data = JSON.parse(extras);
            if (data.name !== undefined) {
                Layout_1.default.current.title = data.name;
                this.pfpDisplay.empty().appendText(data.name);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async loadTrade(addr, id) {
        const owner = await this.contract.ownerOf(id);
        if (owner === PFPStoreContract_1.default.address) {
            this.ownerDisplay.empty().appendText((0, msg_js_1.default)("SELLER"));
            const selling = await PFPStoreContract_1.default.checkSelling(addr, id);
            if (selling === true) {
                const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
                this.ownerDisplay.append((0, skynode_1.el)("a", CommonUtil_1.default.shortenAddress(saleInfo.seller), {
                    click: () => ViewUtil_1.default.go(`/user/${saleInfo.seller}`),
                }));
            }
            else {
                const auction = await PFPStoreContract_1.default.auctions(addr, id);
                this.ownerDisplay.append((0, skynode_1.el)("a", CommonUtil_1.default.shortenAddress(auction.seller), {
                    click: () => ViewUtil_1.default.go(`/user/${auction.seller}`),
                }));
            }
        }
        else {
            this.ownerDisplay.empty().appendText((0, msg_js_1.default)("OWNER_INFO"));
            this.ownerDisplay.append((0, skynode_1.el)("a", CommonUtil_1.default.shortenAddress(owner), {
                click: () => ViewUtil_1.default.go(`/user/${owner}`),
            }));
        }
        const address = await Wallet_1.default.loadAddress();
        if (owner === address) {
            this.sendButtonContainer.empty().append((0, skynode_1.el)("a", (0, msg_js_1.default)("TRANSFER_BUTTON"), {
                click: () => new Prompt_1.default((0, msg_js_1.default)("TRANSFER_TITLE"), (0, msg_js_1.default)("TRANSFER_DESCRIPTION"), (0, msg_js_1.default)("TRANSFER_BUTTON"), async (to) => {
                    await this.contract.transfer(to, id);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                }),
            }));
        }
        this.loadSale(address, owner, addr, id);
        this.loadOffers(address, owner, addr, id);
        this.loadAuction(address, owner, addr, id);
        this.loadActivity(address, owner, addr, id);
    }
    async loadInfo(addr, id) {
        try {
            const data = await Loader_1.default.loadMetadata(addr, id);
            this.nftDisplayContainer.empty();
            if (data.image !== undefined) {
                this.nftDisplayContainer.append(new NFTDisplay_1.default(data.image));
            }
            this.nameDisplay.empty().appendText(data.name !== undefined ? data.name : `#${id}`);
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(data.description));
            }
            if (data.attributes !== undefined) {
                this.attributesDisplay.empty();
                for (const attribute of data.attributes) {
                    (0, skynode_1.el)(".attribute", (0, skynode_1.el)(".trait", attribute.trait_type), (0, skynode_1.el)(".value", String(attribute.value))).appendTo(this.attributesDisplay);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async loadSale(walletAddress, owner, addr, id) {
        this.tradeForm.empty();
        const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
        const priceDispay = (0, skynode_1.el)(".price-container").appendTo(this.tradeForm);
        if (saleInfo.price.gt(0)) {
            priceDispay.append((0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "48" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(saleInfo.price)))));
            const result = await superagent_1.default.get("https://api.klu.bs/mix/price");
            const wonPrice = Math.floor(parseFloat(ethers_1.utils.formatEther(saleInfo.price)) * parseFloat(result.text));
            priceDispay.append((0, skynode_1.el)(".won-price", "(₩ ", CommonUtil_1.default.numberWithCommas(wonPrice.toString()), ")"));
        }
        else {
            priceDispay.appendText((0, msg_js_1.default)("NOT_SELLING_DESCRIPTION"));
        }
        if (walletAddress === owner) {
            this.tradeForm.append((0, skynode_1.el)("a.sell-button", (0, msg_js_1.default)("SELL_IT_BUTTON"), {
                click: () => new SellPopup_1.default([addr], [id]),
            }));
        }
        else if (saleInfo.seller === walletAddress) {
            this.tradeForm.append((0, skynode_1.el)("a.cancel-sell-button", (0, msg_js_1.default)("CANCEL_SELL_BUTTON"), {
                click: async () => {
                    await PFPStoreContract_1.default.cancelSale([addr], [id]);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                },
            }));
        }
        else if (saleInfo.price.gt(0)) {
            this.tradeForm.append((0, skynode_1.el)("a.buy-button", (0, msg_js_1.default)("BUY_IT_BUTTON"), {
                click: () => new BuyPopup_1.default([addr], [id]),
            }));
        }
    }
    async loadOffers(walletAddress, owner, addr, id) {
        this.offerForm.empty();
        const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
        const offerCount = (await PFPStoreContract_1.default.offerCount(addr, id)).toNumber();
        const list = (0, skynode_1.el)(".list").appendTo(this.offerForm);
        const promises = [];
        for (let i = 0; i < offerCount; i += 1) {
            const promise = async (offerId) => {
                try {
                    const offerInfo = await PFPStoreContract_1.default.offers(addr, id, offerId);
                    if (offerInfo.price.gt(0)) {
                        const offer = (0, skynode_1.el)(".offer", (0, skynode_1.el)(".offeror", CommonUtil_1.default.shortenAddress(offerInfo.offeror)), (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(offerInfo.price))))).appendTo(list);
                        if (offerInfo.offeror === walletAddress) {
                            offer.append((0, skynode_1.el)("a.cancel-offer-button", (0, msg_js_1.default)("CANCEL_OFFER"), {
                                click: async () => {
                                    await PFPStoreContract_1.default.cancelOffer(addr, id, offerId);
                                    ViewUtil_1.default.waitTransactionAndRefresh();
                                },
                            }));
                        }
                        else if (walletAddress === owner) {
                            offer.append((0, skynode_1.el)("a.accept-offer-button", (0, msg_js_1.default)("ACCEPT_OFFER_BUTTON"), {
                                click: () => new AcceptOfferPopup_1.default(addr, id, offerId),
                            }));
                        }
                        if (walletAddress === Config_1.default.adminAddress) {
                            offer.append((0, skynode_1.el)("a.cancel-offer-button", (0, msg_js_1.default)("FORCE_CANCEL_OFFER_BUTTON"), {
                                click: async () => {
                                    await PFPStoreContract_1.default.cancelOfferByOwner([addr], [id], [offerId]);
                                    ViewUtil_1.default.waitTransactionAndRefresh();
                                },
                            }));
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
        if (walletAddress !== owner && saleInfo.seller !== walletAddress) {
            this.offerForm.append((0, skynode_1.el)("a.offer-button", (0, msg_js_1.default)("OFFER_PRICE_BUTTON"), {
                click: () => new OfferPopup_1.default(addr, id),
            }));
        }
    }
    async loadAuction(walletAddress, owner, addr, id) {
        const auctionStarted = await PFPStoreContract_1.default.checkAuction(addr, id);
        if (auctionStarted === true) {
            const auction = await PFPStoreContract_1.default.auctions(addr, id);
            const biddingCount = (await PFPStoreContract_1.default.biddingCount(addr, id)).toNumber();
            let diff = 0;
            const p = (0, skynode_1.el)("p").appendTo(this.auctionForm);
            const refresh = async () => {
                diff = auction.endBlock - await Klaytn_1.default.loadBlockNumber();
                p.empty();
                if (diff < 0) {
                    p.appendText((0, msg_js_1.default)("ENDED_AUCTION_DESCRIPTION"));
                }
                else {
                    p.appendText(`${(0, msg_js_1.default)("END_AUCTION_REMAINS").replace(/{n}/, String(diff))} (${CommonUtil_1.default.displayBlockDuration(diff)})`);
                }
            };
            await refresh();
            clearInterval(this.refreshInterval);
            this.refreshInterval = setInterval(() => refresh(), 1000);
            const list = (0, skynode_1.el)(".list").appendTo(this.auctionForm);
            const promises = [];
            for (let i = biddingCount - 1; i >= 0; i -= 1) {
                const promise = async (biddingId) => {
                    const bid = (0, skynode_1.el)(".bid").appendTo(list);
                    try {
                        const bidding = await PFPStoreContract_1.default.biddings(addr, id, biddingId);
                        if (bidding.price.gt(0)) {
                            bid.append((0, skynode_1.el)(".bidder", CommonUtil_1.default.shortenAddress(bidding.bidder)), (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(bidding.price)))));
                        }
                        else {
                            bid.delete();
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            if (diff < 0) {
                if (biddingCount === 0) {
                    if (walletAddress === auction.seller) {
                        this.auctionForm.append((0, skynode_1.el)("a.claim-button", (0, msg_js_1.default)("END_AUCTION_BUTTON"), {
                            click: async () => {
                                await PFPStoreContract_1.default.cancelAuction(addr, id);
                                ViewUtil_1.default.waitTransactionAndRefresh();
                            },
                        }));
                    }
                }
                else {
                    this.auctionForm.append((0, skynode_1.el)("a.claim-button", (0, msg_js_1.default)("END_AUCTION_BUTTON"), {
                        click: async () => {
                            await PFPStoreContract_1.default.claim(addr, id);
                            ViewUtil_1.default.waitTransactionAndRefresh();
                        },
                    }));
                }
            }
            else if (walletAddress !== auction.seller) {
                this.auctionForm.append((0, skynode_1.el)("a.bid-button", (0, msg_js_1.default)("BID_IT_BUTTON"), {
                    click: () => new BidPopup_1.default(addr, id),
                }));
            }
            else if (biddingCount === 0) {
                this.auctionForm.append((0, skynode_1.el)("a.claim-button", (0, msg_js_1.default)("END_AUCTION_BUTTON"), {
                    click: async () => {
                        await PFPStoreContract_1.default.cancelAuction(addr, id);
                        ViewUtil_1.default.waitTransactionAndRefresh();
                    },
                }));
            }
        }
        else if (walletAddress === owner) {
            this.auctionForm.append((0, skynode_1.el)("a.create-auction-button", (0, msg_js_1.default)("START_AUCTION_BUTTON"), {
                click: () => new CreateAuctionPopup_1.default(addr, id),
            }));
        }
    }
    async loadActivity(walletAddress, owner, addr, id) {
        const list = (0, skynode_1.el)(".list").appendTo(this.activity);
        const result = await superagent_1.default.get(`https://api.klu.bs/v2/pfp/${addr}/${id}/trades`);
        for (const trade of result.body) {
            let eventName;
            if (trade.event === "Sell") {
                eventName = (0, msg_js_1.default)("ACTIVITY_SELL");
            }
            else if (trade.event === "Buy") {
                eventName = (0, msg_js_1.default)("ACTIVITY_BUY");
            }
            else if (trade.event === "CancelSale") {
                eventName = (0, msg_js_1.default)("ACTIVITY_CANCEL_SALE");
            }
            else if (trade.event === "MakeOffer") {
                eventName = (0, msg_js_1.default)("ACTIVITY_OFFER");
            }
            else if (trade.event === "CancelOffer") {
                eventName = (0, msg_js_1.default)("ACTIVITY_CANCEL_OFFER");
            }
            else if (trade.event === "AcceptOffer") {
                eventName = (0, msg_js_1.default)("ACTIVITY_ACCEPT_OFFER");
            }
            else if (trade.event === "CreateAuction") {
                eventName = (0, msg_js_1.default)("ACTIVITY_START_AUCTION");
            }
            else if (trade.event === "CancelAuction") {
                eventName = (0, msg_js_1.default)("ACTIVITY_CANCEL_AUCTION");
            }
            else if (trade.event === "Bid") {
                eventName = (0, msg_js_1.default)("ACTIVITY_BID");
            }
            else if (trade.event === "Claim") {
                eventName = (0, msg_js_1.default)("ACTIVITY_END_AUCTION");
            }
            (0, skynode_1.el)(".activity", (0, skynode_1.el)(".event", eventName), (0, skynode_1.el)(".user", CommonUtil_1.default.shortenAddress(trade.user)), trade.price === undefined ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(trade.price))))).appendTo(list);
        }
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.refreshInterval);
        this.container.delete();
    }
}
exports.default = NFTDetail;
//# sourceMappingURL=NFTDetail.js.map