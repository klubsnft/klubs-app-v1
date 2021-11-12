import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Prompt from "../../component/dialogue/Prompt";
import PFPsContract from "../../contracts/PFPsContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Update implements View {

    private container: DomNode;
    private bannerPreview: DomNode;
    private bannerInput: DomNode<HTMLInputElement>;
    private iconPreview: DomNode;
    private iconInput: DomNode<HTMLInputElement>;
    private nameInput: DomNode<HTMLInputElement>;
    private descriptionInput: DomNode<HTMLInputElement>;
    private twitterInput: DomNode<HTMLInputElement>;
    private kakaotalkInput: DomNode<HTMLInputElement>;

    private managerList: DomNode;

    constructor(params: ViewParams) {

        const addr = params.addr;

        Layout.current.title = "PFP 정보 수정";
        Layout.current.content.append(this.container = el(".pfp-update-view",
            el("header.head", el("p.title", "PFP 정보 수정")),
            el(".content", el(".form",
                this.bannerPreview = el("img.banner-preview"),
                el(".input-container", el(".label",
                    "배너 이미지 주소"),
                    this.bannerInput = el("input", {
                        type: "url",
                        placeholder: "배너 이미지 주소",
                        change: () => {
                            (this.bannerPreview as DomNode<HTMLImageElement>).domElement.src = this.bannerInput.domElement.value;
                        },
                    }),
                ),
                el(".file-container", el(".label",
                    "배너 업로드"),
                    el("input.file-input", {
                        type: "file",
                        change: (event) => {
                            const file = event.target.files[0];
                            const reader = new FileReader();
                            reader.addEventListener("load", async () => {
                                const dataURL = reader.result as string;
                                const signedMessage = await Wallet.signMessage("Upload Banner");
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
                    }),
                ),
                this.iconPreview = el("img.icon-preview"),
                el(".input-container", el(".label",
                    "아이콘 이미지 주소"),
                    this.iconInput = el("input", {
                        type: "url",
                        placeholder: "아이콘 이미지 주소",
                        change: () => {
                            (this.iconPreview as DomNode<HTMLImageElement>).domElement.src = this.iconInput.domElement.value;
                        },
                    }),
                ),
                el(".file-container", el(".label",
                    "아이콘 업로드"),
                    el("input.file-input", {
                        type: "file",
                        change: (event) => {
                            const file = event.target.files[0];
                            const reader = new FileReader();
                            reader.addEventListener("load", async () => {
                                const dataURL = reader.result as string;
                                const signedMessage = await Wallet.signMessage("Upload Icon");
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
                    }),
                ),
                el(".input-container", el(".label",
                    "이름"),
                    this.nameInput = el("input", { type: "text", placeholder: "PFP 이름" }),
                ),
                el(".input-container", el(".label",
                    "소개글"),
                    this.descriptionInput = el("input", { type: "text", placeholder: "PFP 소개" }),
                ),
                el(".input-container", el(".label",
                    "오픈 카카오톡"),
                    this.kakaotalkInput = el("input", { type: "url", placeholder: "오픈 카카오톡 주소" }),
                ),
                el(".input-container", el(".label",
                    "트위터"),
                    this.twitterInput = el("input", { type: "url", placeholder: "트위터 주소" }),
                ),
                el("button.button-contained", "정보 저장", {
                    click: async () => {
                        const extra = {
                            banner: this.bannerInput.domElement.value,
                            icon: this.iconInput.domElement.value,
                            name: this.nameInput.domElement.value,
                            description: this.descriptionInput.domElement.value,
                            kakaotalk: this.kakaotalkInput.domElement.value,
                            twitter: this.twitterInput.domElement.value,
                        };
                        await PFPsContract.setExtra(addr, JSON.stringify(extra));
                    },
                }),
            ),
                el(".manage-managers",
                    el("h4", "매니저 관리"),
                    this.managerList = el("ul"),
                    el("button.button-contained", "매니저 추가", {
                        click: () => {
                            new Prompt("매니저 추가", "추가할 매니저의 지갑 주소를 입력해주시기 바랍니다.", "추가하기", async (manager) => {
                                await PFPsContract.addManager(addr, manager);
                                ViewUtil.waitTransactionAndRefresh();
                            });
                        },
                    }),
                )),
        ));

        this.loadManagers(addr);
    }

    private async loadManagers(addr: string) {
        this.managerList.empty();
        const managerCount = await PFPsContract.getManagerCount(addr);
        const promises: Promise<void>[] = [];
        for (let i = 0; i < managerCount.toNumber(); i += 1) {
            const promise = async (index: number) => {
                const manager = await PFPsContract.managers(addr, index);
                this.managerList.append(el("li",
                    el("span.item", manager),
                    el("button.button-text", "삭제", {
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
