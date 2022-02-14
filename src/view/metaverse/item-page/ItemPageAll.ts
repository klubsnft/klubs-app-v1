import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import ItemSaleCard from "../../../component/ItemSaleCard";
import Loading from "../../../component/loading/Loading";
import ItemPageTabs from "../../../component/metaverseitempage/ItemPageTabs";
import ItemStoreSaleContract from "../../../contracts/ItemStoreSaleContract";
import ItemPage from "./ItemPage";
import ItemPageLayout from "./ItemPageLayout";

export default class ItemPageAll implements View, ItemPage {

    private container: DomNode;

    private nftLoading!: Loading;
    private nftList!: DomNode;

    public metaverseId!: number;
    public addr!: string;

    constructor(params: ViewParams) {
        ItemPageLayout.current.content.append(this.container = el(".metaverse-item-page-view.metaverse-item-page-all-view"));
        this.load(parseInt(params.metaverseId, 10), params.addr);
    }

    private async load(metaverseId: number, addr: string) {

        this.metaverseId = metaverseId;
        this.addr = addr;

        this.container.append(
            el("header",
                el("h2", "판매중 아이템 목록"),
                new ItemPageTabs(metaverseId, addr, "all"),
                //this.sortor = new ItemSortor(this),
            ),
            el(".content",
                el(".list-container",
                    this.nftLoading = new Loading(),
                    this.nftList = el(".list"),
                ),
            ),
        );

        this.loadNFTs();
    }

    private createCard(saleIndex: number) {
        new ItemSaleCard(this.metaverseId, this.addr, saleIndex).appendTo(this.nftList);
    }

    public async loadNFTs() {

        this.nftLoading.show();
        this.nftList.empty();

        const saleCount = (await ItemStoreSaleContract.onSalesCount(this.addr)).toNumber();
        for (let i = 0; i < saleCount; i += 1) {
            this.createCard(i);
        }

        this.nftLoading.hide();
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.loadNFTs();
    }

    public close(): void {
        if (this.container.deleted !== true) {
            this.container.delete();
        }
    }
}
