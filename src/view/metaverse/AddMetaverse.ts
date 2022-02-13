import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Alert from "../../component/dialogue/Alert";
import MetaversesContract from "../../contracts/MetaversesContract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class AddMetaverse implements View {

    private container: DomNode;

    private bannerPreview: DomNode;
    private bannerInput: DomNode<HTMLInputElement>;
    private iconPreview: DomNode;
    private iconInput: DomNode<HTMLInputElement>;
    private nameInput: DomNode<HTMLInputElement>;
    private descriptionTextarea: DomNode<HTMLInputElement>;
    private twitterInput: DomNode<HTMLInputElement>;
    private kakaotalkInput: DomNode<HTMLInputElement>;
    private kakaotalkInput2: DomNode<HTMLInputElement>;
    private kakaotalkInput3: DomNode<HTMLInputElement>;
    private linktreeInput: DomNode<HTMLInputElement>;
    private homepageInput: DomNode<HTMLInputElement>;
    private discordInput: DomNode<HTMLInputElement>;
    private telegramInput: DomNode<HTMLInputElement>;

    constructor() {
        Layout.current.title = msg("ADD_METAVERSE_TITLE");
        Layout.current.content.append(
            (this.container = el(".add-metaverse-view",
                el("header",
                    el("h1", msg("ADD_METAVERSE_TITLE")),
                    el("p", msg("ADD_METAVERSE_DESCRIPTION")),
                ),
                el("main",
                    el(".form",
                        el("label",
                            el("h3", msg("BANNER_IMAGE_ADDRESS_INPUT")),
                            this.bannerPreview = el("img.banner-preview"),
                            this.bannerInput = el("input", {
                                type: "url",
                                placeholder: msg("BANNER_IMAGE_ADDRESS_INPUT"),
                                change: () => {
                                    (this.bannerPreview as DomNode<HTMLImageElement>).domElement.src = this.bannerInput.domElement.value;
                                },
                            }),
                        ),
                        el("label",
                            el("h3", msg("BANNER_UPLOAD_INPUT")),
                            el("input", {
                                type: "file",
                                change: (event) => {
                                    const file = event.target.files[0];
                                    const reader = new FileReader();
                                    reader.addEventListener("load", async () => {
                                        const result = await fetch(`https://api.klu.bs/pfp/uploadbanner`, {
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
                            el("h3", msg("ICON_IMAGE_ADDRESS_INPUT")),
                            this.iconPreview = el("img.icon-preview"),
                            this.iconInput = el("input", {
                                type: "url",
                                placeholder: msg("ICON_IMAGE_ADDRESS_INPUT"),
                                change: () => {
                                    (this.iconPreview as DomNode<HTMLImageElement>).domElement.src = this.iconInput.domElement.value;
                                },
                            }),
                        ),
                        el("label",
                            el("h3", msg("ICON_UPLOAD_INPUT")),
                            el("input", {
                                type: "file",
                                change: (event) => {
                                    const file = event.target.files[0];
                                    const reader = new FileReader();
                                    reader.addEventListener("load", async () => {
                                        const result = await fetch(`https://api.klu.bs/pfp/uploadicon`, {
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
                            el("h3", msg("NAME_INPUT")),
                            this.nameInput = el("input", { type: "text", placeholder: msg("NAME_INPUT") }),
                        ),
                        el("label",
                            el("h3", msg("INTRODUCTION_INPUT")),
                            el("p",
                                el("span", msg("INTRODUCTION_MARKDOWN_DESCRIPTION")),
                                el("a", msg("INTRODUCTION_MARKDOWN_BUTTON"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }),
                            ),
                            this.descriptionTextarea = el("textarea", { placeholder: msg("INTRODUCTION_INPUT") }),
                        ),
                        el("label",
                            el("h3", msg("OPEN_KAKAO_INPUT")),
                            this.kakaotalkInput = el("input", { type: "url", placeholder: msg("OPEN_KAKAO_INPUT") }),
                        ),
                        el("label",
                            el("h3", msg("OPEN_KAKAO2_INPUT")),
                            this.kakaotalkInput2 = el("input", { type: "url", placeholder: msg("OPEN_KAKAO2_INPUT") }),
                        ),
                        el("label",
                            el("h3", msg("OPEN_KAKAO3_INPUT")),
                            this.kakaotalkInput3 = el("input", { type: "url", placeholder: msg("OPEN_KAKAO3_INPUT") }),
                        ),
                        el("label",
                            el("h3", msg("TWITTER_INPUT")),
                            this.twitterInput = el("input", { type: "url", placeholder: msg("TWITTER_INPUT") }),
                        ),
                        el("label",
                            el("h3", msg("LINKTREE_INPUT")),
                            this.linktreeInput = el("input", { type: "url", placeholder: msg("LINKTREE_INPUT") }),
                        ),
                        el("label",
                            el("h3", msg("HOMEPAGE_INPUT")),
                            this.homepageInput = el("input", { type: "url", placeholder: msg("HOMEPAGE_INPUT") }),
                        ),
                        el("label",
                            el("h3", msg("DISCORD_INPUT")),
                            this.discordInput = el("input", { type: "url", placeholder: msg("DISCORD_INPUT") }),
                        ),
                        el("label",
                            el("h3", msg("TELEGRAM_INPUT")),
                            this.telegramInput = el("input", { type: "url", placeholder: msg("TELEGRAM_INPUT") }),
                        ),
                        el("button", msg("REGISTER_BUTTON"), {
                            click: async () => {
                                const extra = {
                                    banner: this.bannerInput.domElement.value,
                                    icon: this.iconInput.domElement.value,
                                    name: this.nameInput.domElement.value,
                                    description: this.descriptionTextarea.domElement.value,
                                    kakaotalk: this.kakaotalkInput.domElement.value,
                                    kakaotalk2: this.kakaotalkInput2.domElement.value,
                                    kakaotalk3: this.kakaotalkInput3.domElement.value,
                                    linktree: this.linktreeInput.domElement.value,
                                    homepage: this.homepageInput.domElement.value,
                                    discord: this.discordInput.domElement.value,
                                    telegram: this.telegramInput.domElement.value,
                                    twitter: this.twitterInput.domElement.value,
                                };
                                await MetaversesContract.addMetaverse(JSON.stringify(extra));
                                setTimeout(async () => {
                                    new Alert(msg("SUCCESS_ADD_METAVERSE_TITLE"), msg("SUCCESS_ADD_METAVERSE_DESCRIPTION"));
                                    ViewUtil.go(`/metaverse/${(await MetaversesContract.getMetaverseCount()).toNumber() - 1}`);
                                }, 2000);
                            },
                        }),
                    ),
                ),
            )),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
