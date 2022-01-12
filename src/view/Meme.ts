import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Layout from "./Layout";

export default class Meme implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("MEME_TITLE");
        Layout.current.content.append(this.container = el(".meme-view",
            el(".title", msg("MEME_DESCRIPTION")),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
