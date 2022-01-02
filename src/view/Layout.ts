import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import MobileMenu from "../component/menu/MobileMenu";
import PCMenu from "../component/menu/PCMenu";
import UserInfo from "../component/menu/UserInfo";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;
        BodyNode.append(
            (this.container = el(".layout",
                el("header",
                    el("a", { click: () => ViewUtil.go("/") },
                        el(".logo",
                            el("img", { src: "/images/logo.svg", height: "28" }),
                            el("span", "0.7"),
                        ),
                    ),
                    new PCMenu(),
                    el(".right",
                        new UserInfo(),
                        el("a.menu-button", el("i.fas.fa-bars"), {
                            click: (event, button) => {
                                const rect = button.rect;
                                new MobileMenu({ left: rect.right - 170, top: rect.bottom }).appendTo(BodyNode);
                            },
                        }),
                        el("a.mix-button",
                            el("img", { src: "/images/mix-with-text.png", height: "28" }),
                            { click: () => ViewUtil.go("/mix") },
                        ),
                    ),
                ),
                el("main", (this.content = el(".content"))),
                el("footer",
                    "Copyright © 2021 Klubs. All rights reserved.",
                    el(".sns",
                        el("a", { href: "https://discord.gg/mPanAs3s4w", target: "_blank" }, el("img", { src: "/images/icon/discord-footer.svg" })),
                        el("a", { href: "https://open.kakao.com/o/gfsahfHd", target: "_blank" }, el("img", { src: "/images/icon/kakao-talk-footer.svg" })),
                    ),
                ),
            ))
        );
    }

    public set title(title: string) {
        document.title = `Klubs - ${title}`;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
