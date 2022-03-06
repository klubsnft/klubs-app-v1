import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import marked from "marked";
import msg from "msg.js";
import { SkyRouter, View, ViewParams } from "skyrouter";
import superagent from "superagent";
import xss from "xss";
import CommonUtil from "../../CommonUtil";
import Prompt from "../../component/dialogue/Prompt";
import NFTDisplay from "../../component/NFTDisplay";
import AcceptOfferPopup from "../../component/pfptrade/AcceptOfferPopup";
import BidPopup from "../../component/pfptrade/BidPopup";
import BuyPopup from "../../component/pfptrade/BuyPopup";
import CreateAuctionPopup from "../../component/pfptrade/CreateAuctionPopup";
import OfferPopup from "../../component/pfptrade/OfferPopup";
import SellPopup from "../../component/pfptrade/SellPopup";
import Config from "../../Config";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import KIP17Contract from "../../contracts/standard/KIP17Contract";
import Klaytn from "../../klaytn/Klaytn";
import Wallet from "../../klaytn/Wallet";
import Loader from "../../Loader";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class NFTDetail implements View {

    private contract: KIP17Contract;

    private container: DomNode;

    private nftDisplayContainer: DomNode;
    private pfpDisplay: DomNode;
    private nameDisplay: DomNode;
    private ownerDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private sendButtonContainer: DomNode;
    private attributesDisplay: DomNode;
    private tradeForm: DomNode;
    private offerForm: DomNode;
    private auctionForm: DomNode;
    private activity: DomNode;

    private refreshInterval: any;

    constructor(params: ViewParams) {

        const addr = params.addr;
        const id = parseInt(params.id, 10);

        this.contract = new KIP17Contract(addr);

        Layout.current.title = msg("NFT_DETAIL_TITLE");
        Layout.current.content.append(this.container = el(".pfp-nft-detail-view",

            // 이미지
            this.nftDisplayContainer = el(".nft-display-container"),

            // 기본 정보
            el("section",
                el("h2", msg("BASE_INFO_TITLE")),
                el(".info",
                    this.pfpDisplay = el("a.pfp", {
                        click: () => ViewUtil.go(`/pfp/${addr}`),
                    }),
                    this.nameDisplay = el(".name"),
                    this.ownerDisplay = el(".owner"),
                    this.descriptionDisplay = el(".description"),
                    this.sendButtonContainer = el(".send-button-container"),
                    el("a.refresh-button", msg("REFRESH_METADATA_BUTTON"), {
                        click: async () => {
                            await Loader.cachePFPMetadata(addr, id);
                            SkyRouter.refresh();
                        },
                    }),
                ),
            ),

            // 프로퍼티
            el("section",
                el("h2", msg("PROPERTY_TITLE")),
                this.attributesDisplay = el(".attributes"),
            ),

            // 가격
            el("section",
                el("h2", msg("DEAL_TITLE")),
                this.tradeForm = el(".trade-form"),
            ),

            // 오퍼
            el("section",
                el("h2", msg("OFFER_PRICE_TITLE")),
                this.offerForm = el(".offer-form"),
            ),

            // 경매
            el("section",
                el("h2", msg("AUCTION_TITLE")),
                this.auctionForm = el(".auction-form"),
            ),

            // 거래 이력
            el("section",
                el("h2", msg("TRANSACTION_HISTORY")),
                this.activity = el(".activity"),
            ),
        ));
        this.loadPFP(addr);
        this.loadInfo(addr, id);
        this.loadTrade(addr, id);
    }

    private async loadPFP(addr: string) {
        const extras = await PFPsContract.extras(addr);
        try {
            const data: any = JSON.parse(extras);
            if (data.name !== undefined) {
                Layout.current.title = data.name;
                this.pfpDisplay.empty().appendText(data.name);
            }
        } catch (e) {
            console.log(e);
        }
    }

    private async loadTrade(addr: string, id: number) {

        const owner = await this.contract.ownerOf(id);
        if (owner === PFPStoreContract.address) {
            this.ownerDisplay.empty().appendText(msg("SELLER"));
            const selling = await PFPStoreContract.checkSelling(addr, id);
            if (selling === true) {
                const saleInfo = await PFPStoreContract.sales(addr, id);
                this.ownerDisplay.append(el("a", CommonUtil.shortenAddress(saleInfo.seller), {
                    click: () => ViewUtil.go(`/user/${saleInfo.seller}`),
                }));
            } else {
                let seller: string;
                const auction = await PFPStoreContract.auctions(addr, id);
                if (auction.seller === "0x0000000000000000000000000000000000000000") {
                    seller = PFPStoreContract.address;
                } else {
                    seller = auction.seller;
                }

                this.ownerDisplay.append(el("a", CommonUtil.shortenAddress(seller), {
                    click: () => ViewUtil.go(`/user/${seller}`),
                }));
            }
        } else {
            this.ownerDisplay.empty().appendText(msg("OWNER_INFO"));
            this.ownerDisplay.append(el("a", CommonUtil.shortenAddress(owner), {
                click: () => ViewUtil.go(`/user/${owner}`),
            }));
        }

        const address = await Wallet.loadAddress();
        if (owner === address) {
            this.sendButtonContainer.empty().append(el("a", msg("TRANSFER_BUTTON"), {
                click: () => new Prompt(msg("TRANSFER_TITLE"), msg("TRANSFER_DESCRIPTION"), msg("TRANSFER_BUTTON"), async (to) => {
                    await this.contract.transfer(to, id);
                    ViewUtil.waitTransactionAndRefresh();
                }),
            }));
        }

        this.loadSale(address, owner, addr, id);
        this.loadOffers(address, owner, addr, id);
        this.loadAuction(address, owner, addr, id);
        this.loadActivity(address, owner, addr, id);
    }

    private async loadInfo(addr: string, id: number) {
        try {
            const data = await Loader.loadPFPMetadata(addr, id);
            this.nftDisplayContainer.empty();
            if (data.image !== undefined) {
                this.nftDisplayContainer.append(new NFTDisplay(data.image));
            }
            this.nameDisplay.empty().appendText(data.name !== undefined ? data.name : `#${id}`);
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = xss(marked(data.description));
            }
            if (data.attributes !== undefined) {
                this.attributesDisplay.empty();
                for (const attribute of data.attributes) {
                    el(".attribute",
                        el(".trait", attribute.trait_type),
                        el(".value", String(attribute.value)),
                    ).appendTo(this.attributesDisplay);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    private async loadSale(walletAddress: string | undefined, owner: string, addr: string, id: number) {
        this.tradeForm.empty();

        const saleInfo = await PFPStoreContract.sales(addr, id);

        const priceDispay = el(".price-container").appendTo(this.tradeForm);
        if (saleInfo.price.gt(0)) {
            priceDispay.append(el(".price",
                el("img", { src: "/images/mix.png", height: "48" }),
                el("span", CommonUtil.numberWithCommas(utils.formatEther(saleInfo.price))),
            ));
            const result = await superagent.get("https://api.klu.bs/mix/price");
            const wonPrice = Math.floor(parseFloat(utils.formatEther(saleInfo.price)) * parseFloat(result.text));
            priceDispay.append(el(".won-price",
                "(₩ ",
                CommonUtil.numberWithCommas(wonPrice.toString()),
                ")",
            ));
        } else {
            priceDispay.appendText(msg("NOT_SELLING_DESCRIPTION"));
        }

        if (walletAddress === owner) {
            this.tradeForm.append(
                el("a.sell-button", msg("SELL_IT_BUTTON"), {
                    click: () => new SellPopup([addr], [id]),
                }),
            );
        } else if (saleInfo.seller === walletAddress) {
            this.tradeForm.append(
                el("a.cancel-sell-button", msg("CANCEL_SELL_BUTTON"), {
                    click: async () => {
                        await PFPStoreContract.cancelSale([addr], [id]);
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
            );
        } else if (saleInfo.price.gt(0)) {
            this.tradeForm.append(
                el("a.buy-button", msg("BUY_IT_BUTTON"), {
                    click: () => new BuyPopup([addr], [id]),
                }),
            );
        }
    }

    private async loadOffers(walletAddress: string | undefined, owner: string, addr: string, id: number) {
        this.offerForm.empty();

        const saleInfo = await PFPStoreContract.sales(addr, id);
        const offerCount = (await PFPStoreContract.offerCount(addr, id)).toNumber();

        const list = el(".list").appendTo(this.offerForm);
        const promises: Promise<void>[] = [];
        for (let i = 0; i < offerCount; i += 1) {
            const promise = async (offerId: number) => {
                try {
                    const offerInfo = await PFPStoreContract.offers(addr, id, offerId);
                    if (offerInfo.price.gt(0)) {
                        const offer = el(".offer",
                            el(".offeror",
                                CommonUtil.shortenAddress(offerInfo.offeror),
                            ),
                            el(".price",
                                el("img", { src: "/images/mix.png", height: "24" }),
                                el("span", CommonUtil.numberWithCommas(utils.formatEther(offerInfo.price))),
                            ),
                        ).appendTo(list);

                        if (offerInfo.offeror === walletAddress) {
                            offer.append(
                                el("a.cancel-offer-button", msg("CANCEL_OFFER_BUTTON"), {
                                    click: async () => {
                                        await PFPStoreContract.cancelOffer(addr, id, offerId);
                                        ViewUtil.waitTransactionAndRefresh();
                                    },
                                }),
                            );
                        } else if (walletAddress === owner) {
                            offer.append(
                                el("a.accept-offer-button", msg("ACCEPT_OFFER_BUTTON"), {
                                    click: () => new AcceptOfferPopup(addr, id, offerId),
                                }),
                            );
                        }

                        if (walletAddress === Config.adminAddress) {
                            offer.append(
                                el("a.cancel-offer-button", msg("FORCE_CANCEL_OFFER_BUTTON"), {
                                    click: async () => {
                                        await PFPStoreContract.cancelOfferByOwner([addr], [id], [offerId]);
                                        ViewUtil.waitTransactionAndRefresh();
                                    },
                                }),
                            );
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (walletAddress !== owner && saleInfo.seller !== walletAddress) {
            this.offerForm.append(
                el("a.offer-button", msg("OFFER_PRICE_BUTTON"), {
                    click: () => new OfferPopup(addr, id),
                }),
            );
        }
    }

    private async loadAuction(walletAddress: string | undefined, owner: string, addr: string, id: number) {

        const auctionStarted = await PFPStoreContract.checkAuction(addr, id);
        if (auctionStarted === true) {

            const auction = await PFPStoreContract.auctions(addr, id);
            const biddingCount = (await PFPStoreContract.biddingCount(addr, id)).toNumber();

            let diff = 0;
            const p = el("p").appendTo(this.auctionForm);
            const refresh = async () => {
                diff = auction.endBlock - await Klaytn.loadBlockNumber();
                p.empty();
                if (diff < 0) {
                    p.appendText(msg("ENDED_AUCTION_DESCRIPTION"));
                } else {
                    p.appendText(`${msg("END_AUCTION_REMAINS").replace(/{n}/, String(diff))} (${CommonUtil.displayBlockDuration(diff)})`);
                }
            };
            await refresh();
            clearInterval(this.refreshInterval);
            this.refreshInterval = setInterval(() => refresh(), 1000);

            const list = el(".list").appendTo(this.auctionForm);

            const promises: Promise<void>[] = [];
            for (let i = biddingCount - 1; i >= 0; i -= 1) {
                const promise = async (biddingId: number) => {
                    const bid = el(".bid").appendTo(list);
                    try {
                        const bidding = await PFPStoreContract.biddings(addr, id, biddingId);
                        if (bidding.price.gt(0)) {
                            bid.append(
                                el(".bidder",
                                    CommonUtil.shortenAddress(bidding.bidder),
                                ),
                                el(".price",
                                    el("img", { src: "/images/mix.png", height: "24" }),
                                    el("span", CommonUtil.numberWithCommas(utils.formatEther(bidding.price))),
                                ),
                            );
                        } else {
                            bid.delete();
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);

            if (diff < 0) {
                if (biddingCount === 0) {
                    if (walletAddress === auction.seller) {
                        this.auctionForm.append(
                            el("a.claim-button", msg("END_AUCTION_BUTTON"), {
                                click: async () => {
                                    await PFPStoreContract.cancelAuction(addr, id);
                                    ViewUtil.waitTransactionAndRefresh();
                                },
                            }),
                        );
                    }
                } else {
                    this.auctionForm.append(
                        el("a.claim-button", msg("END_AUCTION_BUTTON"), {
                            click: async () => {
                                await PFPStoreContract.claim(addr, id);
                                ViewUtil.waitTransactionAndRefresh();
                            },
                        }),
                    );
                }
            }

            else if (walletAddress !== auction.seller) {
                this.auctionForm.append(
                    el("a.bid-button", msg("BID_IT_BUTTON"), {
                        click: () => new BidPopup(addr, id),
                    }),
                );
            }

            else if (biddingCount === 0) {
                this.auctionForm.append(
                    el("a.claim-button", msg("END_AUCTION_BUTTON"), {
                        click: async () => {
                            await PFPStoreContract.cancelAuction(addr, id);
                            ViewUtil.waitTransactionAndRefresh();
                        },
                    }),
                );
            }
        }

        else if (walletAddress === owner) {
            this.auctionForm.append(
                el("a.create-auction-button", msg("START_AUCTION_BUTTON"), {
                    click: () => new CreateAuctionPopup(addr, id),
                }),
            );
        }
    }

    private async loadActivity(walletAddress: string | undefined, owner: string, addr: string, id: number) {
        const list = el(".list").appendTo(this.activity);
        const result = await superagent.get(`https://api.klu.bs/v2/pfp/${addr}/${id}/trades`);
        for (const trade of result.body) {
            let eventName;
            if (trade.event === "Sell") {
                eventName = msg("ACTIVITY_SELL");
            } else if (trade.event === "Buy") {
                eventName = msg("ACTIVITY_BUY");
            } else if (trade.event === "CancelSale") {
                eventName = msg("ACTIVITY_CANCEL_SALE");
            } else if (trade.event === "MakeOffer") {
                eventName = msg("ACTIVITY_OFFER");
            } else if (trade.event === "CancelOffer") {
                eventName = msg("ACTIVITY_CANCEL_OFFER");
            } else if (trade.event === "AcceptOffer") {
                eventName = msg("ACTIVITY_ACCEPT_OFFER");
            } else if (trade.event === "CreateAuction") {
                eventName = msg("ACTIVITY_START_AUCTION");
            } else if (trade.event === "CancelAuction") {
                eventName = msg("ACTIVITY_CANCEL_AUCTION");
            } else if (trade.event === "Bid") {
                eventName = msg("ACTIVITY_BID");
            } else if (trade.event === "Claim") {
                eventName = msg("ACTIVITY_END_AUCTION");
            }

            el(".activity",
                el(".event", eventName),
                el(".user",
                    CommonUtil.shortenAddress(trade.user),
                ),
                trade.price === undefined ? undefined : el(".price",
                    el("img", { src: "/images/mix.png", height: "24" }),
                    el("span", CommonUtil.numberWithCommas(utils.formatEther(trade.price))),
                ),
            ).appendTo(list);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.refreshInterval);
        this.container.delete();
    }
}
