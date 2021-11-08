import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {
  public static current: Layout;
  private container: DomNode;
  public content: DomNode;

  constructor() {
    Layout.current = this;
    BodyNode.append(
      (this.container = el(
        ".layout",
        el(
          "header.navbar",
          el("a", el(".logo", "Klubs"), { click: () => ViewUtil.go("/") }),
          el(
            ".menu",
            el("a.menu-item", "PFP", { click: () => ViewUtil.go("/pfp") }),
            el("a.menu-item", "Art", { click: () => ViewUtil.go("/art") })
          )
        ),
        el("main", (this.content = el(".content"))),
        el("footer", "Copyright © 2021 Klubs. All rights reserved.")
      ))
    );
  }

  public set title(title: string) {
    document.title = `Klubs - ${title}`;
  }

  public changeParams(params: ViewParams, uri: string): void {}

  public close(): void {
    this.container.delete();
  }
}
