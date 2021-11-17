import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, Popup } from "@hanul/skynode";
export default class AcceptOfferPopup extends Popup {
    private addr;
    private id;
    private offerId;
    content: DomNode;
    private loading;
    private list;
    constructor(addr: string, id: BigNumberish, offerId: BigNumberish);
    private load;
}
//# sourceMappingURL=AcceptOfferPopup.d.ts.map