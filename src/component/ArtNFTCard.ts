import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../CommonUtil";
import ArtStoreContract from "../contracts/ArtStoreContract";
import ViewUtil from "../view/ViewUtil";
import NFTDisplay from "./NFTDisplay";

export default class ArtNFTCard extends DomNode {

    constructor(
        private id: number,
        showingOffer?: boolean,
        private showingForce?: boolean,
    ) {
        super(".art-nft-card");
        this.onDom("click", () => ViewUtil.go(`/arts/${id}`));
        this.load();
        if (showingOffer === true) {
            this.addClass("offers");
            this.loadOffers();
        }
    }

    private async load() {
        try {
            const result = await superagent.get(`https://api.klu.bs/arts/${this.id}`);
            const data = result.body;
            if (data.image === undefined && this.showingForce !== true) {
                this.delete();
            } else {
                const saleInfo = await ArtStoreContract.sales(this.id);
                if (this.deleted !== true) {
                    this.append(
                        data.image === undefined ? undefined : new NFTDisplay(data.image, true),
                        el(".info",
                            el(".name", data.name === undefined ? "제목 없음" : data.name),
                            saleInfo.price.eq(0) === true ? undefined : el(".price",
                                el("img", { src: "/images/mix.png", height: "24" }),
                                el("span", CommonUtil.numberWithCommas(utils.formatEther(saleInfo.price))),
                            ),
                        ),
                    );
                }
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
}
