import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import Config from "../../Config";
import ItemStoreSaleContract from "../../contracts/ItemStoreSaleContract";
import MetaversesContract from "../../contracts/MetaversesContract";
import Loader from "../../Loader";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class SellPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private countInput!: DomNode<HTMLInputElement>;
    private priceInput!: DomNode<HTMLInputElement>;

    constructor(private metaverseId: number, private addr: string, private id: number) {
        super(".popup-background");
        this.append(this.content = el(".popup.metaverse-item-sell-popup",
            el("h2", msg("SELL_IT_TITLE")),
            el("p", msg("SELL_POPUP_DESCRIPTION")),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", msg("START_SELL_BUTTON"), {
                    click: async () => {
                        await ItemStoreSaleContract.sell(
                            [this.metaverseId],
                            [this.addr],
                            [this.id],
                            [parseInt(this.countInput.domElement.value, 10)],
                            [utils.parseEther(this.priceInput.domElement.value)],
                            [true],
                        );
                        this.delete();
                        setTimeout(() => ViewUtil.go(`/metaverse/${this.metaverseId}/item/${this.addr}`), 2000);
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
        const royalty = await MetaversesContract.royalties(this.metaverseId);
        const img = data.image;
        this.list.append(el("section",
            img === undefined ? undefined : new NFTDisplay(img),
            el(".info",
                el(".name", data.name),
                el("label",
                    el("span", "판매 개수"),
                    this.countInput = el("input", { placeholder: "판매 개수 입력" }),
                ),
                el("label",
                    el("span", msg("SELL_POPUP_PRICE_DESCRIPTION").replace(/{royalty}/, String(royalty.royalty / 100)).replace(/{fee}/, String(Config.fee))),
                    this.priceInput = el("input", { placeholder: msg("PRICE_SELL_MIX_INPUT") }),
                ),
            ),
        ));
        this.loading.delete();
    }
}
