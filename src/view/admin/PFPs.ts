import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Prompt from "../../component/dialogue/Prompt";
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
            const royalty = await PFPsContract.royalties(addr);
            const managerCount = await PFPsContract.getManagerCount(addr);
            const managers: string[] = [];
            for (let j = 0; j < managerCount.toNumber(); j += 1) {
                managers.push(await PFPsContract.managers(addr, j));
            }
            const extras = await PFPsContract.extras(addr);
            el(".pfp", { style: { marginTop: 20 }, },
                addr, "\n",
                JSON.stringify(managers), "\n",
                extras, "\n",
                el("a", "Extra 설정", {
                    click: () => new Prompt("Extra 설정", "Extra 입력", "완료", async (extra) => {
                        await PFPsContract.setExtra(addr, extra);
                    }),
                }), "\n",
                royalty.royalty.toString(), "\n",
                el("a", "로열티 설정", {
                    click: () => new Prompt("로열티 설정", "로열티 입력", "완료", async (r) => {
                        await PFPsContract.setRoyalty(addr, royalty.receiver, r);
                    }),
                }),
            ).appendTo(this.container);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
