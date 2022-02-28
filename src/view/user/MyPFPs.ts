import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import msg from "msg.js";
import superagent from "superagent";
import Loading from "../../component/loading/Loading";
import PFPCard from "../../component/PFPCard";
import PFPNFTCard from "../../component/PFPNFTCard";
import PFPPagination from "../../component/pfppage/PFPPagination";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import PFPPage from "../pfp/page/PFPPage";

export default class MyPFPs implements View, PFPPage {

    private container: DomNode;

    private managingLoading: Loading;
    private managingList: DomNode;

    private sellingLoading: Loading;
    private sellingList: DomNode;

    private auctionLoading: Loading;
    private auctionList: DomNode;

    private offeringLoading: Loading;
    private offeringList: DomNode;

    private myNFTLoading: Loading;
    private myNFTList: DomNode;

    private pagination1: PFPPagination;
    private pagination2: PFPPagination;

    private page: number;

    public addr = "";

    constructor(params: ViewParams) {
        this.page = params.page === undefined ? 1 : parseInt(params.page, 10);

        Layout.current.title = msg("MY_PFP_TITLE");
        Layout.current.content.append(this.container = el(".user-my-pfps-view",
            el("header", el("h1", msg("MY_PFP_TITLE"))),
            el("section",
                el("h2", msg("MY_MANAGE_PFP_TITLE")),
                this.managingLoading = new Loading(),
                this.managingList = el(".list"),
            ),
            el("section",
                el("h2", msg("MY_SELLING_PFP_TITLE")),
                this.sellingLoading = new Loading(),
                this.sellingList = el(".list"),
            ),
            el("section",
                el("h2", msg("MY_BIDDING_PFP_TITLE")),
                this.auctionLoading = new Loading(),
                this.auctionList = el(".list"),
            ),
            el("section",
                el("h2", msg("MY_OFFER_PFP_TITLE")),
                this.offeringLoading = new Loading(),
                this.offeringList = el(".list"),
            ),
            el("section",
                el("h2", msg("MY_PFP_LIST_TITLE")),
                el("p.warning",
                    el("i.fas.fa-exclamation-triangle"),
                    msg("MY_PFP_LIST_WARNING"),
                ),
                this.myNFTLoading = new Loading(),
                this.pagination1 = new PFPPagination(this, this.page),
                this.myNFTList = el(".list"),
                this.pagination2 = new PFPPagination(this, this.page),
            ),
        ));

        this.load();
    }

    private async load() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.loadManaging(address);
            this.loadSelling(address);
            this.loadAuctions(address);
            this.loadOffering(address);
            this.loadMyNFTs(address);
        }
    }

    private async loadManaging(address: string) {

        this.managingList.empty();
        const count = (await PFPsContract.getManagerPFPCount(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const addr = await PFPsContract.managerPFPs(address, index);
                const extras = await PFPsContract.extras(addr);
                let data: any = {};
                try { data = JSON.parse(extras); } catch (e) { }
                if (data.hiding !== true && this.container.deleted !== true) {
                    new PFPCard(addr, data).appendTo(this.managingList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (this.container.deleted !== true) {
            this.managingLoading.delete();
        }
    }

    private async loadSelling(address: string) {

        this.sellingList.empty();
        const count = (await PFPStoreContract.userSellInfoLength(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const info = await PFPStoreContract.userSellInfo(address, index);
                const extras = await PFPsContract.extras(info.pfp);
                let data: any = {};
                try { data = JSON.parse(extras); } catch (e) { }
                if (data.hiding !== true && this.container.deleted !== true) {
                    new PFPNFTCard(info.pfp, info.id).appendTo(this.sellingList);
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
        const count = (await PFPStoreContract.userAuctionInfoLength(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const info = await PFPStoreContract.userAuctionInfo(address, index);
                const extras = await PFPsContract.extras(info.pfp);
                let data: any = {};
                try { data = JSON.parse(extras); } catch (e) { }
                if (data.hiding !== true && this.container.deleted !== true) {
                    new PFPNFTCard(info.pfp, info.id).appendTo(this.auctionList);
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
        const count = (await PFPStoreContract.userOfferInfoLength(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const info = await PFPStoreContract.userOfferInfo(address, index);
                const extras = await PFPsContract.extras(info.pfp);
                let data: any = {};
                try { data = JSON.parse(extras); } catch (e) { }
                if (data.hiding !== true && this.container.deleted !== true) {
                    new PFPNFTCard(info.pfp, info.id).appendTo(this.offeringList);
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

        const result = await superagent.get(`https://api.klu.bs/v2/pfp/owned/${address}/${this.page - 1}`);
        const info = result.body;

        if (this.page > info.totalPage) {
            this.page = info.totalPage;
        }

        this.pagination1.update(this.page, info.totalPage);
        this.pagination2.update(this.page, info.totalPage);

        for (const data of info.dataSet) {
            new PFPNFTCard(data.addr, data.nftId).appendTo(this.myNFTList);
        }

        if (this.container.deleted !== true) {
            this.myNFTLoading.style({ display: "none" });
        }
    }

    public async loadNFTs() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.loadMyNFTs(address);
        }
    }

    public goPage(page: number) {
        SkyRouter.go(`/user/my-pfps/${page}`);
    }

    public toggleRarityMode() {
        // ignore.
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.page = params.page === undefined ? 1 : parseInt(params.page, 10);
        this.loadNFTs();
    }

    public close(): void {
        this.container.delete();
    }
}
