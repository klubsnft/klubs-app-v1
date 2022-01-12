import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import Config from "../../Config";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import Klaytn from "../../klaytn/Klaytn";
import Loader from "../../Loader";
import ViewUtil from "../../view/ViewUtil";
import Alert from "../dialogue/Alert";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class CreateAuctionPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private info: DomNode;
    private startPriceInput: DomNode<HTMLInputElement> | undefined;
    private endBlockInput: DomNode<HTMLInputElement> | undefined;

    constructor(private addr: string, private id: number) {
        super(".popup-background");
        this.append(this.content = el(".popup.pfp-create-auction-popup",
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
                                await PFPStoreContract.createAuction(addr, id, startPrice, endBlock);
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
        const data = await Loader.loadMetadata(this.addr, this.id);
        const royalty = await PFPsContract.royalties(this.addr);
        const currentBlock = await Klaytn.loadBlockNumber();
        const img = data.image;
        this.info.append(
            el(".name", data.name),
            img === undefined ? undefined : new NFTDisplay(img),
            el("label",
                el("span", msg("CREATE_AUCTION_START_PRICE_DESCRIPTION").replace(/{royalty}/, String(royalty.royalty / 100).replace(/{fee}/, String(Config.fee)))),
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
