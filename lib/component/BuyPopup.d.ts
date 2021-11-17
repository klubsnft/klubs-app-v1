import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, Popup } from "@hanul/skynode";
export default class BuyPopup extends Popup {
    private addr;
    private ids;
    content: DomNode;
    private loading;
    private list;
    constructor(addr: string[], ids: BigNumberish[]);
    private load;
}
//# sourceMappingURL=BuyPopup.d.ts.map