import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Alert from "../../component/dialogue/Alert";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";

export default class Propose implements View {
    private container: DomNode;
    private input: DomNode<HTMLInputElement>;

    constructor() {
        Layout.current.title = msg("ADD_PFP_TITLE");
        Layout.current.content.append(
            (this.container = el(".pfp-propose-view",
                el("header",
                    el("h1", msg("ADD_PFP_TITLE")),
                    el("p", msg("ADD_WITHOUT_INHERITANCE_PFP_TITLE")),
                ),
                el("main",
                    el("p.warning",
                        el("i.fas.fa-exclamation-triangle"),
                        msg("ADD_WITHOUT_INHERITANCE_PFP_DESCRIPTION_2")
                    ),
                    el("label",
                        el("h6", msg("CONTRACT_ADDRESS_INPUT")),
                        this.input = el("input", { placeholder: msg("CONTRACT_ADDRESS_INPUT") })
                    ),
                    el("button", msg("REGISTER_BUTTON"), {
                        click: async () => {
                            const addr = this.input.domElement.value;
                            const added = await PFPsContract.added(addr);
                            if (added === true) {
                                new Alert(msg("FAIL_ADD_INFO_TITLE"), msg("ALREADY_REGISTER_INFO_DESCRIPTION"));
                            } else {
                                await PFPsContract.propose(addr);
                                setTimeout(() => new Alert(msg("SUCCESS_ADD_INFO_TITLE"), msg("SUCCESS_ADD_INFO_DESCRIPTION")), 2000);
                            }
                        },
                    }),
                ),
            )),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
