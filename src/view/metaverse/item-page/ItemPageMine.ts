import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Loading from "../../../component/loading/Loading";
import ItemPageTabs from "../../../component/metaverseitempage/ItemPageTabs";
import ItemNFTCard from "../../../component/MyItemCard";
import ItemStoreSaleContract, { SaleInfo } from "../../../contracts/ItemStoreSaleContract";
import MetaversesContract from "../../../contracts/MetaversesContract";
import Wallet from "../../../klaytn/Wallet";
import ItemPage from "./ItemPage";
import ItemPageLayout from "./ItemPageLayout";

export default class ItemPageMine implements View, ItemPage {

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
                el("h2", "아이템 목록"),
                new ItemPageTabs(metaverseId, addr, "mine"),
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

    private createCard(id: number, dataSet: { verificationID: string, saleInfo: SaleInfo }[]) {
        new ItemNFTCard(this.metaverseId, this.addr, id, dataSet).appendTo(this.nftList);
    }

    public async loadNFTs() {

        this.nftLoading.show();
        this.nftList.empty();

        const dataSet: { verificationID: string, saleInfo: SaleInfo }[] = [];
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const length = (await ItemStoreSaleContract.userSellInfoLength(owner)).toNumber();
            const promises: Promise<void>[] = [];
            for (let i = 0; i < length; i += 1) {
                const promise = async (index: number) => {
                    try {
                        const verificationID = await ItemStoreSaleContract.userSellInfo(owner, index);
                        const saleInfo = await ItemStoreSaleContract.getSaleInfo(verificationID);
                        dataSet.push({ verificationID, saleInfo });
                    } catch (e) {
                        console.error(e);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
        }

        const totalSupply = (await MetaversesContract.getItemTotalSupply(this.metaverseId, this.addr)).toNumber();
        for (let id = 0; id < totalSupply; id += 1) {
            this.createCard(id, dataSet);
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
