import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Alert from "../../component/dialogue/Alert";
import MetaversesContract, { ItemType } from "../../contracts/MetaversesContract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class UpdateItem implements View {

    private container: DomNode;

    private changeTypeButton: DomNode;

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
    private hidingCheckbox: DomNode<HTMLInputElement>;

    private enumarableForm: DomNode;
    private enumerableCheckbox: DomNode<HTMLInputElement>;
    private totalSupplyLabel: DomNode;
    private totalSupplyInput: DomNode<HTMLInputElement>;

    constructor(params: ViewParams) {

        const metaverseId = parseInt(params.metaverseId, 10);
        const addr = params.addr;

        Layout.current.title = msg("UPDATE_METAVERSE_ITEM_INFO_TITLE");
        Layout.current.content.append(this.container = el(".metaverse-item-update-view",
            el("header", el("h1", msg("UPDATE_METAVERSE_ITEM_INFO_TITLE"))),
            el("main",
                this.changeTypeButton = el("a", "타입 변경", {
                    click: async () => {
                        const itemType = await MetaversesContract.itemTypes(metaverseId, addr);
                        await MetaversesContract.updateItemType(metaverseId, addr, itemType === ItemType.ERC1155 ? ItemType.ERC721 : ItemType.ERC1155);
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
                el(".form",
                    el("h2", msg("UPDATE_BASE_INFO_TITLE")),
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
                                    const result = await fetch(`https://api.klu.bs/metaverseitem/uploadbanner`, {
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
                                    const result = await fetch(`https://api.klu.bs/metaverseitem/uploadicon`, {
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
                    el("label",
                        el("h3", msg("HIDE_KLUBS_INPUT")),
                        this.hidingCheckbox = el("input", { type: "checkbox" }),
                    ),
                    el("button", msg("SAVE_INFO_BUTTON"), {
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
                                hiding: this.hidingCheckbox.domElement.checked,
                            };
                            await MetaversesContract.setItemExtra(metaverseId, addr, JSON.stringify(extra));
                            setTimeout(() => new Alert(msg("SAVE_DONE_TITLE"), msg("SAVE_DONE_DESCRIPTION")), 2000);
                        },
                    }),
                ),
                el(".form",
                    el("h2", msg("ISSUE_REVISE_INFO_TITLE")),
                    this.enumarableForm = el("label",
                        el("h3", msg("IS_KIP17_FULL_OR_KIP17ENUMERABLE_INPUT")),
                        el("p", msg("IS_KIP17_FULL_OR_KIP17ENUMERABLE_DESCRIPTION")),
                        this.enumerableCheckbox = el("input", { type: "checkbox" }, {
                            change: () => {
                                if (this.enumerableCheckbox.domElement.checked === true) {
                                    this.totalSupplyLabel.style({ display: "none" });
                                } else {
                                    this.totalSupplyLabel.style({ display: "block" });
                                }
                            },
                        }),
                    ),
                    this.totalSupplyLabel = el("label",
                        el("h3", msg("TOTAL_ISSUE_INPUT")),
                        this.totalSupplyInput = el("input", { type: "number", placeholder: msg("TOTAL_ISSUE_INPUT") }),
                    ),
                    el("button", msg("SAVE_INFO_BUTTON"), {
                        click: async () => {
                            if (this.enumerableCheckbox.domElement.checked === true) {
                                await MetaversesContract.setItemEnumerable(metaverseId, addr, true);
                            } else {
                                await MetaversesContract.setItemTotalSupply(metaverseId, addr, parseInt(this.totalSupplyInput.domElement.value, 10));
                            }
                            setTimeout(() => new Alert(msg("SAVE_DONE_TITLE"), msg("SAVE_DONE_DESCRIPTION")), 2000);
                        },
                    }),
                ),
            ),
        ));

        this.load(metaverseId, addr);
        this.loadTotalSupply(metaverseId, addr);
    }

    private async load(metaverseId: number, addr: string) {
        const extras = await MetaversesContract.itemExtras(metaverseId, addr);
        if (extras.trim() !== "") {
            let data: any = {};
            try { data = JSON.parse(extras); } catch (e) { }

            (this.bannerPreview as DomNode<HTMLImageElement>).domElement.src = data.banner;
            this.bannerInput.domElement.value = data.banner === undefined ? "" : data.banner;

            (this.iconPreview as DomNode<HTMLImageElement>).domElement.src = data.icon;
            this.iconInput.domElement.value = data.icon === undefined ? "" : data.icon;

            this.nameInput.domElement.value = data.name === undefined ? "" : data.name;
            this.descriptionTextarea.domElement.value = data.description === undefined ? "" : data.description;
            this.kakaotalkInput.domElement.value = data.kakaotalk === undefined ? "" : data.kakaotalk;
            this.kakaotalkInput2.domElement.value = data.kakaotalk2 === undefined ? "" : data.kakaotalk2;
            this.kakaotalkInput3.domElement.value = data.kakaotalk3 === undefined ? "" : data.kakaotalk3;
            this.linktreeInput.domElement.value = data.linktree === undefined ? "" : data.linktree;
            this.homepageInput.domElement.value = data.homepage === undefined ? "" : data.homepage;
            this.discordInput.domElement.value = data.discord === undefined ? "" : data.discord;
            this.telegramInput.domElement.value = data.telegram === undefined ? "" : data.telegram;
            this.twitterInput.domElement.value = data.twitter === undefined ? "" : data.twitter;

            if (data.hiding === true) {
                this.hidingCheckbox.domElement.checked = true;
            }
        }
    }

    private async loadTotalSupply(metaverseId: number, addr: string) {

        const itemType = await MetaversesContract.itemTypes(metaverseId, addr);
        if (itemType === ItemType.ERC721) {
            this.changeTypeButton.empty().appendText("ERC721 -> ERC1155 타입 변경");
            const enumerable = await MetaversesContract.itemEnumerables(metaverseId, addr);
            this.enumerableCheckbox.domElement.checked = enumerable;
            if (enumerable === true) {
                this.enumerableCheckbox.fireDomEvent("change");
            }
        } else {
            this.changeTypeButton.empty().appendText("ERC1155 -> ERC721 타입 변경");
            this.enumarableForm.delete();
        }

        try {
            const totalSupply = await MetaversesContract.getItemTotalSupply(metaverseId, addr);
            this.totalSupplyInput.domElement.value = totalSupply.toString();
        } catch (e) { }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
