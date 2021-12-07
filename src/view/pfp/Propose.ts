import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Alert from "../../component/dialogue/Alert";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";

export default class Propose implements View {
    private container: DomNode;
    private input: DomNode<HTMLInputElement>;

    constructor() {
        Layout.current.title = "PFP 등록 신청";
        Layout.current.content.append(
            (this.container = el(".pfp-propose-view",
                el("header",
                    el("h1", "PFP 등록 신청"),
                    el("p", "둘 다 상속하지 않은 PFP 등록"),
                ),
                el("main",
                    el("p.warning",
                        el("i.fas.fa-exclamation-triangle"),
                        "반드시 KIP17Mintable나 Ownable을 상속하지 않은 PFP여야만 하며, 계약 배포자만 신청하실 수 있습니다."
                    ),
                    el("label",
                        el("h6", "계약 주소"),
                        this.input = el("input", { placeholder: "계약 주소" })
                    ),
                    el("button", "등록 신청하기", {
                        click: async () => {
                            const addr = this.input.domElement.value;
                            const added = await PFPsContract.added(addr);
                            if (added === true) {
                                new Alert("정보 등록 실패", "해당 계약은 이미 정보가 등록되어있습니다.");
                            } else {
                                await PFPsContract.propose(addr);
                                setTimeout(() => new Alert("정보 등록 완료", "계약 정보 등록이 완료되었습니다.\nKlubs에 오신 것을 환영합니다."), 2000);
                            }
                        },
                    }),
                ),
            )),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
