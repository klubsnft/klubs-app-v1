import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Artist implements View {

    private container: DomNode;

    constructor(params: ViewParams) {
        Layout.current.content.append(this.container = el(".artist-view"));
        this.load(params.address);
    }

    private async load(address: string) {
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(params.address);
    }

    public close(): void {
        this.container.delete();
    }
}
