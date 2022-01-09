import { DomNode, el, Popup } from "@hanul/skynode";
import msg from "msg.js";

export default class KlipQRPopup extends Popup {

    public content: DomNode;

    constructor(dataURL: string) {
        super(".popup-background");
        this.append(
            this.content = el(".klip-qr-popup",
                el("h2", msg("CONNECT_QR_KLIP")),
                el(".qr", el("img", { src: dataURL })),
                el("p", msg("CONNECT_KLIP_DESC1")),
                el("p", msg("CONNECT_KLIP_DESC3")),
                el("p", msg("CONNECT_KLIP_DESC4")),
                el(".button-container",
                    el("button", msg("CHECK"), {
                        click: () => this.delete(),
                    }),
                ),
            ),
        );
    }
}
