import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, Popup } from "@hanul/skynode";
export default class OfferPopup extends Popup {
    private addr;
    private ids;
    content: DomNode;
    private loading;
    private list;
    private inputs;
    constructor(addr: string[], ids: BigNumberish[]);
    private load;
}
//# sourceMappingURL=OfferPopup.d.ts.map