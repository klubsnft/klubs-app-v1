import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Prompt from "../../component/dialogue/Prompt";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";

export default class PFPs implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("PFP_INFOS_TITLE");
        Layout.current.content.append(this.container = el(".admin-pfps-view",
            el("h1", msg("PFP_INFOS_TITLE")),
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
                el("a", msg("SETTING_EXTRA_BUTTON"), {
                    click: () => new Prompt(msg("SETTING_EXTRA_TITLE"), msg("INPUT_EXTRA_DESCRIPTION"), msg("DONE_BUTTON"), async (extra) => {
                        await PFPsContract.setExtra(addr, extra);
                    }),
                }), "\n",
                royalty.royalty.toString(), "\n",
                el("a", msg("SETTING_ROYALTY_BUTTON"), {
                    click: () => new Prompt(msg("SETTING_ROYALTY_TITLE"), msg("INPUT_ROYALTY_DESCRIPTION"), msg("DONE_BUTTON"), async (r) => {
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
