import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../CommonUtil";
import ProxyUtil from "../ProxyUtil";
import ViewUtil from "../view/ViewUtil";

export default class PFPNFTCard extends DomNode {

    constructor(
        addr: string,
        id: number,
        img: string | undefined,
        name: string | undefined,
        price: BigNumber,
        showingOffer?: boolean
    ) {
        super(".pfp-nft-card");

        this.append(
            img === undefined ? undefined : el("img", { src: ProxyUtil.imageSRC(img) }),
            el(".info",
                el(".name", name),
                price.eq(0) === true ? undefined : el(".price",
                    el("img", { src: "/images/mix.png", height: "24" }),
                    el("span", CommonUtil.numberWithCommas(utils.formatEther(price))),
                ),
            ),
        );

        this.onDom("click", () => ViewUtil.go(`/pfp/${addr}/${id}`));

        if (showingOffer === true) {
            this.addClass("offers");
            this.loadOffers();
        }
    }

    private async loadOffers() {
        //TODO:
    }
}
