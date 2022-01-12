import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import msg from "msg.js";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Add implements View {
    private container: DomNode;

    constructor() {
        Layout.current.title = msg("PFP_REGISTER_TITLE");
        Layout.current.content.append(
            (this.container = el(".add-pfp-view",
                el("header", el("h1", msg("ADD_PFP_PROJECT_TITLE"))),
                el("main",
                    el("section",
                        { click: () => ViewUtil.go("/pfp/add-by-minter") },
                        el("h2", msg("ADD_KIP17_MINTABLE_PFP_TITLE")),
                        el("p",
                            msg("ADD_KIP17_MINTABLE_PFP_DESCRIPTION"),
                        ),
                    ),
                    el("section",
                        { click: () => ViewUtil.go("/pfp/add-by-pfp-owner") },
                        el("h2", msg("ADD_OWNABLE_PFP_TITLE")),
                        el("p",
                            msg("ADD_OWNABLE_PFP_DESCRIPTION_1"),
                        ),
                    ),
                    el("section",
                        { click: () => ViewUtil.go("/pfp/propose") },
                        el("h2", msg("ADD_WITHOUT_INHERITANCE_PFP_TITLE")),
                        el("p",
                            msg("ADD_WITHOUT_INHERITANCE_PFP_DESCRIPTION_1"),
                        ),
                    ),
                ),
            )),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
