import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import superagent from "superagent";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class OfferPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private inputs: DomNode<HTMLInputElement>[] = [];

    constructor(private id: number) {
        super(".popup-background");
        this.append(this.content = el(".popup.art-offer-popup",
            el("h2", msg("OFFER_PRICE_TITLE")),
            el("p", msg("OFFER_POPUP_DESCRIPTION")),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", msg("OFFER_IT_BUTTON"), {
                    click: async () => {
                        const prices: BigNumberish[] = [];
                        for (const input of this.inputs) {
                            prices.push(utils.parseEther(input.domElement.value));
                        }
                        await ArtStoreContract.makeOffer(id, prices[0], 0);
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
        let input: DomNode<HTMLInputElement>;
        const result = await superagent.get(`https://api.klu.bs/arts/${this.id}`);
        const data = result.body;
        const img = data.image;
        this.list.append(el("section",
            img === undefined ? undefined : new NFTDisplay(img),
            el(".info",
                el(".name", data.name),
                el("label",
                    el("span", msg("PRICE_OFFER_INPUT")),
                    input = el("input", { placeholder: msg("PRICE_OFFER_MIX_INPUT") }),
                ),
            ),
        ));
        this.inputs.push(input);
        this.loading.delete();
    }
}
