import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Alert from "../../component/dialogue/Alert";
import Prompt from "../../component/dialogue/Prompt";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Update implements View {

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
    private hidingCheckbox: DomNode<HTMLInputElement>;

    private enumerableCheckbox: DomNode<HTMLInputElement>;
    private totalSupplyLabel: DomNode;
    private totalSupplyInput: DomNode<HTMLInputElement>;

    private mineableCheckbox: DomNode<HTMLInputElement>;
    private miningInfoURLLabel: DomNode;
    private miningInfoURLInput: DomNode<HTMLInputElement>;

    private royaltyInput: DomNode<HTMLInputElement>;
    private royaltyReceiverInput: DomNode<HTMLInputElement>;

    private managerList: DomNode;

    constructor(params: ViewParams) {

        const addr = params.addr;

        Layout.current.title = msg("UPDATE_PFP_INFO_TITLE");
        Layout.current.content.append(this.container = el(".pfp-update-view",
            el("header", el("h1", msg("UPDATE_PFP_INFO_TITLE"))),
            el("main",
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
                        this.descriptionTextarea = el("textarea", { placeholder: "INTRODUCTION_PFP" }),
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
                        el("h3", msg("MINING_INPUT")),
                        el("p", msg("MINING_INPUT_DESCRIPTION")),
                        this.mineableCheckbox = el("input", { type: "checkbox" }, {
                            change: () => {
                                if (this.mineableCheckbox.domElement.checked === true) {
                                    this.miningInfoURLLabel.style({ display: "block" });
                                } else {
                                    this.miningInfoURLLabel.style({ display: "none" });
                                }
                            },
                        }),
                    ),
                    this.miningInfoURLLabel = el("label",
                        el("h3", msg("MINING_INFO_URL_INPUT")),
                        el("p", msg("MINING_INFO_URL_INPUT_DESCRIPTION")),
                        this.miningInfoURLInput = el("input", { type: "url", placeholder: msg("MINING_INFO_URL_INPUT") }),
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
                                mineable: this.mineableCheckbox.domElement.checked,
                                miningInfoURL: this.miningInfoURLInput.domElement.value,
                                hiding: this.hidingCheckbox.domElement.checked,
                            };
                            await PFPsContract.setExtra(addr, JSON.stringify(extra));
                            setTimeout(() => new Alert(msg("SAVE_DONE_TITLE"), msg("SAVE_DONE_DESCRIPTION")), 2000);
                        },
                    }),
                ),
                el(".form",
                    el("h2", msg("ISSUE_REVISE_INFO_TITLE")),
                    el("label",
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
                                await PFPsContract.setEnumerable(addr, true);
                            } else {
                                await PFPsContract.setTotalSupply(addr, parseInt(this.totalSupplyInput.domElement.value, 10));
                            }
                            setTimeout(() => new Alert(msg("SAVE_DONE_TITLE"), msg("SAVE_DONE_DESCRIPTION")), 2000);
                        },
                    }),
                ),
                el(".form",
                    el("h2", msg("REVISE_2ND_SALES_FEE_INFO_FORM")),
                    el("label",
                        el("h3", msg("2ND_SALES_FEE_RATIO_INPUT")),
                        el("p", msg("2ND_SALES_FEE_RATIO_DESCRIPTION")),
                        this.royaltyInput = el("input", { type: "number", placeholder: msg("2ND_SALES_FEE_RATIO_INPUT") }),
                    ),
                    el("label",
                        el("h3", msg("2ND_SALES_FEE_RECIPIENT_INPUT")),
                        el("p", msg("2ND_SALES_FEE_RECIPIENT_DESCRIPTION")),
                        this.royaltyReceiverInput = el("input", { type: "text", placeholder: msg("2ND_SALES_FEE_RECIPIENT_INPUT") }),
                    ),
                    el("button", msg("SAVE_INFO_BUTTON"), {
                        click: async () => {
                            await PFPsContract.setRoyalty(addr, this.royaltyReceiverInput.domElement.value, Math.floor(parseFloat(this.royaltyInput.domElement.value) * 100));
                            setTimeout(() => new Alert(msg("SAVE_DONE_TITLE"), msg("SAVE_DONE_DESCRIPTION")), 2000);
                        },
                    }),
                ),
                el(".manage-managers",
                    el("h2", msg("MANAGE_MANAGER_FORM")),
                    this.managerList = el("ul"),
                    el("button", msg("ADD_MANAGER_BUTTON"), {
                        click: () => {
                            new Prompt(msg("ADD_MANAGER_TITLE"), msg("ADD_MANAGER_PROMPT_DESCRIPTION"), msg("ADD_BUTTON"), async (manager) => {
                                await PFPsContract.addManager(addr, manager);
                                ViewUtil.waitTransactionAndRefresh();
                            });
                        },
                    }),
                ),
            ),
        ));

        this.load(addr);
        this.loadTotalSupply(addr);
        this.loadRoyalty(addr);
        this.loadManagers(addr);
    }

    private async load(addr: string) {
        const extras = await PFPsContract.extras(addr);
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

            this.mineableCheckbox.domElement.checked = data.mineable;
            if (data.mineable === true) {
                this.miningInfoURLLabel.style({ display: "block" });
            } else {
                this.miningInfoURLLabel.style({ display: "none" });
            }
            this.miningInfoURLInput.domElement.value = data.miningInfoURL === undefined ? "" : data.miningInfoURL;

            if (data.hiding === true) {
                this.hidingCheckbox.domElement.checked = true;
            }
        }
    }

    private async loadTotalSupply(addr: string) {
        const enumerable = await PFPsContract.enumerables(addr);
        this.enumerableCheckbox.domElement.checked = enumerable;
        if (enumerable === true) {
            this.enumerableCheckbox.fireDomEvent("change");
        }
        try {
            const totalSupply = await PFPsContract.getTotalSupply(addr);
            this.totalSupplyInput.domElement.value = totalSupply.toString();
        } catch (e) { }
    }

    private async loadRoyalty(addr: string) {
        const royaltyInfo = await PFPsContract.royalties(addr);
        this.royaltyInput.domElement.value = (royaltyInfo.royalty / 100).toString();
        this.royaltyReceiverInput.domElement.value = royaltyInfo.receiver;
    }

    private async loadManagers(addr: string) {
        this.managerList.empty();
        const managerCount = await PFPsContract.getManagerCount(addr);
        const promises: Promise<void>[] = [];
        for (let i = 0; i < managerCount.toNumber(); i += 1) {
            const promise = async (index: number) => {
                const manager = await PFPsContract.managers(addr, index);
                this.managerList.append(el("li",
                    el("span", manager),
                    el("button", el("i.fas.fa-user-minus"), {
                        click: async () => {
                            await PFPsContract.removeManager(addr, manager);
                            ViewUtil.waitTransactionAndRefresh();
                        },
                    }),
                ));
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
