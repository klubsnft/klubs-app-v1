import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Alert from "../../component/dialogue/Alert";
import ArtistsContract from "../../contracts/ArtistsContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";

export default class UpdateArtist implements View {

    private container: DomNode;
    private bannerPreview: DomNode;
    private bannerInput: DomNode<HTMLInputElement>;
    private iconPreview: DomNode;
    private iconInput: DomNode<HTMLInputElement>;
    private nameInput: DomNode<HTMLInputElement>;
    private descriptionTextarea: DomNode<HTMLInputElement>;
    private twitterInput: DomNode<HTMLInputElement>;
    private hidingCheckbox: DomNode<HTMLInputElement>;

    private baseRoyaltyInput: DomNode<HTMLInputElement>;

    constructor() {

        Layout.current.title = "작가 정보 수정";
        Layout.current.content.append(this.container = el(".artist-update-view",
            el("header", el("h1", "작가 정보 수정")),
            el("main",
                el(".form",
                    el("h2", "기본 정보 수정"),
                    el("label",
                        el("h3", "배너 이미지 주소"),
                        this.bannerPreview = el("img.banner-preview"),
                        this.bannerInput = el("input", {
                            type: "url",
                            placeholder: "배너 이미지 주소",
                            change: () => {
                                (this.bannerPreview as DomNode<HTMLImageElement>).domElement.src = this.bannerInput.domElement.value;
                            },
                        }),
                    ),
                    el("label",
                        el("h3", "배너 업로드"),
                        el("input", {
                            type: "file",
                            change: (event) => {
                                const file = event.target.files[0];
                                const reader = new FileReader();
                                reader.addEventListener("load", async () => {
                                    const result = await fetch(`https://api.klu.bs/artist/uploadbanner`, {
                                        method: "POST",
                                        body: reader.result as string,
                                    });
                                    this.bannerInput.domElement.value = await result.text();
                                    this.bannerInput.fireDomEvent("change");
                                }, false);
                                if (file) {
                                    reader.readAsDataURL(file);
                                }
                            },
                        }),
                    ),
                    el("label",
                        el("h3", "아이콘 이미지 주소"),
                        this.iconPreview = el("img.icon-preview"),
                        this.iconInput = el("input", {
                            type: "url",
                            placeholder: "아이콘 이미지 주소",
                            change: () => {
                                (this.iconPreview as DomNode<HTMLImageElement>).domElement.src = this.iconInput.domElement.value;
                            },
                        }),
                    ),
                    el("label",
                        el("h3", "아이콘 업로드"),
                        el("input", {
                            type: "file",
                            change: (event) => {
                                const file = event.target.files[0];
                                const reader = new FileReader();
                                reader.addEventListener("load", async () => {
                                    const result = await fetch(`https://api.klu.bs/artist/uploadicon`, {
                                        method: "POST",
                                        body: reader.result as string,
                                    });
                                    this.iconInput.domElement.value = await result.text();
                                    this.iconInput.fireDomEvent("change");
                                }, false);
                                if (file) {
                                    reader.readAsDataURL(file);
                                }
                            },
                        }),
                    ),
                    el("label",
                        el("h3", "작가명"),
                        this.nameInput = el("input", { type: "text", placeholder: "작가명" }),
                    ),
                    el("label",
                        el("h3", "소개글"),
                        el("p",
                            el("span", "소개글은 마크다운 문법을 사용합니다."),
                            el("a", "마크다운 문법 보기", { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }),
                        ),
                        this.descriptionTextarea = el("textarea", { placeholder: "작가 소개" }),
                    ),
                    el("label",
                        el("h3", "트위터"),
                        this.twitterInput = el("input", { type: "url", placeholder: "트위터 주소" }),
                    ),
                    el("label",
                        el("h3", "Klubs에서 숨기기"),
                        this.hidingCheckbox = el("input", { type: "checkbox" }),
                    ),
                    el("button", "정보 저장", {
                        click: async () => {
                            const extra = {
                                banner: this.bannerInput.domElement.value,
                                icon: this.iconInput.domElement.value,
                                name: this.nameInput.domElement.value,
                                description: this.descriptionTextarea.domElement.value,
                                twitter: this.twitterInput.domElement.value,
                                hiding: this.hidingCheckbox.domElement.checked,
                            };
                            await ArtistsContract.setExtra(JSON.stringify(extra));
                            setTimeout(() => new Alert("저장 완료", "정보를 저장했습니다."), 2000);
                        },
                    }),
                ),
                el(".form",
                    el("h2", "2차 판매 수수료 정보 수정"),
                    el("label",
                        el("h3", "2차 판매 수수료 비율(%)"),
                        el("p", "2차 판매 수수료 비율은 최대 10%까지 설정하실 수 있으며, 소수점 2번째 자리까지 지정 가능합니다."),
                        this.baseRoyaltyInput = el("input", { type: "number", placeholder: "2차 판매 수수료 비율(%)" }),
                    ),
                    el("button", "정보 저장", {
                        click: async () => {
                            await ArtistsContract.setBaseRoyalty(Math.floor(parseFloat(this.baseRoyaltyInput.domElement.value) * 100));
                            setTimeout(() => new Alert("저장 완료", "정보를 저장했습니다."), 2000);
                        },
                    }),
                ),
            ),
        ));

        this.load();
        this.loadBaseRoyalty();
    }

    private async load() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const extras = await ArtistsContract.extras(address);
            if (extras.trim() !== "") {
                let data: any = {};
                try { data = JSON.parse(extras); } catch (e) { }

                (this.bannerPreview as DomNode<HTMLImageElement>).domElement.src = data.banner;
                this.bannerInput.domElement.value = data.banner === undefined ? "" : data.banner;

                (this.iconPreview as DomNode<HTMLImageElement>).domElement.src = data.icon;
                this.iconInput.domElement.value = data.icon === undefined ? "" : data.icon;

                this.nameInput.domElement.value = data.name === undefined ? "" : data.name;
                this.descriptionTextarea.domElement.value = data.description === undefined ? "" : data.description;
                this.twitterInput.domElement.value = data.twitter === undefined ? "" : data.twitter;

                if (data.hiding === true) {
                    this.hidingCheckbox.domElement.checked = true;
                }
            }
        }
    }

    private async loadBaseRoyalty() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const royalty = await ArtistsContract.baseRoyalty(address);
            this.baseRoyaltyInput.domElement.value = (royalty.toNumber() / 100).toString();
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
