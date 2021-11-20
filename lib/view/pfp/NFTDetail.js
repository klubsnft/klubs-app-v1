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
const AcceptOfferPopup_1 = __importDefault(require("../../component/AcceptOfferPopup"));
const BuyPopup_1 = __importDefault(require("../../component/BuyPopup"));
const OfferPopup_1 = __importDefault(require("../../component/OfferPopup"));
const SellPopup_1 = __importDefault(require("../../component/SellPopup"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const KIP17Contract_1 = __importDefault(require("../../contracts/standard/KIP17Contract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const ProxyUtil_1 = __importDefault(require("../../ProxyUtil"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class NFTDetail {
    constructor(params) {
        const addr = params.addr;
        const id = parseInt(params.id, 10);
        this.contract = new KIP17Contract_1.default(addr);
        Layout_1.default.current.title = "NFT 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-nft-detail-view", this.imageDisplay = (0, skynode_1.el)("img.nft-image"), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "기본 정보"), this.pfpDisplay = (0, skynode_1.el)("a.pfp", {
            click: () => ViewUtil_1.default.go(`/pfp/${addr}`),
        }), this.nameDisplay = (0, skynode_1.el)(".name"), this.ownerDisplay = (0, skynode_1.el)(".owner"), this.descriptionDisplay = (0, skynode_1.el)(".description")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "속성"), this.attributesDisplay = (0, skynode_1.el)(".attributes")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "거래하기"), this.tradeForm = (0, skynode_1.el)(".trade-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "가격 제안"), this.offerForm = (0, skynode_1.el)(".offer-form")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "경매"), (0, skynode_1.el)("p", "경매 기능은 추후 제공됩니다."))));
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
        if (owner === "0xeF50df13f88070662459863D05cCD9581dfB1085") {
            this.ownerDisplay.empty().appendText("판매자 ");
            const saleInfo = await PFPStoreContract_1.default.sales(addr, id);
            this.ownerDisplay.append((0, skynode_1.el)("span", CommonUtil_1.default.shortenAddress(saleInfo.seller)));
        }
        else {
            this.ownerDisplay.empty().appendText("소유자 ");
            this.ownerDisplay.append((0, skynode_1.el)("span", CommonUtil_1.default.shortenAddress(owner)));
        }
        const address = await Wallet_1.default.loadAddress();
        this.loadSale(address, owner, addr, id);
        this.loadOffers(address, owner, addr, id);
    }
    async loadInfo(addr, id) {
        try {
            const url = await this.contract.tokenURI(id);
            const data = await ProxyUtil_1.default.loadURL(url);
            this.imageDisplay.domElement.src = ProxyUtil_1.default.imageSRC(data.image);
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
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = NFTDetail;
//# sourceMappingURL=NFTDetail.js.map