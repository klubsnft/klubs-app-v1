"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const ArtistsContract_1 = __importDefault(require("../../contracts/ArtistsContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class UpdateArtist {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("REVISION_ARTIST");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".artist-update-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("REVISION_ARTIST"))), (0, skynode_1.el)("main", (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", (0, msg_js_1.default)("UPDATE_BASE_INFO")), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("BANNER_IMAGE_ADDRESS")), this.bannerPreview = (0, skynode_1.el)("img.banner-preview"), this.bannerInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: (0, msg_js_1.default)("BANNER_IMAGE_ADDRESS"),
            change: () => {
                this.bannerPreview.domElement.src = this.bannerInput.domElement.value;
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("BANNER_UPLOAD")), (0, skynode_1.el)("input", {
            type: "file",
            change: (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", async () => {
                    const result = await fetch(`https://api.klu.bs/artist/uploadbanner`, {
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
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("ICON_IMAGE_ADDRESS")), this.iconPreview = (0, skynode_1.el)("img.icon-preview"), this.iconInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: (0, msg_js_1.default)("ICON_IMAGE_ADDRESS"),
            change: () => {
                this.iconPreview.domElement.src = this.iconInput.domElement.value;
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("ICON_UPLOAD")), (0, skynode_1.el)("input", {
            type: "file",
            change: (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", async () => {
                    const result = await fetch(`https://api.klu.bs/artist/uploadicon`, {
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
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("ARTIST_NAME")), this.nameInput = (0, skynode_1.el)("input", { type: "text", placeholder: (0, msg_js_1.default)("ARTIST_NAME") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("INTRODUCTION")), (0, skynode_1.el)("p", (0, skynode_1.el)("span", (0, msg_js_1.default)("INTRODUCTION_DESC1")), (0, skynode_1.el)("a", (0, msg_js_1.default)("VIEW_MARKDOWN"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" })), this.descriptionTextarea = (0, skynode_1.el)("textarea", { placeholder: (0, msg_js_1.default)("ARTIST_INTRODUCE") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("TWITTER")), this.twitterInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("TWITTER_ADDRESS") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("HIDE_KLUBS")), this.hidingCheckbox = (0, skynode_1.el)("input", { type: "checkbox" })), (0, skynode_1.el)("button", "정보 저장", {
            click: async () => {
                const extra = {
                    banner: this.bannerInput.domElement.value,
                    icon: this.iconInput.domElement.value,
                    name: this.nameInput.domElement.value,
                    description: this.descriptionTextarea.domElement.value,
                    twitter: this.twitterInput.domElement.value,
                    hiding: this.hidingCheckbox.domElement.checked,
                };
                await ArtistsContract_1.default.setExtra(JSON.stringify(extra));
                setTimeout(() => new Alert_1.default((0, msg_js_1.default)("SAVE_DONE"), (0, msg_js_1.default)("SAVE_DONE_DESC1")), 2000);
            },
        })), (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", (0, msg_js_1.default)("REVISE_2ND_SALES_FEE_INFO")), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("2ND_SALES_FEE_RATIO")), (0, skynode_1.el)("p", (0, msg_js_1.default)("2ND_SALES_FEE_RATIO_DESC1")), this.baseRoyaltyInput = (0, skynode_1.el)("input", { type: "number", placeholder: (0, msg_js_1.default)("2ND_SALES_FEE_RATIO") })), (0, skynode_1.el)("button", (0, msg_js_1.default)("SAVE_INFO"), {
            click: async () => {
                await ArtistsContract_1.default.setBaseRoyalty(Math.floor(parseFloat(this.baseRoyaltyInput.domElement.value) * 100));
                setTimeout(() => new Alert_1.default((0, msg_js_1.default)("SAVE_DONE"), (0, msg_js_1.default)("SAVE_DONE_DESC1")), 2000);
            },
        })))));
        this.load();
        this.loadBaseRoyalty();
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const extras = await ArtistsContract_1.default.extras(address);
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
                this.twitterInput.domElement.value = data.twitter === undefined ? "" : data.twitter;
                if (data.hiding === true) {
                    this.hidingCheckbox.domElement.checked = true;
                }
            }
        }
    }
    async loadBaseRoyalty() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const royalty = await ArtistsContract_1.default.baseRoyalty(address);
            this.baseRoyaltyInput.domElement.value = (royalty.toNumber() / 100).toString();
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = UpdateArtist;
//# sourceMappingURL=UpdateArtist.js.map