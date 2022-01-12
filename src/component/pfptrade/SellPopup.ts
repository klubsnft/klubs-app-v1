import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import Config from "../../Config";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import Loader from "../../Loader";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class SellPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private inputs: DomNode<HTMLInputElement>[] = [];

    constructor(private addr: string[], private ids: number[]) {
        super(".popup-background");
        this.append(this.content = el(".popup.pfp-sell-popup",
            el("h2", msg("SELL_IT_TITLE")),
            el("p", msg("SELL_POPUP_DESCRIPTION")),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", msg("START_SELL_BUTTON"), {
                    click: async () => {
                        const prices: BigNumberish[] = [];
                        for (const input of this.inputs) {
                            prices.push(utils.parseEther(input.domElement.value));
                        }
                        await PFPStoreContract.sell(addr, ids, prices);
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
        for (const [index, addr] of this.addr.entries()) {
            let input: DomNode<HTMLInputElement>;
            const data = await Loader.loadMetadata(addr, this.ids[index]);
            const royalty = await PFPsContract.royalties(addr);
            const img = data.image;
            this.list.append(el("section",
                img === undefined ? undefined : new NFTDisplay(img),
                el(".info",
                    el(".name", data.name),
                    el("label",
                        el("span", msg("SELL_POPUP_PRICE_DESCRIPTION").replace(/{royalty}/, String(royalty.royalty / 100)).replace(/{fee}/, String(Config.fee))),
                        input = el("input", { placeholder: msg("PRICE_SELL_MIX_INPUT") }),
                    ),
                ),
            ));
            this.inputs.push(input);
        }
        this.loading.delete();
    }
}
