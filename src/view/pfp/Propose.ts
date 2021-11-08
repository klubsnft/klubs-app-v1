import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Propose implements View {
  private container: DomNode;

  constructor() {
    Layout.current.title = "PFP 등록 신청";
    Layout.current.content.append(
      (this.container = el(
        ".pfp-propose-view",
        el("header.head", el("p.slogan", "PFP 등록 신청")),

        el(
          ".content",
          el(
            "ul",
            el(
              ".form",
              el(
                "label",
                el("span", "계약 주소"),
                el("input", { placeholder: "계약 주소" })
              ),
              el(
                "label",
                el("span", "관리자 지갑 주소"),
                el("input", { placeholder: "관리자 지갑 주소" })
              ),
              el("button", "등록 신청하기")
            ),
            el(
              "p.danger",
              "반드시 KIP17Mintable나 Ownable을 상속하지 않은 PFP여야만 합니다."
            )
          )
        )
      ))
    );
  }

  public changeParams(params: ViewParams, uri: string): void {}

  public close(): void {
    this.container.delete();
  }
}
