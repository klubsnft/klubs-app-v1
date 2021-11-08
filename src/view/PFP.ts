import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class PFP implements View {
  private container: DomNode;

  constructor() {
    Layout.current.title = "PFP Projects";
    Layout.current.content.append(
      (this.container = el(
        ".pfp-view",
        el(
          "header.head",
          el(
            "p.slogan",
            "PFP는 프로필 이미지 NFT로,\nNFT를 소유한 사람들 끼리 커뮤니티를 이루어 소통하는 목적을 띠고 있습니다."
          ),
          el("button", "프로젝트 등록", {
            click: () => ViewUtil.go("/pfp/add"),
          })
        ),
        el(".content", el("h6", "프로젝트 목록"), el("p", "오픈 준비 중 입니다."))
      ))
    );
  }

  public changeParams(params: ViewParams, uri: string): void {}

  public close(): void {
    this.container.delete();
  }
}
