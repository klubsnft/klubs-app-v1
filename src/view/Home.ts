import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import OfferPopup from "../component/OfferPopup";
import Layout from "./Layout";

export default class Home implements View {
  private container: DomNode;

  constructor() {
    Layout.current.title = "Klaytn based NFT marketplace with MIX";
    Layout.current.content.append(
      (this.container = el(
        ".home-view",
        el(
          "header.head",
          el("p.slogan", "Klubs는 클레이튼 기반 NFT 마켓플레이스입니다."),
          el("button", "Klubs 소개", {
            click: () => open("https://medium.com/klubs/klubs-klaytn-based-nft-marketplace-with-mix-2c93d3a9e014"),
          })
        ),
        el(
          ".content",
          el("h6", "🗂 이 프로젝트는 어떠신가요?"),
          el("p", "오픈 준비 중 입니다."),
          el("h6", "🎨 이 작품은 어떠신가요?"),
          el("p", "오픈 준비 중 입니다.")
        )
      ))
    );
  }

  public changeParams(params: ViewParams, uri: string): void { }

  public close(): void {
    this.container.delete();
  }
}
