import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";

export default class AddByPFPOwner implements View {
  private container: DomNode;
  private input: DomNode<HTMLInputElement>;

  constructor() {
    Layout.current.title = "Owner로부터 PFP 등록";
    Layout.current.content.append(
      (this.container = el(
        ".add-pfp-by-owner-view",

        el("header.head", el("p.title", "PFP 프로젝트 등록"), el("p.subtitle", "Ownable을 상속한 PFP등록")),

        el(
          ".content",
          el(
            "ul",
            el(
              "li",
              el(
                ".form",
                el(
                  ".label",
                  el("h6", "계약 주소"),
                  this.input = el("input", { placeholder: "계약 주소" })
                ),
                el("button.button-contained", "등록하기", {
                  click: async () => {
                    const addr = this.input.domElement.value;
                    const added = await PFPsContract.added(addr);
                    if (added === true) {
                      alert("해당 계약은 이미 정보가 등록되어있습니다.");
                    } else {
                      await PFPsContract.addByPFPOwner(addr);
                      setTimeout(() => alert("계약 정보 등록이 완료되었습니다.\n11일부터 해당 NFT는 거래를 할 수 있게됩니다.\nKlubs에 오신 것을 환영합니다."), 2000);
                    }
                  },
                })
              ),
              el(
                "p.danger-caption",
                "반드시 Ownable을 상속한 PFP여야만 합니다. 그리고 등록자는 반드시 Owner여야 합니다."
              )
            )
          )
        )
      ))
    );
  }

  public changeParams(params: ViewParams, uri: string): void { }

  public close(): void {
    this.container.delete();
  }
}
