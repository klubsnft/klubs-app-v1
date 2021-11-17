import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import xss from "xss";
import CommonUtil from "../../CommonUtil";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import KIP17Contract from "../../contracts/standard/KIP17Contract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";

export default class NFTDetail implements View {

    private contract: KIP17Contract;

    private container: DomNode;

    private imageDisplay: DomNode;
    private pfpDisplay: DomNode;
    private nameDisplay: DomNode;
    private ownerDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private attributesDisplay: DomNode;
    private tradeForm: DomNode;
    private offerForm: DomNode;

    constructor(params: ViewParams) {

        const addr = params.addr;
        const id = parseInt(params.id, 10);

        this.contract = new KIP17Contract(addr);

        Layout.current.title = "NFT 상세정보";
        Layout.current.content.append(this.container = el(".pfp-nft-detail-view",

            // 이미지
            this.imageDisplay = el("img.nft-image"),

            // 기본 정보
            el("section",
                el("h2", "기본 정보"),
                this.pfpDisplay = el(".pfp"),
                this.nameDisplay = el(".name"),
                this.ownerDisplay = el(".owner"),
                this.descriptionDisplay = el(".description"),
            ),

            // 프로퍼티
            el("section",
                el("h2", "속성"),
                this.attributesDisplay = el(".attributes"),
            ),

            // 가격
            el("section",
                el("h2", "거래하기"),
                this.tradeForm = el(".trade-form"),
            ),

            // 오퍼
            el("section",
                el("h2", "가격 제안"),
                this.offerForm = el(".offer-form"),
            ),

            // 경매
            el("section",
                el("h2", "경매"),
                el("p", "경매 기능은 추후 제공됩니다."),
            ),
        ));
        this.loadPFP(addr);
        this.loadInfo(addr, id);
        this.loadTrade(addr, id);
    }

    private async loadPFP(addr: string) {
        const extras = await PFPsContract.extras(addr);
        try {
            const data: any = JSON.parse(extras);
            if (data.name !== undefined) {
                Layout.current.title = data.name;
                this.pfpDisplay.empty().appendText(data.name);
            }
        } catch (e) {
            console.log(e);
        }
    }

    private async loadTrade(addr: string, id: number) {

        const owner = await this.contract.ownerOf(id);
        this.ownerDisplay.empty().appendText("소유자 ");
        this.ownerDisplay.append(el("span", CommonUtil.shortenAddress(owner)));

        const address = await Wallet.loadAddress();
        this.loadSale(address === owner, addr, id);
        this.loadOffers(address === owner, addr, id);
    }

    private async loadInfo(addr: string, id: number) {
        try {
            const result = await superagent.get(`https://api.klu.bs/pfp/${addr}/${id}/proxy`);
            (this.imageDisplay as DomNode<HTMLImageElement>).domElement.src = result.body.image;
            this.nameDisplay.empty().appendText(result.body.name !== undefined ? result.body.name : `#${id}`);
            if (result.body.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = xss(marked(result.body.description));
            }
            if (result.body.attributes !== undefined) {
                this.attributesDisplay.empty();
                for (const attribute of result.body.attributes) {
                    el(".attribute",
                        el(".trait", attribute.trait_type),
                        el(".value", String(attribute.value)),
                    ).appendTo(this.attributesDisplay);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    private async loadSale(isOwner: boolean, addr: string, id: number) {
        this.tradeForm.empty();

        if (isOwner === true) {
            this.tradeForm.append(
                el("a.sell-button", "판매하기", {
                    //click: () => PFPStoreContract.sell(),
                }),
            );
        }
    }

    private async loadOffers(isOwner: boolean, addr: string, id: number) {
        this.offerForm.empty();

        if (isOwner !== true) {
            this.tradeForm.append(
                el("a.offer-button", "가격 제안하기", {
                    //click: () => PFPStoreContract.sell(),
                }),
            );
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
