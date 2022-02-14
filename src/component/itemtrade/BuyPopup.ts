import { DomNode, el, Popup } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import msg from "msg.js";
import CommonUtil from "../../CommonUtil";
import ItemStoreSaleContract from "../../contracts/ItemStoreSaleContract";
import Loader from "../../Loader";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class BuyPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private countInput!: DomNode<HTMLInputElement>;

    constructor(private metaverseId: number, private addr: string, private id: number, private price: BigNumber, verificationID: string) {
        super(".popup-background");
        this.append(this.content = el(".popup.metaverse-item-buy-popup",
            el("h2", msg("BUY_IT_TITLE")),
            el("p", msg("BUY_POPUP_DESCRIPTION")),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", msg("BUY_PROCESS_BUTTON"), {
                    click: async () => {
                        await ItemStoreSaleContract.buy(
                            [verificationID],
                            [this.countInput.domElement.value],
                            [this.price],
                            [0],
                        );
                        this.delete();
                        setTimeout(() => ViewUtil.go(`/metaverse/${this.metaverseId}/item/${this.addr}/mine`), 2000);
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
        const data = await Loader.loadMetaverseItemMetadata(this.addr, this.id);
        const img = data.image;
        this.list.append(el("section",
            img === undefined ? undefined : new NFTDisplay(img),
            el(".info",
                el(".name", data.name),
                el("label",
                    el("span", "구매 개수"),
                    this.countInput = el("input", { placeholder: "구매 개수 입력" }),
                ),
                el("label",
                    el("span", msg("SELL_PRICE")),
                    this.price.eq(0) === true ? undefined : el(".price",
                        el("img", { src: "/images/mix.png", height: "24" }),
                        el("span", CommonUtil.numberWithCommas(utils.formatEther(this.price))),
                    ),
                ),
            ),
        ));
        this.loading.delete();
    }
}
