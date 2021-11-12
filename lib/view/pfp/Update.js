"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Prompt_1 = __importDefault(require("../../component/dialogue/Prompt"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Update {
    constructor(params) {
        const addr = params.addr;
        Layout_1.default.current.title = "PFP 정보 수정";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-update-view", (0, skynode_1.el)("header.head", (0, skynode_1.el)("p.title", "PFP 정보 수정")), (0, skynode_1.el)(".content", (0, skynode_1.el)(".form", this.bannerPreview = (0, skynode_1.el)("img.banner-preview"), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".label", "배너 이미지 주소"), this.bannerInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: "배너 이미지 주소",
            change: () => {
                this.bannerPreview.domElement.src = this.bannerInput.domElement.value;
            },
        })), (0, skynode_1.el)(".file-container", (0, skynode_1.el)(".label", "배너 업로드"), (0, skynode_1.el)("input.file-input", {
            type: "file",
            change: (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", async () => {
                    const dataURL = reader.result;
                    const signedMessage = await Wallet_1.default.signMessage("Upload Banner");
                    await fetch(`https://api.klu.bs/pfp/${addr}/uploadbanner`, {
                        method: "POST",
                        body: JSON.stringify({
                            dataURL,
                            signedMessage,
                        }),
                    });
                    this.bannerInput.domElement.value = `https://storage.googleapis.com/klubs/pfpbanner/${addr}.png`;
                    this.bannerInput.fireDomEvent("change");
                }, false);
                if (file) {
                    reader.readAsDataURL(file);
                }
            },
        })), this.iconPreview = (0, skynode_1.el)("img.icon-preview"), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".label", "아이콘 이미지 주소"), this.iconInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: "아이콘 이미지 주소",
            change: () => {
                this.iconPreview.domElement.src = this.iconInput.domElement.value;
            },
        })), (0, skynode_1.el)(".file-container", (0, skynode_1.el)(".label", "아이콘 업로드"), (0, skynode_1.el)("input.file-input", {
            type: "file",
            change: (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", async () => {
                    const dataURL = reader.result;
                    const signedMessage = await Wallet_1.default.signMessage("Upload Icon");
                    await fetch(`https://api.klu.bs/pfp/${addr}/uploadicon`, {
                        method: "POST",
                        body: JSON.stringify({
                            dataURL,
                            signedMessage,
                        }),
                    });
                    this.iconInput.domElement.value = `https://storage.googleapis.com/klubs/pfpicon/${addr}.png`;
                    this.iconInput.fireDomEvent("change");
                }, false);
                if (file) {
                    reader.readAsDataURL(file);
                }
            },
        })), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".label", "이름"), this.nameInput = (0, skynode_1.el)("input", { type: "text", placeholder: "PFP 이름" })), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".label", "소개글"), this.descriptionInput = (0, skynode_1.el)("input", { type: "text", placeholder: "PFP 소개" })), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".label", "오픈 카카오톡"), this.kakaotalkInput = (0, skynode_1.el)("input", { type: "url", placeholder: "오픈 카카오톡 주소" })), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".label", "트위터"), this.twitterInput = (0, skynode_1.el)("input", { type: "url", placeholder: "트위터 주소" })), (0, skynode_1.el)("button.button-contained", "정보 저장", {
            click: async () => {
                const extra = {
                    banner: this.bannerInput.domElement.value,
                    icon: this.iconInput.domElement.value,
                    name: this.nameInput.domElement.value,
                    description: this.descriptionInput.domElement.value,
                    kakaotalk: this.kakaotalkInput.domElement.value,
                    twitter: this.twitterInput.domElement.value,
                };
                await PFPsContract_1.default.setExtra(addr, JSON.stringify(extra));
            },
        })), (0, skynode_1.el)(".manage-managers", (0, skynode_1.el)("h4", "매니저 관리"), this.managerList = (0, skynode_1.el)("ul"), (0, skynode_1.el)("button.button-contained", "매니저 추가", {
            click: () => {
                new Prompt_1.default("매니저 추가", "추가할 매니저의 지갑 주소를 입력해주시기 바랍니다.", "추가하기", async (manager) => {
                    await PFPsContract_1.default.addManager(addr, manager);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                });
            },
        })))));
        this.loadManagers(addr);
    }
    async loadManagers(addr) {
        this.managerList.empty();
        const managerCount = await PFPsContract_1.default.getManagerCount(addr);
        const promises = [];
        for (let i = 0; i < managerCount.toNumber(); i += 1) {
            const promise = async (index) => {
                const manager = await PFPsContract_1.default.managers(addr, index);
                this.managerList.append((0, skynode_1.el)("li", (0, skynode_1.el)("span.item", manager), (0, skynode_1.el)("button.button-text", "삭제", {
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