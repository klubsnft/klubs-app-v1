import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import ArtNFTCard from "../../component/ArtNFTCard";
import Loading from "../../component/loading/Loading";
import ArtsContract from "../../contracts/ArtsContract";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";

export default class MyArts implements View {

    private container: DomNode;

    private artistArtsLoading: Loading;
    private artistArtsList: DomNode;

    private sellingLoading: Loading;
    private sellingList: DomNode;

    private auctionLoading: Loading;
    private auctionList: DomNode;

    private offeringLoading: Loading;
    private offeringList: DomNode;

    private myNFTLoading: Loading;
    private myNFTList: DomNode;

    constructor() {
        Layout.current.title = "내 Arts";
        Layout.current.content.append(this.container = el(".user-my-arts-view",
            el("header", el("h1", "내 Arts 정보")),
            el("section",
                el("h2", "내가 등록한 작품들"),
                this.artistArtsLoading = new Loading(),
                this.artistArtsList = el(".list"),
            ),
            el("section",
                el("h2", "내가 판매중인 Arts"),
                this.sellingLoading = new Loading(),
                this.sellingList = el(".list"),
            ),
            el("section",
                el("h2", "내가 경매 진행중인 Arts"),
                this.auctionLoading = new Loading(),
                this.auctionList = el(".list"),
            ),
            el("section",
                el("h2", "내가 가격을 제시한 Arts"),
                this.offeringLoading = new Loading(),
                this.offeringList = el(".list"),
            ),
            el("section",
                el("h2", "내 Arts 목록"),
                this.myNFTLoading = new Loading(),
                this.myNFTList = el(".list"),
            ),
        ));
        this.load();
    }

    private async load() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.loadArtistArts(address);
            this.loadSelling(address);
            this.loadAuctions(address);
            this.loadOffering(address);
            this.loadMyNFTs(address);
        }
    }

    private async loadArtistArts(address: string) {

        this.artistArtsList.empty();
        const count = (await ArtsContract.artistArtCount(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const id = await ArtsContract.artistArts(address, index);
                if (await ArtsContract.exists(id) === true && this.container.deleted !== true) {
                    new ArtNFTCard(id.toNumber()).appendTo(this.artistArtsList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (this.container.deleted !== true) {
            this.artistArtsLoading.delete();
        }
    }

    private async loadSelling(address: string) {

        this.sellingList.empty();
        const count = (await ArtStoreContract.userSellInfoLength(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const info = await ArtStoreContract.userSellInfo(address, index);
                if (this.container.deleted !== true) {
                    new ArtNFTCard(info.id).appendTo(this.sellingList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (this.container.deleted !== true) {
            this.sellingLoading.delete();
        }
    }

    private async loadAuctions(address: string) {

        this.auctionList.empty();
        const count = (await ArtStoreContract.userAuctionInfoLength(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const info = await ArtStoreContract.userAuctionInfo(address, index);
                if (this.container.deleted !== true) {
                    new ArtNFTCard(info.id).appendTo(this.auctionList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (this.container.deleted !== true) {
            this.auctionLoading.delete();
        }
    }

    private async loadOffering(address: string) {

        this.offeringList.empty();
        const count = (await ArtStoreContract.userOfferInfoLength(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const info = await ArtStoreContract.userOfferInfo(address, index);
                if (this.container.deleted !== true) {
                    new ArtNFTCard(info.id).appendTo(this.offeringList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (this.container.deleted !== true) {
            this.offeringLoading.delete();
        }
    }

    private async loadMyNFTs(address: string) {

        this.myNFTLoading.style({ display: "block" });
        this.myNFTList.empty();

        const ids: number[] = [];

        const totalSupply = (await ArtsContract.balanceOf(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < totalSupply; i += 1) {
            const promise = async (index: number) => {
                try {
                    const id = (await ArtsContract.tokenOfOwnerByIndex(address, index)).toNumber();
                    ids.push(id);
                } catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
        ids.sort((a, b) => a - b);

        for (const id of ids) {
            new ArtNFTCard(id).appendTo(this.myNFTList);
        }

        if (this.container.deleted !== true) {
            this.myNFTLoading.style({ display: "none" });
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
