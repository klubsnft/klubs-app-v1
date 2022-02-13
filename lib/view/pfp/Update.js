"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const Prompt_1 = __importDefault(require("../../component/dialogue/Prompt"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Update {
    constructor(params) {
        const addr = params.addr;
        Layout_1.default.current.title = (0, msg_js_1.default)("UPDATE_PFP_INFO_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-update-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("UPDATE_PFP_INFO_TITLE"))), (0, skynode_1.el)("main", (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", (0, msg_js_1.default)("UPDATE_BASE_INFO_TITLE")), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("BANNER_IMAGE_ADDRESS_INPUT")), this.bannerPreview = (0, skynode_1.el)("img.banner-preview"), this.bannerInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: (0, msg_js_1.default)("BANNER_IMAGE_ADDRESS_INPUT"),
            change: () => {
                this.bannerPreview.domElement.src = this.bannerInput.domElement.value;
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("BANNER_UPLOAD_INPUT")), (0, skynode_1.el)("input", {
            type: "file",
            change: (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", async () => {
                    const result = await fetch(`https://api.klu.bs/pfp/uploadbanner`, {
                        method: "POST",
                        body: reader.result,
                    });
                    this.bannerInput.domElement.value = await result.text();
                    this.bannerInput.fireDomEvent("change");
                }, false);
                if (file) {
                    reader.readAsDataURL(file);
                }
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("ICON_IMAGE_ADDRESS_INPUT")), this.iconPreview = (0, skynode_1.el)("img.icon-preview"), this.iconInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: (0, msg_js_1.default)("ICON_IMAGE_ADDRESS_INPUT"),
            change: () => {
                this.iconPreview.domElement.src = this.iconInput.domElement.value;
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("ICON_UPLOAD_INPUT")), (0, skynode_1.el)("input", {
            type: "file",
            change: (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", async () => {
                    const result = await fetch(`https://api.klu.bs/pfp/uploadicon`, {
                        method: "POST",
                        body: reader.result,
                    });
                    this.iconInput.domElement.value = await result.text();
                    this.iconInput.fireDomEvent("change");
                }, false);
                if (file) {
                    reader.readAsDataURL(file);
                }
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("NAME_INPUT")), this.nameInput = (0, skynode_1.el)("input", { type: "text", placeholder: (0, msg_js_1.default)("NAME_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("INTRODUCTION_INPUT")), (0, skynode_1.el)("p", (0, skynode_1.el)("span", (0, msg_js_1.default)("INTRODUCTION_MARKDOWN_DESCRIPTION")), (0, skynode_1.el)("a", (0, msg_js_1.default)("INTRODUCTION_MARKDOWN_BUTTON"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" })), this.descriptionTextarea = (0, skynode_1.el)("textarea", { placeholder: (0, msg_js_1.default)("INTRODUCTION_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("OPEN_KAKAO_INPUT")), this.kakaotalkInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("OPEN_KAKAO_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("OPEN_KAKAO2_INPUT")), this.kakaotalkInput2 = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("OPEN_KAKAO2_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("OPEN_KAKAO3_INPUT")), this.kakaotalkInput3 = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("OPEN_KAKAO3_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("TWITTER_INPUT")), this.twitterInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("TWITTER_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("LINKTREE_INPUT")), this.linktreeInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("LINKTREE_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("HOMEPAGE_INPUT")), this.homepageInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("HOMEPAGE_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("DISCORD_INPUT")), this.discordInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("DISCORD_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("TELEGRAM_INPUT")), this.telegramInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("TELEGRAM_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("MINING_INPUT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("MINING_INPUT_DESCRIPTION")), this.mineableCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }, {
            change: () => {
                if (this.mineableCheckbox.domElement.checked === true) {
                    this.miningInfoURLLabel.style({ display: "block" });
                }
                else {
                    this.miningInfoURLLabel.style({ display: "none" });
                }
            },
        })), this.miningInfoURLLabel = (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("MINING_INFO_URL_INPUT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("MINING_INFO_URL_INPUT_DESCRIPTION")), this.miningInfoURLInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("MINING_INFO_URL_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("HIDE_KLUBS_INPUT")), this.hidingCheckbox = (0, skynode_1.el)("input", { type: "checkbox" })), (0, skynode_1.el)("button", (0, msg_js_1.default)("SAVE_INFO_BUTTON"), {
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
                await PFPsContract_1.default.setExtra(addr, JSON.stringify(extra));
                setTimeout(() => new Alert_1.default((0, msg_js_1.default)("SAVE_DONE_TITLE"), (0, msg_js_1.default)("SAVE_DONE_DESCRIPTION")), 2000);
            },
        })), (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", (0, msg_js_1.default)("ISSUE_REVISE_INFO_TITLE")), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("IS_KIP17_FULL_OR_KIP17ENUMERABLE_INPUT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("IS_KIP17_FULL_OR_KIP17ENUMERABLE_DESCRIPTION")), this.enumerableCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }, {
            change: () => {
                if (this.enumerableCheckbox.domElement.checked === true) {
                    this.totalSupplyLabel.style({ display: "none" });
                }
                else {
                    this.totalSupplyLabel.style({ display: "block" });
                }
            },
        })), this.totalSupplyLabel = (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("TOTAL_ISSUE_INPUT")), this.totalSupplyInput = (0, skynode_1.el)("input", { type: "number", placeholder: (0, msg_js_1.default)("TOTAL_ISSUE_INPUT") })), (0, skynode_1.el)("button", (0, msg_js_1.default)("SAVE_INFO_BUTTON"), {
            click: async () => {
                if (this.enumerableCheckbox.domElement.checked === true) {
                    await PFPsContract_1.default.setEnumerable(addr, true);
                }
                else {
                    await PFPsContract_1.default.setTotalSupply(addr, parseInt(this.totalSupplyInput.domElement.value, 10));
                }
                setTimeout(() => new Alert_1.default((0, msg_js_1.default)("SAVE_DONE_TITLE"), (0, msg_js_1.default)("SAVE_DONE_DESCRIPTION")), 2000);
            },
        })), (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", (0, msg_js_1.default)("REVISE_2ND_SALES_FEE_INFO_FORM")), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("2ND_SALES_FEE_RATIO_INPUT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("2ND_SALES_FEE_RATIO_DESCRIPTION")), this.royaltyInput = (0, skynode_1.el)("input", { type: "number", placeholder: (0, msg_js_1.default)("2ND_SALES_FEE_RATIO_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("2ND_SALES_FEE_RECIPIENT_INPUT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("2ND_SALES_FEE_RECIPIENT_DESCRIPTION")), this.royaltyReceiverInput = (0, skynode_1.el)("input", { type: "text", placeholder: (0, msg_js_1.default)("2ND_SALES_FEE_RECIPIENT_INPUT") })), (0, skynode_1.el)("button", (0, msg_js_1.default)("SAVE_INFO_BUTTON"), {
            click: async () => {
                await PFPsContract_1.default.setRoyalty(addr, this.royaltyReceiverInput.domElement.value, Math.floor(parseFloat(this.royaltyInput.domElement.value) * 100));
                setTimeout(() => new Alert_1.default((0, msg_js_1.default)("SAVE_DONE_TITLE"), (0, msg_js_1.default)("SAVE_DONE_DESCRIPTION")), 2000);
            },
        })), (0, skynode_1.el)(".manage-managers", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MANAGE_MANAGER_FORM")), this.managerList = (0, skynode_1.el)("ul"), (0, skynode_1.el)("button", (0, msg_js_1.default)("ADD_MANAGER_BUTTON"), {
            click: () => {
                new Prompt_1.default((0, msg_js_1.default)("ADD_MANAGER_TITLE"), (0, msg_js_1.default)("ADD_MANAGER_PROMPT_DESCRIPTION"), (0, msg_js_1.default)("ADD_BUTTON"), async (manager) => {
                    await PFPsContract_1.default.addManager(addr, manager);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                });
            },
        })))));
        this.load(addr);
        this.loadTotalSupply(addr);
        this.loadRoyalty(addr);
        this.loadManagers(addr);
    }
    async load(addr) {
        const extras = await PFPsContract_1.default.extras(addr);
        if (extras.trim() !== "") {
            let data = {};
            try {
                data = JSON.parse(extras);
            }
            catch (e) { }
            this.bannerPreview.domElement.src = data.banner;
            this.bannerInput.domElement.value = data.banner === undefined ? "" : data.banner;
            this.iconPreview.domElement.src = data.icon;
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
            }
            else {
                this.miningInfoURLLabel.style({ display: "none" });
            }
            this.miningInfoURLInput.domElement.value = data.miningInfoURL === undefined ? "" : data.miningInfoURL;
            if (data.hiding === true) {
                this.hidingCheckbox.domElement.checked = true;
            }
        }
    }
    async loadTotalSupply(addr) {
        const enumerable = await PFPsContract_1.default.enumerables(addr);
        this.enumerableCheckbox.domElement.checked = enumerable;
        if (enumerable === true) {
            this.enumerableCheckbox.fireDomEvent("change");
        }
        try {
            const totalSupply = await PFPsContract_1.default.getTotalSupply(addr);
            this.totalSupplyInput.domElement.value = totalSupply.toString();
        }
        catch (e) { }
    }
    async loadRoyalty(addr) {
        const royaltyInfo = await PFPsContract_1.default.royalties(addr);
        this.royaltyInput.domElement.value = (royaltyInfo.royalty / 100).toString();
        this.royaltyReceiverInput.domElement.value = royaltyInfo.receiver;
    }
    async loadManagers(addr) {
        this.managerList.empty();
        const managerCount = await PFPsContract_1.default.getManagerCount(addr);
        const promises = [];
        for (let i = 0; i < managerCount.toNumber(); i += 1) {
            const promise = async (index) => {
                const manager = await PFPsContract_1.default.managers(addr, index);
                this.managerList.append((0, skynode_1.el)("li", (0, skynode_1.el)("span", manager), (0, skynode_1.el)("button", (0, skynode_1.el)("i.fas.fa-user-minus"), {
                    click: async () => {
                        await PFPsContract_1.default.removeManager(addr, manager);
                        ViewUtil_1.default.waitTransactionAndRefresh();
                    },
                })));
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Update;
//# sourceMappingURL=Update.js.map