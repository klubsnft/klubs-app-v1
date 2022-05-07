"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const superagent_1 = __importDefault(require("superagent"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const Confirm_1 = __importDefault(require("../../component/dialogue/Confirm"));
const ArtsContract_1 = __importDefault(require("../../contracts/ArtsContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class UpdateArt {
    constructor(params) {
        const id = parseInt(params.id, 10);
        Layout_1.default.current.title = (0, msg_js_1.default)("REVISION_ART_INFO_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".art-update-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("REVISION_ART_INFO_TITLE"))), (0, skynode_1.el)("main", (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", (0, msg_js_1.default)("UPDATE_BASE_INFO_TITLE")), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("ART_IMAGE_ADDRESS_INPUT")), this.imagePreview = (0, skynode_1.el)("img.image-preview"), this.imageInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: (0, msg_js_1.default)("ART_IMAGE_ADDRESS_INPUT"),
            change: () => {
                this.imagePreview.domElement.src = this.imageInput.domElement.value;
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("ART_UPLOAD_INPUT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("ART_UPLOAD_DESCRIPTION")), (0, skynode_1.el)("input", {
            type: "file",
            change: (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", async () => {
                    const result = await fetch(`https://api.klu.bs/arts/uploadimage`, {
                        method: "POST",
                        body: reader.result,
                    });
                    this.imageInput.domElement.value = await result.text();
                    this.imageInput.fireDomEvent("change");
                }, false);
                if (file) {
                    reader.readAsDataURL(file);
                }
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("ART_NAME_INPUT")), this.nameInput = (0, skynode_1.el)("input", { type: "text", placeholder: (0, msg_js_1.default)("ART_NAME_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("INTRODUCTION_INPUT")), (0, skynode_1.el)("p", (0, skynode_1.el)("span", (0, msg_js_1.default)("INTRODUCTION_MARKDOWN_DESCRIPTION")), (0, skynode_1.el)("a", (0, msg_js_1.default)("INTRODUCTION_MARKDOWN_BUTTON"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" })), this.descriptionTextarea = (0, skynode_1.el)("textarea", { placeholder: (0, msg_js_1.default)("ART_PRESENT_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("EXTERNAL_LINK_INPUT")), this.externalURLInput = (0, skynode_1.el)("input", { type: "url", placeholder: (0, msg_js_1.default)("EXTERNAL_LINK_INPUT") })), (0, skynode_1.el)("button", (0, msg_js_1.default)("SAVE_INFO_BUTTON"), {
            click: async () => {
                const metadata = {
                    image: this.imageInput.domElement.value,
                    name: this.nameInput.domElement.value,
                    description: this.descriptionTextarea.domElement.value,
                    external_url: this.externalURLInput.domElement.value,
                };
                const signResult = await Wallet_1.default.signMessage(`Upload Klubs Arts #${id} Metadata`);
                await fetch(`https://api.klu.bs/arts/${id}/setmetadata`, {
                    method: "POST",
                    body: JSON.stringify({
                        metadata,
                        signedMessage: signResult.signedMessage,
                    }),
                });
                new Alert_1.default((0, msg_js_1.default)("SAVE_DONE_TITLE"), (0, msg_js_1.default)("SAVE_DONE_DESCRIPTION"));
            },
        })), (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", (0, msg_js_1.default)("REVISE_2ND_SALES_FEE_INFO_FORM")), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("SETTING_ARTIST_BASE_SALES_FEE_INPUT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("SETTING_ARTIST_BASE_SALES_FEE_DESCRIPTION")), this.exceptionalRoyaltiesCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }, {
            change: () => {
                if (this.exceptionalRoyaltiesCheckbox.domElement.checked === true) {
                    this.exceptionalRoyaltyLabel.style({ display: "none" });
                }
                else {
                    this.exceptionalRoyaltyLabel.style({ display: "block" });
                }
            },
        })), this.exceptionalRoyaltyLabel = (0, skynode_1.el)("label", (0, skynode_1.el)("h3", (0, msg_js_1.default)("2ND_SALES_FEE_RATIO_INPUT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("2ND_SALES_FEE_RATIO_DESCRIPTION")), this.exceptionalRoyaltyInput = (0, skynode_1.el)("input", { type: "number", placeholder: (0, msg_js_1.default)("2ND_SALES_FEE_RATIO_INPUT") })), (0, skynode_1.el)("button", (0, msg_js_1.default)("SAVE_INFO_BUTTON"), {
            click: async () => {
                if (this.exceptionalRoyaltiesCheckbox.domElement.checked === true) {
                    const royalty = Math.floor(parseFloat(this.exceptionalRoyaltyInput.domElement.value) * 100);
                    await ArtsContract_1.default.setExceptionalRoyalties([id], [royalty === 0 ? ethers_1.constants.MaxUint256 : royalty]);
                }
                else {
                    await ArtsContract_1.default.setExceptionalRoyalties([id], [0]);
                }
                setTimeout(() => new Alert_1.default((0, msg_js_1.default)("SAVE_DONE_TITLE"), (0, msg_js_1.default)("SAVE_DONE_DESCRIPTION")), 2000);
            },
        })), (0, skynode_1.el)("a.delete-button", (0, msg_js_1.default)("ART_DELETE_BUTTON"), {
            click: () => {
                new Confirm_1.default((0, msg_js_1.default)("ART_DELETE_TITLE"), (0, msg_js_1.default)("ART_DELETE_DESCRIPTION"), (0, msg_js_1.default)("ART_DELETE_BUTTON"), async () => {
                    await ArtsContract_1.default.burn(id);
                    setTimeout(() => {
                        new Alert_1.default((0, msg_js_1.default)("ART_DELETE_DONE_TITLE"), (0, msg_js_1.default)("ART_DELETE_DONE_DESCRIPTION"));
                        ViewUtil_1.default.go("/user/my-arts");
                    }, 2000);
                });
            },
        }))));
        this.load(id);
        this.loadExceptionalRoyalty(id);
    }
    async load(id) {
        const result = await superagent_1.default.get(`https://api.klu.bs/arts/${id}`);
        const data = result.body;
        if (data.image !== undefined) {
            this.imagePreview.domElement.src = data.image;
        }
        this.imageInput.domElement.value = data.image === undefined ? "" : data.image;
        this.nameInput.domElement.value = data.name === undefined ? "" : data.name;
        this.descriptionTextarea.domElement.value = data.description === undefined ? "" : data.description;
        this.externalURLInput.domElement.value = data.external_url === undefined ? "" : data.external_url;
    }
    async loadExceptionalRoyalty(id) {
        const royalty = await ArtsContract_1.default.exceptionalRoyalties(id);
        if (royalty.eq(0) === true) {
            this.exceptionalRoyaltiesCheckbox.domElement.checked = true;
            this.exceptionalRoyaltiesCheckbox.fireDomEvent("change");
        }
        this.exceptionalRoyaltyInput.domElement.value = (royalty.toNumber() / 100).toString();
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = UpdateArt;
//# sourceMappingURL=UpdateArt.js.map