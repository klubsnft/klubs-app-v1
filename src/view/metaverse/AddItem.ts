import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Alert from "../../component/dialogue/Alert";
import MetaversesContract from "../../contracts/MetaversesContract";
import Layout from "../Layout";

export default class AddItem implements View {

    private container: DomNode;
    private input: DomNode<HTMLInputElement>;
    private select: DomNode<HTMLSelectElement>;

    constructor(params: ViewParams) {
        Layout.current.title = msg("ADD_METAVERSE_ITEM_TITLE");
        Layout.current.content.append(
            (this.container = el(".add-metaverse-item-view",
                el("header",
                    el("h1", msg("ADD_METAVERSE_ITEM_TITLE")),
                    el("p", msg("ADD_METAVERSE_ITEM_DESCRIPTION")),
                ),
                el("main",
                    el("label",
                        el("h6", msg("CONTRACT_ADDRESS_INPUT")),
                        this.input = el("input", { placeholder: msg("CONTRACT_ADDRESS_INPUT") }),
                    ),
                    el("label",
                        el("h6", msg("METAVERSE_ITEM_TYPE_SELECT")),
                        this.select = el("select",
                            el("option", "KIP-37", { value: "0" }),
                            el("option", "KIP-17", { value: "1" }),
                        ),
                    ),
                    el("button", msg("REGISTER_BUTTON"), {
                        click: async () => {
                            const addr = this.input.domElement.value;
                            const added = await MetaversesContract.itemAdded(params.id, addr);
                            if (added === true) {
                                new Alert(msg("FAIL_ADD_INFO_TITLE"), msg("ALREADY_REGISTER_INFO_DESCRIPTION"));
                            } else {
                                await MetaversesContract.addItem(params.id, addr, parseInt(this.select.domElement.value, 10), "");
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
