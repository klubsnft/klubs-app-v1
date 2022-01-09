import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Layout from "./Layout";

export default class Item implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("ITEMS");
        Layout.current.content.append(this.container = el(".item-view",
            el(".title", msg("ITEMS_DESC1")),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
