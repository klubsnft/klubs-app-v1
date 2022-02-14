import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import CommonUtil from "../CommonUtil";
import PFPStoreContract from "../contracts/PFPStoreContract";
import Loader from "../Loader";
import RarityInfo from "../RarityInfo";
import ViewUtil from "../view/ViewUtil";
import NFTDisplay from "./NFTDisplay";

export default class PFPNFTCard extends DomNode {

    private _mode: "view" | "select" = "view";
    private rarityDisplay: DomNode | undefined;

    constructor(
        private addr: string,
        private id: number,
        private selecting?: boolean,
        showingOffer?: boolean,
    ) {
        super(".pfp-nft-card");
        this.onDom("click", () => {
            if (this.mode === "view") {
                ViewUtil.go(`/pfp/${addr}/${id}`);
            } else if (this.selecting !== true) {
                this.selecting = true;
                this.update();
                this.fireEvent("select", id);
            } else {
                this.selecting = false;
                this.update();
                this.fireEvent("deselect", id);
            }
        });
        this.load();
        if (showingOffer === true) {
            this.addClass("offers");
            this.loadOffers();
        }
        this.update();
    }

    public set mode(mode: "view" | "select") {
        this._mode = mode;
        this.selecting = false;
        this.update();
    }

    public get mode() {
        return this._mode;
    }

    private update() {
        if (this.mode === "select" && this.selecting === true) {
            this.addClass("selecting");
        } else {
            this.deleteClass("selecting");
        }
    }

    private async load() {
        try {
            const data = await Loader.loadPFPMetadata(this.addr, this.id);
            const saleInfo = await PFPStoreContract.sales(this.addr, this.id);
            if (this.deleted !== true) {
                this.append(
                    data.image === undefined ? undefined : new NFTDisplay(data.image, true),
                    el(".info",
                        el(".name", data.name),
                        saleInfo.price.eq(0) === true ? undefined : el(".price",
                            el("img", { src: "/images/mix.png", height: "24" }),
                            el("span", CommonUtil.numberWithCommas(utils.formatEther(saleInfo.price))),
                        ),
                    ),
                );
            }
        } catch (e) {
            console.error(e);
            if (this.deleted !== true) {
                this.delete();
            }
        }
    }

    private async loadOffers() {
        //TODO:
    }

    public showRarity(rarity: RarityInfo) {
        this.addClass("showing-rarity");
        this.rarityDisplay?.delete();
        this.rarityDisplay = el(".rarity",
            rarity.scores[this.id] === undefined ?
                msg("CALCULATED_YET_DESCRIPTION") :
                CommonUtil.numberWithCommas(String(rarity.scores[this.id])),
            rarity.scores[this.id] === undefined ? undefined :
                el("span.rank", `Rank #${rarity.rankings[this.id] + 1}`),
        ).appendTo(this);
    }

    public hideRarity() {
        this.deleteClass("showing-rarity");
        this.rarityDisplay?.delete();
        this.rarityDisplay = undefined;
    }
}
