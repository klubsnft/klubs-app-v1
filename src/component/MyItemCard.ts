import { DomNode, el } from "@hanul/skynode";
import ItemStoreSaleContract, { SaleInfo } from "../contracts/ItemStoreSaleContract";
import Wallet from "../klaytn/Wallet";
import Loader from "../Loader";
import ItemPageLayout from "../view/metaverse/item-page/ItemPageLayout";
import ViewUtil from "../view/ViewUtil";
import SellPopup from "./itemtrade/SellPopup";
import NFTDisplay from "./NFTDisplay";

export default class MyItemCard extends DomNode {

    constructor(
        private metaverseId: number,
        private addr: string,
        private id: number,
        private dataSet: { verificationID: string, saleInfo: SaleInfo }[],
    ) {
        super(".metaverse-my-item-nft-card");
        this.load();
    }

    private async load() {
        try {
            const data = await Loader.loadMetaverseItemMetadata(this.addr, this.id);
            if (this.deleted !== true) {
                let balance = 0;
                let amounts = 0;
                const owner = await Wallet.loadAddress();
                if (owner !== undefined) {
                    balance = (await ItemPageLayout.current.contract.balanceOf(owner, this.id)).toNumber();
                    amounts = (await ItemStoreSaleContract.userOnSaleAmounts(owner, this.addr, this.id)).toNumber();
                }
                this.append(
                    data.image === undefined ? undefined : new NFTDisplay(data.image, true),
                    el(".info",
                        el(".name", data.name),
                        el(".balance", `보유량: ${balance}`),
                    ),
                    el(".count", `판매 수량: ${amounts}`),
                    amounts === 0 ? el("a", "판매하기", {
                        click: () => {
                            new SellPopup(this.metaverseId, this.addr, this.id);
                        },
                    }) : el("a", "판매 취소", {
                        click: async () => {
                            const data = this.dataSet.find((d) => d.saleInfo.item === this.addr && d.saleInfo.id.toNumber() === this.id);
                            if (data !== undefined) {
                                await ItemStoreSaleContract.cancelSale([data.verificationID]);
                                ViewUtil.waitTransactionAndRefresh();
                            }
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
