import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Loading from "../../component/loading/Loading";
import PFPCard from "../../component/PFPCard";
import PFPNFTCard from "../../component/PFPNFTCard";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import KIP17Contract from "../../contracts/standard/KIP17Contract";
import Wallet from "../../klaytn/Wallet";
import Loader from "../../Loader";
import Layout from "../Layout";

export default class MyPFPs implements View {

    private container: DomNode;

    private managingLoading: Loading;
    private managingList: DomNode;

    private sellingLoading: Loading;
    private sellingList: DomNode;

    private offeringLoading: Loading;
    private offeringList: DomNode;

    private myNFTLoading: Loading;
    private myNFTList: DomNode;

    constructor() {
        Layout.current.title = "내 PFP";
        Layout.current.content.append(this.container = el(".user-my-pfps-view",
            el("header", el("h1", "내 PFP 정보")),
            el("section",
                el("h2", "내가 관리하는 PFP"),
                this.managingLoading = new Loading(),
                this.managingList = el(".list"),
            ),
            el("section",
                el("h2", "내가 판매중인 PFP"),
                this.sellingLoading = new Loading(),
                this.sellingList = el(".list"),
            ),
            el("section",
                el("h2", "내가 가격을 제시한 PFP"),
                this.offeringLoading = new Loading(),
                this.offeringList = el(".list"),
            ),
            el("section",
                el("h2", "내 PFP 목록"),
                this.myNFTLoading = new Loading(),
                this.myNFTList = el(".list"),
            ),
        ));

        this.load();
    }

    private async load() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.loadManaging(address);
            this.loadSelling(address);
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
                if (this.container.deleted !== true) {
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
                if (this.container.deleted !== true) {
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

    private async loadOffering(address: string) {

        this.offeringList.empty();
        const count = (await PFPStoreContract.userOfferInfoLength(address)).toNumber();

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (index: number) => {
                const info = await PFPStoreContract.userOfferInfo(address, index);
                if (this.container.deleted !== true) {
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

        this.myNFTList.empty();

        let totalCount = 0;
        const count = await PFPsContract.getAddrCount();
        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);

        const promises: Promise<void>[] = [];
        for (const i of array) {
            const promise = async (index: number) => {
                const addr = await PFPsContract.addrs(index);
                const enumerable = await PFPsContract.enumerables(addr);
                if (enumerable === true) {
                    const contract = new KIP17Contract(addr);
                    const balance = (await contract.balanceOf(address)).toNumber();

                    totalCount += balance;

                    for (let j = 0; j < balance; j += 1) {
                        const id = (await contract.tokenOfOwnerByIndex(address, j)).toNumber();
                        if (this.container.deleted !== true) {
                            new PFPNFTCard(addr, id).appendTo(this.myNFTList);
                        }
                    }
                } else {
                    //TODO: 전체적으로 뜯어 고치기
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        if (this.container.deleted !== true) {
            this.myNFTLoading.delete();
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
