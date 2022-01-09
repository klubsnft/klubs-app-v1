import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import CommonUtil from "../../CommonUtil";
import Config from "../../Config";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import Loader from "../../Loader";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class AcceptOfferPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;

    constructor(private addr: string, private id: number, private offerId: BigNumberish) {
        super(".popup-background");
        this.append(this.content = el(".popup.pfp-accept-offer-popup",
            el("h2", msg("ACCEPT_OFFER_IT")),
            el("p", msg("ACCEPT_OFFER_IT_DESC1")),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", msg("ACCEPT_OFFER"), {
                    click: async () => {
                        await PFPStoreContract.acceptOffer(addr, id, offerId);
                        this.delete();
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
                el("button", msg("CANCEL"), {
                    click: () => this.delete(),
                }),
            ),
        ));
        this.load();
    }

    private async load() {
        const data = await Loader.loadMetadata(this.addr, this.id);
        const img = data.image;
        const offerInfo = await PFPStoreContract.offers(this.addr, this.id, this.offerId);
        const royalty = await PFPsContract.royalties(this.addr);
        this.list.append(el("section",
            img === undefined ? undefined : new NFTDisplay(img),
            el(".info",
                el(".name", data.name),
                el("label",
                    el("span", `${msg("ACCEPT_OFFER_POPUP_DESC1")} ${royalty.royalty / 100}${msg("ACCEPT_OFFER_POPUP_DESC2")} ${Config.fee}${msg("ACCEPT_OFFER_POPUP_DESC3")})`),
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
