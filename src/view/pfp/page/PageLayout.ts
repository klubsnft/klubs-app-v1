import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import { View, ViewParams } from "skyrouter";
import xss from "xss";
import PFPsContract from "../../../contracts/PFPsContract";
import KIP17Contract from "../../../contracts/standard/KIP17Contract";
import Wallet from "../../../klaytn/Wallet";
import Layout from "../../Layout";
import ViewUtil from "../../ViewUtil";

export default class PageLayout implements View {

    public contract!: KIP17Contract;

    public static current: PageLayout;
    private container: DomNode;
    public content: DomNode;

    private header: DomNode;
    private iconDisplay: DomNode<HTMLImageElement>;
    private nameDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private miningInfoDisplay: DomNode;
    private socialList: DomNode;

    constructor(params: ViewParams) {
        PageLayout.current = this;
        Layout.current.title = "PFP 상세정보";
        Layout.current.content.append(this.container = el(".pfp-page-layout",
            this.header = el("header",
                this.iconDisplay = el("img"),
                el(".body",
                    this.nameDisplay = el("h1"),
                    this.descriptionDisplay = el("p"),
                    this.miningInfoDisplay = el("p"),
                    this.socialList = el(".social"),
                ),
            ),
            this.content = el("main"),
        ));
        this.load(params.addr);
    }

    private load(addr: string) {
        this.contract = new KIP17Contract(addr);
        this.loadInfo(addr);
        this.loadUpdateButton(addr);
    }

    private async loadInfo(addr: string) {
        const extras = await PFPsContract.extras(addr);
        try {
            const data: any = JSON.parse(extras);
            if (data.icon === undefined || data.icon.trim() === "") {
                this.iconDisplay.domElement.src = "/images/placeholder.svg";
            } else {
                this.iconDisplay.domElement.src = data.icon;
            }
            if (data.name !== undefined) {
                Layout.current.title = data.name;
                this.nameDisplay.empty().appendText(data.name);
            }
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = xss(marked(data.description));
            }
            if (data.mineable === true) {
                this.miningInfoDisplay.empty().append(
                    el("a.mining",
                        el("img", { src: "/images/icon/mining.png", height: "14" }),
                        el("span", "채굴 가능"),
                        {
                            title: "채굴 가능한 PFP입니다. 클릭하시면 자세한 정보를 확인하실 수 있습니다.",
                            href: data.miningInfoURL,
                            target: "_blank",
                            click: (event: MouseEvent) => event.stopPropagation(),
                        },
                    ),
                );
            }
            this.socialList.empty();
            if (data.twitter !== undefined && data.twitter.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/twitter.svg", height: 24 }),
                        { href: data.twitter, target: "_blank" },
                    ),
                );
            }
            if (data.kakaotalk !== undefined && data.kakaotalk.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/kakao-talk.svg", height: 24 }),
                        { href: data.kakaotalk, target: "_blank" },
                    ),
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    private async loadUpdateButton(addr: string) {
        try {
            const address = await Wallet.loadAddress();
            if (address !== undefined && await PFPsContract.existsManager(addr, address) === true) {
                el("button.update-button", "정보 수정", {
                    click: () => ViewUtil.go(`/pfp/${addr}/update`),
                }).appendTo(this.header);
            }
        } catch (e) {
            console.log(e);
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(params.addr);
    }

    public close(): void {
        this.container.delete();
    }
}
