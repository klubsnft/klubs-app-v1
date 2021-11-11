import { DomNode, el, Popup } from "@hanul/skynode";

export default class Confirm extends Popup {

    public content: DomNode;

    constructor(
        title: string,
        message: string,
        confirmTitle: string,
        confirm: () => void,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(".dialogue.confirm",
                el("h4", title),
                el("hr.divider"),
                el("p", message),
                el(".button-container", el("button.button-text", "취소", {
                    click: () => this.delete(),
                }),
                    el("button.button-text", confirmTitle, {
                        click: () => {
                            confirm();
                            this.delete();
                        },
                    })),
            ),
        );
    }
}
