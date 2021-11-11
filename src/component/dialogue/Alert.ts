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
                el("h3", title),
                el("p", message),
                el("a.confirm-button", confirmTitle, {
                    click: () => this.delete(),
                }),
            ),
        );
    }
}
