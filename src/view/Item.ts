import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Item implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "Items";
        Layout.current.content.append(this.container = el(".item-view",
            el(".title", "Klubs Items는 게임 및 메타버스에서 사용되는 아이템을 거래할 수 있습니다.\nKlubs Arts 출시 후 출시됩니다."),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
