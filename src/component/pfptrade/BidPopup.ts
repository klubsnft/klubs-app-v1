import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import CommonUtil from "../../CommonUtil";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import Wallet from "../../klaytn/Wallet";
import Loader from "../../Loader";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class BidPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private inputs: DomNode<HTMLInputElement>[] = [];

    constructor(private addr: string, private id: number) {
        super(".popup-background");
        this.append(this.content = el(".popup.pfp-bid-popup",
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
                        await PFPStoreContract.bid(addr, id, prices[0]);
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
        let input: DomNode<HTMLInputElement>;
        const data = await Loader.loadMetadata(this.addr, this.id);
        const auction = await PFPStoreContract.auctions(this.addr, this.id);
        const img = data.image;
        this.list.append(el("section",
            img === undefined ? undefined : new NFTDisplay(img),
            el(".info",
                el(".name", data.name),
                el("label",
                el("span", msg("BID_PRICE_MIX_POPUP_DESC1"), CommonUtil.numberWithCommas(utils.formatEther(auction.startPrice)), msg("BID_PRICE_MIX_POPUP_DESC2")),
                    input = el("input", { placeholder: msg("BID_PRICE_MIX") }),
                ),
            ),
        ));
        this.inputs.push(input);
        this.loading.delete();
    }
}
