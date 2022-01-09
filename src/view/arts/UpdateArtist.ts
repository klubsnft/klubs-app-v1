import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
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

        Layout.current.title = msg("REVISION_ARTIST");
        Layout.current.content.append(this.container = el(".artist-update-view",
            el("header", el("h1", msg("REVISION_ARTIST"))),
            el("main",
                el(".form",
                    el("h2", msg("UPDATE_BASE_INFO")),
                    el("label",
                        el("h3", msg("BANNER_IMAGE_ADDRESS")),
                        this.bannerPreview = el("img.banner-preview"),
                        this.bannerInput = el("input", {
                            type: "url",
                            placeholder: msg("BANNER_IMAGE_ADDRESS"),
                            change: () => {
                                (this.bannerPreview as DomNode<HTMLImageElement>).domElement.src = this.bannerInput.domElement.value;
                            },
                        }),
                    ),
                    el("label",
                        el("h3", msg("BANNER_UPLOAD")),
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
                        el("h3", msg("ICON_IMAGE_ADDRESS")),
                        this.iconPreview = el("img.icon-preview"),
                        this.iconInput = el("input", {
                            type: "url",
                            placeholder: msg("ICON_IMAGE_ADDRESS"),
                            change: () => {
                                (this.iconPreview as DomNode<HTMLImageElement>).domElement.src = this.iconInput.domElement.value;
                            },
                        }),
                    ),
                    el("label",
                        el("h3", msg("ICON_UPLOAD")),
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
                        el("h3", msg("ARTIST_NAME")),
                        this.nameInput = el("input", { type: "text", placeholder: msg("ARTIST_NAME") }),
                    ),
                    el("label",
                        el("h3", msg("INTRODUCTION")),
                        el("p",
                            el("span", msg("INTRODUCTION_DESC1")),
                            el("a", msg("VIEW_MARKDOWN"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }),
                        ),
                        this.descriptionTextarea = el("textarea", { placeholder: msg("ARTIST_INTRODUCE") }),
                    ),
                    el("label",
                        el("h3", msg("TWITTER")),
                        this.twitterInput = el("input", { type: "url", placeholder: msg("TWITTER_ADDRESS") }),
                    ),
                    el("label",
                        el("h3", msg("HIDE_KLUBS")),
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
                            setTimeout(() => new Alert(msg("SAVE_DONE"), msg("SAVE_DONE_DESC1")), 2000);
                        },
                    }),
                ),
                el(".form",
                    el("h2", msg("REVISE_2ND_SALES_FEE_INFO")),
                    el("label",
                        el("h3", msg("2ND_SALES_FEE_RATIO")),
                        el("p", msg("2ND_SALES_FEE_RATIO_DESC1")),
                        this.baseRoyaltyInput = el("input", { type: "number", placeholder: msg("2ND_SALES_FEE_RATIO") }),
                    ),
                    el("button", msg("SAVE_INFO"), {
                        click: async () => {
                            await ArtistsContract.setBaseRoyalty(Math.floor(parseFloat(this.baseRoyaltyInput.domElement.value) * 100));
                            setTimeout(() => new Alert(msg("SAVE_DONE"), msg("SAVE_DONE_DESC1")), 2000);
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
