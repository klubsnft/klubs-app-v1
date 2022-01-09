"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const marked_1 = __importDefault(require("marked"));
const superagent_1 = __importDefault(require("superagent"));
const xss_1 = __importDefault(require("xss"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const ArtAcceptOfferPopup_1 = __importDefault(require("../../component/arttrade/ArtAcceptOfferPopup"));
const ArtBidPopup_1 = __importDefault(require("../../component/arttrade/ArtBidPopup"));
const ArtBuyPopup_1 = __importDefault(require("../../component/arttrade/ArtBuyPopup"));
const ArtCreateAuctionPopup_1 = __importDefault(require("../../component/arttrade/ArtCreateAuctionPopup"));
const ArtOfferPopup_1 = __importDefault(require("../../component/arttrade/ArtOfferPopup"));
const ArtSellPopup_1 = __importDefault(require("../../component/arttrade/ArtSellPopup"));
const Prompt_1 = __importDefault(require("../../component/dialogue/Prompt"));
const NFTDisplay_1 = __importDefault(require("../../component/NFTDisplay"));
const Config_1 = __importDefault(require("../../Config"));
const ArtistsContract_1 = __importDefault(require("../../contracts/ArtistsContract"));
const ArtsContract_1 = __importDefault(require("../../contracts/ArtsContract"));
const ArtStoreContract_1 = __importDefault(require("../../contracts/ArtStoreContract"));
const Klaytn_1 = __importDefault(require("../../klaytn/Klaytn"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class ArtDetail {
    constructor(params) {
        const id = parseInt(params.id, 10);
        Layout_1.default.current.title = "NFT 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".arts-nft-detail-view", this.nftDisplayContainer = (0, skynode_1.el)(".nft-display-container"), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "기본 정보"), (0, skynode_1.el)(".info", this.nameDisplay = (0, skynode_1.el)(".name"), this.artistDisplay = (0, skynode_1.el)(".artist"), this.ownerDisplay = (0, skynode_1.el)(".owner"), this.descriptionDisplay = (0, skynode_1.el)(".description"), this.sendButtonContainer = (0, skynode_1.el)(".send-button-container"), this.updateButtonContainer = (0, skynode_1.el)(".update-button-container"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "거래하기"), this.tradeForm = (0, skynode_1.el)(".trade-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "가격 제안"), this.offerForm = (0, skynode_1.el)(".offer-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "경매"), this.auctionForm = (0, skynode_1.el)(".auction-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "거래 이력"), this.activity = (0, skynode_1.el)(".activity"))));
        this.loadArtist(id);
        this.loadInfo(id);
        this.loadTrade(id);
    }
    async loadArtist(id) {
        const artist = await ArtsContract_1.default.artToArtist(id);
        const extras = await ArtistsContract_1.default.extras(artist);
        let data = {};
        try {
            data = JSON.parse(extras);
        }
        catch (e) {
            console.log(e);
        }
        this.artistDisplay.empty().appendText("작가 ");
        this.artistDisplay.append((0, skynode_1.el)("a", data.name !== undefined ? data.name : CommonUtil_1.default.shortenAddress(artist), {
            click: () => ViewUtil_1.default.go(`/artists/${artist}`),
        }));
    }
    async loadTrade(id) {
        const owner = await ArtsContract_1.default.ownerOf(id);
        if (owner === ArtStoreContract_1.default.address) {
            this.ownerDisplay.empty().appendText("판매자 ");
            const selling = await ArtStoreContract_1.default.checkSelling(id);
            if (selling === true) {
                const saleInfo = await ArtStoreContract_1.default.sales(id);
                this.ownerDisplay.append((0, skynode_1.el)("a", CommonUtil_1.default.shortenAddress(saleInfo.seller), {
                    click: () => ViewUtil_1.default.go(`/user/${saleInfo.seller}`),
                }));
            }
            else {
                const auction = await ArtStoreContract_1.default.auctions(id);
                this.ownerDisplay.append((0, skynode_1.el)("a", CommonUtil_1.default.shortenAddress(auction.seller), {
                    click: () => ViewUtil_1.default.go(`/user/${auction.seller}`),
                }));
            }
        }
        else {
            this.ownerDisplay.empty().appendText("소유자 ");
            this.ownerDisplay.append((0, skynode_1.el)("a", CommonUtil_1.default.shortenAddress(owner), {
                click: () => ViewUtil_1.default.go(`/user/${owner}`),
            }));
        }
        const address = await Wallet_1.default.loadAddress();
        if (owner === address) {
            this.sendButtonContainer.empty().append((0, skynode_1.el)("a", "전송하기", {
                click: () => new Prompt_1.default("전송하기", "전송받을 지갑 주소를 입력해주시기 바랍니다. 전송이 완료되면 절대 되찾을 수 없으니, 지갑 주소를 여러번 확인하시기 바랍니다.", "전송하기", async (to) => {
                    await ArtsContract_1.default.transfer(to, id);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                }),
            }));
        }
        const artist = await ArtsContract_1.default.artToArtist(id);
        if (artist === address) {
            this.updateButtonContainer.empty().append((0, skynode_1.el)("a", "수정하기", {
                click: () => ViewUtil_1.default.go(`/arts/${id}/update`),
            }));
        }
        this.loadSale(address, owner, id);
        this.loadOffers(address, owner, id);
        this.loadAuction(address, owner, id);
        this.loadActivity(address, owner, id);
    }
    async loadInfo(id) {
        try {
            const result = await superagent_1.default.get(`https://api.klu.bs/arts/${id}`);
            const data = result.body;
            this.nftDisplayContainer.empty();
            if (data.image !== undefined) {
                this.nftDisplayContainer.append(new NFTDisplay_1.default(data.image));
            }
            this.nameDisplay.empty().appendText(data.name !== undefined ? data.name : `#${id}`);
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(data.description));
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async loadSale(walletAddress, owner, id) {
        this.tradeForm.empty();
        const saleInfo = await ArtStoreContract_1.default.sales(id);
        const priceDispay = (0, skynode_1.el)(".price-container").appendTo(this.tradeForm);
        if (saleInfo.price.gt(0)) {
            priceDispay.append((0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "48" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(saleInfo.price)))));
            const result = await superagent_1.default.get("https://api.klu.bs/mix/price");
            const wonPrice = Math.floor(parseFloat(ethers_1.utils.formatEther(saleInfo.price)) * parseFloat(result.text));
            priceDispay.append((0, skynode_1.el)(".won-price", "(₩ ", CommonUtil_1.default.numberWithCommas(wonPrice.toString()), ")"));
        }
        else {
            priceDispay.appendText("판매중이 아닙니다.");
        }
        if (saleInfo.seller === walletAddress) {
            this.tradeForm.append((0, skynode_1.el)("a.cancel-sell-button", "판매 취소", {
                click: async () => {
                    await ArtStoreContract_1.default.cancelSale([id]);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                },
            }));
        }
        else if (saleInfo.price.gt(0)) {
            this.tradeForm.append((0, skynode_1.el)("a.buy-button", "구매하기", {
                click: () => new ArtBuyPopup_1.default([id]),
            }));
        }
        else if (walletAddress === owner) {
            this.tradeForm.append((0, skynode_1.el)("a.sell-button", "판매하기", {
                click: () => new ArtSellPopup_1.default([id]),
            }));
        }
    }
    async loadOffers(walletAddress, owner, id) {
        this.offerForm.empty();
        const saleInfo = await ArtStoreContract_1.default.sales(id);
        const offerCount = (await ArtStoreContract_1.default.offerCount(id)).toNumber();
        const list = (0, skynode_1.el)(".list").appendTo(this.offerForm);
        const promises = [];
        for (let i = 0; i < offerCount; i += 1) {
            const promise = async (offerId) => {
                try {
                    const offerInfo = await ArtStoreContract_1.default.offers(id, offerId);
                    if (offerInfo.price.gt(0)) {
                        const offer = (0, skynode_1.el)(".offer", (0, skynode_1.el)(".offeror", CommonUtil_1.default.shortenAddress(offerInfo.offeror)), (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(offerInfo.price))))).appendTo(list);
                        if (offerInfo.offeror === walletAddress) {
                            offer.append((0, skynode_1.el)("a.cancel-offer-button", "제안 취소", {
                                click: async () => {
                                    await ArtStoreContract_1.default.cancelOffer(id, offerId);
                                    ViewUtil_1.default.waitTransactionAndRefresh();
                                },
                            }));
                        }
                        else if (walletAddress === owner) {
                            offer.append((0, skynode_1.el)("a.accept-offer-button", "제안 수락", {
                                click: () => new ArtAcceptOfferPopup_1.default(id, offerId),
                            }));
                        }
                        if (walletAddress === Config_1.default.adminAddress) {
                            offer.append((0, skynode_1.el)("a.cancel-offer-button", "강제 제안 취소", {
                                click: async () => {
                                    await ArtStoreContract_1.default.cancelOfferByOwner([id], [offerId]);
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
            this.offerForm.append((0, skynode_1.el)("a.offer-button", "가격 제안하기", {
                click: () => new ArtOfferPopup_1.default(id),
            }));
        }
    }
    async loadAuction(walletAddress, owner, id) {
        const auctionStarted = await ArtStoreContract_1.default.checkAuction(id);
        if (auctionStarted === true) {
            const auction = await ArtStoreContract_1.default.auctions(id);
            const biddingCount = (await ArtStoreContract_1.default.biddingCount(id)).toNumber();
            let diff = 0;
            const p = (0, skynode_1.el)("p").appendTo(this.auctionForm);
            const refresh = async () => {
                diff = auction.endBlock - await Klaytn_1.default.loadBlockNumber();
                p.empty();
                if (diff < 0) {
                    p.appendText("경매 종료됨");
                }
                else {
                    p.appendText(`경매 종료까지 ${diff} 블록 남음 (${CommonUtil_1.default.displayBlockDuration(diff)})`);
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
                        const bidding = await ArtStoreContract_1.default.biddings(id, biddingId);
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
                        this.auctionForm.append((0, skynode_1.el)("a.claim-button", "경매 종료", {
                            click: async () => {
                                await ArtStoreContract_1.default.cancelAuction(id);
                                ViewUtil_1.default.waitTransactionAndRefresh();
                            },
                        }));
                    }
                }
                else {
                    this.auctionForm.append((0, skynode_1.el)("a.claim-button", "경매 종료", {
                        click: async () => {
                            await ArtStoreContract_1.default.claim(id);
                            ViewUtil_1.default.waitTransactionAndRefresh();
                        },
                    }));
                }
            }
            else if (walletAddress !== auction.seller) {
                this.auctionForm.append((0, skynode_1.el)("a.bid-button", "입찰하기", {
                    click: () => new ArtBidPopup_1.default(id),
                }));
            }
            else if (biddingCount === 0) {
                this.auctionForm.append((0, skynode_1.el)("a.claim-button", "경매 종료", {
                    click: async () => {
                        await ArtStoreContract_1.default.cancelAuction(id);
                        ViewUtil_1.default.waitTransactionAndRefresh();
                    },
                }));
            }
        }
        else if (walletAddress === owner) {
            this.auctionForm.append((0, skynode_1.el)("a.create-auction-button", "경매 시작하기", {
                click: () => new ArtCreateAuctionPopup_1.default(id),
            }));
        }
    }
    async loadActivity(walletAddress, owner, id) {
        const list = (0, skynode_1.el)(".list").appendTo(this.activity);
        const result = await superagent_1.default.get(`https://api.klu.bs/arts/${id}/trades`);
        for (const trade of result.body) {
            let eventName;
            if (trade.event === "Sell") {
                eventName = "판매";
            }
            else if (trade.event === "ChangeSellPrice") {
                eventName = "가격 변경";
            }
            else if (trade.event === "Buy") {
                eventName = "구매";
            }
            else if (trade.event === "CancelSale") {
                eventName = "판매 취소";
            }
            else if (trade.event === "MakeOffer") {
                eventName = "제안";
            }
            else if (trade.event === "CancelOffer") {
                eventName = "제안 취소";
            }
            else if (trade.event === "AcceptOffer") {
                eventName = "제안 수락";
            }
            else if (trade.event === "CreateAuction") {
                eventName = "경매 시작";
            }
            else if (trade.event === "CancelAuction") {
                eventName = "경매 취소";
            }
            else if (trade.event === "Bid") {
                eventName = "입찰";
            }
            else if (trade.event === "Claim") {
                eventName = "경매 종료";
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
exports.default = ArtDetail;
//# sourceMappingURL=ArtDetail.js.map