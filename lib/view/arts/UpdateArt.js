"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
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
        Layout_1.default.current.title = "작품 정보 수정";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".art-update-view", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "작품 정보 수정")), (0, skynode_1.el)("main", (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", "기본 정보 수정"), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "작품 이미지 주소"), this.imagePreview = (0, skynode_1.el)("img.image-preview"), this.imageInput = (0, skynode_1.el)("input", {
            type: "url",
            placeholder: "작품 이미지 주소",
            change: () => {
                this.imagePreview.domElement.src = this.imageInput.domElement.value;
            },
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "작품 업로드"), (0, skynode_1.el)("p", "현재 이미지 파일만 업로드 가능합니다. 추후 비디오/오디오 및 3D 모델 업로드도 가능해질 예정입니다."), (0, skynode_1.el)("input", {
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
        })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "작품명"), this.nameInput = (0, skynode_1.el)("input", { type: "text", placeholder: "작품명" })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "소개글"), (0, skynode_1.el)("p", (0, skynode_1.el)("span", "소개글은 마크다운 문법을 사용합니다."), (0, skynode_1.el)("a", "마크다운 문법 보기", { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" })), this.descriptionTextarea = (0, skynode_1.el)("textarea", { placeholder: "작품 소개" })), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "외부 링크"), this.externalURLInput = (0, skynode_1.el)("input", { type: "url", placeholder: "외부 링크" })), (0, skynode_1.el)("button", "정보 저장", {
            click: async () => {
                const metadata = {
                    image: this.imageInput.domElement.value,
                    name: this.nameInput.domElement.value,
                    description: this.descriptionTextarea.domElement.value,
                    external_url: this.externalURLInput.domElement.value,
                };
                const signedMessage = await Wallet_1.default.signMessage(`Upload Klubs Arts #${id} Metadata`);
                await fetch(`https://api.klu.bs/arts/${id}/setmetadata`, {
                    method: "POST",
                    body: JSON.stringify({
                        metadata,
                        signedMessage,
                    }),
                });
                new Alert_1.default("저장 완료", "정보를 저장했습니다.");
            },
        })), (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", "2차 판매 수수료 정보 수정"), (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "작가 기본 판매 수수료로 설정"), (0, skynode_1.el)("p", "작가가 설정한 기본 판매 수수료로 설정합니다."), this.exceptionalRoyaltiesCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }, {
            change: () => {
                if (this.exceptionalRoyaltiesCheckbox.domElement.checked === true) {
                    this.exceptionalRoyaltyLabel.style({ display: "none" });
                }
                else {
                    this.exceptionalRoyaltyLabel.style({ display: "block" });
                }
            },
        })), this.exceptionalRoyaltyLabel = (0, skynode_1.el)("label", (0, skynode_1.el)("h3", "2차 판매 수수료 비율(%)"), (0, skynode_1.el)("p", "2차 판매 수수료 비율은 최대 10%까지 설정하실 수 있으며, 소수점 2번째 자리까지 지정 가능합니다."), this.exceptionalRoyaltyInput = (0, skynode_1.el)("input", { type: "number", placeholder: "2차 판매 수수료 비율(%)" })), (0, skynode_1.el)("button", "정보 저장", {
            click: async () => {
                if (this.exceptionalRoyaltiesCheckbox.domElement.checked === true) {
                    const royalty = Math.floor(parseFloat(this.exceptionalRoyaltyInput.domElement.value) * 100);
                    await ArtsContract_1.default.setExceptionalRoyalties([id], [royalty === 0 ? ethers_1.constants.MaxUint256 : royalty]);
                }
                else {
                    await ArtsContract_1.default.setExceptionalRoyalties([id], [0]);
                }
                setTimeout(() => new Alert_1.default("저장 완료", "정보를 저장했습니다."), 2000);
            },
        })), (0, skynode_1.el)("a.delete-button", "작품 삭제", {
            click: () => {
                new Confirm_1.default("작품 삭제", "정말 작품을 삭제하시겠습니까? 이 작업은 돌이킬 수 없습니다.", "작품 삭제", async () => {
                    await ArtsContract_1.default.burn(id);
                    setTimeout(() => {
                        new Alert_1.default("작가 삭제 완료", "작품이 삭제되었습니다.");
                        ViewUtil_1.default.go("/user/my-arts");
                    }, 2000);
                });
            },
        }))));
        this.load(id);
        this.loadExceptionalRoyalty(id);
    }
    async load(id) {
        const result = await superagent_1.default.get(`https://api.klu.bs/arts/${id}/metadata`);
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