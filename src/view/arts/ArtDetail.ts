import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import marked from "marked";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import xss from "xss";
import CommonUtil from "../../CommonUtil";
import AcceptOfferPopup from "../../component/arttrade/ArtAcceptOfferPopup";
import ArtBidPopup from "../../component/arttrade/ArtBidPopup";
import BuyPopup from "../../component/arttrade/ArtBuyPopup";
import ArtCreateAuctionPopup from "../../component/arttrade/ArtCreateAuctionPopup";
import OfferPopup from "../../component/arttrade/ArtOfferPopup";
import SellPopup from "../../component/arttrade/ArtSellPopup";
import Prompt from "../../component/dialogue/Prompt";
import NFTDisplay from "../../component/NFTDisplay";
import Config from "../../Config";
import ArtistsContract from "../../contracts/ArtistsContract";
import ArtsContract from "../../contracts/ArtsContract";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import Klaytn from "../../klaytn/Klaytn";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class ArtDetail implements View {

    private container: DomNode;

    private nftDisplayContainer: DomNode;
    private nameDisplay: DomNode;
    private artistDisplay: DomNode;
    private ownerDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private sendButtonContainer: DomNode;
    private updateButtonContainer: DomNode;
    private tradeForm: DomNode;
    private offerForm: DomNode;
    private auctionForm: DomNode;
    private activity: DomNode;

    private refreshInterval: any;

    constructor(params: ViewParams) {

        const id = parseInt(params.id, 10);

        Layout.current.title = msg("NFT_DETAIL_TITLE");
        Layout.current.content.append(this.container = el(".arts-nft-detail-view",

            // 이미지
            this.nftDisplayContainer = el(".nft-display-container"),

            // 기본 정보
            el("section",
                el("h2", msg("BASE_INFO_TITLE")),
                el(".info",
                    this.nameDisplay = el(".name"),
                    this.artistDisplay = el(".artist"),
                    this.ownerDisplay = el(".owner"),
                    this.descriptionDisplay = el(".description"),
                    this.sendButtonContainer = el(".send-button-container"),
                    this.updateButtonContainer = el(".update-button-container"),
                ),
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
        this.loadArtist(id);
        this.loadInfo(id);
        this.loadTrade(id);
    }

    private async loadArtist(id: number) {
        const artist = await ArtsContract.artToArtist(id);
        const extras = await ArtistsContract.extras(artist);
        let data: any = {};
        try {
            data = JSON.parse(extras);
        } catch (e) {
            console.log(e);
        }
        this.artistDisplay.empty().appendText(msg("ARTIST_INFO"));
        this.artistDisplay.append(el("a", data.name !== undefined ? data.name : CommonUtil.shortenAddress(artist), {
            click: () => ViewUtil.go(`/artists/${artist}`),
        }));
    }

    private async loadTrade(id: number) {
        if (await ArtsContract.exists(id) === true) {

            const owner = await ArtsContract.ownerOf(id);
            if (owner === ArtStoreContract.address) {
                this.ownerDisplay.empty().appendText(msg("SELLER"));
                const selling = await ArtStoreContract.checkSelling(id);
                if (selling === true) {
                    const saleInfo = await ArtStoreContract.sales(id);
                    this.ownerDisplay.append(el("a", CommonUtil.shortenAddress(saleInfo.seller), {
                        click: () => ViewUtil.go(`/user/${saleInfo.seller}`),
                    }));
                } else {
                    let seller: string;
                    const auction = await ArtStoreContract.auctions(id);
                    if (auction.seller === "0x0000000000000000000000000000000000000000") {
                        seller = ArtStoreContract.address;
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
                        await ArtsContract.transfer(to, id);
                        ViewUtil.waitTransactionAndRefresh();
                    }),
                }));
            }

            const artist = await ArtsContract.artToArtist(id);
            if (artist === address) {
                this.updateButtonContainer.empty().append(el("a", msg("REVISION_IT_BUTTON"), {
                    click: () => ViewUtil.go(`/arts/${id}/update`),
                }));
            }

            this.loadSale(address, owner, id);
            this.loadOffers(address, owner, id);
            this.loadAuction(address, owner, id);
            this.loadActivity(address, owner, id);
        }
    }

    private async loadInfo(id: number) {
        try {
            const result = await superagent.get(`https://api.klu.bs/arts/${id}`);
            const data = result.body;
            this.nftDisplayContainer.empty();
            if (data.image !== undefined) {
                this.nftDisplayContainer.append(new NFTDisplay(data.image));
            }
            this.nameDisplay.empty().appendText(data.name !== undefined ? data.name : `#${id}`);
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = xss(marked(data.description));
            }
        } catch (e) {
            console.error(e);
        }
    }

    private async loadSale(walletAddress: string | undefined, owner: string, id: number) {
        this.tradeForm.empty();

        const saleInfo = await ArtStoreContract.sales(id);

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

        if (saleInfo.seller === walletAddress) {
            this.tradeForm.append(
                el("a.cancel-sell-button", msg("CANCEL_SELL_BUTTON"), {
                    click: async () => {
                        await ArtStoreContract.cancelSale([id]);
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
            );
        } else if (saleInfo.price.gt(0)) {
            this.tradeForm.append(
                el("a.buy-button", msg("BUY_IT_BUTTON"), {
                    click: () => new BuyPopup([id]),
                }),
            );
        } else if (walletAddress === owner) {
            this.tradeForm.append(
                el("a.sell-button", msg("SELL_IT_BUTTON"), {
                    click: () => new SellPopup([id]),
                }),
            );
        }
    }

    private async loadOffers(walletAddress: string | undefined, owner: string, id: number) {
        this.offerForm.empty();

        const saleInfo = await ArtStoreContract.sales(id);
        const offerCount = (await ArtStoreContract.offerCount(id)).toNumber();

        const list = el(".list").appendTo(this.offerForm);
        const promises: Promise<void>[] = [];
        for (let i = 0; i < offerCount; i += 1) {
            const promise = async (offerId: number) => {
                try {
                    const offerInfo = await ArtStoreContract.offers(id, offerId);
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
                                        await ArtStoreContract.cancelOffer(id, offerId);
                                        ViewUtil.waitTransactionAndRefresh();
                                    },
                                }),
                            );
                        } else if (walletAddress === owner) {
                            offer.append(
                                el("a.accept-offer-button", msg("ACCEPT_OFFER_BUTTON"), {
                                    click: () => new AcceptOfferPopup(id, offerId),
                                }),
                            );
                        }

                        if (walletAddress === Config.adminAddress) {
                            offer.append(
                                el("a.cancel-offer-button", msg("FORCE_CANCEL_OFFER_BUTTON"), {
                                    click: async () => {
                                        await ArtStoreContract.cancelOfferByOwner([id], [offerId]);
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
                    click: () => new OfferPopup(id),
                }),
            );
        }
    }

    private async loadAuction(walletAddress: string | undefined, owner: string, id: number) {

        const auctionStarted = await ArtStoreContract.checkAuction(id);
        if (auctionStarted === true) {

            const auction = await ArtStoreContract.auctions(id);
            const biddingCount = (await ArtStoreContract.biddingCount(id)).toNumber();

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
                        const bidding = await ArtStoreContract.biddings(id, biddingId);
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
                                    await ArtStoreContract.cancelAuction(id);
                                    ViewUtil.waitTransactionAndRefresh();
                                },
                            }),
                        );
                    }
                } else {
                    this.auctionForm.append(
                        el("a.claim-button", msg("END_AUCTION_BUTTON"), {
                            click: async () => {
                                await ArtStoreContract.claim(id);
                                ViewUtil.waitTransactionAndRefresh();
                            },
                        }),
                    );
                }
            }

            else if (walletAddress !== auction.seller) {
                this.auctionForm.append(
                    el("a.bid-button", msg("BID_IT_BUTTON"), {
                        click: () => new ArtBidPopup(id),
                    }),
                );
            }

            else if (biddingCount === 0) {
                this.auctionForm.append(
                    el("a.claim-button", msg("END_AUCTION_BUTTON"), {
                        click: async () => {
                            await ArtStoreContract.cancelAuction(id);
                            ViewUtil.waitTransactionAndRefresh();
                        },
                    }),
                );
            }
        }

        else if (walletAddress === owner) {
            this.auctionForm.append(
                el("a.create-auction-button", msg("START_AUCTION_BUTTON"), {
                    click: () => new ArtCreateAuctionPopup(id),
                }),
            );
        }
    }

    private async loadActivity(walletAddress: string | undefined, owner: string, id: number) {
        const list = el(".list").appendTo(this.activity);
        const result = await superagent.get(`https://api.klu.bs/arts/${id}/trades`);
        for (const trade of result.body) {
            let eventName;
            if (trade.event === "Sell") {
                eventName = msg("ACTIVITY_SELL");
            } else if (trade.event === "ChangeSellPrice") {
                eventName = msg("ACTIVITY_CHANGE_SELL_PRICE");
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
