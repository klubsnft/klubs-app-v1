import { DomNode, el, Popup } from "@hanul/skynode";

export default class KlipQRPopup extends Popup {

    public content: DomNode;

    constructor(dataURL: string) {
        super(".popup-background");
        this.append(
            this.content = el(".klip-qr-popup",
                el("h2", "QR 코드로 Klip 접속"),
                el(".qr", el("img", { src: dataURL })),
                el("p", "QR 코드 리더기 또는 카카오톡 앱을 통해 QR 코드를 스캔해주세요."),
                el("p", "카카오톡 실행 ▶ 상단 검색창 클릭 ▶ 코드 스캔 후 로그인"),
                el("p", "* Klip > 코드스캔 (사이드메뉴)에서도 스캔이 가능합니다."),
                el(".button-container",
                    el("button", "확인", {
                        click: () => this.delete(),
                    }),
                ),
            ),
        );
    }
}
