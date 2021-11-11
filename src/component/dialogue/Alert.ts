import { DomNode, el, Popup } from "@hanul/skynode";

export default class Alert extends Popup {

    public content: DomNode;

    constructor(
        title: string,
        message: string,
        confirmTitle: string,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(".dialogue.alert",
                el("h4", title),
                el("hr.divider"),
                el("p", message),
                el(".button-container", el("button.button-text", confirmTitle, {
                    click: () => this.delete(),
                })),
            ),
        );
    }
}
