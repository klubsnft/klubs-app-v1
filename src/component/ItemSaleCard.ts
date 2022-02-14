import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../CommonUtil";
import ItemStoreSaleContract from "../contracts/ItemStoreSaleContract";
import Loader from "../Loader";
import BuyPopup from "./itemtrade/BuyPopup";
import NFTDisplay from "./NFTDisplay";

export default class ItemSaleCard extends DomNode {

    constructor(
        private metaverseId: number,
        private addr: string,
        private saleIndex: number,
    ) {
        super(".metaverse-item-nft-card");
        this.load();
    }

    private async load() {
        try {
            const verificationID = await ItemStoreSaleContract.onSales(this.addr, this.saleIndex);
            const saleInfo = await ItemStoreSaleContract.getSaleInfo(verificationID);
            const data = await Loader.loadMetaverseItemMetadata(saleInfo.item, saleInfo.id.toNumber());
            const sale = await ItemStoreSaleContract.sales(saleInfo.item, saleInfo.id.toNumber(), saleInfo.saleId.toNumber());
            if (this.deleted !== true) {
                this.append(
                    data.image === undefined ? undefined : new NFTDisplay(data.image, true),
                    el(".info",
                        el(".name", data.name),
                        sale.unitPrice.eq(0) === true ? undefined : el(".price",
                            el("img", { src: "/images/mix.png", height: "24" }),
                            el("span", CommonUtil.numberWithCommas(utils.formatEther(sale.unitPrice))),
                        ),
                    ),
                    el(".count", `판매 수량: ${sale.amount}`),
                    el(".seller", `판매자: ${CommonUtil.shortenAddress(sale.seller)}`),
                    el("a", "구매하기", {
                        click: () => {
                            new BuyPopup(this.metaverseId, this.addr, saleInfo.id.toNumber(), sale.unitPrice, verificationID);
                        },
                    }),
                );
            }
        } catch (e) {
            console.error(e);
            if (this.deleted !== true) {
                this.delete();
            }
        }
    }
}
