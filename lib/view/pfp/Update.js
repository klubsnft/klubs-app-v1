"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const Prompt_1 = __importDefault(require("../../component/dialogue/Prompt"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Update {
    constructor(params) {
        const addr = params.addr;
        Layout_1.default.current.title = "PFP 정보 수정";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-update-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "PFP 정보 수정")), (0, skynode_1.el)("main", (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", "기본 정보 수정"), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "배너 이미지 주소"), this.bannerPreview = (0, skynode_1.el)("img.banner-preview"), this.bannerInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: "배너 이미지 주소",
            change: () => {
                this.bannerPreview.domElement.src = this.bannerInput.domElement.value;
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "배너 업로드"), (0, skynode_1.el)("input", {
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
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "아이콘 이미지 주소"), this.iconPreview = (0, skynode_1.el)("img.icon-preview"), this.iconInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: "아이콘 이미지 주소",
            change: () => {
                this.iconPreview.domElement.src = this.iconInput.domElement.value;
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "아이콘 업로드"), (0, skynode_1.el)("input", {
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
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "이름"), this.nameInput = (0, skynode_1.el)("input", { type: "text", placeholder: "PFP 이름" })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "소개글"), (0, skynode_1.el)("p", (0, skynode_1.el)("span", "소개글은 마크다운 문법을 사용합니다."), (0, skynode_1.el)("a", "마크다운 문법 보기", { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" })), this.descriptionTextarea = (0, skynode_1.el)("textarea", { placeholder: "PFP 소개" })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "오픈 카카오톡"), this.kakaotalkInput = (0, skynode_1.el)("input", { type: "url", placeholder: "오픈 카카오톡 주소" })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "트위터"), this.twitterInput = (0, skynode_1.el)("input", { type: "url", placeholder: "트위터 주소" })), (0, skynode_1.el)("button", "정보 저장", {
            click: async () => {
                const extra = {
                    banner: this.bannerInput.domElement.value,
                    icon: this.iconInput.domElement.value,
                    name: this.nameInput.domElement.value,
                    description: this.descriptionTextarea.domElement.value,
                    kakaotalk: this.kakaotalkInput.domElement.value,
                    twitter: this.twitterInput.domElement.value,
                };
                await PFPsContract_1.default.setExtra(addr, JSON.stringify(extra));
                setTimeout(() => new Alert_1.default("저장 완료", "정보를 저장했습니다."), 2000);
            },
        })), (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", "발행량 정보 수정"), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "KIP17Enumerable 상속 여부"), (0, skynode_1.el)("p", "KIP17Enumerable를 상속하신 경우, 총 발행량 정보를 매번 입력하지 않으셔도 됩니다."), this.enumerableCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }, {
            change: () => {
                if (this.enumerableCheckbox.domElement.checked === true) {
                    this.totalSupplyLabel.style({ display: "none" });
                }
                else {
                    this.totalSupplyLabel.style({ display: "block" });
                }
            },
        })), this.totalSupplyLabel = (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "총 발행량"), this.totalSupplyInput = (0, skynode_1.el)("input", { type: "number", placeholder: "총 발행량" })), (0, skynode_1.el)("button", "정보 저장", {
            click: async () => {
                if (this.enumerableCheckbox.domElement.checked === true) {
                    await PFPsContract_1.default.setEnumerable(addr, true);
                }
                else {
                    await PFPsContract_1.default.setTotalSupply(addr, parseInt(this.totalSupplyInput.domElement.value, 10));
                }
                setTimeout(() => new Alert_1.default("저장 완료", "정보를 저장했습니다."), 2000);
            },
        })), (0, skynode_1.el)(".manage-managers", (0, skynode_1.el)("h2", "매니저 관리"), this.managerList = (0, skynode_1.el)("ul"), (0, skynode_1.el)("button", "매니저 추가", {
            click: () => {
                new Prompt_1.default("매니저 추가", "추가할 매니저의 지갑 주소를 입력해주시기 바랍니다.", "추가하기", async (manager) => {
                    await PFPsContract_1.default.addManager(addr, manager);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                });
            },
        })))));
        this.load(addr);
        this.loadTotalSupply(addr);
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
            this.bannerInput.domElement.value = data.banner;
            this.iconPreview.domElement.src = data.icon;
            this.iconInput.domElement.value = data.icon;
            this.nameInput.domElement.value = data.name;
            this.descriptionTextarea.domElement.value = data.description;
            this.kakaotalkInput.domElement.value = data.kakaotalk;
            this.twitterInput.domElement.value = data.twitter;
        }
    }
    async loadTotalSupply(addr) {
        const enumerable = await PFPsContract_1.default.enumerables(addr);
        if (enumerable === true) {
            this.enumerableCheckbox.domElement.checked = true;
            this.enumerableCheckbox.fireDomEvent("change");
        }
        try {
            const totalSupply = await PFPsContract_1.default.getTotalSupply(addr);
            this.totalSupplyInput.domElement.value = totalSupply.toString();
        }
        catch (e) { }
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