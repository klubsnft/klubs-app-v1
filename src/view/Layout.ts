import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;
        BodyNode.append(this.container = el(".layout",
            el("header",
                el("a", el(".logo", "Klubs"), { click: () => ViewUtil.go("/") }),
                el("a", "PFP", { click: () => ViewUtil.go("/pfp") }),
                el("a", "Art", { click: () => ViewUtil.go("/art") }),
            ),
            el("main",
                this.content = el(".content"),
            ),
            el("footer",
                "© Klubs",
            ),
        ));
    }

    public set title(title: string) {
        document.title = `Klubs - ${title}`;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
