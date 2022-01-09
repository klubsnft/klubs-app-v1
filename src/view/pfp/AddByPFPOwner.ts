import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Alert from "../../component/dialogue/Alert";
import PFPsContract from "../../contracts/PFPsContract";
import Layout from "../Layout";

export default class AddByPFPOwner implements View {

    private container: DomNode;
    private input: DomNode<HTMLInputElement>;

    constructor() {
        Layout.current.title = msg("ADD_OWNER_PFP");
        Layout.current.content.append(
            (this.container = el(".add-pfp-by-pfp-owner-view",
                el("header",
                    el("h1", msg("ADD_PFP_PROJECT")),
                    el("p", msg("ADD_OWNABLE_PFP")),
                ),
                el("main",
                    el("p.warning",
                        el("i.fas.fa-exclamation-triangle"),
                        msg("ADD_OWNABLE_PFP_DESC2"),
                    ),
                    el("label",
                        el("h6", msg("CONTRACT_ADDRESS")),
                        this.input = el("input", { placeholder: msg("CONTRACT_ADDRESS") }),
                    ),
                    el("button", msg("REGISTER"), {
                        click: async () => {
                            const addr = this.input.domElement.value;
                            const added = await PFPsContract.added(addr);
                            if (added === true) {
                                new Alert(msg("FAIL_ADD_INFO"), msg("ALREADY_REGISTER_INFO"));
                            } else {
                                await PFPsContract.addByPFPOwner(addr);
                                setTimeout(() => new Alert(msg("SUCCESS_ADD_INFO"), msg("SUCCESS_ADD_INFO_DESC1")), 2000);
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
