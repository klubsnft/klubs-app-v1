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
    private descriptionTextarea: DomNode<HTMLInputElement>;
    private twitterInput: DomNode<HTMLInputElement>;
    private kakaotalkInput: DomNode<HTMLInputElement>;

    private managerList: DomNode;

    constructor(params: ViewParams) {

        const addr = params.addr;

        Layout.current.title = "PFP 정보 수정";
        Layout.current.content.append(this.container = el(".pfp-update-view",
            el("header", el("h1", "PFP 정보 수정")),
            el("main",
                el(".form",
                    el("label",
                        el("h4", "배너 이미지 주소"),
                        this.bannerPreview = el("img.banner-preview"),
                        this.bannerInput = el("input", {
                            type: "url",
                            placeholder: "배너 이미지 주소",
                            change: () => {
                                (this.bannerPreview as DomNode<HTMLImageElement>).domElement.src = this.bannerInput.domElement.value;
                            },
                        }),
                    ),
                    el("label",
                        el("h4", "배너 업로드"),
                        el("input", {
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
                    el("label",
                        el("h4", "아이콘 이미지 주소"),
                        this.iconPreview = el("img.icon-preview"),
                        this.iconInput = el("input", {
                            type: "url",
                            placeholder: "아이콘 이미지 주소",
                            change: () => {
                                (this.iconPreview as DomNode<HTMLImageElement>).domElement.src = this.iconInput.domElement.value;
                            },
                        }),
                    ),
                    el("label",
                        el("h4", "아이콘 업로드"),
                        el("input", {
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
                    el("label",
                        el("h4", "이름"),
                        this.nameInput = el("input", { type: "text", placeholder: "PFP 이름" }),
                    ),
                    el("label",
                        el("h4", "소개글"),
                        el("p",
                            el("span", "소개글은 마크다운 문법을 사용합니다."),
                            el("a", "마크다운 문법 보기", { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }),
                        ),
                        this.descriptionTextarea = el("textarea", { placeholder: "PFP 소개" }),
                    ),
                    el("label",
                        el("h4", "오픈 카카오톡"),
                        this.kakaotalkInput = el("input", { type: "url", placeholder: "오픈 카카오톡 주소" }),
                    ),
                    el("label",
                        el("h4", "트위터"),
                        this.twitterInput = el("input", { type: "url", placeholder: "트위터 주소" }),
                    ),
                    el("button", "정보 저장", {
                        click: async () => {
                            const extra = {
                                banner: this.bannerInput.domElement.value,
                                icon: this.iconInput.domElement.value,
                                name: this.nameInput.domElement.value,
                                description: this.descriptionTextarea.domElement.value,
                                kakaotalk: this.kakaotalkInput.domElement.value,
                                twitter: this.twitterInput.domElement.value,
                            };
                            await PFPsContract.setExtra(addr, JSON.stringify(extra));
                        },
                    }),
                ),
                el(".manage-managers",
                    el("h2", "매니저 관리"),
                    this.managerList = el("ul"),
                    el("button", "매니저 추가", {
                        click: () => {
                            new Prompt("매니저 추가", "추가할 매니저의 지갑 주소를 입력해주시기 바랍니다.", "추가하기", async (manager) => {
                                await PFPsContract.addManager(addr, manager);
                                ViewUtil.waitTransactionAndRefresh();
                            });
                        },
                    }),
                ),
            ),
        ));

        this.load(addr);
        this.loadManagers(addr);
    }

    private async load(addr: string) {
        const extras = await PFPsContract.extras(addr);
        if (extras.trim() !== "") {
            let data: any = {};
            try { data = JSON.parse(extras); } catch (e) { }

            (this.bannerPreview as DomNode<HTMLImageElement>).domElement.src = data.banner;
            this.bannerInput.domElement.value = data.banner;

            (this.iconPreview as DomNode<HTMLImageElement>).domElement.src = data.icon;
            this.iconInput.domElement.value = data.icon;

            this.nameInput.domElement.value = data.name;
            this.descriptionTextarea.domElement.value = data.description;
            this.kakaotalkInput.domElement.value = data.kakaotalk;
            this.twitterInput.domElement.value = data.twitter;
        }
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
