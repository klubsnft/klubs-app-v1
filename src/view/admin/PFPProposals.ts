import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";

export default class PFPProposals implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "등록을 기다리는 PFP 정보들";
        Layout.current.content.append(this.container = el(".admin-pfp-proposals-view",
            el("h1", "등록을 기다리는 PFP 정보들"),
        ));
        this.load();
    }

    private async load() {
        const count = await PFPsContract.proposalCount();
        for (let id = count.toNumber() - 1; id >= 0; id -= 1) {
            const proposal = await PFPsContract.proposals(id);
            const proposalDisplay = el(".proposal",
                JSON.stringify(proposal),
                el("a", "통과", {
                    click: async () => {
                        await PFPsContract.passProposal(id);
                        proposalDisplay.delete();
                    },
                }),
            ).appendTo(this.container);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
