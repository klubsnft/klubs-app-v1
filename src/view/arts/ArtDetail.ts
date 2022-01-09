import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import marked from "marked";
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

        Layout.current.title = "NFT 상세정보";
        Layout.current.content.append(this.container = el(".arts-nft-detail-view",

            // 이미지
            this.nftDisplayContainer = el(".nft-display-container"),

            // 기본 정보
            el("section",
                el("h2", "기본 정보"),
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
                el("h2", "거래하기"),
                this.tradeForm = el(".trade-form"),
            ),

            // 오퍼
            el("section",
                el("h2", "가격 제안"),
                this.offerForm = el(".offer-form"),
            ),

            // 경매
            el("section",
                el("h2", "경매"),
                this.auctionForm = el(".auction-form"),
            ),

            // 거래 이력
            el("section",
                el("h2", "거래 이력"),
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
        this.artistDisplay.empty().appendText("작가 ");
        this.artistDisplay.append(el("a", data.name !== undefined ? data.name : CommonUtil.shortenAddress(artist), {
            click: () => ViewUtil.go(`/artists/${artist}`),
        }));
    }

    private async loadTrade(id: number) {

        const owner = await ArtsContract.ownerOf(id);
        if (owner === ArtStoreContract.address) {
            this.ownerDisplay.empty().appendText("판매자 ");
            const selling = await ArtStoreContract.checkSelling(id);
            if (selling === true) {
                const saleInfo = await ArtStoreContract.sales(id);
                this.ownerDisplay.append(el("a", CommonUtil.shortenAddress(saleInfo.seller), {
                    click: () => ViewUtil.go(`/user/${saleInfo.seller}`),
                }));
            } else {
                const auction = await ArtStoreContract.auctions(id);
                this.ownerDisplay.append(el("a", CommonUtil.shortenAddress(auction.seller), {
                    click: () => ViewUtil.go(`/user/${auction.seller}`),
                }));
            }
        } else {
            this.ownerDisplay.empty().appendText("소유자 ");
            this.ownerDisplay.append(el("a", CommonUtil.shortenAddress(owner), {
                click: () => ViewUtil.go(`/user/${owner}`),
            }));
        }

        const address = await Wallet.loadAddress();
        if (owner === address) {
            this.sendButtonContainer.empty().append(el("a", "전송하기", {
                click: () => new Prompt("전송하기", "전송받을 지갑 주소를 입력해주시기 바랍니다. 전송이 완료되면 절대 되찾을 수 없으니, 지갑 주소를 여러번 확인하시기 바랍니다.", "전송하기", async (to) => {
                    await ArtsContract.transfer(to, id);
                    ViewUtil.waitTransactionAndRefresh();
                }),
            }));
        }

        const artist = await ArtsContract.artToArtist(id);
        if (artist === address) {
            this.updateButtonContainer.empty().append(el("a", "수정하기", {
                click: () => ViewUtil.go(`/arts/${id}/update`),
            }));
        }

        this.loadSale(address, owner, id);
        this.loadOffers(address, owner, id);
        this.loadAuction(address, owner, id);
        this.loadActivity(address, owner, id);
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
            priceDispay.appendText("판매중이 아닙니다.");
        }

        if (saleInfo.seller === walletAddress) {
            this.tradeForm.append(
                el("a.cancel-sell-button", "판매 취소", {
                    click: async () => {
                        await ArtStoreContract.cancelSale([id]);
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
            );
        } else if (saleInfo.price.gt(0)) {
            this.tradeForm.append(
                el("a.buy-button", "구매하기", {
                    click: () => new BuyPopup([id]),
                }),
            );
        } else if (walletAddress === owner) {
            this.tradeForm.append(
                el("a.sell-button", "판매하기", {
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
                                el("a.cancel-offer-button", "제안 취소", {
                                    click: async () => {
                                        await ArtStoreContract.cancelOffer(id, offerId);
                                        ViewUtil.waitTransactionAndRefresh();
                                    },
                                }),
                            );
                        } else if (walletAddress === owner) {
                            offer.append(
                                el("a.accept-offer-button", "제안 수락", {
                                    click: () => new AcceptOfferPopup(id, offerId),
                                }),
                            );
                        }

                        if (walletAddress === Config.adminAddress) {
                            offer.append(
                                el("a.cancel-offer-button", "강제 제안 취소", {
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
                el("a.offer-button", "가격 제안하기", {
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
                    p.appendText("경매 종료됨");
                } else {
                    p.appendText(`경매 종료까지 ${diff} 블록 남음 (${CommonUtil.displayBlockDuration(diff)})`);
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
                            el("a.claim-button", "경매 종료", {
                                click: async () => {
                                    await ArtStoreContract.cancelAuction(id);
                                    ViewUtil.waitTransactionAndRefresh();
                                },
                            }),
                        );
                    }
                } else {
                    this.auctionForm.append(
                        el("a.claim-button", "경매 종료", {
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
                    el("a.bid-button", "입찰하기", {
                        click: () => new ArtBidPopup(id),
                    }),
                );
            }

            else if (biddingCount === 0) {
                this.auctionForm.append(
                    el("a.claim-button", "경매 종료", {
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
                el("a.create-auction-button", "경매 시작하기", {
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
                eventName = "판매";
            } else if (trade.event === "ChangeSellPrice") {
                eventName = "가격 변경";
            } else if (trade.event === "Buy") {
                eventName = "구매";
            } else if (trade.event === "CancelSale") {
                eventName = "판매 취소";
            } else if (trade.event === "MakeOffer") {
                eventName = "제안";
            } else if (trade.event === "CancelOffer") {
                eventName = "제안 취소";
            } else if (trade.event === "AcceptOffer") {
                eventName = "제안 수락";
            } else if (trade.event === "CreateAuction") {
                eventName = "경매 시작";
            } else if (trade.event === "CancelAuction") {
                eventName = "경매 취소";
            } else if (trade.event === "Bid") {
                eventName = "입찰";
            } else if (trade.event === "Claim") {
                eventName = "경매 종료";
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
