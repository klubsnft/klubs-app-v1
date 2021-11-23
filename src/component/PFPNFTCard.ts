import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../CommonUtil";
import PFPStoreContract from "../contracts/PFPStoreContract";
import Loader from "../Loader";
import ViewUtil from "../view/ViewUtil";
import NFTDisplay from "./NFTDisplay";

export default class PFPNFTCard extends DomNode {

    constructor(private addr: string, private id: number, showingOffer?: boolean) {
        super(".pfp-nft-card");
        this.onDom("click", () => ViewUtil.go(`/pfp/${addr}/${id}`));
        this.load();
        if (showingOffer === true) {
            this.addClass("offers");
            this.loadOffers();
        }
    }

    private async load() {
        try {
            const data = await Loader.loadMetadata(this.addr, this.id);
            const saleInfo = await PFPStoreContract.sales(this.addr, this.id);
            if (this.deleted !== true) {
                this.append(
                    data.image === undefined ? undefined : new NFTDisplay(data.image),
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
}
