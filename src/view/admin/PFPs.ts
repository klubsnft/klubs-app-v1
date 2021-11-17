import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";

export default class PFPs implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "PFP 정보들";
        Layout.current.content.append(this.container = el(".admin-pfps-view",
            el("h1", "PFP 정보들"),
        ));
        this.load();
    }

    private async load() {
        const count = await PFPsContract.getAddrCount();
        for (let index = count.toNumber() - 1; index >= 0; index -= 1) {
            const addr = await PFPsContract.addrs(index);
            const managerCount = await PFPsContract.getManagerCount(addr);
            const managers: string[] = [];
            for (let j = 0; j < managerCount.toNumber(); j += 1) {
                managers.push(await PFPsContract.managers(addr, j));
            }
            const extras = await PFPsContract.extras(addr);
            el(".pfp", addr, "\n", JSON.stringify(managers), "\n", extras, {
                style: { marginTop: 20 },
            }).appendTo(this.container);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
