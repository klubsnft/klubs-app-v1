import { DomNode, el } from "@hanul/skynode";
import PFPPage from "../../view/pfp/page/PFPPage";

export default class PFPFilter extends DomNode {

    private idInput: DomNode<HTMLInputElement>;

    constructor(pageView: PFPPage) {
        super(".pfp-filter");
        this.append(
            this.idInput = el("input", {
                placeholder: "ID로 검색",
                change: () => {
                    pageView.loadNFTs();
                },
            }),
            /*el("select",
                el("option", "Face"),
            ),
            el("select",
                el("option", "Mouth"),
            ),*/
        );
    }

    public get idQuery() {
        const id = parseInt(this.idInput.domElement.value);
        return isNaN(id) === true ? undefined : id;
    }
}
