import { DomNode, el, Popup } from "@hanul/skynode";

export default class Prompt extends Popup {

    public content: DomNode;
    private input: DomNode<HTMLInputElement>;

    constructor(
        title: string,
        message: string,
        confirmTitle: string,
        confirm: (value: string) => void,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(".dialogue.prompt",
                el("h4", title),
                el("hr.divider"),
                el("p", message),
                this.input = el("input.input"),
                el(".button-container", el("button.button-text", "취소", {
                    click: () => this.delete(),
                }),
                    el("button.button-text", confirmTitle, {
                        click: () => {
                            confirm(this.input.domElement.value);
                            this.delete();
                        },
                    })),
            ),
        );
    }
}
