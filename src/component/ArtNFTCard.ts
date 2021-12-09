import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import CommonUtil from "../CommonUtil";
import RarityInfo from "../RarityInfo";
import ViewUtil from "../view/ViewUtil";
import NFTDisplay from "./NFTDisplay";

export default class ArtNFTCard extends DomNode {

    private _mode: "view" | "select" = "view";
    private rarityDisplay: DomNode | undefined;

    constructor(
        private id: number,
        private selecting?: boolean,
        showingOffer?: boolean,
    ) {
        super(".art-nft-card");
        this.onDom("click", () => {
            if (this.mode === "view") {
                ViewUtil.go(`/arts/${id}/update`);
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
            const result = await superagent.get(`https://api.klu.bs/arts/${this.id}/metadata`);
            const data = result.body;
            //const saleInfo = await PFPStoreContract.sales(this.addr, this.id);
            if (this.deleted !== true) {
                this.append(
                    data.image === undefined ? undefined : new NFTDisplay(data.image, true),
                    el(".info",
                        el(".name", data.name === undefined ? "제목 없음" : data.name),
                        /*saleInfo.price.eq(0) === true ? undefined : el(".price",
                            el("img", { src: "/images/mix.png", height: "24" }),
                            el("span", CommonUtil.numberWithCommas(utils.formatEther(saleInfo.price))),
                        ),*/
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
        this.rarityDisplay = el(".rarity", CommonUtil.numberWithCommas(String(rarity.scores[this.id]))).appendTo(this);
    }

    public hideRarity() {
        this.deleteClass("showing-rarity");
        this.rarityDisplay?.delete();
        this.rarityDisplay = undefined;
    }
}