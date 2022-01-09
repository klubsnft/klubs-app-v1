import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import superagent from "superagent";
import Config from "../../Config";
import ArtsContract from "../../contracts/ArtsContract";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import Klaytn from "../../klaytn/Klaytn";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class ArtCreateAuctionPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private info: DomNode;
    private startPriceInput: DomNode<HTMLInputElement> | undefined;
    private endBlockInput: DomNode<HTMLInputElement> | undefined;

    constructor(private id: number) {
        super(".popup-background");
        this.append(this.content = el(".popup.art-create-auction-popup",
            el("h2", msg("START_AUCTION")),
            el("p", msg("CREATE_AUCTION_POPUP_DESC1")),
            this.loading = new Loading(),
            this.info = el(".info"),
            el(".button-container",
                el("button", msg("START_AUCTION"), {
                    click: async () => {
                        if (this.startPriceInput !== undefined && this.endBlockInput !== undefined) {
                            const startPrice = utils.parseEther(this.startPriceInput.domElement.value);
                            const endBlock = this.endBlockInput.domElement.value;
                            await ArtStoreContract.createAuction(id, startPrice, endBlock);
                            this.delete();
                            ViewUtil.waitTransactionAndRefresh();
                        }
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
        const result = await superagent.get(`https://api.klu.bs/arts/${this.id}`);
        const data = result.body;
        const royalty = await ArtsContract.royalties(this.id);
        const currentBlock = await Klaytn.loadBlockNumber();
        const img = data.image;
        this.info.append(
            el(".name", data.name),
            img === undefined ? undefined : new NFTDisplay(img),
            el("label",
                el("span", `${msg("CREATE_AUCTION_POPUP_DESC2")} ${royalty.toNumber() / 100}${msg("CREATE_AUCTION_POPUP_DESC3")} ${Config.fee}${msg("CREATE_AUCTION_POPUP_DESC4")}`),
                this.startPriceInput = el("input", { placeholder: msg("AUCTION_START_PRICE") }),
            ),
            el("label",
                el("span", `${msg("CREATE_AUCTION_POPUP_DESC5")} ${currentBlock})`),
                el("p.warning",
                    el("i.fas.fa-exclamation-triangle"),
                    msg("CREATE_AUCTION_POPUP_DESC6"),
                ),
                this.endBlockInput = el("input", { placeholder: msg("END_AUCTION_BLOCK") }),
            ),
        );
        this.loading.delete();
    }
}
