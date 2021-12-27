import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Meme implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "Meme";
        Layout.current.content.append(this.container = el(".meme-view",
            el(".title", "Klubs Meme는 인터넷 밈이나 패러디 등의 NFT를 거래할 수 있는 공간입니다.\nKlubs Items 출시 후 출시됩니다."),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
