import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import marked from "marked";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import xss from "xss";
import CommonUtil from "../../CommonUtil";
import AcceptOfferPopup from "../../component/AcceptOfferPopup";
import BuyPopup from "../../component/BuyPopup";
import OfferPopup from "../../component/OfferPopup";
import SellPopup from "../../component/SellPopup";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import KIP17Contract from "../../contracts/standard/KIP17Contract";
import Wallet from "../../klaytn/Wallet";
import ProxyUtil from "../../ProxyUtil";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class NFTDetail implements View {

    private contract: KIP17Contract;

    private container: DomNode;

    private imageDisplay: DomNode;
    private pfpDisplay: DomNode;
    private nameDisplay: DomNode;
    private ownerDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private attributesDisplay: DomNode;
    private tradeForm: DomNode;
    private offerForm: DomNode;

    constructor(params: ViewParams) {

        const addr = params.addr;
        const id = parseInt(params.id, 10);

        this.contract = new KIP17Contract(addr);

        Layout.current.title = "NFT 상세정보";
        Layout.current.content.append(this.container = el(".pfp-nft-detail-view",

            // 이미지
            this.imageDisplay = el("img.nft-image"),

            // 기본 정보
            el("section",
                el("h2", "기본 정보"),
                this.pfpDisplay = el("a.pfp", {
                    click: () => ViewUtil.go(`/pfp/${addr}`),
                }),
                this.nameDisplay = el(".name"),
                this.ownerDisplay = el(".owner"),
                this.descriptionDisplay = el(".description"),
            ),

            // 프로퍼티
            el("section",
                el("h2", "속성"),
                this.attributesDisplay = el(".attributes"),
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
                el("p", "경매 기능은 추후 제공됩니다."),
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
        if (owner === "0xeF50df13f88070662459863D05cCD9581dfB1085") {
            this.ownerDisplay.empty().appendText("판매자 ");
            const saleInfo = await PFPStoreContract.sales(addr, id);
            this.ownerDisplay.append(el("span", CommonUtil.shortenAddress(saleInfo.seller)));
        } else {
            this.ownerDisplay.empty().appendText("소유자 ");
            this.ownerDisplay.append(el("span", CommonUtil.shortenAddress(owner)));
        }

        const address = await Wallet.loadAddress();
        this.loadSale(address, owner, addr, id);
        this.loadOffers(address, owner, addr, id);
    }

    private async loadInfo(addr: string, id: number) {
        try {
            const url = await this.contract.tokenURI(id);
            const data = await ProxyUtil.loadURL(url);
            (this.imageDisplay as DomNode<HTMLImageElement>).domElement.src = ProxyUtil.imageSRC(data.image);
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
            priceDispay.appendText("판매중이 아닙니다.");
        }

        if (walletAddress === owner) {
            this.tradeForm.append(
                el("a.sell-button", "판매하기", {
                    click: () => new SellPopup([addr], [id]),
                }),
            );
        } else if (saleInfo.seller === walletAddress) {
            this.tradeForm.append(
                el("a.cancel-sell-button", "판매 취소", {
                    click: async () => {
                        await PFPStoreContract.cancelSale([addr], [id]);
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
            );
        } else if (saleInfo.price.gt(0)) {
            this.tradeForm.append(
                el("a.buy-button", "구매하기", {
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

                        if (walletAddress === owner) {
                            offer.append(
                                el("a.accept-offer-button", "제안 수락", {
                                    click: () => new AcceptOfferPopup(addr, id, offerId),
                                }),
                            );
                        } else if (offerInfo.offeror === walletAddress) {
                            offer.append(
                                el("a.cancel-offer-button", "제안 취소", {
                                    click: async () => {
                                        await PFPStoreContract.cancelOffer(addr, id, offerId);
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
                    click: () => new OfferPopup(addr, id),
                }),
            );
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
