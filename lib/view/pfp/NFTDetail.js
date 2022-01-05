"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const marked_1 = __importDefault(require("marked"));
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
        Layout_1.default.current.title = "NFT 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-nft-detail-view", this.nftDisplayContainer = (0, skynode_1.el)(".nft-display-container"), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "기본 정보"), (0, skynode_1.el)(".info", this.pfpDisplay = (0, skynode_1.el)("a.pfp", {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}`),
        }), this.nameDisplay = (0, skynode_1.el)(".name"), this.ownerDisplay = (0, skynode_1.el)(".owner"), this.descriptionDisplay = (0, skynode_1.el)(".description"), this.sendButtonContainer = (0, skynode_1.el)(".send-button-container"), (0, skynode_1.el)("a.refresh-button", "정보 새로고침", {
            click: async () => {
                await Loader_1.default.cacheMetadata(addr, id);
                skyrouter_1.SkyRouter.refresh();
            },
        }))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "속성"), this.attributesDisplay = (0, skynode_1.el)(".attributes")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "거래하기"), this.tradeForm = (0, skynode_1.el)(".trade-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "가격 제안"), this.offerForm = (0, skynode_1.el)(".offer-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "경매"), this.auctionForm = (0, skynode_1.el)(".auction-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "거래 이력"), this.activity = (0, skynode_1.el)(".activity"))));
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
            this.ownerDisplay.empty().appendText("판매자 ");
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
            this.ownerDisplay.empty().appendText("소유자 ");
            this.ownerDisplay.append((0, skynode_1.el)("a", CommonUtil_1.default.shortenAddress(owner), {
                click: () => ViewUtil_1.default.go(`/user/${owner}`),
            }));
        }
        const address = await Wallet_1.default.loadAddress();
        if (owner === address) {
            this.sendButtonContainer.empty().append((0, skynode_1.el)("a", "전송하기", {
                click: () => new Prompt_1.default("전송하기", "전송받을 지갑 주소를 입력해주시기 바랍니다. 전송이 완료되면 절대 되찾을 수 없으니, 지갑 주소를 여러번 확인하시기 바랍니다.", "전송하기", async (to) => {
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
            priceDispay.appendText("판매중이 아닙니다.");
        }
        if (walletAddress === owner) {
            this.tradeForm.append((0, skynode_1.el)("a.sell-button", "판매하기", {
                click: () => new SellPopup_1.default([addr], [id]),
            }));
        }
        else if (saleInfo.seller === walletAddress) {
            this.tradeForm.append((0, skynode_1.el)("a.cancel-sell-button", "판매 취소", {
                click: async () => {
                    await PFPStoreContract_1.default.cancelSale([addr], [id]);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                },
            }));
        }
        else if (saleInfo.price.gt(0)) {
            this.tradeForm.append((0, skynode_1.el)("a.buy-button", "구매하기", {
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
                            offer.append((0, skynode_1.el)("a.cancel-offer-button", "제안 취소", {
                                click: async () => {
                                    await PFPStoreContract_1.default.cancelOffer(addr, id, offerId);
                                    ViewUtil_1.default.waitTransactionAndRefresh();
                                },
                            }));
                        }
                        else if (walletAddress === owner) {
                            offer.append((0, skynode_1.el)("a.accept-offer-button", "제안 수락", {
                                click: () => new AcceptOfferPopup_1.default(addr, id, offerId),
                            }));
                        }
                        if (walletAddress === Config_1.default.adminAddress) {
                            offer.append((0, skynode_1.el)("a.cancel-offer-button", "강제 제안 취소", {
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
            this.offerForm.append((0, skynode_1.el)("a.offer-button", "가격 제안하기", {
                click: () => new OfferPopup_1.default(addr, id),
            }));
        }
    }
    async loadAuction(walletAddress, owner, addr, id) {
        const auctionStarted = await PFPStoreContract_1.default.checkAuction(addr, id);
        if (auctionStarted === true) {
            const auction = await PFPStoreContract_1.default.auctions(addr, id);
            const biddingCount = (await PFPStoreContract_1.default.biddingCount(addr, id)).toNumber();
            const diff = auction.endBlock - await Klaytn_1.default.loadBlockNumber();
            if (diff < 0) {
                this.auctionForm.append((0, skynode_1.el)("p", "경매 종료됨"));
            }
            else {
                this.auctionForm.append((0, skynode_1.el)("p", `경매 종료까지 ${diff} 블록 남음`));
            }
            const list = (0, skynode_1.el)(".list").appendTo(this.auctionForm);
            const promises = [];
            for (let i = 0; i < biddingCount; i += 1) {
                const promise = async (biddingId) => {
                    try {
                        const bidding = await PFPStoreContract_1.default.biddings(addr, id, biddingId);
                        if (bidding.price.gt(0)) {
                            (0, skynode_1.el)(".bid", (0, skynode_1.el)(".bidder", CommonUtil_1.default.shortenAddress(bidding.bidder)), (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(bidding.price))))).appendTo(list);
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
                                await PFPStoreContract_1.default.cancelAuction(addr, id);
                                ViewUtil_1.default.waitTransactionAndRefresh();
                            },
                        }));
                    }
                }
                else {
                    this.auctionForm.append((0, skynode_1.el)("a.claim-button", "경매 종료", {
                        click: async () => {
                            await PFPStoreContract_1.default.claim(addr, id);
                            ViewUtil_1.default.waitTransactionAndRefresh();
                        },
                    }));
                }
            }
            else if (walletAddress !== auction.seller) {
                this.auctionForm.append((0, skynode_1.el)("a.bid-button", "입찰하기", {
                    click: () => new BidPopup_1.default(addr, id),
                }));
            }
            else if (biddingCount === 0) {
                this.auctionForm.append((0, skynode_1.el)("a.claim-button", "경매 종료", {
                    click: async () => {
                        await PFPStoreContract_1.default.cancelAuction(addr, id);
                        ViewUtil_1.default.waitTransactionAndRefresh();
                    },
                }));
            }
        }
        else if (walletAddress === owner) {
            this.auctionForm.append((0, skynode_1.el)("a.create-auction-button", "경매 시작하기", {
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
                eventName = "판매";
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
        this.container.delete();
    }
}
exports.default = NFTDetail;
//# sourceMappingURL=NFTDetail.js.map