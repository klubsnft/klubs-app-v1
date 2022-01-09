import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import Wallet from "../../klaytn/Wallet";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class ArtBidPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private inputs: DomNode<HTMLInputElement>[] = [];

    constructor(private id: number) {
        super(".popup-background");
        this.append(this.content = el(".popup.art-bid-popup",
            el("h2", msg("BID_IT")),
            el("p", msg("BID_POPUP_DESC1")),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", msg("BID_IT"), {
                    click: async () => {
                        if (await Wallet.connected() !== true) {
                            await Wallet.connect();
                        }
                        const prices: BigNumberish[] = [];
                        for (const input of this.inputs) {
                            prices.push(utils.parseEther(input.domElement.value));
                        }
                        await ArtStoreContract.bid(id, prices[0], 0);
                        this.delete();
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
                el("button", "취소", {
                    click: () => this.delete(),
                }),
            ),
        ));
        this.load();
    }

    private async load() {
        let input: DomNode<HTMLInputElement>;
        const result = await superagent.get(`https://api.klu.bs/arts/${this.id}`);
        const auction = await ArtStoreContract.auctions(this.id);
        const data = result.body;
        const img = data.image;
        this.list.append(el("section",
            img === undefined ? undefined : new NFTDisplay(img),
            el(".info",
                el(".name", data.name),
                el("label",
                    el("span", msg("BID_PRICE_MIX_POPUP_DESC1"), CommonUtil.numberWithCommas(utils.formatEther(auction.startPrice)), " MIX)"),
                    input = el("input", { placeholder: msg("BID_PRICE_MIX") }),
                ),
            ),
        ));
        this.inputs.push(input);
        this.loading.delete();
    }
}
