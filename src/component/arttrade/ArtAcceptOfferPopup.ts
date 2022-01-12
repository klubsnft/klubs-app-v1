import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import Config from "../../Config";
import ArtsContract from "../../contracts/ArtsContract";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class AcceptOfferPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;

    constructor(private id: number, private offerId: BigNumberish) {
        super(".popup-background");
        this.append(this.content = el(".popup.art-accept-offer-popup",
            el("h2", msg("ACCEPT_OFFER_IT_TITLE")),
            el("p", msg("ART_ACCEPT_OFFER_POPUP_DESCRIPTION")),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", msg("ACCEPT_OFFER_BUTTON"), {
                    click: async () => {
                        await ArtStoreContract.acceptOffer(id, offerId);
                        this.delete();
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
                el("button", msg("CANCEL_BUTTON"), {
                    click: () => this.delete(),
                }),
            ),
        ));
        this.load();
    }

    private async load() {
        const result = await superagent.get(`https://api.klu.bs/arts/${this.id}`);
        const data = result.body;
        const img = data.image;
        const offerInfo = await ArtStoreContract.offers(this.id, this.offerId);
        const royalty = await ArtsContract.royalties(this.id);
        this.list.append(el("section",
            img === undefined ? undefined : new NFTDisplay(img),
            el(".info",
                el(".name", data.name),
                el("label",
                    el("span", msg("ACCEPT_OFFER_POPUP_DESCRIPTION").replace(/{royalty}/, String(royalty.toNumber() / 100)).replace(/{fee}/, String(Config.fee))),
                    offerInfo.price.eq(0) === true ? undefined : el(".price",
                        el("img", { src: "/images/mix.png", height: "24" }),
                        el("span", CommonUtil.numberWithCommas(utils.formatEther(offerInfo.price))),
                    ),
                ),
            ),
        ));
        this.loading.delete();
    }
}
