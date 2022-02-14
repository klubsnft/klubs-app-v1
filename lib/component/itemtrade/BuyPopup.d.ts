import { DomNode, Popup } from "@hanul/skynode";
import { BigNumber } from "ethers";
export default class BuyPopup extends Popup {
    private metaverseId;
    private addr;
    private id;
    private price;
    content: DomNode;
    private loading;
    private list;
    private countInput;
    constructor(metaverseId: number, addr: string, id: number, price: BigNumber, verificationID: string);
    private load;
}
//# sourceMappingURL=BuyPopup.d.ts.map