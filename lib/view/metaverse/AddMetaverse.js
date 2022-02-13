"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const MetaversesContract_1 = __importDefault(require("../../contracts/MetaversesContract"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class AddMetaverse {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("ADD_METAVERSE_TITLE");
        Layout_1.default.current.content.append((this.container = (0, skynode_1.el)(".add-metaverse-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("ADD_METAVERSE_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("ADD_METAVERSE_DESCRIPTION"))), (0, skynode_1.el)("main", (0, skynode_1.el)(".form", (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("BANNER_IMAGE_ADDRESS_INPUT")), this.bannerPreview = (0, skynode_1.el)("img.banner-preview"), this.bannerInput = (0, skynode_1.el)("input", {
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
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("NAME_INPUT")), this.nameInput = (0, skynode_1.el)("input", { type: "text", placeholder: (0, msg_js_1.default)("NAME_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("INTRODUCTION_INPUT")), (0, skynode_1.el)("p", (0, skynode_1.el)("span", (0, msg_js_1.default)("INTRODUCTION_MARKDOWN_DESCRIPTION")), (0, skynode_1.el)("a", (0, msg_js_1.default)("INTRODUCTION_MARKDOWN_BUTTON"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" })), this.descriptionTextarea = (0, skynode_1.el)("textarea", { placeholder: (0, msg_js_1.default)("INTRODUCTION_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("OPEN_KAKAO_INPUT")), this.kakaotalkInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("OPEN_KAKAO_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("OPEN_KAKAO2_INPUT")), this.kakaotalkInput2 = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("OPEN_KAKAO2_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("OPEN_KAKAO3_INPUT")), this.kakaotalkInput3 = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("OPEN_KAKAO3_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("TWITTER_INPUT")), this.twitterInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("TWITTER_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("LINKTREE_INPUT")), this.linktreeInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("LINKTREE_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("HOMEPAGE_INPUT")), this.homepageInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("HOMEPAGE_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("DISCORD_INPUT")), this.discordInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("DISCORD_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("TELEGRAM_INPUT")), this.telegramInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("TELEGRAM_INPUT") })), (0, skynode_1.el)("button", (0, msg_js_1.default)("REGISTER_BUTTON"), {
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
                await MetaversesContract_1.default.addMetaverse(JSON.stringify(extra));
                setTimeout(async () => {
                    new Alert_1.default((0, msg_js_1.default)("SUCCESS_ADD_METAVERSE_TITLE"), (0, msg_js_1.default)("SUCCESS_ADD_METAVERSE_DESCRIPTION"));
                    ViewUtil_1.default.go(`/metaverse/${(await MetaversesContract_1.default.getMetaverseCount()).toNumber() - 1}`);
                }, 2000);
            },
        }))))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = AddMetaverse;
//# sourceMappingURL=AddMetaverse.js.map