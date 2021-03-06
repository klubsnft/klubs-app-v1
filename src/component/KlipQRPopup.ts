import { DomNode, el, Popup } from "@hanul/skynode";
import msg from "msg.js";

export default class KlipQRPopup extends Popup {

    public content: DomNode;

    constructor(dataURL: string) {
        super(".popup-background");
        this.append(
            this.content = el(".klip-qr-popup",
                el("h2", msg("CONNECT_QR_KLIP_TITLE")),
                el(".qr", el("img", { src: dataURL })),
                el("p", msg("CONNECT_QR_KLIP_DESCRIPTION_1")),
                el("p", msg("CONNECT_QR_KLIP_DESCRIPTION_2")),
                el("p", msg("CONNECT_QR_KLIP_DESCRIPTION_3")),
                el(".button-container",
                    el("button", msg("CONFIRM_BUTTON"), {
                        click: () => this.delete(),
                    }),
                ),
            ),
        );
    }
}
