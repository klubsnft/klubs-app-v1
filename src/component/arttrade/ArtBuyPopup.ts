import { DomNode, el, Popup } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import msg from "msg.js";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class BuyPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private prices: BigNumber[] = [];
    private mileages: BigNumber[] = [];

    constructor(private ids: number[]) {
        super(".popup-background");
        this.append(this.content = el(".popup.art-buy-popup",
            el("h2", msg("BUYING_MIX_TITLE")),
            el("p", msg("BUY_POPUP_DESCRIPTION")),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", msg("BUY_PROCESS_BUTTON"), {
                    click: async () => {
                        await ArtStoreContract.buy(ids, this.prices, this.mileages);
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
        for (const id of this.ids) {
            const result = await superagent.get(`https://api.klu.bs/arts/${id}`);
            const data = result.body;
            const img = data.image;
            const saleInfo = await ArtStoreContract.sales(id);
            this.list.append(el("section",
                img === undefined ? undefined : new NFTDisplay(img),
                el(".info",
                    el(".name", data.name),
                    el("label",
                        el("span", msg("SELL_PRICE")),
                        saleInfo.price.eq(0) === true ? undefined : el(".price",
                            el("img", { src: "/images/mix.png", height: "24" }),
                            el("span", CommonUtil.numberWithCommas(utils.formatEther(saleInfo.price))),
                        ),
                    ),
                ),
            ));
            this.prices.push(saleInfo.price);
            this.mileages.push(BigNumber.from(0));
        }
        this.loading.delete();
    }
}
