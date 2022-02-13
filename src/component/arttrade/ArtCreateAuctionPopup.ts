import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import superagent from "superagent";
import Config from "../../Config";
import ArtsContract from "../../contracts/ArtsContract";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import Klaytn from "../../klaytn/Klaytn";
import ViewUtil from "../../view/ViewUtil";
import Alert from "../dialogue/Alert";
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
            el("h2", msg("START_AUCTION_TITLE")),
            el("p", msg("CREATE_AUCTION_POPUP_DESCRIPTION")),
            this.loading = new Loading(),
            this.info = el(".info"),
            el(".button-container",
                el("button", msg("START_AUCTION_BUTTON"), {
                    click: async () => {
                        if (this.startPriceInput !== undefined && this.endBlockInput !== undefined) {
                            const startPrice = utils.parseEther(this.startPriceInput.domElement.value);
                            const endBlock = this.endBlockInput.domElement.value;
                            const currentBlock = await Klaytn.loadBlockNumber();
                            if (parseInt(endBlock) < currentBlock) {
                                new Alert("오류", "경매 종료 블록은 현재 블록보다 커야합니다.");
                            } else {
                                await ArtStoreContract.createAuction(id, startPrice, endBlock);
                                this.delete();
                                ViewUtil.waitTransactionAndRefresh();
                            }
                        }
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
        const result = await superagent.get(`https://api.klu.bs/arts/${this.id}`);
        const data = result.body;
        const royalty = await ArtsContract.royalties(this.id);
        const currentBlock = await Klaytn.loadBlockNumber();
        const img = data.image;
        this.info.append(
            el(".name", data.name),
            img === undefined ? undefined : new NFTDisplay(img),
            el("label",
                el("span", msg("CREATE_AUCTION_START_PRICE_DESCRIPTION").replace(/{royalty}/, String(royalty.toNumber() / 100)).replace(/{fee}/, String(Config.fee))),
                this.startPriceInput = el("input", { placeholder: msg("AUCTION_START_PRICE_INPUT") }),
            ),
            el("label",
                el("span", msg("CREATE_AUCTION_POPUP_DESCRIPTION").replace(/{currentBlock}/, currentBlock)),
                el("p.warning",
                    el("i.fas.fa-exclamation-triangle"),
                    msg("CREATE_AUCTION_POPUP_WARNING"),
                ),
                this.endBlockInput = el("input", { placeholder: msg("END_AUCTION_BLOCK_INPUT") }),
            ),
        );
        this.loading.delete();
    }
}
