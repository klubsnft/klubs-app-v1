import { DomNode, el } from "@hanul/skynode";
import { constants } from "ethers";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import superagent from "superagent";
import Alert from "../../component/dialogue/Alert";
import Confirm from "../../component/dialogue/Confirm";
import ArtsContract from "../../contracts/ArtsContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class UpdateArt implements View {

    private container: DomNode;
    private imagePreview: DomNode;
    private imageInput: DomNode<HTMLInputElement>;
    private nameInput: DomNode<HTMLInputElement>;
    private descriptionTextarea: DomNode<HTMLInputElement>;
    private externalURLInput: DomNode<HTMLInputElement>;

    private exceptionalRoyaltiesCheckbox: DomNode<HTMLInputElement>;
    private exceptionalRoyaltyLabel: DomNode;
    private exceptionalRoyaltyInput: DomNode<HTMLInputElement>;

    constructor(params: ViewParams) {
        const id = parseInt(params.id, 10);

        Layout.current.title = msg("REVISION_ART_INFO");
        Layout.current.content.append(this.container = el(".art-update-view",
            el("header", el("h1", msg("REVISION_ART_INFO"))),
            el("main",
                el(".form",
                    el("h2", msg("UPDATE_BASE_INFO")),
                    el("label",
                        el("h3", msg("ART_IMAGE_ADDRESS")),
                        this.imagePreview = el("img.image-preview"),
                        this.imageInput = el("input", {
                            type: "url",
                            placeholder: msg("ART_IMAGE_ADDRESS"),
                            change: () => {
                                (this.imagePreview as DomNode<HTMLImageElement>).domElement.src = this.imageInput.domElement.value;
                            },
                        }),
                    ),
                    el("label",
                        el("h3", msg("ART_UPLOAD")),
                        el("p", msg("ART_UPLOAD_DESC1")),
                        el("input", {
                            type: "file",
                            change: (event) => {
                                const file = event.target.files[0];
                                const reader = new FileReader();
                                reader.addEventListener("load", async () => {
                                    const result = await fetch(`https://api.klu.bs/arts/uploadimage`, {
                                        method: "POST",
                                        body: reader.result as string,
                                    });
                                    this.imageInput.domElement.value = await result.text();
                                    this.imageInput.fireDomEvent("change");
                                }, false);
                                if (file) {
                                    reader.readAsDataURL(file);
                                }
                            },
                        }),
                    ),
                    el("label",
                        el("h3", msg("ART_NAME")),
                        this.nameInput = el("input", { type: "text", placeholder: msg("ART_NAME") }),
                    ),
                    el("label",
                        el("h3", msg("INTRODUCTION")),
                        el("p",
                            el("span", msg("INTRODUCTION_DESC1")),
                            el("a", msg("VIEW_MARKDOWN"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }),
                        ),
                        this.descriptionTextarea = el("textarea", { placeholder: msg("ART_PRESENT") }),
                    ),
                    el("label",
                        el("h3", msg("EXTERNAL_LINK")),
                        this.externalURLInput = el("input", { type: "url", placeholder: msg("EXTERNAL_LINK") }),
                    ),
                    el("button", msg("SAVE_INFO"), {
                        click: async () => {
                            const metadata = {
                                image: this.imageInput.domElement.value,
                                name: this.nameInput.domElement.value,
                                description: this.descriptionTextarea.domElement.value,
                                external_url: this.externalURLInput.domElement.value,
                            };
                            const signedMessage = await Wallet.signMessage(`Upload Klubs Arts #${id} Metadata`);
                            await fetch(`https://api.klu.bs/arts/${id}/setmetadata`, {
                                method: "POST",
                                body: JSON.stringify({
                                    metadata,
                                    signedMessage,
                                }),
                            });
                            new Alert(msg("SAVE_DONE"), msg("SAVE_DONE_DESC1"));
                        },
                    }),
                ),
                el(".form",
                    el("h2", msg("REVISE_2ND_SALES_FEE_INFO")),
                    el("label",
                        el("h3", msg("SETTING_ARTIST_BASE_SALES_FEE")),
                        el("p", msg("SETTING_ARTIST_BASE_SALES_FEE_DESC1")),
                        this.exceptionalRoyaltiesCheckbox = el("input", { type: "checkbox" }, {
                            change: () => {
                                if (this.exceptionalRoyaltiesCheckbox.domElement.checked === true) {
                                    this.exceptionalRoyaltyLabel.style({ display: "none" });
                                } else {
                                    this.exceptionalRoyaltyLabel.style({ display: "block" });
                                }
                            },
                        }),
                    ),
                    this.exceptionalRoyaltyLabel = el("label",
                        el("h3", msg("2ND_SALES_FEE_RATIO")),
                        el("p", msg("2ND_SALES_FEE_RATIO_DESC1")),
                        this.exceptionalRoyaltyInput = el("input", { type: "number", placeholder: msg("2ND_SALES_FEE_RATIO")}),
                    ),
                    el("button", "정보 저장", {
                        click: async () => {
                            if (this.exceptionalRoyaltiesCheckbox.domElement.checked === true) {
                                const royalty = Math.floor(parseFloat(this.exceptionalRoyaltyInput.domElement.value) * 100);
                                await ArtsContract.setExceptionalRoyalties([id], [royalty === 0 ? constants.MaxUint256 : royalty]);
                            } else {
                                await ArtsContract.setExceptionalRoyalties([id], [0]);
                            }
                            setTimeout(() => new Alert(msg("SAVE_DONE"), msg("SAVE_DONE_DESC1")), 2000);
                        },
                    }),
                ),
                el("a.delete-button", msg("ART_DELETE"), {
                    click: () => {
                        new Confirm(msg("ART_DELETE"), msg("ART_DELETE_DESC1"), msg("ART_DELETE"), async () => {
                            await ArtsContract.burn(id);
                            setTimeout(() => {
                                new Alert(msg("ART_DELETE_DONE"), msg("ART_DELETE_DONE_DESC1"));
                                ViewUtil.go("/user/my-arts");
                            }, 2000);
                        });
                    },
                }),
            ),
        ));

        this.load(id);
        this.loadExceptionalRoyalty(id);
    }

    private async load(id: number) {
        const result = await superagent.get(`https://api.klu.bs/arts/${id}`);
        const data = result.body;

        if (data.image !== undefined) {
            (this.imagePreview as DomNode<HTMLImageElement>).domElement.src = data.image;
        }
        this.imageInput.domElement.value = data.image === undefined ? "" : data.image;

        this.nameInput.domElement.value = data.name === undefined ? "" : data.name;
        this.descriptionTextarea.domElement.value = data.description === undefined ? "" : data.description;
        this.externalURLInput.domElement.value = data.external_url === undefined ? "" : data.external_url;
    }

    private async loadExceptionalRoyalty(id: number) {
        const royalty = await ArtsContract.exceptionalRoyalties(id);
        if (royalty.eq(0) === true) {
            this.exceptionalRoyaltiesCheckbox.domElement.checked = true;
            this.exceptionalRoyaltiesCheckbox.fireDomEvent("change");
        }
        this.exceptionalRoyaltyInput.domElement.value = (royalty.toNumber() / 100).toString();
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
