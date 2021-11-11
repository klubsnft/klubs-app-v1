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
                el("h3", title),
                el("p", message),
                el("a.cancel-button", "취소", {
                    click: () => this.delete(),
                }),
                el("a.confirm-button", confirmTitle, {
                    click: () => {
                        confirm();
                        this.delete();
                    },
                }),
            ),
        );
    }
}
