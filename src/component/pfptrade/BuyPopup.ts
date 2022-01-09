import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import CommonUtil from "../../CommonUtil";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import Loader from "../../Loader";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class BuyPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;

    constructor(private addr: string[], private ids: number[]) {
        super(".popup-background");
        this.append(this.content = el(".popup.pfp-buy-popup",
            el("h2", msg("BUY_IT")),
            el("p", msg("BUY_POPUP_DESC1")),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", msg("BUY_PROCESS"), {
                    click: async () => {
                        await PFPStoreContract.buy(addr, ids);
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
        for (const [index, addr] of this.addr.entries()) {
            const id = this.ids[index];
            const data = await Loader.loadMetadata(addr, id);
            const img = data.image;
            const saleInfo = await PFPStoreContract.sales(addr, id);
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
        }
        this.loading.delete();
    }
}
