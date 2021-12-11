import { DomNode, el } from "@hanul/skynode";
import { constants } from "ethers";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import Alert from "../../component/dialogue/Alert";
import Confirm from "../../component/dialogue/Confirm";
import ArtsContract from "../../contracts/ArtsContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class UpdateArt implements View {

    private container: DomNode;
    private imagePreview: DomNode;
    private imageInput: DomNode<HTMLInputElement>;
    private nameInput: DomNode<HTMLInputElement>;
    private descriptionTextarea: DomNode<HTMLInputElement>;
    private externalURLInput: DomNode<HTMLInputElement>;

    private exceptionalRoyaltiesCheckbox: DomNode<HTMLInputElement>;
    private exceptionalRoyaltyLabel: DomNode;
    private exceptionalRoyaltyInput: DomNode<HTMLInputElement>;

    constructor(params: ViewParams) {
        const id = parseInt(params.id, 10);

        Layout.current.title = "작품 정보 수정";
        Layout.current.content.append(this.container = el(".art-update-view",
            el("header", el("h1", "작품 정보 수정")),
            el("main",
                el(".form",
                    el("h2", "기본 정보 수정"),
                    el("label",
                        el("h3", "작품 이미지 주소"),
                        this.imagePreview = el("img.image-preview"),
                        this.imageInput = el("input", {
                            type: "url",
                            placeholder: "작품 이미지 주소",
                            change: () => {
                                (this.imagePreview as DomNode<HTMLImageElement>).domElement.src = this.imageInput.domElement.value;
                            },
                        }),
                    ),
                    el("label",
                        el("h3", "작품 업로드"),
                        el("p", "현재 이미지 파일만 업로드 가능합니다. 추후 비디오/오디오 및 3D 모델 업로드도 가능해질 예정입니다."),
                        el("input", {
                            type: "file",
                            change: (event) => {
                                const file = event.target.files[0];
                                const reader = new FileReader();
                                reader.addEventListener("load", async () => {
                                    const result = await fetch(`https://api.klu.bs/arts/uploadimage`, {
                                        method: "POST",
                                        body: reader.result as string,
                                    });
                                    this.imageInput.domElement.value = await result.text();
                                    this.imageInput.fireDomEvent("change");
                                }, false);
                                if (file) {
                                    reader.readAsDataURL(file);
                                }
                            },
                        }),
                    ),
                    el("label",
                        el("h3", "작품명"),
                        this.nameInput = el("input", { type: "text", placeholder: "작품명" }),
                    ),
                    el("label",
                        el("h3", "소개글"),
                        el("p",
                            el("span", "소개글은 마크다운 문법을 사용합니다."),
                            el("a", "마크다운 문법 보기", { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }),
                        ),
                        this.descriptionTextarea = el("textarea", { placeholder: "작품 소개" }),
                    ),
                    el("label",
                        el("h3", "외부 링크"),
                        this.externalURLInput = el("input", { type: "url", placeholder: "외부 링크" }),
                    ),
                    el("button", "정보 저장", {
                        click: async () => {
                            const metadata = {
                                image: this.imageInput.domElement.value,
                                name: this.nameInput.domElement.value,
                                description: this.descriptionTextarea.domElement.value,
                                external_url: this.externalURLInput.domElement.value,
                            };
                            const signedMessage = await Wallet.signMessage(`Upload Klubs Arts #${id} Metadata`);
                            await fetch(`https://api.klu.bs/arts/${id}/setmetadata`, {
                                method: "POST",
                                body: JSON.stringify({
                                    metadata,
                                    signedMessage,
                                }),
                            });
                            new Alert("저장 완료", "정보를 저장했습니다.");
                        },
                    }),
                ),
                el(".form",
                    el("h2", "2차 판매 수수료 정보 수정"),
                    el("label",
                        el("h3", "작가 기본 판매 수수료로 설정"),
                        el("p", "작가가 설정한 기본 판매 수수료로 설정합니다."),
                        this.exceptionalRoyaltiesCheckbox = el("input", { type: "checkbox" }, {
                            change: () => {
                                if (this.exceptionalRoyaltiesCheckbox.domElement.checked === true) {
                                    this.exceptionalRoyaltyLabel.style({ display: "none" });
                                } else {
                                    this.exceptionalRoyaltyLabel.style({ display: "block" });
                                }
                            },
                        }),
                    ),
                    this.exceptionalRoyaltyLabel = el("label",
                        el("h3", "2차 판매 수수료 비율(%)"),
                        el("p", "2차 판매 수수료 비율은 최대 10%까지 설정하실 수 있으며, 소수점 2번째 자리까지 지정 가능합니다."),
                        this.exceptionalRoyaltyInput = el("input", { type: "number", placeholder: "2차 판매 수수료 비율(%)" }),
                    ),
                    el("button", "정보 저장", {
                        click: async () => {
                            if (this.exceptionalRoyaltiesCheckbox.domElement.checked === true) {
                                const royalty = Math.floor(parseFloat(this.exceptionalRoyaltyInput.domElement.value) * 100);
                                await ArtsContract.setExceptionalRoyalties([id], [royalty === 0 ? constants.MaxUint256 : royalty]);
                            } else {
                                await ArtsContract.setExceptionalRoyalties([id], [0]);
                            }
                            setTimeout(() => new Alert("저장 완료", "정보를 저장했습니다."), 2000);
                        },
                    }),
                ),
                el("a.delete-button", "작품 삭제", {
                    click: () => {
                        new Confirm("작품 삭제", "정말 작품을 삭제하시겠습니까? 이 작업은 돌이킬 수 없습니다.", "작품 삭제", async () => {
                            await ArtsContract.burn(id);
                            setTimeout(() => {
                                new Alert("작가 삭제 완료", "작품이 삭제되었습니다.");
                                ViewUtil.go("/user/my-arts");
                            }, 2000);
                        });
                    },
                }),
            ),
        ));

        this.load(id);
        this.loadExceptionalRoyalty(id);
    }

    private async load(id: number) {
        const result = await superagent.get(`https://api.klu.bs/arts/${id}`);
        const data = result.body;

        if (data.image !== undefined) {
            (this.imagePreview as DomNode<HTMLImageElement>).domElement.src = data.image;
        }
        this.imageInput.domElement.value = data.image === undefined ? "" : data.image;

        this.nameInput.domElement.value = data.name === undefined ? "" : data.name;
        this.descriptionTextarea.domElement.value = data.description === undefined ? "" : data.description;
        this.externalURLInput.domElement.value = data.external_url === undefined ? "" : data.external_url;
    }

    private async loadExceptionalRoyalty(id: number) {
        const royalty = await ArtsContract.exceptionalRoyalties(id);
        if (royalty.eq(0) === true) {
            this.exceptionalRoyaltiesCheckbox.domElement.checked = true;
            this.exceptionalRoyaltiesCheckbox.fireDomEvent("change");
        }
        this.exceptionalRoyaltyInput.domElement.value = (royalty.toNumber() / 100).toString();
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
